"use client"

import Image from 'next/image';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import ProfileImage from "/public/Profile.svg";
import toast from 'react-hot-toast';

interface IFormInputs {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    companyAddress: string;
}

const Profile: React.FC = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<IFormInputs>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            companyName: '',
            companyAddress: ''
        }
    });
    
    const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs): void => {
        try {
            console.log(data);
            toast.success('Profile updated successfully!');
            // Handle form submission here
        } catch (error) {
            console.error(error); // Log the error
            toast.error('Something went wrong!');
        }
    };
    

    React.useEffect(() => {
        // Show toast for any validation errors
        Object.keys(errors).forEach((key) => {
            const errorKey = key as keyof IFormInputs;
            if (errors[errorKey]) {
                toast.error(errors[errorKey]?.message || 'Validation error');
            }
        });
    }, [errors]);

    return (
        <div className='grid grid-cols-[20%,80%] gap-8'>
            <div className='pt-8'>
                <Image src={ProfileImage} alt='profile-image' />
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex gap-8 flex-wrap'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            id="firstName"
                            type="text" 
                            {...register("firstName", { required: "First name is required" })}
                            className='border border-main-blue rounded-xl p-4 h-11 w-[27rem] placeholder:text-main-blue placeholder:text-opacity-70' 
                            placeholder='Enter Your First Name'
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            id="lastName"
                            type="text" 
                            {...register("lastName", { required: "Last name is required" })}
                            className='border border-main-blue rounded-xl p-4 h-11 w-[27rem] placeholder:text-main-blue placeholder:text-opacity-70' 
                            placeholder='Enter Your Last Name'
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email">Email</label>
                        <input 
                            id="email"
                            type="email" 
                            {...register("email", { 
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            className='border border-main-blue rounded-xl p-4 h-11 w-[27rem] placeholder:text-main-blue placeholder:text-opacity-70'
                            placeholder='Enter Your Email' 
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="companyName">Company Name</label>
                        <input 
                            id="companyName"
                            type="text" 
                            {...register("companyName", { required: "Company name is required" })}
                            className='border border-main-blue rounded-xl p-4 h-11 w-[27rem] placeholder:text-main-blue placeholder:text-opacity-70' 
                            placeholder='Enter Your Company Name'
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="companyAddress">Company Address</label>
                        <input 
                            id="companyAddress"
                            type="text" 
                            {...register("companyAddress", { required: "Company address is required" })}
                            className='border border-main-blue rounded-xl p-4 h-11 w-[27rem] placeholder:text-main-blue placeholder:text-opacity-70'
                            placeholder='Enter Your CompanyAddress' 
                        />
                    </div>

                    <div className='w-11/12 mx-auto flex justify-end items-center'>
                        <button 
                            type="submit"
                            className='w-36 h-11 rounded-xl bg-purple-600 border-main-blue border text-white flex items-center justify-center'
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;