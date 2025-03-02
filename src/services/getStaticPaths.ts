import { GetStaticPaths } from "next";
import { defaultLocale, supportedLocales } from "@/lib/constants";

const backendDomain = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${backendDomain}/wp-json/wp/v2/pages`);
  if (!res.ok) {
    return { paths: [], fallback: false };
  }

  const pages = await res.json();

  const paths = pages.flatMap((page: any) =>
    supportedLocales.map((locale) => {
      const slug = page.slug === "front-page" ? [] : [page.slug];

      return {
        params: {
          slug: locale === defaultLocale ? slug : [locale, ...slug],
        },
      };
    })
  );

  return { paths, fallback: "blocking" };
};
