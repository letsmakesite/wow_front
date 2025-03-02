import { NormalizePath } from "@/lib/types";

export function normalizePath({
  path = "",
  locale,
  defaultLocale,
}: NormalizePath): string {
  if (!path) return "/";
  if (
    locale &&
    defaultLocale &&
    locale !== defaultLocale &&
    path.startsWith(`/${locale}`)
  ) {
    return path.replace(`/${locale}`, "") || "/";
  }

  return path;
}
