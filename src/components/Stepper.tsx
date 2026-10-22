"use client";

import { useState } from "react";
import IconPlus from "./IconPlus";
import StepButton from "./StepButton";

export type StepperProps = {
  className?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  onChange?: (value: number) => void;
};

export default function Stepper({
  className = "",
  value,
  defaultValue = 1,
  min = 0,
  onChange,
}: StepperProps) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const current = value ?? localValue;

  function change(next: number) {
    if (next < min) return;
    if (value === undefined) setLocalValue(next);
    onChange?.(next);
  }

  return (
    <div className={`inline-flex items-center gap-[var(--spacing-stack-sm)] ${className}`}>
      <StepButton aria-label="동반 인원 줄이기" disabled={current <= min} onClick={() => change(current - 1)} />
      <output className="typography-heading-md whitespace-nowrap text-[var(--color-text-strong)]" aria-live="polite">
        {current}명
      </output>
      <StepButton
        aria-label="동반 인원 늘리기"
        icon={<IconPlus variant="step" />}
        onClick={() => change(current + 1)}
      />
    </div>
  );
}
