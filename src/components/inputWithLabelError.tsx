import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input } from "./ui/input";
import { Field, FieldContent, FieldError, FieldLabel } from "./ui/field";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

function InputWithLabelError<TFieldValues extends FieldValues>({
  name,
  label,
  control,
  type,
  ...props
}: {
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
} & Omit<React.ComponentPropsWithoutRef<"input">, "name">) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldContent orientation="horizontal">
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </FieldContent>
          <div className="relative">
            <Input
              {...field}
              id={name}
              aria-invalid={fieldState.invalid}
              type={type == "password" && isVisible ? "text" : type}
              {...props}
            />
            {type == "password" && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-muted-foreground focus-visible:ring-ring/50 absolute right-0 h-full hover:bg-transparent"
                onClick={() => setIsVisible((prev) => !prev)}
              >
                {isVisible ? (
                  <EyeClosed className="transition-all" />
                ) : (
                  <Eye className="transition-all" />
                )}
              </Button>
            )}
          </div>
        </Field>
      )}
    />
  );
}

export default InputWithLabelError;
