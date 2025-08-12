import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "#/utils";

export interface LineChartProps {
  data: any[];
  lines: {
    dataKey: string;
    stroke?: string;
    strokeWidth?: number;
    name?: string;
  }[];
  xAxisDataKey?: string;
  width?: number;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  className?: string;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  lines,
  xAxisDataKey = "name",
  width,
  height = 400,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  className,
  margin = { top: 5, right: 30, left: 20, bottom: 5 },
}) => {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width={width || "100%"} height={height}>
        <RechartsLineChart data={data} margin={margin}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          {showXAxis && <XAxis dataKey={xAxisDataKey} />}
          {showYAxis && <YAxis />}
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke || `hsl(${(index * 137.5) % 360}, 70%, 50%)`}
              strokeWidth={line.strokeWidth || 2}
              name={line.name || line.dataKey}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};
