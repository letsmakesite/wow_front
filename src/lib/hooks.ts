import { Navigation, MenuItem } from "./types";
import { defaultLocale } from "./constants";
import { useLocale } from "next-intl";

export function useMenu(navigation: Navigation[], menuKey: string): MenuItem[] {
  const locale = useLocale();
  const localizedKey = `${menuKey}-${locale}`;
  const menu =
    navigation.find((menu) => menu.slug === localizedKey)?.items ?? [];

  return menu.map((item) => {
    const itemUrl = new URL(item.url);
    let relativeUrl = item.url;

    const backendDomain = process.env.NEXT_PUBLIC_WORDPRESS_API_URL
      ? new URL(process.env.NEXT_PUBLIC_WORDPRESS_API_URL).hostname
      : "";

    if (itemUrl.hostname === backendDomain) {
      relativeUrl = itemUrl.pathname;

      if (relativeUrl.endsWith("/front-page/")) {
        relativeUrl = locale === defaultLocale ? "/" : `/${locale}/`;
      }
    }

    return { ...item, relativeUrl };
  });
}
