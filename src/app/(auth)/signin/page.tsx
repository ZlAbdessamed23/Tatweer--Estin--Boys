"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MdEmail, MdLock, MdPersonOutline } from "react-icons/md";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";

interface userRoleOption {
  value: string;
  label: string;
}

const Login: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setuserPassword] = useState<string>("");
  const [userRole, setuserRole] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const userRoleOptions: userRoleOption[] = [
    { value: "admin", label: "admin" },
    { value: "manager", label: "manager" }
  ];

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, userPassword, userRole }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      await res.json();
      router.push("/main/dashboard");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col justify-center items-center w-[70%] mx-auto h-full">
      <h1 className="text-2xl font-semibold mb-6 text-purple-600">Login to Your Account</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col gap-5 w-10/12 mx-auto">
        <InputField
          type="email"
          placeholder="Email"
          Icon={MdEmail}
          value={userEmail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)}
        />
        <InputField
          type="userPassword"
          placeholder="userPassword"
          Icon={MdLock}
          value={userPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setuserPassword(e.target.value)}
        />
        <SelectField
          placeholder="User Type"
          Icon={MdPersonOutline}
          value={userRole}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setuserRole(e.target.value)}
          options={userRoleOptions}
        />
      </div>
      <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 mt-6">
        Login
      </button>
      <div className="w-full flex justify-end">
        <p className="text-sm text-gray-600 mt-4">
          Dont have an account? <a href="/signup" className="text-purple-600 hover:underline">Sign up</a>
        </p>
      </div>
    </form>
  );
};

export default Login;