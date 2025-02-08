import React from 'react'
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import Image from "next/image";
export default function Navbar() {
    return (
        <div className="flex h-20 flex-row justify-between  items-center p-4 bg-white">
            <div>
                <div className="gap-2 mr-auto flex justify-center items-center text-[30px] font-bold">
           
                   <Image src={'/logo.png'} height={100} width={180} alt={"logo"} />
                 </div>
           
            </div>
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 hover:bg-opacity-50 rounded-full bg-gray-200 bg-opacity-50">
                    <CiSettings className="size-6 text-main-blue" />
                </button>
                <button className="p-2 hover:bg-gray-100 hover:bg-opacity-50 rounded-full bg-gray-200 bg-opacity-50">
                    <IoIosNotificationsOutline className="size-6" />
                </button>
            </div>
        </div>
    )
};