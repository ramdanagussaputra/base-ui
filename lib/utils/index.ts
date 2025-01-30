import clsx, { ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-bigtext",
        "text-h1",
        "text-h1-700",
        "text-h1-600",
        "text-h2",
        "text-h2-700",
        "text-h2-600",
        "text-h3",
        "text-h3-700",
        "text-h3-600",
        "text-h4",
        "text-h4-700",
        "text-h4-600",
        "text-h5",
        "text-h5-700",
        "text-h5-600",
        "text-h6",
        "text-h6-700",
        "text-h6-600",
        "text-subtext",
        "text-subtext-700",
        "text-subtext-600",
        "text-subtext-500",
        "text-b1",
        "text-b1-600",
        "text-b1-500",
        "text-b1-400",
        "text-b2",
        "text-b2-600",
        "text-b2-500",
        "text-b2-400",
        "text-b3",
        "text-b3-600",
        "text-b3-500",
        "text-b3-400",
        "text-b4",
        "text-b4-600",
        "text-b4-500",
        "text-b4-400",
        "text-small-text",
        "text-small-text-600",
        "text-small-text-500",
        "text-small-text-400",
      ], // Add your custom text sizes
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

export function extractNumbersFromString(input: string) {
  // Replace commas with dots
  const sanitizedInput = input.replace(/,/g, ".");
  // Match numbers, including cases like "123.", "123.123"
  const matches = sanitizedInput.match(/\d+(\.\d*)?/g);

  // Return matches as an array of strings
  return matches ? matches?.join("") : "";
}
