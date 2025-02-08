import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DataPoint {
  month: string;
  cost: number;
}

interface LogisticsLineChartProps {
  data: DataPoint[];
  title?: string;
}

const LogisticsLineChart: React.FC<LogisticsLineChartProps> = ({ data, title = "Monthly Logistics Costs" }) => {
  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-md h-96">
      <h2 className="text-xl font-semibold text-start mb-4 text-main-blue">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(value) => `$${value}`} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => [`$${value}`, "Cost"]} />
          <Line type="monotone" dataKey="cost" stroke="#16DBCC" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LogisticsLineChart;
