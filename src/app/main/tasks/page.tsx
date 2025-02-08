"use client"

import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import TaskDisplay from './components/TaskDisplay';
import TaskModal from './components/TaskModal';
import toast from 'react-hot-toast';
import { getTasks } from '@/app/utils/utils';


interface Task {
    taskId: string;
    taskTitle: string;
    taskDescription: string;
    taskCreatedAt: Date;
    taskDueDate: Date;
    taskStatus: string;
    taskManager: string;
}

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    // Fetch tasks from the API when the component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setIsLoading(true);
                const data = await getTasks();
                setTasks(data.Tasks as Task[]); // Assuming the API returns { Tasks: Array<Task> }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
                toast.error('Failed to fetch tasks');
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchTasks();
    }, []);
    

    // Filter tasks based on search input
    const filteredTasks = tasks.filter((task) =>
        task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='px-8 py-4'>
            <div className="flex justify-between items-center mb-4">
                <div className="relative flex-grow mr-4">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-1/2 pl-10 pr-4 py-2 border border-main-blue rounded-xl focus:border-main-blue"
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <button
                    onClick={() => {
                        console.log(selectedTask)
                        setSelectedTask(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-purple-600 text-white p-2 rounded-xl flex justify-center items-center w-24"
                >
                    <FaPlus className="mr-2" />
                    <span>Add</span>
                </button>
            </div>
            {isLoading ? (
                <div className="text-center py-4">Loading tasks...</div>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <div className='flex flex-col gap-6'>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => <TaskDisplay key={task.taskId} props={task} />)
                    ) : (
                        <p className="text-gray-500 text-center">No tasks found.</p>
                    )}
                </div>
            )}
            <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Tasks;
