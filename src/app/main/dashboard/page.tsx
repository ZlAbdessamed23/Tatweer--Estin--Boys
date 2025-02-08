import React from 'react'
import RealCreditCard from './components/RealCreditCard';
import PredictedCreditCard from './components/PredictedCreditCard';
import Strategies from '../components/Startegies';
import DashboardAreaChart from './components/DashboardAreaChart';
import DashboaredBarChart from './components/DashboaredBarChart';
import DashboardPieChart from './components/DashboaredPieChart';


const Dashboard = () => {

  const data = {
    revenue: 1616271,
    cardHolder: "Micro Club",
    expiration: new Date(),
    cardNumber: "17261261621",
  };


  const fakeData = [
    {
      startegyName: "Tactical Strategy",
      startegyId: "STRATEGY008",
      createdAt: new Date("2023-08-20T17:20:00Z")
    },
    {
      startegyName: "Sector Rotation Strategy",
      startegyId: "STRATEGY009",
      createdAt: new Date("2023-09-10T12:00:00Z")
    },
    {
      startegyName: "Thematic Strategy",
      startegyId: "STRATEGY010",
      createdAt: new Date("2023-10-05T15:30:00Z")
    }
  ];

  const chart1 = [
    { name: 'Jan', realContent: 4000, aiGenerated: 2400 },
    { name: 'Feb', realContent: 3000, aiGenerated: 1398 },
    { name: 'Mar', realContent: 2000, aiGenerated: 9800 },
    { name: 'Apr', realContent: 2780, aiGenerated: 3908 },
    { name: 'May', realContent: 1890, aiGenerated: 4800 },
    { name: 'Jun', realContent: 2390, aiGenerated: 3800 },
  ];


  const chart2 = [
    { name: 'Marketing', value: 40 },
    { name: 'Sales', value: 30 },
    { name: 'Operation', value: 20 },
  ];


  return (
    <div>
      <div className='grid grid-cols-[64%,36%] gap-4 mb-8'>
        <div>
          <div className='flex items-center gap-4 mb-6'>
            <RealCreditCard props={data} />
            <PredictedCreditCard props={data} />
          </div>
          <div>
            <DashboaredBarChart data={chart1} />
          </div>
        </div>
        <div className='px-4'>
          <div className='mb-8'>
            <Strategies props={fakeData} />
          </div>
          <div>
            <DashboardPieChart data={chart2} />
          </div>
        </div>
      </div>
      <div className='flex items-center gap-6'>
        <DashboardAreaChart data={chart1} />
      </div>
    </div>
  )
}

export default Dashboard;