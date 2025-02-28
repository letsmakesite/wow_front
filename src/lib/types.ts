import { ReactNode } from "react";

export interface LayoutProps {
  meta: Meta;
  navigation: Navigation[];
  children: ReactNode;
  options: any;
}

export interface PageProps {
  meta: Meta;
  navigation: Navigation[];
  blocks: { name: string; data: any }[];
  options: any;
  translations: any;
}

export interface HeadProps {
  meta: Meta;
}

export interface Meta {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export type Navigation = {
  id?: number;
  name?: string;
  slug: string;
  items: MenuItem[];
};

export type MenuItem = {
  id: number;
  title: string;
  url: string;
  menu_order: number;
  parent: string;
  type: string;
  object_id: string;
  object: string;
  relativeUrl: string;
  path?: string;
};

export interface NormalizePath {
  path?: string;
  locale?: string;
  defaultLocale?: string;
}

export interface HeaderProps {
  navigation: Navigation[];
  options: any;
}

export interface FooterProps {
  navigation: Navigation[];
  options: any;
}
