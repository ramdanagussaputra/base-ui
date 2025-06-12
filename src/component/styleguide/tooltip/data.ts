import { ProgressTooltipContent } from "#/components/tooltip/model";

type TooltipConfig = {
  position: "top" | "bottom" | "left" | "right";
  message: string;
};

type ProgressTooltipConfig = {
  position: "left" | "right";
  content: ProgressTooltipContent[];
};

export const tooltipConfigs: TooltipConfig[] = [
  {
    position: "top",
    message: "Tooltip message",
  },
  {
    position: "bottom",
    message: "Tooltip message",
  },
  {
    position: "left",
    message: "Tooltip message",
  },
  {
    position: "right",
    message: "Tooltip message",
  },
];

export const progressTooltipData: ProgressTooltipContent[] = [
  {
    title: "New",
    description: "Project created",
    status: "completed",
    date: new Date(),
  },
  {
    title: "Contracted",
    description: "Waiting for contract creation",
    status: "in-progress",
    date: null,
  },
  {
    title: "Invoiced",
    description: "Waiting for invoice creation",
    status: "pending",
    date: null,
  },
];

export const progressTooltipConfigs: ProgressTooltipConfig[] = [
  {
    position: "left",
    content: progressTooltipData,
  },
  {
    position: "right",
    content: progressTooltipData,
  },
];
