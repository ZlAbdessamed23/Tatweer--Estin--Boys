"use client"

import { useEffect, useState, useCallback } from "react"
import { FiUpload, FiClipboard, FiX } from "react-icons/fi";

interface Department {
  departmentId: string
  departmentName: string
}

type ImportMethod = "json" | "csv" | "database" | ""

export default function DepartmentImportPage() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [importMethod, setImportMethod] = useState<ImportMethod>("")
  const [databaseUrl, setDatabaseUrl] = useState<string>("")
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/main/departments")
        if (!response.ok) throw new Error("Failed to fetch departments")
        const data = await response.json()
        if (data.Departments && Array.isArray(data.Departments)) {
          setDepartments(data.Departments)
        }
      } catch (error) {
        console.error("Error fetching departments:", error)
      }
    }

    fetchDepartments()
  }, [])

  const openModal = (department: Department) => {
    setSelectedDepartment(department)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setImportMethod("")
    setFile(null)
    setDatabaseUrl("")
  }

  const handleConfirm = () => {
    console.log(
      "Launching import for department:",
      selectedDepartment,
      "with method:",
      importMethod,
      "file:",
      file,
      "database URL:",
      databaseUrl,
    )
    closeModal()
  }

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === "application/json" || droppedFile.type === "text/csv") {
        setFile(droppedFile)
        setImportMethod(droppedFile.type === "application/json" ? "json" : "csv")
      }
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === "application/json" || selectedFile.type === "text/csv") {
        setFile(selectedFile)
        setImportMethod(selectedFile.type === "application/json" ? "json" : "csv")
      }
    }
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setDatabaseUrl(text)
    } catch (error) {
      console.error("Failed to read clipboard contents:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Department Import</h1>

      {departments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.departmentId}
              className="flex flex-col rounded-[20px] bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start px-6 pt-6 pb-3 gap-4">
                <div className="p-3 rounded-full bg-[#F3E8FF]">
                  <FiUpload size={24} className="text-[#9034E0]" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1 text-[#9034E0]">{dept.departmentName}</h2>
                  <time className="text-sm text-gray-400">Ready for import</time>
                </div>
              </div>
              <hr className="w-full mb-4 border-[#9034E0]" />
              <p className="text-gray-600 px-6 pb-4 leading-relaxed">
                Import data for {dept.departmentName} department. Choose from JSON, CSV, or database connection.
              </p>
              <div className="px-6 pb-6">
                <button
                  className="w-full bg-[#9034E0] text-white px-4 py-2 rounded-md hover:bg-[#7929C4] transition-colors duration-300 flex items-center justify-center"
                  onClick={() => openModal(dept)}
                >
                  <FiUpload className="mr-2" size={18} />
                  Import Data
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-gray-600">Loading departments...</p>
      )}

      {isModalOpen && selectedDepartment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Import Data for {selectedDepartment.departmentName}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>
            <p className="mb-4 text-gray-600">Select how you want to import the data:</p>
            <div className="space-y-3">
              {["json", "csv", "database"].map((method) => (
                <label key={method} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="importMethod"
                    value={method}
                    checked={importMethod === method}
                    onChange={(e) => setImportMethod(e.target.value as ImportMethod)}
                    className="mr-2 text-[#9034E0] focus:ring-[#9034E0]"
                  />
                  <span className="text-gray-700">
                    {method === "database"
                      ? "Connect via Database URL (Supabase)"
                      : `Import ${method.toUpperCase()} File`}
                  </span>
                </label>
              ))}
            </div>
            {(importMethod === "json" || importMethod === "csv") && (
              <div
                className={`mt-4 border-2 border-dashed rounded-lg p-4 text-center ${
                  dragActive ? "border-[#9034E0]" : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept={importMethod === "json" ? ".json" : ".csv"}
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload" className="cursor-pointer text-[#9034E0] hover:text-[#7929C4]">
                  {file ? file.name : "Click to upload or drag and drop"}
                </label>
                <p className="text-sm text-gray-500 mt-2">{importMethod === "json" ? "JSON" : "CSV"} files only</p>
              </div>
            )}
            {importMethod === "database" && (
              <div className="mt-4 relative">
                <input
                  type="text"
                  value={databaseUrl}
                  onChange={(e) => setDatabaseUrl(e.target.value)}
                  placeholder="Enter Database URL"
                  className="w-full h-full text-center text-[#9034E0] outline-none border border-gray-300 rounded-lg py-2 pl-3 pr-10"
                />
                <button
                  onClick={handlePaste}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#9034E0] hover:text-[#7929C4]"
                  title="Paste from clipboard"
                >
                  <FiClipboard size={18} />
                </button>
              </div>
            )}
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors duration-300 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-[#9034E0] text-white rounded-md hover:bg-[#7929C4] transition-colors duration-300"
                disabled={
                  !importMethod ||
                  (importMethod !== "database" && !file) ||
                  (importMethod === "database" && !databaseUrl)
                }
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

