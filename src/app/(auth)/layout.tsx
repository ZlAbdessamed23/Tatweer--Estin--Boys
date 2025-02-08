import React from 'react';
import Image from 'next/image';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex  md:w-2/5  lg:w-1/2  flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 md:p-8">
        <Image src={""} alt='' />
      </div>
      <div className="w-full h-full md:w-3/5 lg:w-1/2 flex flex-col justify-center items-center ">
        {children}
      </div>
    </div>
  );
}