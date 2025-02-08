"use client";
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useForm, SubmitHandler } from 'react-hook-form';

interface BankCard {
  cardId: string;
  cardType: string;
  cardHolderName: string;
  cardNumber: string;
  cardExpirationDate: string;
}

const CardForm = () => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<BankCard>({
    defaultValues: {
      cardId: '',
      cardType: '',
      cardHolderName: '',
      cardNumber: '',
      cardExpirationDate: ''
    }
  });

  const onSubmit: SubmitHandler<BankCard> = (data) => {
    console.log(data);
    reset();
  };

  const handleAddCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = {
      cardId: watch('cardId'),
      cardType: watch('cardType'),
      cardHolderName: watch('cardHolderName'),
      cardNumber: watch('cardNumber'),
      cardExpirationDate: watch('cardExpirationDate')
    };
    console.log('Added Card:', formData);
    reset(); // Reset form after adding Card
  };

  return (
    <div className='bg-white rounded-xl shadow-md p-4'>
      <p className='text-slate-400 text-opacity-90'>
        Credit Card generally means a plastic card issued by Scheduled Commercial Banks assigned to a Cardholder, with a credit limit, that can be used to purchase goods and services on credit or obtain cash advances.
      </p>
      <div className='flex flex-col gap-6 w-full'>
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="cardType">Card Type</label>
            <input id="cardType" type="text" {...register("cardType", { required: "Card Type is required", minLength: { value: 2, message: "Card Type must be at least 2 characters" } })} className='border border-main-blue rounded-xl p-4 h-11 w-full placeholder:text-main-blue placeholder:text-opacity-70' placeholder='Enter card type' />
            {errors.cardType && (
              <span className="text-red-500 text-sm">{errors.cardType.message}</span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="cardHolderName">Card Holder Name</label>
            <input id="cardHolderName" type="text" {...register("cardHolderName", { required: "Card Holder Name is required", minLength: { value: 2, message: "Card Holder Name must be at least 2 characters" } })} className='border border-main-blue rounded-xl p-4 h-11 w-full placeholder:text-main-blue placeholder:text-opacity-70' placeholder='Enter card holder name' />
            {errors.cardHolderName && (
              <span className="text-red-500 text-sm">{errors.cardHolderName.message}</span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="cardNumber">Card Number</label>
            <input id="cardNumber" type="text" {...register("cardNumber", { required: "Card Number is required", pattern: { value: /^\d{4} \d{4} \d{4} \d{4}$/, message: "Please enter a valid Card Number" } })} className='border border-main-blue rounded-xl p-4 h-11 w-full placeholder:text-main-blue placeholder:text-opacity-70' placeholder='Enter card number' />
            {errors.cardNumber && (
              <span className="text-red-500 text-sm">{errors.cardNumber.message}</span>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="cardExpirationDate">Expiration Date</label>
            <input id="cardExpirationDate" type="text" {...register("cardExpirationDate", { required: "Expiration Date is required", pattern: { value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, message: "Please enter a valid Expiration Date (MM/YY)" } })} className='border border-main-blue rounded-xl p-4 h-11 w-full placeholder:text-main-blue placeholder:text-opacity-70' placeholder='MM/YY' />
            {errors.cardExpirationDate && (
              <span className="text-red-500 text-sm">{errors.cardExpirationDate.message}</span>
            )}
          </div>
          <button onClick={handleAddCard} className='absolute right-2 bg-purple-600 p-2 rounded-lg hover:bg-purple-700 transition-colors' aria-label="Add Card">
            <FaPlus className="text-white text-sm" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CardForm;
