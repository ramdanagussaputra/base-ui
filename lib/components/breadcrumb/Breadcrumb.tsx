import { MouseEvent } from "react";

import { BreadcrumbLabels } from "#/components/breadcrumb/model";
import { BreadcrumbSeparator } from "#/components/breadcrumb/BreadcrumbSeparator";

import {
  pathnameToBreadcrumbLabel,
  setBreadcrumb,
} from "#/components/breadcrumb/utils";
import { cn } from "#/utils";

interface BreadcrumbProps {
  urlPath: string;
  breadcrumbSeparator: React.ReactNode;
  navigateFunction?: (path: string) => void;
  type?: "home" | "detail";
  homeTitle?: React.ReactNode;
  homeHref?: string;
  pathToIgnore?: string[];
  forDetailModal?: boolean;
  onBreadcrumbClick?: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => void;
}

export function Breadcrumb({
  urlPath,
  breadcrumbSeparator,
  navigateFunction,
  homeHref = "/",
  homeTitle,
  pathToIgnore = [],
  type = "home",
  onBreadcrumbClick = () => {},
}: Readonly<BreadcrumbProps>) {
  const isDetail = type === "detail";

  const labels: BreadcrumbLabels = pathnameToBreadcrumbLabel(urlPath);

  const breadcrumbItems = setBreadcrumb({
    labels,
    url: urlPath,
    pathToIgnore,
  });

  if (isDetail) {
    breadcrumbItems.push({
      label: {
        name: "Detail",
        path: "#",
      },
      pathname: "#",
    });
  }

  return (
    <div className="flex items-center gap-(--breadcrumb-item-gap) leading-(--breadcrumb-item-line-height) text-(--breadcrumb-item-color) text-(--breadcrumb-item-size)">
      {homeTitle && (
        <>
          <button
            onClick={() => navigateFunction?.(homeHref)}
            className={cn(
              "text-(length:--breadcrumb-item-size) leading-(--breadcrumb-item-line-height) font-(--breadcrumb-item-font-weight) text-(--breadcrumb-item-color)",
              {
                "cursor-pointer": !!navigateFunction,
              },
            )}
          >
            {homeTitle}
          </button>

          {breadcrumbItems.length > 0 && (
            <BreadcrumbSeparator>{breadcrumbSeparator}</BreadcrumbSeparator>
          )}
        </>
      )}

      {breadcrumbItems.map((item, index) => {
        const isLastItem = index === breadcrumbItems.length - 1;

        return (
          <span
            key={item.label.name}
            className={cn(
              "flex items-center gap-(--breadcrumb-item-gap) text-(length:--breadcrumb-item-size) leading-(--breadcrumb-item-line-height) font-(--breadcrumb-item-font-weight) text-(--breadcrumb-item-color)",
              {
                "font-(--breadcrumb-item-font-weight--active) text-(--breadcrumb-item-color--active)":
                  isLastItem,
              },
            )}
          >
            {isLastItem && <span>{item.label.name}</span>}

            {!isLastItem && (
              <button
                onClick={(event) => {
                  onBreadcrumbClick(event);
                  navigateFunction?.(item.label.path);
                }}
                className={cn("text-(--breadcrumb-item-size)", {
                  "cursor-pointer": !!navigateFunction,
                })}
              >
                {item.label.name}
              </button>
            )}

            {!isLastItem && (
              <BreadcrumbSeparator>{breadcrumbSeparator}</BreadcrumbSeparator>
            )}
          </span>
        );
      })}
    </div>
  );
}
