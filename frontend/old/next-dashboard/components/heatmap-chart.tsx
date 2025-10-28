"use client"

import { cn } from "@/lib/utils"

const heatmapData = [
  [45, 52, 68, 72, 75, 70, 58, 48],
  [58, 65, 78, 82, 85, 80, 68, 55],
  [72, 80, 88, 92, 95, 90, 82, 70],
  [68, 75, 85, 90, 92, 88, 78, 65],
  [55, 62, 72, 78, 80, 75, 65, 52],
  [42, 48, 58, 62, 65, 60, 50, 40],
]

const getHeatColor = (value: number) => {
  if (value >= 85) return "bg-primary"
  if (value >= 70) return "bg-primary/70"
  if (value >= 55) return "bg-primary/40"
  if (value >= 40) return "bg-primary/20"
  return "bg-muted"
}

export function HeatmapChart() {
  const rows = ["A", "B", "C", "D", "E", "F"]

  return (
    <div className="w-full">
      <div className="space-y-2">
        {heatmapData.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground w-4">{rows[rowIndex]}</span>
            <div className="flex-1 grid grid-cols-8 gap-2">
              {row.map((value, colIndex) => (
                <div
                  key={colIndex}
                  className={cn(
                    "aspect-square rounded flex items-center justify-center transition-colors",
                    getHeatColor(value),
                  )}
                  title={`${rows[rowIndex]}${colIndex + 1}: ${value}%`}
                >
                  <span className="text-[10px] font-medium text-primary-foreground opacity-80">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground w-4" />
          <div className="flex-1 grid grid-cols-8 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <div key={num} className="text-center">
                <span className="text-[10px] text-muted-foreground">{num}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">Usage:</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted" />
          <span className="text-xs text-muted-foreground">Low</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary/40" />
          <span className="text-xs text-muted-foreground">Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary" />
          <span className="text-xs text-muted-foreground">High</span>
        </div>
      </div>
    </div>
  )
}
