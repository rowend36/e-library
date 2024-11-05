"use client";
import { AppLogo } from "../AppLogo";
import Link from "../base/Link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const route = usePathname();
  return (
    <>
      <Link
        href="/admin/"
        className={`w-full mt-8 mb-2 py-2  text-darkGrayishBlue  ${
          route === "/admin"
            ? "bg-primary hover:bg-primaryHover hover:text-white text-white"
            : ""
        }`}
      >
        Overview
      </Link>
      <Link
        href="/admin/datasets"
        className={`w-full mb-2 py-2  text-darkGrayishBlue  ${
          route.startsWith("/admin/datasets")
            ? "bg-primary hover:bg-primaryHover hover:text-white text-white"
            : ""
        }`}
      >
        Manage Datasets
      </Link>
      <Link
        href="/admin/users"
        className={`w-full mb-2 py-2  text-darkGrayishBlue  ${
          route.startsWith("/admin/users")
            ? "bg-primary hover:bg-primaryHover hover:text-white text-white"
            : ""
        }`}
      >
        Manage Users
      </Link>
    </>
  );
}
