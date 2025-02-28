import Link from "next/link";
import { useMenu } from "@/lib/hooks";
import { FooterProps } from "@/lib/types";

export default function Footer({ navigation, options }: FooterProps) {
  const footerMenu = useMenu(navigation, "footer-menu");
  return (
    <footer className="my-5">
      <div className="mx-auto w-full max-w-screen-md px-4">
        <div className="p-4 bg-slate-800 text-white rounded-lg text-center md:text-left md:flex justify-between items-center min-h-[72px]">
          <p>{options.copyright}</p>
          <ul className="md:flex gap-8">
            {footerMenu.length > 0 ? (
              footerMenu.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="transition-colors hover:text-orange-600"
                  >
                    <Link href={item.relativeUrl}>{item.title}</Link>
                  </li>
                );
              })
            ) : (
              <li>No menu items</li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
