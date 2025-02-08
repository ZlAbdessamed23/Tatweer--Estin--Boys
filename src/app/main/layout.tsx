import React from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='h-screen overflow-hidden'>
   <div className='grid grid-cols-[20%,80%] overflow-hidden  w-screen min-h-screen font-sans bg-slate-100 '>
            <Sidebar />
            <div className='overflow-hidden'>
                <Navbar />
                <div className='px-6 py-8 h-screen pb-[100px]  overflow-y-scroll '>
                    {children}
                </div>
            </div>
        </div>
        </div>
     
    )
};