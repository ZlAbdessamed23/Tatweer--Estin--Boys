import React from 'react'
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";

export default function Navbar() {
    return (
        <div className="flex h-20 flex-row justify-between  items-center p-4 bg-white">
            <div>
                <h1 className='text-center text-2xl font-medium mt-4 mb-6 text-main-blue '>Orca Bitches</h1>
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