import type { Metadata } from "next";
import "./globals.css";
import "../config/database";
import "@fontsource/lato";
import "@fontsource/lato/latin-400-italic.css";
import "@fontsource/lato/latin-700.css";
import "@fontsource/varela-round/latin-400.css";
import Footer from "@/components/about/Footer";
import Navbar from "@/components/about/Navbar";
import { getUser } from "@/utils/get_user";

export const metadata: Metadata = {
  title: "E-libary",
  description: "Electronic library for Abia State",
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
