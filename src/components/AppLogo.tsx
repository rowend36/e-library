import Image from "next/image";
import companyLogo from "@/assets/dataset.png";
import Link from "next/link";
export function AppLogo(props: any) {
  /* Logo */

  return (
    <Link
      href="/"
      {...props}
      className={"pt-2 flex items-center gap-1 " + props.className}
    >
      {/* <Image
        src={companyLogo}
        className="object-contain h-[4em] w-auto "
        alt=""
      />{" "} */}
      <span
        className="leading-tight text-white bg-primary px-2 pt-1 rounded-full text-center h-16 w-16 flex items-center justify-center font-bold text-2xl"
        style={{ letterSpacing: 0.5 }}
      >
        SAI
      </span>
    </Link>
  );
}
