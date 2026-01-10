import { bookItemsMapper, fetchGoogleBooks } from "@/api/books";
import AppPagination from "@/components/AppPagination";
import BookItemCard from "@/components/BookItemCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { AuthContainer } from "@/lib/auth";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CircleXIcon, LoaderCircleIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

function Search() {
  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState("");
  const trimmedKeyword = keyword.trim();
  const debounce = useDebounce(keyword);

  const autoCompleteQuery = useQuery({
    queryKey: ["books", "autocomplete", { trimmedKeyword }],
    queryFn: () => fetchGoogleBooks({ search: trimmedKeyword, maxResults: 10 }),
    enabled: !!trimmedKeyword && !debounce,
    placeholderData: keepPreviousData,
    select: bookItemsMapper,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);

  const searchQuery = useQuery({
    queryKey: ["books", "search", { searchTerm, page }],
    queryFn: () => fetchGoogleBooks({ search: searchTerm, page }),
    enabled: !!searchTerm,
    placeholderData: keepPreviousData,
    select: bookItemsMapper,
  });

  const hasNextQuery = useQuery({
    queryKey: ["books", "hasNext", { searchTerm, page: page + 1 }],
    queryFn: () => fetchGoogleBooks({ search: searchTerm, page: page + 1 }),
    enabled: !!searchTerm,
    select: (data) => !!data?.items && data.items.length > 0,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [hasNextQuery.data, page]);

  return (
    <AuthContainer>
      <div className="mx-auto mb-12 h-full max-w-10/12">
        <search className="relative z-10 mb-8 flex items-center">
          <div className="relative w-full">
            <div className="relative z-10">
              <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                <SearchIcon className="size-4" />
                <span className="sr-only">Search</span>
              </div>

              <Input
                id="keyword"
                className="peer h-14 rounded-r-none bg-white px-9 tracking-wide shadow-none focus-visible:z-20"
                type="text"
                placeholder="Title, author, or ISBN/eISBN"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />

              <div className="text-muted-foreground absolute inset-y-0 right-0 flex items-center justify-center peer-disabled:opacity-50">
                {keyword &&
                  (debounce || autoCompleteQuery.isFetching ? (
                    <div className="pointer-events-none pr-2.5">
                      <LoaderCircleIcon className="size-4 animate-spin" />
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setKeyword("")}
                      className="focus-visible:ring-ring/50 h-full rounded-none hover:bg-transparent"
                    >
                      <CircleXIcon />
                      <span className="sr-only">Clear input</span>
                    </Button>
                  ))}
              </div>
            </div>

            {isFocused && trimmedKeyword && autoCompleteQuery.isSuccess && (
              <div className="border-border absolute z-0 mt-0.5 w-full rounded-md border bg-white p-3 shadow-xs">
                {autoCompleteQuery.data.items.map((bookItem) => (
                  <Button
                    key={bookItem.id}
                    variant="ghost"
                    size="lg"
                    className="block w-full truncate text-left text-base font-normal tracking-wide"
                    onMouseDown={() => console.log(bookItem.title)}
                  >
                    {bookItem.title}
                    {bookItem.subtitle ? `: ${bookItem.subtitle}` : ""}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            size="xl"
            className="h-14 rounded-l-none tracking-wider focus-visible:z-20"
            onClick={() => {
              setSearchTerm(trimmedKeyword);
              setPage(0);
            }}
          >
            Search
          </Button>
        </search>

        {searchQuery.isSuccess && (
          <section>
            <ul className="relative my-12 grid grid-cols-5 gap-x-4 gap-y-6">
              {searchQuery.data.items.map((bookItem) => (
                <li key={bookItem.id}>
                  <BookItemCard {...bookItem} />
                </li>
              ))}
            </ul>

            <AppPagination
              currPage={page}
              hasNextPage={hasNextQuery.data}
              onChangePage={(newPage) => setPage(newPage)}
            />
          </section>
        )}
      </div>
    </AuthContainer>
  );
}

export default Search;
