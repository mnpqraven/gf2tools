import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar() {
  return (
    <div className="sticky top-0 flex h-10 w-full justify-center border border-b">
      <div className="container flex items-center justify-between">
        <div className="flex gap-2">
          <Link className="hover:underline" href="/">
            Home
          </Link>
          <Link className="hover:underline" href="/calc">
            Calc
          </Link>
          <Link className="hover:underline" href="/about">
            About
          </Link>
        </div>

        <ThemeToggle />
      </div>
    </div>
  );
}
