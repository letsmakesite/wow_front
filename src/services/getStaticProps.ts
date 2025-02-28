import { GetStaticProps } from "next";
import { Meta, Navigation } from "@/lib/types";
import fs from "fs";
import path from "path";

const backendDomain = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const filePath = path.join(
    process.cwd(),
    `public/locales/${locale}/common.json`
  );

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const translations = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const { slug } = params as { slug?: string[] };

  if (slug && slug.length === 1 && slug[0] === "front-page") {
    return { notFound: true };
  }
  const actualSlug = !slug || slug.length === 0 ? "front-page" : slug.join("/");

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

  const basePage = pages.find((page) => page.slug === actualSlug);
  if (!basePage) {
    return { notFound: true };
  }

  const translation = locale ? basePage.translations?.[locale] : undefined;
  if (!translation) {
    return { notFound: true };
  }

  const localizedPage = pages.find((page) => page.id === translation.post_id);
  if (!localizedPage) {
    return { notFound: true };
  }

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
      options: localizedOptions,
      translations,
    },
  };
};
