import React from "react";

interface ButtonFileInputProps {
  onChange?: (files: FileList | null) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function ButtonFileInput({
  onChange,
  accept,
  multiple,
  className,
  children,
}: ButtonFileInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClick = () => inputRef.current?.click();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.files);
  };
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: "none" }}
        onChange={handleChange}
        className={className}
      />
      <span onClick={handleClick} style={{ cursor: "pointer" }}>
        {children}
      </span>
    </>
  );
}
