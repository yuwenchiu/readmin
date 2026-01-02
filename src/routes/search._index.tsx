import { bookItemsMapper, fetchGoogleBooks } from "@/api/books";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { AuthContainer } from "@/lib/auth";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CircleXIcon, LoaderCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

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
    queryFn: () =>
      fetchGoogleBooks({ search: searchTerm, maxResults: 24, page }),
    enabled: !!searchTerm,
    placeholderData: keepPreviousData,
    select: bookItemsMapper,
  });

  return (
    <AuthContainer>
      <div className="mx-auto max-w-10/12">
        <div className="flex items-center">
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
                placeholder="Title, author, or ISBN"
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
                {autoCompleteQuery.data.items.map((i) => (
                  <Button
                    key={i.id}
                    variant="ghost"
                    size="lg"
                    className="block w-full truncate text-left text-base font-normal tracking-wide"
                    onMouseDown={() => console.log(i.title)}
                  >
                    {i.title}
                    {i.subtitle ? `：${i.subtitle}` : ""}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            size="xl"
            className="h-14 rounded-l-none tracking-wider focus-visible:z-20"
            onClick={() => setSearchTerm(trimmedKeyword)}
          >
            Search
          </Button>
        </div>

        {searchQuery.isSuccess && (
          <div>
            {searchQuery.data.totalItems}
            {searchQuery.data.items.map((i) => (
              <>
                {i.title}
                <br />
              </>
            ))}
          </div>
        )}
      </div>
    </AuthContainer>
  );
}

export default Search;
