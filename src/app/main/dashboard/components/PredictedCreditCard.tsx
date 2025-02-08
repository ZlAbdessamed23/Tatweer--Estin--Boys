import React from 'react'
import SimCard from "/public/SimTwo.svg";
import MasterCard from "/public/MasterTwo.svg";
import Image from 'next/image';

interface PredictedCreditCardProps {
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

const PredictedCreditCard = ({ props }: { props: PredictedCreditCardProps }) => {
    return (
        <div className='w-96 rounded-xl overflow-hidden border border-[#DFEAF2] shadow-md'>
            <div
                className='p-6 bg-slate-50'
            >
                <div className='flex items-center justify-between py-2'>
                    <span>
                        <p className='text-purple-400 text-xs font-light w-28'>Predicted Revenue</p>
                        <p className='text-lg text-main-blue font-semibold'>{formatRevenue(props.revenue) + " DA"}</p>
                    </span>
                    <span>
                        <Image src={SimCard} alt='' />
                    </span>
                </div>
                <div className='grid grid-cols-2 py-2'>
                    <span>
                        <p className='text-purple-400 text-xs font-light w-28'>Card Holder</p>
                        <p className='text-lg text-main-blue font-semibold'>{props.cardHolder}</p>
                    </span>
                    <span>
                        <p className='text-purple-400 text-xs font-light w-28'>Valid To</p>
                        <p className='text-lg text-main-blue font-semibold'>{formatDate(props.expiration)}</p>
                    </span>
                </div>
            </div>
            <div className='p-5 bg-white'>
                <div className='w-11/12 mx-auto flex items-center justify-between'>
                    <span className='text-2xl font-semibold text-main-blue'>{customizeCardNumber(props.cardNumber)}</span>
                    <span>
                        <Image src={MasterCard} alt='' />
                    </span>
                </div>
            </div>
        </div>
    )
};

export default PredictedCreditCard