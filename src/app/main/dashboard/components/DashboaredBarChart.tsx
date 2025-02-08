"use client"

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface BarChartData {
    name: string;
    realContent: number;
    aiGenerated: number;
}

const DashboaredBarChart = ({ data }: { data: BarChartData[] }) => {
    return (
        <ResponsiveContainer width="100%" height={300} className={"bg-white rounded-xl p-4"}>
            <BarChart data={data}>
                <CartesianGrid horizontal={true} vertical={false} stroke="#718EBF" strokeOpacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#718EBF' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#718EBF' }} />
                <Tooltip />
                <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    formatter={(value) => <span style={{ color: value === 'realContent' ? '#9034E0' : '#16DBCC' }}>{value === 'realContent' ? 'Real Content' : 'AI Generated'}</span>}
                />
                <Bar dataKey="realContent" fill="#9034E0" radius={[100, 100, 0, 0]} barSize={15} />
                <Bar dataKey="aiGenerated" fill="#16DBCC" radius={[100, 100, 0, 0]} barSize={15} />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default DashboaredBarChart