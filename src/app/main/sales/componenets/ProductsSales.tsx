import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import Link from 'next/link'
import { IconType } from 'react-icons';
import { PiCardsFill } from "react-icons/pi";
import { RxSpeakerLoud } from "react-icons/rx";
import { TfiMoney } from "react-icons/tfi";

interface StartegyProps {
    startegyName: string;
    startegyId: string;
    createdAt: Date | string;
};

const StartegyElement = ({ strategy, Icon, color }: { strategy: StartegyProps, Icon: IconType, color: string }) => {
    const formattedDate = new Date(strategy.createdAt).toLocaleDateString()

    return (
        <div className='flex items-center justify-between'>
            <div className='w-10/12 flex items-center gap-4'>
                <span>
                    <Icon className={`size-11 p-2 rounded-full`} style={{ color: color, backgroundColor: `${color}20` }} />
                </span>
                <div className='flex flex-col'>
                    <p className='font-semibold'>{strategy.startegyName}</p>
                    <p className='text-sm text-gray-500'>{formattedDate}</p>
                </div>
            </div>
            <Link href={`/ProductsSales/${strategy.startegyId}`} className='group'>
                <FaChevronRight className='text-gray-500 transition-transform group-hover:translate-x-1' />
            </Link>
        </div>
    )
};

const ProductsSales = ({ props }: { props: Array<StartegyProps> }) => {
    return (
        <div className='space-y-4 bg-white rounded-xl p-6'>
            {props.map((strategy, index) => (
                <StartegyElement
                    Icon={index === 0 ? PiCardsFill : index === 1 ? RxSpeakerLoud : TfiMoney}
                    color={index === 0 ? "#FFCB05" : index === 1 ? "#8E8CF7" : "#16DBCC"}
                    key={strategy.startegyId}
                    strategy={strategy}
                />
            ))}
        </div>
    )
};

export default ProductsSales