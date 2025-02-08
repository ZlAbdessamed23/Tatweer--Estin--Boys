'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";

const Hero = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Image src={"/light.png"} height={10000} width={10000} alt={'light'} className='absolute top-[-300px] opacity-5' />
      <div className='max-w-[1400px] gap-2 text-white flex flex-col justify-center items-center px-4 h-auto mx-auto'>

        <h1 className='text-[30px] md:text-[32px] lg:text-[58px] flex justify-center items-center flex-col text-center font-bold'>
          Think smarter. Adapt faster. Optimize your logistics for
          <div className='mx-auto w-full flex justify-center'>
            <AnimatePresence>
              {visibleIndex === 0 && (
                <motion.div
                  key="efficiency"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1 }}
                  className='absolute text-[#A77DFF] text-[32px] md:text-[92px]'
                >
                  efficiency.
                </motion.div>
              )}

              {visibleIndex === 1 && (
                <motion.div
                  key="growth"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1 }}
                  className='absolute text-[#A77DFF] text-[32px] md:text-[92px]'
                >
                  growth
                </motion.div>
              )}

              {visibleIndex === 2 && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1 }}
                  className='absolute text-[#A77DFF] text-[32px] md:text-[92px]'
                >
                  success
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </h1>

        {/* Call to Action Buttons */}
        <div className='flex flex-col m-2 md:flex-row gap-12 mt-24 w-full md:mt-[200px] text-[48px]'>
          <button className='bg-[#A77DFF] rounded-[10px] py-2 md:w-1/2 w-full text-[24px] font-bold text-white'>
            Sign up
          </button>
          <button className='rounded-[10px] py-2 md:w-1/2 w-full border-[2px] text-[24px] font-bold border-white border-solid text-white'>
            Contact us
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
