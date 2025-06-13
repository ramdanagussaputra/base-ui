export type ProgressTooltipContent = {
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
  date: Date | null;
};
