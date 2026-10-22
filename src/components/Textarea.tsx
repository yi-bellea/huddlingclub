import { useId } from "react";
import Label from "./Label";
import TextareaField, { type TextareaFieldProps } from "./TextareaField";

export type TextareaProps = Omit<TextareaFieldProps, "className" | "rows"> & {
  className?: string;
  fieldClassName?: string;
  helper?: string;
  label?: string;
  rows?: 2 | 4;
  showHelper?: boolean;
};

export default function Textarea({
  className = "",
  fieldClassName,
  helper = "엔터로 줄을 나눌 수 있어요",
  id,
  label = "Label",
  required = true,
  rows = 4,
  showHelper = false,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div className={`flex w-full flex-col items-start gap-[var(--spacing-inline-compact)] ${className}`}>
      <Label htmlFor={fieldId} label={label} required={required} />
      <TextareaField {...props} id={fieldId} required={required} rows={rows} className={fieldClassName} />
      {showHelper && <p className="typography-caption-md text-[var(--color-text-tertiary)]">{helper}</p>}
    </div>
  );
}
