import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function TopBar() {
  return (
    <div className="flex justify-between sticky top-0 w-full h-10 border-b border items-center px-10">
      <div className="flex gap-2">
        <Link href="/">Home</Link>
        <Link href="/calc">Calc</Link>
      </div>

      <ThemeToggle />
    </div>
  );
}
