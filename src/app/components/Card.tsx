"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CardProps {
  src: string;
  borderColor?: string;
  shadowType?: "none" | "small" | "large";
}

const Card: React.FC<CardProps> = ({ src, borderColor = "black", shadowType = "small" }) => {
  const boxShadow =
    shadowType === "none"
      ? "shadow-none"
      : shadowType === "small"
      ? "shadow-md"
      : "shadow-xl";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, scaleY: 0.9 }}
      whileInView={{ opacity: 1, scale: 1, scaleY: 1 }}
      exit={{ opacity: 0, scale: 0.9, scaleY: 0.9 }} // Reverse animation when it leaves the viewport
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }} // Trigger the animation when 20% of the element is in the viewport
      className={`mx-auto border-[8px] flex justify-center items-center flex-col bg-white ${boxShadow}`}
      style={{ borderColor }}
    >
      <Image src={src} alt="medz" width={500} height={500} priority />
      <div className="text-[30px] text-center font-bold ">Best treatment possible</div>
    </motion.div>
  );
};

export default Card;
