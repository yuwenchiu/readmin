import type { GoogleBookItem } from "@/api/googleBooks";
import { cx } from "class-variance-authority";
import { BookText } from "lucide-react";

function BookCover({ title, imageLink, className }: GoogleBookItem & React.ComponentPropsWithoutRef<"div">) {
  return imageLink ? (
    <div className={cx("h-52 w-full", className)}>
      <img
        src={imageLink}
        alt={title}
        className="h-full w-full object-cover object-top"
      />
    </div>
  ) : (
    <div
      className={cx(
        "bg-muted text-muted-foreground flex h-52 w-full flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <BookText className="scale-125" />
      <div className="text-sm">No Image</div>
    </div>
  );
}

export default BookCover;