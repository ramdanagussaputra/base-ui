import { FC, PropsWithChildren } from "react";
import { CardSliderItem } from "./model";

interface CardContainerProps {
  image: CardSliderItem["image"];
  widthRem?: number;
}

export const CardContainer: FC<PropsWithChildren<CardContainerProps>> = ({
  children,
  image,
  widthRem,
}) => {
  return (
    <div
      className="border-seconary-100 flex shrink-0 flex-col"
      style={{ width: widthRem ? `${widthRem}rem` : "25rem" }}
    >
      <img
        src={image.src}
        alt={image.alt || "card-image"}
        style={{
          objectFit: image.objectFit || "cover",
          objectPosition: image.objectPosition || "center",
          height: image.heightRem ? `${image.heightRem}rem` : "11.25rem",
        }}
        className="pointer-events-none rounded-xl rounded-b-none"
      />
      <div className="border-secondary-100 rounded-xl rounded-t-none border border-t-0 p-5">
        {children}
      </div>
    </div>
  );
};
