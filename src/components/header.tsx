import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMenu } from "@/lib/hooks";
import { normalizePath } from "@/lib/utils";
import LanguageSwitcher from "@/components/language-switcher";
import { HeaderProps } from "@/lib/types";
import Image from "next/image";

export default function Header({ navigation, options }: HeaderProps) {
  const headerMenu = useMenu(navigation, "header-menu");
  const router = useRouter();
  const { locale, defaultLocale } = router;

  const currentPath = normalizePath({
    path: router.asPath,
    locale,
    defaultLocale,
  });

  return (
    <header className="my-5">
      <div className="mx-auto w-full max-w-screen-md px-4">
        <div className="p-4 bg-slate-800 text-white rounded-lg flex flex-wrap justify-between items-center">
          <Link href="/">
            <Image
              src={options.logo.url}
              alt={options.logo.alt}
              width="40"
              height="40"
            />
          </Link>
          <ul className="flex gap-8 mt-4 md:mt-0 md:mr-8 md:ml-auto w-full md:w-auto order-1 md:-order-none justify-center">
            {headerMenu.length > 0 ? (
              headerMenu.map((item) => {
                const itemPath = normalizePath({
                  path: item.relativeUrl,
                  locale,
                  defaultLocale,
                });

                const isActive = currentPath === itemPath;

                return (
                  <li
                    key={item.id}
                    className={clsx("transition-colors hover:text-orange-600", {
                      "opacity-70": isActive,
                    })}
                  >
                    <Link href={item.relativeUrl}>{item.title}</Link>
                  </li>
                );
              })
            ) : (
              <li>No menu items</li>
            )}
          </ul>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
