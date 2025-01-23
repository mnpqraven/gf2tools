import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="container py-8">{children}</div>;
}
