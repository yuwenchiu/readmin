export type GoogleBookItem = {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  isbn?: string;
  pageCount?: number;
  categories: string[];
  imageLink?: string;
  language?: string;
};

export type GoogleBookItems = {
  totalItems: number;
  items: GoogleBookItem[];
};

export type GoogleBookResponse = {
  totalItems: number;
  items: {
    id: string;
    volumeInfo: {
      title: string;
      subtitle?: string;
      authors?: string[];
      publisher?: string;
      publishedDate?: string;
      description?: string;
      industryIdentifiers?: {
        type: string;
        identifier: string;
      }[];
      pageCount?: number;
      categories?: string[];
      imageLinks?: {
        smallThumbnail?: string;
        thumbnail?: string;
        small?: string;
        medium?: string;
      };
      language?: string;
    };
  }[];
};

const getQueryString = (text: string) => {
  const digitsOnly = text.replace(/[-\s]/g, "");

  if (/^\d{10}(\d{3})?$/.test(digitsOnly)) {
    return `isbn:${digitsOnly}`;
  }

  return text;
};

export const bookItemsMapper = ({
  totalItems,
  items,
}: GoogleBookResponse): GoogleBookItems => ({
  totalItems,
  items: items.map(({ id, volumeInfo }) => {
    const industryIdentifiers = volumeInfo.industryIdentifiers;
    const isbn =
      industryIdentifiers?.find((i) => i.type === "ISBN_13")?.identifier ??
      industryIdentifiers?.find((i) => i.type === "ISBN_10")?.identifier;

    const imageLinks = volumeInfo.imageLinks;
    const imageLink =
      imageLinks?.medium ??
      imageLinks?.small ??
      imageLinks?.thumbnail ??
      imageLinks?.smallThumbnail;

    return {
      id,
      ...volumeInfo,
      authors: volumeInfo.authors ?? [],
      publishedDate: volumeInfo.publishedDate?.split("-").join("/"),
      isbn,
      categories: volumeInfo.categories ?? [],
      imageLink,
    };
  }),
});

export const DEFAULT_ITEMS_PER_PAGE = 20;

export const fetchGoogleBooks = async ({
  search,
  maxResults = DEFAULT_ITEMS_PER_PAGE,
  page = 0,
}: {
  search: string;
  maxResults?: number;
  page?: number;
}): Promise<GoogleBookResponse> => {
  const searchParams = new URLSearchParams({
    key: import.meta.env.VITE_GOOGLE_API_KEY,
    q: getQueryString(search),
    langRestrict: "zh-TW",
    country: "TW",
    maxResults: maxResults.toString(),
    startIndex: (page * maxResults).toString(),
  });

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?${searchParams}`,
  );

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};
