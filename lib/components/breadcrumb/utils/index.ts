import {
  Breadcrumb,
  BreadcrumbLabel,
  BreadcrumbLabels,
  UrlToBreadcrumbConfig,
} from "#/components/breadcrumb/model";
import { capitalizeFirstWord } from "#/utils";

function buildBreadcrumbObject(
  segments: string[],
  labels: BreadcrumbLabels,
): Breadcrumb | null {
  // Function to build the nested breadcrumb object
  if (segments.length === 0) {
    return null;
  }

  const [current, ...rest] = segments;

  return {
    pathname: current,
    label: labels[current] || current,
    children: buildBreadcrumbObject(rest, labels),
  };
}

function urlToBreadcrumbConfig({
  url,
  pathToIgnore = [],
  labels,
}: UrlToBreadcrumbConfig) {
  // Extract the path segments from the URL
  const pathSegments = url
    .split("/")
    .filter((segment) => segment && !pathToIgnore.includes(segment));

  return buildBreadcrumbObject(pathSegments, labels);
}

function traverseBreadcrumbObject(
  node: Breadcrumb,
  result: { pathname: string; label: BreadcrumbLabel }[],
) {
  result.push({
    pathname: node.pathname,
    label: node.label,
  });

  if (node.children) {
    traverseBreadcrumbObject(node.children, result);
  }
}

function breadcrumbToArray(breadcrumb: Breadcrumb) {
  const result: { pathname: string; label: BreadcrumbLabel }[] = [];
  traverseBreadcrumbObject(breadcrumb, result);

  return result;
}

export function setBreadcrumb({
  url,
  labels,
  pathToIgnore,
}: {
  url: string;
  pathToIgnore?: string[];
  labels: BreadcrumbLabels;
}) {
  const convertedBreadcrumbUrl = urlToBreadcrumbConfig({
    url,
    labels,
    pathToIgnore,
  });

  const breadcrumbItem = convertedBreadcrumbUrl
    ? breadcrumbToArray(convertedBreadcrumbUrl)
    : [];
  return breadcrumbItem;
}

export function pathnameToBreadcrumbLabel(pathname: string) {
  const splittedPath = pathname.split("/").slice(1);

  const breadcrumbLabels = splittedPath.reduce((acu, cur, index, arr) => {
    const path = arr.slice(0, index + 1).join("/");
    const name = cur.split("-")?.join(" ");

    return {
      ...acu,
      [cur]: {
        name: capitalizeFirstWord(name),
        path: `/${path}`,
      },
    };
  }, {});

  return breadcrumbLabels;
}
