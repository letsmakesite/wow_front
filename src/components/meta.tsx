import Head from "next/head";
import { HeadProps } from "@/lib/types";

export default function Meta({ meta }: HeadProps) {
  return (
    <Head>
      <title>{meta.title}</title>
      {meta.description && (
        <meta name="description" content={meta.description} />
      )}
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}
    </Head>
  );
}
