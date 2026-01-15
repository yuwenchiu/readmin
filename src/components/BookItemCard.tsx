import type { GoogleBookItem } from "@/api/googleBooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import BookCover from "./BookCover";

function BookItemCard({
  onClick = () => {},
  ...book
}: { onClick?: () => void } & GoogleBookItem) {
  return (
    <button className="h-80 w-full" onClick={onClick}>
      <Card className="h-full gap-3 overflow-hidden pt-0 transition-all duration-500 hover:scale-105 hover:shadow-lg">
        <CardContent className="px-0">
          <BookCover {...book} />
        </CardContent>
        <CardHeader className="h-full px-3">
          <CardTitle className="line-clamp-3 h-[60px] text-left text-sm">
            {book.title}
            {book.subtitle ? `: ${book.subtitle}` : ""}
          </CardTitle>
          <CardDescription className="line-clamp-1 text-left text-xs">
            {book.authors.map((author, i) => (
              <span key={i}>
                {i > 0 && " "}
                <span className="underline">{author}</span>
              </span>
            ))}
          </CardDescription>
        </CardHeader>
      </Card>
    </button>
  );
}

export default BookItemCard;
