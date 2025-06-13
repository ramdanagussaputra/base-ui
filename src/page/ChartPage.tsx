import React from "react";
import { LineChart, BarChart, PieChart, AreaChart } from "#/components/chart";

// Sample data for demonstrations
const lineData = [
  { name: "Jan", users: 4000, revenue: 2400 },
  { name: "Feb", users: 3000, revenue: 1398 },
  { name: "Mar", users: 2000, revenue: 9800 },
  { name: "Apr", users: 2780, revenue: 3908 },
  { name: "May", users: 1890, revenue: 4800 },
  { name: "Jun", users: 2390, revenue: 3800 },
];

const barData = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
];

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

export default function ChartPage() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Chart Examples</h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Line Chart Example */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Line Chart</h3>
            <LineChart
              data={lineData}
              lines={[
                { dataKey: "users", stroke: "#8884d8", name: "Users" },
                { dataKey: "revenue", stroke: "#82ca9d", name: "Revenue" },
              ]}
              height={300}
            />
          </div>

          {/* Bar Chart Example */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Bar Chart</h3>
            <BarChart
              data={barData}
              bars={[
                { dataKey: "pv", fill: "#8884d8", name: "Page Views" },
                { dataKey: "uv", fill: "#82ca9d", name: "Unique Visitors" },
              ]}
              height={300}
            />
          </div>

          {/* Pie Chart Example */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Pie Chart</h3>
            <PieChart data={pieData} dataKey="value" height={300} />
          </div>

          {/* Area Chart Example */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Area Chart</h3>
            <AreaChart
              data={lineData}
              areas={[
                { dataKey: "users", stroke: "#8884d8", name: "Users" },
                { dataKey: "revenue", stroke: "#82ca9d", name: "Revenue" },
              ]}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
