import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <div className='w-full bg-[#301A79] text-white pb-2 pt-8'>
      <div className='flex w-full items-center  py-8 lg:flex-row md:justify-around lg:items-start mx-auto flex-col gap-4 '>
        {/* 1 */}
        <div className='flex items-center flex-col gap-4'>
          <Image src={"/logo.png"} className="relative bottom-6" height={160} width={160} alt="Optimind logo" />
          <h1 className='text-center  text-darkgray text-2xl'>
            Optimind - Revolutionizing Freight Optimization
          </h1>
        </div>
        
        {/* 2 */}
        <div className='flex flex-col items-center justify-center gap-5'>
          <Link href={""} className='text-white text-center mb-2 font-[400] text-2xl'>
            About Optimind
          </Link>
          <Link href={""} className='text-white font-[400] text-2xl text-center'>
            Freight Optimization Solutions
          </Link>
          <Link href={""} className='text-white font-[400] text-2xl'>
            Our Technologies
          </Link>
        </div>

        {/* 3 */}
        <div>
          <h1 className='text-center text-darkgray text-lg md:text-2xl'>Contact us at:</h1>
          <p className='text-center text-white text-lg md:text-xl'>contact@optimind.com</p>
        </div>

        {/* 4 */}
        <div>
          <p className='text-center text-darkgray text-2xl mb-4'>Follow us</p>
          <div className='flex flex-row items-center justify-between'>
            <Link href={"https://www.linkedin.com/company/optimind"}>
              <Image src={"/LinkedIn.svg"} height={60} width={60} alt="LinkedIn" />
            </Link>
            <Link href={"https://www.facebook.com/optimind"}>
              <Image src={"/Facebook.svg"} height={60} width={60} alt="Facebook" />
            </Link>
            <Link href={"https://www.instagram.com/optimind"}>
              <Image src={"/Insta.svg"} height={50} width={50} alt="Instagram" />
            </Link>
          </div>
        </div>
      </div>
        <div className='w-[80%] h-[1px] mt-8  mx-auto bg-white '></div>
      <p className='text-center mx-auto my-1 text-darkgray text-[18px] flex-grow-0'>
        2024 Optimind. All rights reserved.
      </p>
    </div>
  )
}

export default Footer
