import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';

interface Manager {
  managerId: string;
  managerFirstName: string;
  managerLastName: string;
  managerEmail: string;
  managerPassword: string;
}

interface ManagersTableProps {
  managers: Manager[];
  onUpdate?: (manager: Manager) => void;
  onDelete?: (managerId: string) => void;
}

const ActionDropdown: React.FC<{
  onUpdate: () => void;
  onDelete: () => void;
}> = ({ onUpdate, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="focus:outline-none"
      >
        <FaEllipsisV />
      </button>
      {isOpen && (
        <div className="fixed transform translate-x-[-90%] z-50 w-36 bg-white border rounded-md shadow-lg mt-2">
          <button 
            onClick={() => { onUpdate(); setIsOpen(false); }}
            className="flex items-center w-full p-2 text-left hover:bg-gray-100"
          >
            <FaEdit className="mr-2" /> Update
          </button>
          <button 
            onClick={() => { onDelete(); setIsOpen(false); }}
            className="flex items-center w-full p-2 text-left text-red-600 hover:bg-red-600 hover:text-gray-100"
          >
            <FaTrash className="mr-2" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

const ManagersTable: React.FC<ManagersTableProps> = ({ 
  managers, 
  onUpdate, 
  onDelete 
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Manager;
    direction: 'ascending' | 'descending';
  }>({ key: 'managerFirstName', direction: 'ascending' });

  const sortedManagers = useMemo(() => {
    if (!managers.length) return [];

    return [...managers].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [managers, sortConfig]);

  const handleSort = (key: keyof Manager) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    }));
  };

  const SortIcon = ({ isActive, direction }: { 
    isActive: boolean; 
    direction: 'ascending' | 'descending' 
  }) => {
    if (!isActive) return <FaSort className="inline ml-1" />;
    return direction === 'ascending' 
      ? <FaSortUp className="inline ml-1" /> 
      : <FaSortDown className="inline ml-1" />;
  };

  return (
    <div className="w-full rounded-xl">
      <div className="rounded-xl border-2 border-main-blue">
        <div className="overflow-x-auto">
          <table className="w-full bg-white">
            <thead>
              <tr>
                {(['managerFirstName', 'managerLastName', 'managerEmail'] as (keyof Manager)[]).map(key => (
                  <th 
                    key={key} 
                    onClick={() => handleSort(key)}
                    className="p-3 text-left cursor-pointer text-main-blue font-light text-md hover:bg-gray-100"
                  >
                    {key.replace('manager', '').replace(/([A-Z])/g, ' $1').trim()}
                    <SortIcon 
                      isActive={sortConfig.key === key}
                      direction={sortConfig.direction}
                    />
                  </th>
                ))}
                <th className="p-3 text-left text-main-blue font-light text-md">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedManagers.map(manager => (
                <tr key={manager.managerId} className="hover:bg-gray-50 text-base font-light">
                  <td className="p-3">{manager.managerFirstName}</td>
                  <td className="p-3">{manager.managerLastName}</td>
                  <td className="p-3">{manager.managerEmail}</td>
                  <td className="p-3">
                    <ActionDropdown 
                      onUpdate={() => onUpdate && onUpdate(manager)}
                      onDelete={() => onDelete && onDelete(manager.managerId)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagersTable;