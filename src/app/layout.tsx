import type { Metadata } from "next";
import "./globals.css";
import "../config/database";
import "@fontsource/lato";
import "@fontsource/lato/latin-400-italic.css";
import "@fontsource/lato/latin-700.css";
import { getUser } from "@/utils/get_user";

export const metadata: Metadata = {
  title: "Summary AI",
  description: "AI for summarization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
