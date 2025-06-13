import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "#/utils";

export interface PieChartProps {
  data: any[];
  dataKey: string;
  nameKey?: string;
  colors?: string[];
  width?: number;
  height?: number;
  showTooltip?: boolean;
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  className?: string;
  labelLine?: boolean;
  label?: boolean | ((entry: any) => string);
}

const DEFAULT_COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF7C7C",
  "#8DD1E1",
  "#D084D0",
];

export const PieChart: React.FC<PieChartProps> = ({
  data,
  dataKey,
  nameKey = "name",
  colors = DEFAULT_COLORS,
  width,
  height = 400,
  showTooltip = true,
  showLegend = true,
  innerRadius = 0,
  outerRadius = 80,
  className,
  labelLine = false,
  label = false,
}) => {
  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width={width || "100%"} height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={labelLine}
            label={label}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};
