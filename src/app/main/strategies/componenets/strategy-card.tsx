import type { IconType } from "react-icons";

interface StrategyCardProps {
  title: string;
  date: string;
  description: string;
  strategy?: string;  // New prop for the generated strategy text
  icon: IconType;
  iconColor?: string;
  backgroundColor?: string;
}

export default function StrategyCard({
  title,
  date,
  description,
  strategy,
  icon: Icon,
  iconColor = "#FFB800",
  backgroundColor = "#FFFBF2",
}: StrategyCardProps) {
  return (
    <div className="flex flex-col rounded-[20px] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start px-6 pt-6 pb-3 gap-4">
        <div className="p-3 rounded-full" style={{ backgroundColor }}>
          <Icon size={24} style={{ color: iconColor }} aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-1" style={{ color: iconColor }}>
            {title}
          </h2>
          <time className="text-sm text-gray-400">{date}</time>
        </div>
      </div>
      <hr className="w-full mb-4" style={{ borderColor: iconColor }} />
      <div className="px-6 pb-6">
        <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
        {strategy ? (
          <div>
            <h3 className="text-lg font-bold mb-2">Strategy Recommendation:</h3>
            <p className="text-gray-700">{strategy}</p>
          </div>
        ) : (
          <p className="text-gray-500 italic">Generating strategy...</p>
        )}
      </div>
    </div>
  );
}
