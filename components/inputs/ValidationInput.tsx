"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import type { InputHTMLAttributes } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type Props<T> = {
  fieldTitle: string;
  nameInSchema: keyof T & string;
  className?: string;
  value?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function ValidationInput<T>({
  fieldTitle,
  nameInSchema,
  className,
  ...props
}: Props<T>) {
  const form = useFormContext();

  return (
    <FormField
      name={nameInSchema}
      control={form.control}
      render={({ field, fieldState }) => (
        <FormItem className="space-y-1.5">
          <FormLabel
            htmlFor={nameInSchema}
            className={`text-xs font-medium uppercase tracking-wide transition-colors ${
              fieldState.error ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            {fieldTitle}
          </FormLabel>
          <FormControl>
            <Input
              id={nameInSchema}
              className={`h-11 bg-muted/40 border-border/30 rounded-lg
                placeholder:text-muted-foreground/50
                focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-background
                transition-all duration-200
                ${fieldState.error ? "border-destructive/60 bg-destructive/5 focus-visible:border-destructive" : ""}
                ${className}`}
              {...props}
              {...field}
              value={props.type === "file" ? undefined : field.value}
              onChange={(e) => {
                if (props.type === "file") {
                  field.onChange(e.target.files?.[0]);
                } else {
                  field.onChange(e);
                }
              }}
            />
          </FormControl>
          <FormMessage className="text-xs font-normal" />
        </FormItem>
      )}
    />
  );
}
