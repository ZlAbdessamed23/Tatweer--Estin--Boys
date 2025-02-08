"use client";

import React, { useEffect, useMemo, useState } from 'react';
import ManagersTable from './components/ManagersTable';
import { FaSearch, FaPlus } from 'react-icons/fa';
import ManagerModal from './components/ManagerModal';
import toast from 'react-hot-toast';
import { deleteManager, getManagers } from '@/app/utils/utils';

interface Manager {
  managerId: string;
  managerFirstName: string;
  managerLastName: string;
  managerEmail: string;
  managerPassword: string;
}

const Managers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch managers on component mount
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        setIsLoading(true);
        const response = await getManagers();
        setManagers(response.Managers as Manager[]);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch managers');
        toast.error('Failed to fetch managers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchManagers();
  }, []);

  async function deleteMan(id: string) {
    try {
      const result = deleteManager(id);
      await toast.promise(result, {
        loading: 'Loading...',
        success: (message) => `${message}`,
        error: (err) => `${err.toString()}`,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  }

  const handleUpdate = (manager: Manager) => {
    setSelectedManager(manager);
    setIsModalOpen(true);
  };

  // Filter managers based on search term
  const filteredManagers = useMemo(() => {
    return (managers || []).filter(manager =>
      `${manager.managerFirstName} ${manager.managerLastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [managers, searchTerm]);

  return (
    <div className="px-8 py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-grow mr-4">
          <input
            type="text"
            placeholder="Search managers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2 pl-10 pr-4 py-2 border border-main-blue rounded-xl focus:border-main-blue"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={() => {
            setSelectedManager(null);
            setIsModalOpen(true);
          }}
          className="bg-purple-600 text-white p-2 rounded-xl flex items-center"
        >
          <FaPlus className="mr-2" /> Add
        </button>
      </div>

      {/* Display loading or error state */}
      {isLoading ? (
        <div className="text-center py-4">Loading managers...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : (
        <>
          <ManagerModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedManager(null);
            }}
            manager={selectedManager}
          />
          <ManagersTable
            managers={filteredManagers}
            onDelete={deleteMan}
            onUpdate={handleUpdate}
          />
        </>
      )}
    </div>
  );
};

export default Managers;