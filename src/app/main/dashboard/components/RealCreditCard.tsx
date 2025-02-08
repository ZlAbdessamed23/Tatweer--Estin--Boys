import React from 'react'
import SimCard from "/public/SimOne.svg";
import MasterCard from "/public/MasterOne.svg";
import Image from 'next/image';

interface RealCreditCardProps {
    revenue: number;
    cardHolder: string;
    expiration: Date | string;
    cardNumber: string;
};

function customizeCardNumber(text: string, maskChar: string = '*'): string {
    if (text.length <= 4) return text;
    const start = text.slice(0, 4);
    const end = text.slice(-4);
    const maskedSection = maskChar.repeat(text.length - 8);
    return `${start}${maskedSection}${end}`;
}

function formatRevenue(revenue: number): string {
    return revenue.toLocaleString('en-US');
}

function formatDate(date: Date | string): string {
    const d = new Date(date);
    return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`;
}

const RealCreditCard = ({ props }: { props: RealCreditCardProps }) => {
    return (
        <div className='w-96 rounded-xl overflow-hidden border border-[#DFEAF2] shadow-md'>
            <div
                className='p-6 bg-gradient-to-br from-[#997FF0] to-[#9034E0]'
            >
                <div className='flex items-center justify-between py-2'>
                    <span>
                        <p className='text-purple-100 text-xs font-light w-28'>Total Revenue</p>
                        <p className='text-lg text-white font-semibold'>{formatRevenue(props.revenue) + " DA"}</p>
                    </span>
                    <span>
                        <Image src={SimCard} alt='' />
                    </span>
                </div>
                <div className='grid grid-cols-2 py-2'>
                    <span>
                        <p className='text-purple-100 text-xs font-light w-28'>Card Holder</p>
                        <p className='text-lg text-white font-semibold'>{props.cardHolder}</p>
                    </span>
                    <span>
                        <p className='text-purple-100 text-xs font-light w-28'>Valid To</p>
                        <p className='text-lg text-white font-semibold'>{formatDate(props.expiration)}</p>
                    </span>
                </div>
            </div>
            <div className='p-5 bg-gradient-to-br from-purple-400 to-purple-700'>
                <div className='w-11/12 mx-auto flex items-center justify-between'>
                    <span className='text-2xl font-semibold text-white'>{customizeCardNumber(props.cardNumber)}</span>
                    <span>
                        <Image src={MasterCard} alt='' />
                    </span>
                </div>
            </div>
        </div>
    )
};

export default RealCreditCard