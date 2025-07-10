import { ProgressTooltipContent } from "#/components/tooltip/model";

type TooltipConfig = {
  position: "top" | "bottom" | "left" | "right";
  message: string;
  variant: "default" | "without-tail";
};

type ProgressTooltipConfig = {
  position: "left" | "right";
  content: ProgressTooltipContent[];
};

export const tooltipConfigs: TooltipConfig[] = [
  {
    position: "top",
    message: "Tooltip message",
    variant: "default",
  },
  {
    position: "bottom",
    message: "Tooltip message",
    variant: "default",
  },
  {
    position: "left",
    message: "Tooltip message",
    variant: "default",
  },
  {
    position: "right",
    message: "Tooltip message",
    variant: "default",
  },
  {
    position: "top",
    message: "Tooltip message without tail",
    variant: "without-tail",
  },
  {
    position: "bottom",
    message: "Tooltip message without tail",
    variant: "without-tail",
  },
  {
    position: "left",
    message: "Tooltip message without tail",
    variant: "without-tail",
  },
  {
    position: "right",
    message: "Tooltip message without tail",
    variant: "without-tail",
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
