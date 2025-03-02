import { GetStaticProps } from "next";
import { defaultLocale, supportedLocales } from "@/lib/constants";
import { Meta, Navigation } from "@/lib/types";

const backendDomain = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug?: string[] };

  let locale = defaultLocale;
  let pageSlug = slug || [];

  if (pageSlug.length > 0 && supportedLocales.includes(pageSlug[0])) {
    [locale, ...pageSlug] = pageSlug;
  }

  const actualSlug = pageSlug.length === 0 ? "front-page" : pageSlug.join("/");

  const [pagesRes, menusRes, optionsRes] = await Promise.all([
    fetch(`${backendDomain}/wp-json/wp/v2/pages`),
    fetch(`${backendDomain}/wp-json/custom/v1/menus`),
    fetch(`${backendDomain}/wp-json/options/all`),
  ]);

  if (!pagesRes.ok || !menusRes.ok || !optionsRes.ok) {
    return { notFound: true };
  }

  const [pages, menus, options]: [any[], Navigation[], any] = await Promise.all(
    [pagesRes.json(), menusRes.json(), optionsRes.json()]
  );

  const basePage = pages.find((page: any) => page.slug === actualSlug);
  if (!basePage) return { notFound: true };

  const translation = basePage.translations?.[locale];
  const localizedPage = translation
    ? pages.find((page: any) => page.id === translation.post_id)
    : basePage;

  if (!localizedPage) return { notFound: true };

  const meta: Meta = {
    title: localizedPage.yoast_head_json?.title ?? "No title",
    description: localizedPage.yoast_head_json?.description ?? "",
    keywords: localizedPage.yoast_head_json?.keywords ?? "",
    ogImage: localizedPage.yoast_head_json?.og_image?.[0]?.url ?? "",
  };

  const navigation: Navigation[] = menus.map((menu) => ({
    slug: menu.slug,
    items: menu.items ?? [],
  }));

  const localizedOptions = { ...options[locale as string] };

  return {
    props: {
      meta,
      navigation,
      blocks: localizedPage.acf_blocks?.map((block: any) => ({
        name: block.name?.replace("block-", "") || "unknown",
        data: block.data || {},
      })),
      locale,
      options: localizedOptions,
      translations: (await import(`../../locales/${locale}/common.json`))
        .default,
    },
  };
};
