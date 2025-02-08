"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronDown } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { DepartmentType } from '@/app/types/constant';
import { getManagers, updateDepartment, addDepartment, deleteDepartment } from '@/app/utils/utils';

interface Department {
  departmentId?: string;
  departmentName: string;
  departmentType: DepartmentType;
  departmentManagers: string[]; // Store selected manager IDs
}

interface Manager {
  managerId: string;
  managerFirstName: string;
  managerLastName: string;
}

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  department?: Department | null;
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({ isOpen, onClose, department }) => {
  const { register, handleSubmit, setValue, getValues, watch, reset } = useForm<Department>({
    defaultValues: {
      departmentId: department?.departmentId || '',
      departmentName: department?.departmentName || '',
      departmentType: department?.departmentType || DepartmentType.other,
      departmentManagers: department?.departmentManagers || []
    }
  });

  const [managers, setManagers] = useState<Manager[]>([]);
  const [isManagersDropdownOpen, setIsManagersDropdownOpen] = useState(false);
  const managersDropdownRef = useRef<HTMLDivElement>(null);

  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);

  const selectedType = watch('departmentType');

  useEffect(() => {
    async function fetchManagers() {
      try {
        const data = await getManagers();
        setManagers(data.Managers as Manager[]);
      } catch (error) {
        console.log(error);
        toast.error('Failed to load managers');
      }
    }
    if (isOpen) fetchManagers();
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutsideManagers = (event: MouseEvent) => {
      if (
        managersDropdownRef.current &&
        !managersDropdownRef.current.contains(event.target as Node)
      ) {
        setIsManagersDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideManagers);
    return () => document.removeEventListener('mousedown', handleClickOutsideManagers);
  }, []);

  useEffect(() => {
    const handleClickOutsideType = (event: MouseEvent) => {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
        setIsTypeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideType);
    return () => document.removeEventListener('mousedown', handleClickOutsideType);
  }, []);

  const onSubmit = async (data: Department) => {
    try {
      if (department) {
        const message = await updateDepartment(data);
        toast.success(message);
      } else {
        const message = await addDepartment(data);
        toast.success(message);
      }
      onClose();
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const onError = (formErrors: Record<string, { message?: string }>) => {
    Object.values(formErrors).forEach((error) => {
      toast.error(error.message || 'Validation error');
    });
  };

  const handleDelete = async () => {
    if (department?.departmentId) {
      try {
        const message = await deleteDepartment(department.departmentId);
        toast.success(message);
        onClose();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to delete department');
      }
    }
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
                {department ? 'Update Department' : 'Add Department'}
              </h2>
              <div className="flex items-center gap-2">
                {department && (
                  <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                )}
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
              <input
                {...register('departmentName', { required: 'Department Name is required' })}
                placeholder="Department Name"
                className="w-full p-2 border rounded"
              />

              {/* Department Type Dropdown */}
              <div className="relative" ref={typeDropdownRef}>
                <button
                  type="button"
                  className="w-full flex justify-between items-center p-2 border rounded bg-white"
                  onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                >
                  {selectedType ? selectedType : 'Select Department Type'} <FaChevronDown />
                </button>
                {isTypeDropdownOpen && (
                  <div className="absolute w-full bg-white border rounded-md mt-1 shadow-lg z-10">
                    {Object.values(DepartmentType).map((type) => (
                      <button
                        key={type}
                        type="button"
                        className="block w-full text-left p-2 hover:bg-gray-100"
                        onClick={() => {
                          setValue('departmentType', type);
                          setIsTypeDropdownOpen(false);
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Managers Dropdown */}
              <div className="relative" ref={managersDropdownRef}>
                <button
                  type="button"
                  className="w-full flex justify-between items-center p-2 border rounded bg-white"
                  onClick={() => setIsManagersDropdownOpen(!isManagersDropdownOpen)}
                >
                  Select Managers <FaChevronDown />
                </button>
                {isManagersDropdownOpen && (
                  <div className="absolute w-full bg-white border rounded-md mt-1 shadow-lg z-10 max-h-48 overflow-y-auto">
                    {managers.map((manager) => (
                      <button
                        key={manager.managerId}
                        type="button"
                        className="block w-full text-left p-2 hover:bg-gray-100"
                        onClick={() => {
                          const currentManagers: string[] = getValues('departmentManagers') || [];
                          if (!currentManagers.includes(manager.managerId)) {
                            setValue('departmentManagers', [...currentManagers, manager.managerId]);
                          }
                          setIsManagersDropdownOpen(false);
                        }}
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
                {department ? 'Update' : 'Add'}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DepartmentModal;
