import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";
import { cn } from "#/utils";

interface FieldsetProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  withoutTag?: boolean;
}

export function FieldsetLabel({
  children,
  id,
  className,
  withoutTag = false,
}: Readonly<FieldsetProps>) {
  const { isLarge, isMedium, isSmall, isRequired } = useFieldsetContext();

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex w-fit items-center justify-between gap-1 text-neutral-900",
        {
          "text-b2-600": isLarge,
          "text-b3-600": isMedium,
          "text-b4-600": isSmall,
        },
        className,
      )}
    >
      {children}
      {isRequired && !withoutTag && <span className="text-error-500">*</span>}
      {!isRequired && !withoutTag && (
        <span className="text-secondary-300">(optional)</span>
      )}
    </label>
  );
}
