import { LayoutProps } from "@/lib/types";
import Meta from "@/components/meta";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Layout({
  meta,
  navigation,
  children,
  options,
}: LayoutProps) {
  return (
    <>
      <Meta meta={meta} />
      <Header navigation={navigation} options={options} />
      <main>{children}</main>
      <Footer navigation={navigation} options={options} />
    </>
  );
}
