import React from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "#/utils";

export interface AreaChartProps {
  data: any[];
  areas: {
    dataKey: string;
    stroke?: string;
    fill?: string;
    strokeWidth?: number;
    name?: string;
    stackId?: string;
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

export const AreaChart: React.FC<AreaChartProps> = ({
  data,
  areas,
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
        <RechartsAreaChart data={data} margin={margin}>
          <defs>
            {areas.map((area, index) => (
              <linearGradient
                key={`gradient-${area.dataKey}`}
                id={`colorGradient${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={
                    area.fill || `hsl(${(index * 137.5) % 360}, 70%, 50%)`
                  }
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={
                    area.fill || `hsl(${(index * 137.5) % 360}, 70%, 50%)`
                  }
                  stopOpacity={0}
                />
              </linearGradient>
            ))}
          </defs>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          {showXAxis && <XAxis dataKey={xAxisDataKey} />}
          {showYAxis && <YAxis />}
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
          {areas.map((area, index) => (
            <Area
              key={area.dataKey}
              type="monotone"
              dataKey={area.dataKey}
              stackId={area.stackId}
              stroke={area.stroke || `hsl(${(index * 137.5) % 360}, 70%, 50%)`}
              fill={area.fill || `url(#colorGradient${index})`}
              strokeWidth={area.strokeWidth || 2}
              name={area.name || area.dataKey}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};
