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
  { name: "Jan", stream: 86 },
  { name: "Feb", stream: 68 },
  { name: "March", stream: 61 },
  { name: "Apr", stream: 18 },
  { name: "May", stream: 68 },
  { name: "Jun", stream: 21 },
  // { name: "Jul", stream: 46 },
  // { name: "Aug", stream: 46 },
  // { name: "Sep", stream: 64 },
  // { name: "Oct", stream: 79 },
  // { name: "Nov", stream: 43 },
  // { name: "Dec", stream: 85 },
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
            <h3 className="text-lg font-semibold">Bar Chart with Background</h3>
            <BarChart
              data={barData}
              bars={[
                {
                  dataKey: "stream",
                  fill: "#EB2127",
                  name: "Streams",
                },
              ]}
              backgroundBar={{
                fill: "#f1d4d780",
                maxValue: 100,
              }}
              height={300}
              showTooltip
              showDataLabels
              showLegend
              showGrid
              showYAxis
              xAxisOptions={{
                tick: { fontSize: 12, fill: "#6b7280" },
              }}
              yAxisOptions={{ tick: { fontSize: 12, fill: "#6b7280" } }}
              legendOptions={{
                formatter: () => <span className="text-neutral-900">2024</span>,
              }}
            />
          </div>

          {/* Enhanced Bar Chart with Cell Customization */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              Enhanced Bar Chart with Custom Colors
            </h3>
            <BarChart
              data={barData}
              bars={[
                {
                  dataKey: "stream",
                  name: "2024 Streams",
                  colors: [
                    "#EB2127", // Jan - Red
                    "#FF6B35", // Feb - Orange Red
                    "#FF8E3C", // March - Orange
                    "#D45087", // Apr - Pink
                    "#FF6B35", // May - Orange Red
                    "#8B5CF6", // Jun - Purple
                    "#06D6A0", // Jul - Mint
                    "#06D6A0", // Aug - Mint
                    "#FFD23F", // Sep - Yellow
                    "#EB2127", // Oct - Red
                    "#8B5CF6", // Nov - Purple
                    "#EB2127", // Dec - Red
                  ],
                },
              ]}
              backgroundBar={{
                fill: "#f8fafc",
                maxValue: 100,
                colors: [
                  "#fee2e2",
                  "#fef3c7",
                  "#fde68a",
                  "#f3e8ff",
                  "#fef3c7",
                  "#ede9fe",
                  "#d1fae5",
                  "#d1fae5",
                  "#fef3c7",
                  "#fee2e2",
                  "#ede9fe",
                  "#fee2e2",
                ],
              }}
              height={300}
              showTooltip={true}
              showDataLabels={true}
              showLegend={false}
              showGrid={false}
              showYAxis={false}
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
