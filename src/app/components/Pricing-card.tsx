"use client";
import { FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface PricingCardProps {
  title: string;
  price: number;
  features: string[];
  buttonText: string;
  buttonLink: string;
}

export default function PricingCard({
  title,
  price,
  features,
  buttonText,
  buttonLink,
}: PricingCardProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -100, opacity: 0 }}      // Start from the left with opacity 0
        whileInView={{ x: 0, opacity: 1 }}     // Animate to the center with full opacity when in view
        exit={{ x: 100, opacity: 0 }}          // Animate out to the right and fade out when leaving the viewport
        transition={{
          type: "spring",                      // Use a spring animation for a smooth effect
          stiffness: 100,                      // Control the stiffness of the spring
          damping: 25,                         // Control the damping of the spring
        }}
        viewport={{ once: false }}              // Animate every time it enters/leaves the viewport
        className="flex flex-col p-8 col-span-3   md:col-span-1 rounded-3xl bg-[#2D1B69] text-white h-full"
      >
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <div className="flex items-baseline">
            <span className="text-4xl font-bold">$</span>
            <span className="text-6xl font-bold">{price}</span>
            {price > 0 && <span className="text-xl ml-2">/mo</span>}
          </div>
        </div>

        <div className="flex-grow">
          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <FaCheck className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href={buttonLink}
          className="w-full py-4 px-6 rounded-xl text-center font-semibold bg-[#9333EA] hover:bg-[#A855F7] transition-colors"
        >
          {buttonText}
        </a>
      </motion.div>
    </AnimatePresence>
  );
}
