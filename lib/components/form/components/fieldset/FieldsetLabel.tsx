import { useFieldsetContext } from "#/components/form/context/useFieldsetContext";
import { cn } from "#/utils";

interface FieldsetProps {
  children: React.ReactNode;
  type?: "required" | "optional";
  onClick?: () => void;
  id?: string;
}

export function FieldsetLabel({ children, type, onClick, id }: FieldsetProps) {
  const { isLarge, isMedium, isSmall } = useFieldsetContext();

  const isRequired = type === "required";
  const isOptional = type === "optional";

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex w-fit items-center justify-between gap-1 text-neutral-900",
        {
          "text-b2-600": isLarge,
          "text-b3-600": isMedium,
          "text-b4-600": isSmall,
          "cursor-pointer": !!onClick,
        },
      )}
      onClick={onClick}
    >
      {children}
      {isRequired && <span className="text-error-500">*</span>}
      {isOptional && <span className="text-secondary-300">(optional)</span>}
    </label>
  );
}
