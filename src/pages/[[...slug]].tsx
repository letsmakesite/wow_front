import { GetStaticProps, GetStaticPaths } from "next";
import { getStaticPaths as getPaths } from "@/services/getStaticPaths";
import { getStaticProps as getProps } from "@/services/getStaticProps";
import Layout from "@/layouts/layout";
import dynamic from "next/dynamic";
import { PageProps } from "@/lib/types";

export default function Page({
  meta,
  navigation,
  blocks,
  options,
  translations,
}: PageProps) {
  return (
    <Layout meta={meta} navigation={navigation} options={options}>
      {blocks.map((block, index) => {
        const BlockComponent = dynamic<any>(
          () => import(`../blocks/${block.name}`),
          { ssr: false }
        );
        return (
          <BlockComponent
            key={index}
            block={block.data}
            translations={translations}
          />
        );
      })}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = getPaths;
export const getStaticProps: GetStaticProps = getProps;
