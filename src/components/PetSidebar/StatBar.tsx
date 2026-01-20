interface StatBarProps {
  label: string
  value: number
  color: 'yellow' | 'orange' | 'pink'
}

const colorClasses = {
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-400',
    text: 'text-yellow-800',
    fill: 'bg-yellow-500',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-400',
    text: 'text-orange-800',
    fill: 'bg-orange-500',
  },
  pink: {
    bg: 'bg-pink-50',
    border: 'border-pink-400',
    text: 'text-pink-800',
    fill: 'bg-pink-500',
  },
}

export const StatBar = ({ label, value, color }: StatBarProps) => {
  const colors = colorClasses[color]

  return (
    <div className={`${colors.bg} border-2 ${colors.border} rounded-lg px-3 py-2`}>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-sm font-semibold ${colors.text}`}>{label}</span>
        <span className={`text-sm font-bold ${colors.text}`}>{value}</span>
      </div>
      {/* Progress bar */}
      <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
        <div
          className={`h-full ${colors.fill} transition-all duration-300`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
