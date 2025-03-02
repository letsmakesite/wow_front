import Link from "next/link";
import { defaultLocale } from "@/lib/constants";
import { HomeLinkProps } from "@/lib/types";
import { useLocale } from "next-intl";

export default function HomeLink({ href, children, ...props }: HomeLinkProps) {
  const locale = useLocale();
  const isDefaultLocale = locale === defaultLocale;

  const localizedHref =
    typeof href === "string"
      ? isDefaultLocale
        ? href
        : `/${locale}${href === "/" ? "" : href}`
      : href;

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}
