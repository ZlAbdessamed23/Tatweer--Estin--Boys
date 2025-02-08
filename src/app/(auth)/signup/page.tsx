"use client";

import React, { useState } from "react";
import { IconType } from "react-icons";
import { MdEmail, MdLock, MdBusiness, MdLocationOn, MdPeople, MdPhone } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  Icon?: IconType;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  Icon,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full mt-4">
      <AnimatePresence>
        {!isFocused && Icon && (
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 left-0"
          >
            <Icon className="text-black text-xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.span
        initial={{ y: 0, x: 32 }}
        animate={{
          y: isFocused ? -28 : 0,
          x: isFocused ? 0 : 32,
          scale: isFocused ? 0.8 : 1,
        }}
        transition={{ duration: 0.2 }}
        className={`absolute left-0 px-1 bg-white pointer-events-none ${
          isFocused ? "text-purple-600" : "text-gray-500"
        }`}
      >
        {placeholder}
      </motion.span>

      <motion.input
        type={type}
        name={rest.name}
        value={rest.value}
        onChange={rest.onChange}
        onFocus={(e) => {
          setIsFocused(true);
          if (rest.onFocus) rest.onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          if (rest.onBlur) rest.onBlur(e);
        }}
        animate={{ paddingLeft: isFocused ? "0px" : "32px" }}
        transition={{ duration: 0.2 }}
        className="w-full pr-4 py-2 focus:outline-none border-transparent border-b-2 border-b-black focus:border-2 focus:border-purple-600 focus:rounded-md"
      />
    </div>
  );
};

const Signup = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyLocation: "",
    employerNumber: "",
    companyGmail: "",
    companyPhoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!formData.companyLocation.trim()) newErrors.companyLocation = "Company Location is required";
    if (!formData.employerNumber.trim()) newErrors.employerNumber = "Employer Number is required";
    if (!formData.companyGmail.trim()) newErrors.companyGmail = "Company Gmail is required";
    if (!formData.companyPhoneNumber.trim()) newErrors.companyPhoneNumber = "Company Phone Number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep2()) {
      setErrors({});

      const transformedData = {
        adminFirstName: formData.firstName,
        adminLastName: formData.lastName,
        adminEmail: formData.email,
        adminPassword: formData.password,
        adminPhoneNumber: formData.companyPhoneNumber,
        companyName: formData.companyName,
        companyLocation: formData.companyLocation,
        companyEmployeeNumber: parseInt(formData.employerNumber, 10),
        companyEmail: formData.companyGmail,
        companyPhoneNumber: formData.companyPhoneNumber,
        planName: "Free"
      };

      if (isNaN(transformedData.companyEmployeeNumber)) {
        setErrors((prev) => ({
          ...prev,
          employerNumber: "Employee number must be a valid number"
        }));
        return;
      }

      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedData),
        });

        const data = await response.json();

        if (!response.ok) {
          setErrors((prev) => ({
            ...prev,
            submit: data.message || "An error occurred during registration"
          }));
          return;
        }

        console.log("Data submitted successfully:", data);

      } catch (error) {
        console.error("Error submitting data:", error);
        setErrors((prev) => ({
          ...prev,
          submit: "A connection error occurred. Please try again."
        }));
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-[70%] mx-auto h-full py-8">
      {step === 1 ? (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-purple-600">
            Personal Information
          </h1>
          <form onSubmit={handleNext} className="flex flex-col gap-5 w-full max-w-md">
            <InputField
              type="text"
              name="firstName"
              placeholder="First name"
              Icon={IoPersonSharp}
              value={formData.firstName}
              onChange={handleChange}
            />
            <InputField
              type="text"
              name="lastName"
              placeholder="Last name"
              Icon={IoPersonSharp}
              value={formData.lastName}
              onChange={handleChange}
            />
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              Icon={MdEmail}
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              Icon={MdLock}
              value={formData.password}
              onChange={handleChange}
            />
            <InputField
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              Icon={MdLock}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 mt-6"
            >
              Next
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-purple-600">
            Company Information
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md">
            <InputField
              type="text"
              name="companyName"
              placeholder="Company Name"
              Icon={MdBusiness}
              value={formData.companyName}
              onChange={handleChange}
            />
            <InputField
              type="text"
              name="companyLocation"
              placeholder="Company Location"
              Icon={MdLocationOn}
              value={formData.companyLocation}
              onChange={handleChange}
            />
            <InputField
              type="text"
              name="employerNumber"
              placeholder="Employer Number"
              Icon={MdPeople}
              value={formData.employerNumber}
              onChange={handleChange}
            />
            <InputField
              type="email"
              name="companyGmail"
              placeholder="Company Gmail"
              Icon={MdEmail}
              value={formData.companyGmail}
              onChange={handleChange}
            />
            <InputField
              type="tel"
              name="companyPhoneNumber"
              placeholder="Company Phone Number"
              Icon={MdPhone}
              value={formData.companyPhoneNumber}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 mt-6"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Signup;