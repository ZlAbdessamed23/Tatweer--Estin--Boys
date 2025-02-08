"use client"

import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import DepartmentModal from './components/DepartemenetModal';
import DepartementDisplay from './components/DepartementDisplay';
import { DepartmentType } from '@/app/types/constant';
import toast from 'react-hot-toast';
import { getDepartments } from '@/app/utils/utils';

interface Department {
    departmentId: string;
    departmentName: string;
    departmentType: DepartmentType;
    departmentManagers: string[];
}

const Departements = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDepartement, setSelectedDepartement] = useState<Department | null>(null);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch departments on component mount
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                setIsLoading(true);
                const response = await getDepartments();
                setDepartments(response.Departments as Department[]);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch departments');
                toast.error('Failed to fetch departments');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    // Filter departments based on search input
    const filteredDepartments = departments.filter((dep) =>
        dep.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='px-8 py-4'>
            <div className="flex justify-between items-center mb-4">
                <div className="relative flex-grow mr-4">
                    <input
                        type="text"
                        placeholder="Search departments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-1/2 pl-10 pr-4 py-2 border border-main-blue rounded-xl focus:border-main-blue"
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <button
                    onClick={() => {
                        setSelectedDepartement(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-purple-600 text-white p-2 rounded-xl flex justify-center items-center w-24"
                >
                    <FaPlus className="mr-2" />
                    <span>Add</span>
                </button>
            </div>

            {/* Display loading or error state */}
            {isLoading ? (
                <div className="text-center py-4">Loading departments...</div>
            ) : error ? (
                <div className="text-center text-red-500 py-4">{error}</div>
            ) : (
                <>
                    <DepartmentModal 
                        isOpen={isModalOpen} 
                        onClose={() => {
                            setIsModalOpen(false);
                            setSelectedDepartement(null);
                        }} 
                        department={selectedDepartement}
                    />
                    <div className='flex flex-col gap-6'>
                        {filteredDepartments.length > 0 ? (
                            filteredDepartments.map((dep) => (
                                <DepartementDisplay 
                                    key={dep.departmentId} 
                                    props={dep} 
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">No departments found.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Departements;