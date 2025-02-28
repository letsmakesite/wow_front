import clsx from "clsx";
import { useRouter } from "next/router";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, locales } = router;

  const changeLanguage = (lang: string) => {
    router.push(router.asPath, router.asPath, { locale: lang });
  };

  return (
    <div className="flex gap-4 bg-gray-500 px-4 py-2 rounded-md">
      {locales?.map((lang: string) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={clsx("transition-colors hover:text-orange-600", {
            hidden: locale === lang,
          })}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
