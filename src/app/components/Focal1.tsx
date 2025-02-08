"use client"
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Focal1({
  title = "Book Your Appointment Now on Tabib-dz",
  description = "We work only with the best doctors in different specialties to provide the best medical care to our patients. So don't worry about anything and book yourself.",
  imageSrc = "/webp/ginger.webp",
  imageAlt = "ginger",
}) {
  const { ref: textRef, inView: textInView } = useInView({ triggerOnce: false });
  const { ref: imageRef, inView: imageInView } = useInView({ triggerOnce: false });

  return (
    <div className="w-full flex flex-col lg:flex-row p-[6%] justify-center items-center">
      {/* Text Section Animation from Left */}
      <motion.div
        ref={textRef}
        initial={{ opacity: 0, x: -100 }}
        animate={textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col justify-center items-center lg:justify-start lg:items-start w-[90%] lg:w-[70%] gap-8"
      >  <Image
      className="relative top-[20px] right-[20px] lg:top-[40px] lg:right-[40px]"
      src={imageSrc}
      height={550}
      width={550}
      alt={imageAlt}
    />
      
      </motion.div>

      {/* Image Section Animation from Right */}
      <motion.div
        ref={imageRef}
        initial={{ opacity: 0, x: 400 }}
        animate={imageInView ? { opacity: 1, x: 200 } : { opacity: 0, x: 400 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="mt-[20px] flex justify-center flex-col w-full items-center rounded-[15px]"
      >
          <h1 className="text-[40px] text-[#A77DFF] text-center  lg:text-start lg:text-[60px] font-bold w-full lg:w-[60%]">
          {title}
        </h1>
        <p className="text-[20px] text-center lg:text-start lg:text-[30px] opacity-60 lg:w-[60%]">
          {description}
        </p>
      
      </motion.div>
    </div>
  );
}

export default Focal1;
