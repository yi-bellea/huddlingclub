import { useId } from "react";
import InputField, { type InputFieldProps } from "./InputField";
import Label from "./Label";

export type InputProps = Omit<InputFieldProps, "className"> & {
  className?: string;
  fieldClassName?: string;
  helper?: string;
  label?: string;
  showHelper?: boolean;
};

export default function Input({
  className = "",
  fieldClassName,
  helper = "안내 문구",
  id,
  label = "Label",
  required = true,
  showHelper = false,
  ...props
}: InputProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div className={`flex w-full flex-col items-start gap-[var(--spacing-inline-compact)] ${className}`}>
      <Label htmlFor={fieldId} label={label} required={required} variant="field" />
      <InputField {...props} id={fieldId} required={required} className={fieldClassName} />
      {showHelper && <p className="typography-caption-md text-[var(--color-text-tertiary)]">{helper}</p>}
    </div>
  );
}
