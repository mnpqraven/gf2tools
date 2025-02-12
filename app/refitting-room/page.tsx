import { Metadata } from "next";
import { ClientWrapper } from "./ClientWrapper";

export const metadata: Metadata = {
  title: "Refitting Room",
};

export default async function Page() {
  return <ClientWrapper />;
}
