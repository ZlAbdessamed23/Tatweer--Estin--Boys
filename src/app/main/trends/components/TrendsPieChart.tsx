import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface Data {
  name: string;
  value: number;
}

interface TrendsPieChartProps {
  data: Data[];
}

const COLORS = ['#3464F3', '#16DBCC', '#FF6195', '#FFB11F', '#8E44AD', '#3498DB', '#2ECC71', '#F39C12'];

const TrendsPieChart: React.FC<TrendsPieChartProps> = ({ data }) => {
  return (
    <PieChart width={400} height={400} className='bg-white rounded-xl shadow-md'>
      <Pie
        data={data}
        cx={200}
        cy={200}
        outerRadius={150}
        innerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default TrendsPieChart;
