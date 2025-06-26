export const getDisplayValue = (value: string, prefix: string) => {
  if (!value) return "";
  if (value.startsWith(prefix)) {
    return value.substring(prefix.length);
  }
  return value;
};

export const getFullValue = (inputValue: string, prefix: string) => {
  if (!inputValue) return "";

  const cleanValue = inputValue.startsWith(prefix)
    ? inputValue.substring(prefix.length)
    : inputValue;
  return prefix + cleanValue;
};
