"use client"

import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface AreaChartData {
  name: string;
  realContent: number;
  aiGenerated: number;
}

const DashboardAreaChart = ({ data }: { data: AreaChartData[] }) => {
  const gradientColors = {
    realContent: '#9034E0',
    aiGenerated: '#16DBCC'
  }

  return (
    <ResponsiveContainer width="100%" height={300} className={"bg-white rounded-xl p-4"}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="realContentGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={gradientColors.realContent} stopOpacity={0.8} />
            <stop offset="95%" stopColor={gradientColors.realContent} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="aiGeneratedGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={gradientColors.aiGenerated} stopOpacity={0.8} />
            <stop offset="95%" stopColor={gradientColors.aiGenerated} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid horizontal={true} vertical={false} stroke="#718EBF" strokeOpacity={0.2} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#718EBF' }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#718EBF' }} />
        <Tooltip />
        <Legend
          verticalAlign="top"
          align="right"
          iconType="circle"
          formatter={(value) => <span style={{ color: value === 'realContent' ? gradientColors.realContent : gradientColors.aiGenerated }}>
            {value === 'realContent' ? 'Real Content' : 'AI Generated'}
          </span>}
        />
        <Area
          type="monotone"
          dataKey="realContent"
          stroke={gradientColors.realContent}
          fillOpacity={1}
          fill="url(#realContentGradient)"
        />
        <Area
          type="monotone"
          dataKey="aiGenerated"
          stroke={gradientColors.aiGenerated}
          fillOpacity={1}
          fill="url(#aiGeneratedGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default DashboardAreaChart