"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronDown } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { addTask, updateTask, getManagers } from '@/app/utils/utils';

interface Task {
  taskId?: string;
  taskTitle: string;
  taskDescription: string;
  taskCreatedAt: Date;
  taskDueDate: Date | string;
  taskStatus: string;
  taskManager: string;
}

interface Manager {
  managerId: string;
  managerFirstName: string;
  managerLastName: string;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
  onTaskUpdate?: (updatedTask: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, task, onTaskUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(task?.taskStatus || 'Pending');
  const [selectedManager, setSelectedManager] = useState<string>(task?.taskManager || '');
  const [managers, setManagers] = useState<Manager[]>([]);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isManagerDropdownOpen, setIsManagerDropdownOpen] = useState(false);

  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const managerDropdownRef = useRef<HTMLDivElement>(null);

  // Removed `errors` from the destructuring since it was not used.
  const { register, handleSubmit, reset } = useForm<Task>({
    defaultValues: {
      taskTitle: task?.taskTitle || '',
      taskDescription: task?.taskDescription || '',
      taskDueDate: task?.taskDueDate
        ? new Date(task.taskDueDate).toISOString().split('T')[0]
        : '',
      taskStatus: selectedStatus,
      taskManager: selectedManager,
    },
  });

  // Reset form and states when modal opens/closes or task changes
  useEffect(() => {
    if (isOpen && task) {
      setSelectedStatus(task.taskStatus);
      setSelectedManager(task.taskManager);
      reset({
        taskTitle: task.taskTitle,
        taskDescription: task.taskDescription,
        taskDueDate: new Date(task.taskDueDate).toISOString().split('T')[0],
        taskStatus: task.taskStatus,
        taskManager: task.taskManager,
      });
    } else if (!isOpen) {
      setSelectedStatus('Pending');
      setSelectedManager('');
      reset();
    }
  }, [isOpen, task, reset]);

  // Fetch managers
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const data = await getManagers();
        setManagers(data.Managers as Manager[]);
      } catch {
        // No error variable needed here.
        toast.error('Failed to load managers');
      }
    };
    if (isOpen) fetchManagers();
  }, [isOpen]);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusDropdownOpen(false);
      }
      if (
        managerDropdownRef.current &&
        !managerDropdownRef.current.contains(event.target as Node)
      ) {
        setIsManagerDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSubmit = async (formData: Task) => {
    const finalData = {
      ...formData,
      taskStatus: selectedStatus,
      taskManager: selectedManager,
      taskId: task?.taskId,
      taskDueDate: task?.taskDueDate.toString()
        ? new Date(task?.taskDueDate.toString())
        : new Date(),
    };

    try {
      let result;
      if (task) {
        result = updateTask(finalData);
      } else {
        result = addTask(finalData);
      }

      await toast.promise(result, {
        loading: 'Loading...',
        success: (message) => `${message}`,
        error: (err) => `${err.toString()}`,
      });

      if (onTaskUpdate) {
        onTaskUpdate(finalData);
      }

      onClose();
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setIsStatusDropdownOpen(false);
  };

  const handleManagerChange = (managerId: string) => {
    setSelectedManager(managerId);
    setIsManagerDropdownOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 z-50 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9, y: '-40%', x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-main-blue">
                {task ? 'Update Task' : 'Add Task'}
              </h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register('taskTitle', { required: 'Task Title is required' })}
                placeholder="Task Title"
                className="w-full p-2 border rounded"
              />
              <textarea
                {...register('taskDescription', { required: 'Task Description is required' })}
                placeholder="Task Description"
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                {...register('taskDueDate', { required: 'Task Due Date is required' })}
                className="w-full p-2 border rounded"
              />

              {/* Status Dropdown */}
              <div className="relative" ref={statusDropdownRef}>
                <button
                  type="button"
                  className="w-full flex justify-between items-center p-2 border rounded bg-white"
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                >
                  <span>{selectedStatus}</span>
                  <FaChevronDown />
                </button>
                {isStatusDropdownOpen && (
                  <div className="absolute w-full bg-white border rounded-md mt-1 shadow-lg z-10">
                    {['Pending', 'In Progress', 'Completed'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        className="block w-full text-left p-2 hover:bg-gray-100"
                        onClick={() => handleStatusChange(status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Manager Dropdown */}
              <div className="relative" ref={managerDropdownRef}>
                <button
                  type="button"
                  className="w-full flex justify-between items-center p-2 border rounded bg-white"
                  onClick={() => setIsManagerDropdownOpen(!isManagerDropdownOpen)}
                >
                  <span>
                    {selectedManager
                      ? managers.find((m) => m.managerId === selectedManager)
                        ? `${managers.find((m) => m.managerId === selectedManager)?.managerFirstName} ${managers.find((m) => m.managerId === selectedManager)?.managerLastName}`
                        : 'Select Manager'
                      : 'Select Manager'}
                  </span>
                  <FaChevronDown />
                </button>
                {isManagerDropdownOpen && (
                  <div className="absolute w-full bg-white border rounded-md mt-1 shadow-lg z-10 max-h-48 overflow-y-auto">
                    {managers.map((manager) => (
                      <button
                        key={manager.managerId}
                        type="button"
                        className="block w-full text-left p-2 hover:bg-gray-100"
                        onClick={() => handleManagerChange(manager.managerId)}
                      >
                        {manager.managerFirstName} {manager.managerLastName}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-2 rounded-xl hover:opacity-90"
              >
                {task ? 'Update' : 'Add'}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;
