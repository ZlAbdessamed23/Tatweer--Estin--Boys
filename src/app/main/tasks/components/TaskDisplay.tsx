import Link from 'next/link';
import React from 'react';
import { GiReceiveMoney } from "react-icons/gi";

interface Task {
    taskId: string;
    taskTitle: string;
    taskDescription: string;
    taskCreatedAt: Date;
    taskDueDate: Date;
    taskStatus: string;
}

const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const TaskDisplay = ({ props }: { props: Task }) => {
    return (
        <div className='flex items-center justify-between w-11/12 mx-auto px-4 py-4 rounded-xl bg-white'>
            <div className='flex items-center gap-4'>
                <span>
                    <GiReceiveMoney className='size-12 p-2 bg-purple-300 text-purple-500 rounded-xl' />
                </span>
                <span>
                    <p className='text-lg text-black font-semibold'>Task Title</p>
                    <p className='text-main-blue text-base font-light'>
                        {truncateText(props.taskTitle, 30)}
                    </p>
                </span>
            </div>
            <div>
                <span>
                    <p className='text-lg text-black font-semibold'>Task Description</p>
                    <p className='text-main-blue text-base font-light'>
                        {truncateText(props.taskDescription, 50)}
                    </p>
                </span>
            </div>
            <div>
                <span>
                    <p className='text-lg text-black font-semibold'>Task Due Date</p>
                    <p className='text-main-blue text-base font-light'>
                        {props.taskDueDate ? props.taskDueDate.toLocaleDateString() : new Date().toLocaleDateString()} {/* Removes the time */}
                    </p>
                </span>
            </div>
            <div>
                <Link href={""} className='w-32 h-12 p-2 text-[#16DBCC] border border-[#16DBCC] flex items-center justify-center rounded-full'>
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default TaskDisplay;
