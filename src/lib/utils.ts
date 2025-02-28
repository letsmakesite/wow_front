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

export const createTranslator = (translations: any) => {
  return (key: string, fallback?: string) => {
    const value = key
      .split(".")
      .reduce(
        (acc: any, part) => (acc && acc[part] ? acc[part] : undefined),
        translations
      );

    return typeof value === "string" ? value : fallback || key;
  };
};
