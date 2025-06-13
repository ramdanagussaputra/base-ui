import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "#/utils";

export interface BarChartProps {
  data: any[];
  bars: {
    dataKey: string;
    fill?: string;
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

export const BarChart: React.FC<BarChartProps> = ({
  data,
  bars,
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
        <RechartsBarChart data={data} margin={margin}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          {showXAxis && <XAxis dataKey={xAxisDataKey} />}
          {showYAxis && <YAxis />}
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
          {bars.map((bar, index) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              fill={bar.fill || `hsl(${(index * 137.5) % 360}, 70%, 50%)`}
              name={bar.name || bar.dataKey}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
