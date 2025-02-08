"use client"
import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface CircularProgressData {
  name: string;
  value: number;
}

const DashboardPieChart = ({ 
  data,
  colors = ['#9034E0', '#16DBCC', '#FF7049']
}: { 
  data: CircularProgressData[];
  colors?: string[];
}) => {
  return (
    <div className="bg-white rounded-xl p-4 flex items-center max-w-80">
      <div className="relative flex justify-center items-center mr-6" style={{ width: 200, height: 200 }}>
        {data.map((item, index) => (
          <div 
            key={item.name} 
            className="absolute"
            style={{ 
              width: `${120 - index * 30}px`, 
              height: `${120 - index * 30}px` 
            }}
          >
            <CircularProgressbar 
              value={item.value} 
              styles={buildStyles({
                pathColor: colors[index],
                trailColor: '#E6E6E6',
              })}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center mb-2">
            <div 
              className="w-4 h-4 mr-2 rounded-full" 
              style={{ backgroundColor: colors[index] }}
            />
            <span className="text-[#718EBF]">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardPieChart