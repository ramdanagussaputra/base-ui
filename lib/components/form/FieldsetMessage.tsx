import { cn } from "#/utils";
import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";

interface FieldsetMessageProps {
  readonly children: React.ReactNode;
  readonly isHintMessage?: boolean;
}

export function FieldsetMessage({
  children,
  isHintMessage = false,
}: FieldsetMessageProps) {
  const { isError, isSuccess, isLarge, isMedium, isSmall } =
    useFieldsetContext();

  return (
    <p
      className={cn("text-secondary-500", {
        "text-b3-500": isLarge,
        "text-b4-500": isMedium || isSmall,
        "text-error-700": isError && !isHintMessage,
        "text-success-600": isSuccess && !isHintMessage,
      })}
    >
      {children}
    </p>
  );
}
