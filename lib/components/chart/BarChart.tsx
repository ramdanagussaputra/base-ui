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
  LabelList,
  Cell,
} from "recharts";
import { cn } from "#/utils";

export interface BarChartProps {
  data: any[];
  bars: {
    dataKey: string;
    fill?: string;
    name?: string;
    stackId?: string;
    // Custom colors for each bar (array of colors)
    colors?: string[];
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
  // Prop to create a background fill effect
  backgroundBar?: {
    fill?: string;
    maxValue?: number;
    colors?: string[];
  };
  showDataLabels?: boolean;
  xAxisTick?: React.SVGAttributes<SVGTextElement>;
  yAxisTick?: React.SVGAttributes<SVGTextElement>;
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
  backgroundBar,
  showDataLabels = false,
  xAxisTick,
  yAxisTick,
}) => {
  const CustomLabel = (props: any) => {
    const { x, y, width, height, value } = props;

    // Don't render label if bar is too small or value is invalid
    if (height < 15 || !value) {
      return null;
    }

    return (
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
        fontWeight="bold"
      >
        {value}
      </text>
    );
  };

  const transformedData = React.useMemo(() => {
    if (!backgroundBar || !bars.length) return data;

    const mainBarKey = bars[0].dataKey;
    const emptyBarKey = `__empty_${mainBarKey}`;
    const maxValue = backgroundBar.maxValue || 100;

    return data.map((item) => {
      const mainValue = item[mainBarKey] || 0;
      const emptyValue = Math.max(0, maxValue - mainValue);
      return {
        ...item,
        [emptyBarKey]: emptyValue,
      };
    });
  }, [data, bars, backgroundBar]);

  const renderBars = () => {
    // This mode is for the background/progress bar effect
    if (backgroundBar && bars.length > 0) {
      const mainBar = bars[0];
      const emptyBarKey = `__empty_${mainBar.dataKey}`;

      return (
        <>
          {/* Main value bar (e.g., red) */}
          <Bar
            dataKey={mainBar.dataKey}
            stackId="a"
            fill={mainBar.fill}
            name={mainBar.name}
          >
            {showDataLabels && (
              <LabelList dataKey={mainBar.dataKey} content={CustomLabel} />
            )}
            {mainBar.colors &&
              transformedData.map((_, cellIndex) => (
                <Cell
                  key={`cell-${mainBar.dataKey}-${cellIndex}`}
                  fill={mainBar.colors![cellIndex % mainBar.colors!.length]}
                />
              ))}
          </Bar>

          {/* Empty part of the bar (e.g., light pink) */}
          <Bar
            dataKey={emptyBarKey}
            stackId="a"
            fill={backgroundBar.fill || "#f1f5f9"}
          >
            {backgroundBar.colors &&
              transformedData.map((_, cellIndex) => (
                <Cell
                  key={`cell-empty-${cellIndex}`}
                  fill={
                    backgroundBar.colors![
                      cellIndex % backgroundBar.colors!.length
                    ]
                  }
                />
              ))}
          </Bar>
        </>
      );
    }

    // Default behavior for multiple bars or no background
    return bars.map((bar, index) => (
      <Bar
        key={bar.dataKey}
        dataKey={bar.dataKey}
        stackId={bar.stackId}
        fill={bar.fill || `hsl(${(index * 137.5) % 360}, 70%, 50%)`}
        name={bar.name || bar.dataKey}
      >
        {bar.colors &&
          data.map((_, cellIndex) => (
            <Cell
              key={`cell-${index}-${cellIndex}`}
              fill={bar.colors![cellIndex % bar.colors!.length]}
            />
          ))}
        {showDataLabels && <LabelList dataKey={bar.dataKey} position="top" />}
      </Bar>
    ));
  };

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width={width || "100%"} height={height}>
        <RechartsBarChart
          data={transformedData}
          margin={margin}
          barCategoryGap="10%"
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          {showXAxis && <XAxis dataKey={xAxisDataKey} tick={xAxisTick} />}
          {showYAxis && (
            <YAxis
              domain={
                backgroundBar ? [0, backgroundBar.maxValue || 100] : undefined
              }
              tick={yAxisTick}
            />
          )}
          {showTooltip && <Tooltip />}
          {showLegend && (
            <Legend
              payload={
                backgroundBar && bars.length > 0
                  ? [
                      {
                        value: bars[0].name,
                        type: "square",
                        id: bars[0].dataKey,
                        color: bars[0].fill,
                      },
                    ]
                  : undefined
              }
            />
          )}
          {renderBars()}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
