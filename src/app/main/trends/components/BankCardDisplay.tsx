"use"

import { BankCard } from '@/app/types/types';
import Link from 'next/link';
import React from 'react';
import { FaCcMastercard } from "react-icons/fa";

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const BankCardDisplay = ({ props }: { props: BankCard }) => {
  return (
    <div className='flex items-center justify-between w-11/12 mx-auto px-4 py-4 rounded-xl bg-white'>
      <div className='flex items-center gap-4'>
        <span>
          <FaCcMastercard className='size-12 p-2 bg-purple-300 text-purple-500 rounded-xl' />
        </span>
        <span>
          <p className='text-lg text-black font-semibold'>Card Type</p>
          <p className='text-main-blue text-base font-light'>
            {truncateText(props.cardType, 30)}
          </p>
        </span>
      </div>
      <div>
        <span>
          <p className='text-lg text-black font-semibold'>Card Holder</p>
          <p className='text-main-blue text-base font-light'>
            {truncateText(props.cardHolderName, 50)}
          </p>
        </span>
      </div>
      <div>
        <span>
          <p className='text-lg text-black font-semibold'>Card Number</p>
          <p className='text-main-blue text-base font-light'>
            {truncateText(props.cardNumber, 50)}
          </p>
        </span>
      </div>
      <div>
        <span>
          <p className='text-lg text-black font-semibold'>Expiration Date</p>
          <p className='text-main-blue text-base font-light'>
            {props.cardExpirationDate}
          </p>
        </span>
      </div>
      <div>
        <Link href={""} className='w-32 h-12 p-2 text-purple-500 flex items-center justify-center rounded-full'>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BankCardDisplay;
