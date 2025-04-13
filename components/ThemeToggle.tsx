"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import type { HTMLAttributes, Ref } from "react";

type Props = Omit<HTMLAttributes<HTMLButtonElement>, "onClick"> & {
  ref?: Ref<HTMLButtonElement>;
};

export function ThemeToggle({ ref, ...props }: Props) {
  const t = useTheme();
  const { theme, setTheme } = t;

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  return (
    <Button
      onClick={toggleTheme}
      size="sm"
      variant="ghost"
      {...props}
      ref={ref}
    >
      <Sun className="dark:-rotate-90 rotate-0 scale-100 transition-all dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
