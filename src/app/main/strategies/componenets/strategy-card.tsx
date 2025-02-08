import type { IconType } from "react-icons"

interface StrategyCardProps {
  title: string
  date: string
  description: string
  icon: IconType
  iconColor?: string
  backgroundColor?: string
}

export default function StrategyCard({
  title,
  date,
  description,
  icon: Icon,
  iconColor = "#FFB800",
  backgroundColor = "#FFFBF2",
}: StrategyCardProps) {
  return (
    <div className="flex flex-col rounded-[20px] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start px-6 pt-6 pb-3  gap-4 ">
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
      <p className="text-gray-600 px-6 pb-6 leading-relaxed">{description}</p>
    </div>
  )
}

