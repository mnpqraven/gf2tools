/**
 * @see https://time.openstatus.dev/
 */
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type ComponentPropsWithRef, useEffect, useState } from "react";

export interface NumberInputProps extends ComponentPropsWithRef<"input"> {
  value: number | undefined;
  defaultValue?: number;
  min?: number;
  max?: number;
  onValueChange: (to: number) => void;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}

export function NumberInput({
  className,
  type = "tel",
  value: _value,
  defaultValue,
  id,
  onValueChange,
  onChange,
  onKeyDown,
  onLeftFocus,
  onRightFocus,
  min,
  max,
  /**
   * dumbass attribute setting default size for element
   * @see https://www.geeksforgeeks.org/html-input-size-attribute/?ref=rp
   */
  size = 1,
  ...props
}: NumberInputProps) {
  const [flag, setFlag] = useState(false);
  const value = _value ?? defaultValue ?? min ?? 0;

  /**
   * allow the user to enter the second digit within 2 seconds
   * otherwise start again with entering first digit
   */
  useEffect(() => {
    if (flag) {
      const timer = setTimeout(() => {
        setFlag(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [flag]);

  const displayValue = value.toString().padStart(2, "0");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") return;
    e.preventDefault();
    if (e.key === "ArrowRight") onRightFocus?.();
    if (e.key === "ArrowLeft") onLeftFocus?.();
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      const step = e.key === "ArrowUp" ? 1 : -1;
      const newValue = value + step;
      if (flag) setFlag(false);

      const passMax =
        max === undefined || (max !== undefined && newValue <= max);
      const passMin =
        min === undefined || (min !== undefined && newValue >= min);
      if (passMax && passMin) onValueChange(newValue);
    }
    if (e.key >= "0" && e.key <= "9") {
      const step = Number(e.key);
      const newValue = (value * 10 + step) % 100;

      if (flag) onRightFocus?.();
      setFlag((prev) => !prev);

      // in case max is single digit
      if (max !== undefined && max < 10) {
        onValueChange(Math.min(max, step));
        return;
      }
      if (max !== undefined && newValue > max) {
        // autos to max value, math.min is there to help with modulo
        onValueChange(Math.min(newValue % 100, max));
      } else if (min !== undefined && newValue < min) onValueChange(1);
      else onValueChange(newValue);
    }
    // TODO: better negative handling
    if (e.key === "-" && min !== undefined && min < 0) {
      onValueChange(-1);
    }
  };

  return (
    <Input
      className={cn(
        "h-12 w-12 text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none",
        className,
      )}
      id={id}
      inputMode="decimal"
      onChange={(e) => {
        e.preventDefault();
        onChange?.(e);
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        handleKeyDown(e);
      }}
      size={size}
      type={type}
      value={displayValue}
      {...props}
    />
  );
}
