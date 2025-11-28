import { CardSliderItem } from "#/components/card-slider/model";
import { cn } from "#/utils";
import { CardContainer } from "./CardContainer";

interface CardItemProps {
  item: CardSliderItem;
}

export const CardItem = ({ item }: Readonly<CardItemProps>) => {
  const isCustomMode = item.mode === "custom";
  const isDescriptionMode = item.mode === "description";
  const isListNumberMode = item.mode === "list-number";
  const isListBulletMode = item.mode === "list-bullet";

  if (isCustomMode) {
    return (
      <CardContainer image={item.image}>
        {item.descriptionContent}
      </CardContainer>
    );
  }

  if (isDescriptionMode) {
    return (
      <CardContainer image={item.image}>
        <span className="text-b3-400 text-secondary-500">
          {item.descriptionContent}
        </span>
      </CardContainer>
    );
  }

  if (isListNumberMode || isListBulletMode) {
    const isNumbered = isListNumberMode;

    return (
      <CardContainer image={item.image}>
        <div className="flex flex-col gap-1">
          {item.descriptionContent?.map((desc, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="flex items-start">
                {isNumbered && (
                  <span className="text-b3-400 text-secondary-500 min-w-5">
                    {index + 1}.
                  </span>
                )}
                <span className="text-b3-400 text-secondary-500">
                  {desc.text?.split(" ")?.map((word, wordIndex) => {
                    const linkEntry = desc.hyperlink?.[index];
                    if (linkEntry?.index === wordIndex) {
                      return (
                        <a
                          key={wordIndex}
                          href={linkEntry.href}
                          className={cn("text-primary-500 hover:underline")}
                          target={linkEntry.target || "_blank"}
                          rel="noopener"
                        >
                          {word + " "}
                        </a>
                      );
                    }

                    return word + " ";
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContainer>
    );
  }
};
