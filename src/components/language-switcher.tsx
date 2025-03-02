import clsx from "clsx";
import { useRouter } from "next/router";
import { supportedLocales, defaultLocale } from "@/lib/constants";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();
  const { asPath } = router;

  const changeLanguage = (lang: string) => {
    if (lang === locale) return;
    const localeRegex = new RegExp(`^/(${supportedLocales.join("|")})`);

    const cleanPath = asPath.replace(localeRegex, "") || "/";
    const newPath = lang === defaultLocale ? cleanPath : `/${lang}${cleanPath}`;

    router.push(newPath);
  };

  return (
    <div className="flex gap-4 bg-gray-500 px-4 py-2 rounded-md">
      {supportedLocales.map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={clsx("transition-colors hover:text-orange-600 uppercase", {
            hidden: locale === lang,
          })}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
