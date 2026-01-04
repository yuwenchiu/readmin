import type { GoogleBookItem } from "@/api/books";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { BookText } from "lucide-react";

function BookItemCard({
  onClick = () => {},
  ...book
}: { onClick?: () => void } & GoogleBookItem) {
  return (
    <button className="h-80 w-full" onClick={onClick}>
      <Card className="h-full gap-3 overflow-hidden pt-0 transition-all duration-500 hover:scale-105 hover:shadow-lg">
        <CardContent className="px-0">
          {book.imageLink ? (
            <img
              src={book.imageLink}
              alt={book.title}
              className="h-52 w-full object-cover object-top"
            />
          ) : (
            <div className="bg-muted text-muted-foreground flex h-52 w-full flex-col items-center justify-center gap-4">
              <BookText className="scale-125" />
              <div className="text-sm">No Image</div>
            </div>
          )}
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
