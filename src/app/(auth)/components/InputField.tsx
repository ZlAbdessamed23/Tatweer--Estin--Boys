import React, { useState } from "react";
import { IconType } from "react-icons";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  Icon?: IconType;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  Icon,
  error,
  onChange,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const showLabel = isFocused || hasContent;

  // Intercept onChange to update local state and call any passed handler.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasContent(e.target.value !== "");
    if (onChange) {
      onChange(e); // Pass to the parent component's onChange handler
    }
  };

  return (
    <div className="relative w-full mt-4">
      <AnimatePresence>
        {!isFocused && Icon && (
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-2 left-0"
          >
            <Icon className="text-black size-6" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.span
        initial={{ y: 0, x: 32 }}
        animate={{
          y: showLabel ? -28 : 0,
          x: showLabel ? 0 : 32,
          scale: showLabel ? 0.8 : 1,
        }}
        transition={{ duration: 0.2 }}
        className={`absolute left-0 px-1 bg-white pointer-events-none ${
          showLabel ? "text-purple-600" : "text-gray-500"
        }`}
      >
        {placeholder}
      </motion.span>

      <motion.input
        type={type}
        {...(rest as HTMLMotionProps<"input">)} // Cast rest to proper motion.input props
        onChange={handleChange} // Updated to use the custom handleChange
        onFocus={(e) => {
          setIsFocused(true);
          if (rest.onFocus) rest.onFocus(e); // Call parent's onFocus if exists
        }}
        onBlur={(e) => {
          setIsFocused(false);
          if (rest.onBlur) rest.onBlur(e); // Call parent's onBlur if exists
        }}
        animate={{ paddingLeft: isFocused ? "0px" : "32px" }}
        transition={{ duration: 0.2 }}
        className="w-full pr-4 py-2 focus:outline-none border-transparent border-b-2 border-b-black focus:border-2 focus:border-purple-600 focus:rounded-md"
      />

      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
