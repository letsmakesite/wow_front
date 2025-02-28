import { GetStaticPaths } from "next";

const backendDomain = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const res = await fetch(`${backendDomain}/wp-json/wp/v2/pages`);
  const pages = await res.json();

  const paths = pages.flatMap((page: any) => {
    return (locales || []).map((locale) => ({
      params: { slug: [page.slug] },
      locale,
    }));
  });

  return {
    paths,
    fallback: "blocking",
  };
};
