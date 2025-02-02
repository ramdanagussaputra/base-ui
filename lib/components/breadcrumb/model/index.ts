export interface BreadcrumbLabel {
  name: string;
  path: string;
}

export interface BreadcrumbLabels {
  [key: string]: BreadcrumbLabel;
}

export interface UrlToBreadcrumbConfig {
  url: string;
  pathToIgnore?: string[];
  labels: BreadcrumbLabels;
}

export interface Breadcrumb {
  pathname: string;
  label: BreadcrumbLabel;
  children?: Breadcrumb | null;
}
