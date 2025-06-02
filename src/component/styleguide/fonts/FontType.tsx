import { cn } from "#/utils";

interface FontTypeProps {
  className: string;
  typographyType: string;
}

function FontType({ className, typographyType }: Readonly<FontTypeProps>) {
  return (
    <div className="flex items-end justify-between border-b border-b-neutral-100 pb-5">
      <span className={cn("text-neutral-800", className)}>AaBbCc123#!&;</span>
      <span className="text-subtext-500 text-neutral-500">
        {typographyType}
      </span>
    </div>
  );
}

export default FontType;
