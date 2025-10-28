import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"

const data = [
  { time: "8 AM", occupancy: 15 },
  { time: "9 AM", occupancy: 32 },
  { time: "10 AM", occupancy: 48 },
  { time: "11 AM", occupancy: 62 },
  { time: "12 PM", occupancy: 45 },
  { time: "1 PM", occupancy: 38 },
  { time: "2 PM", occupancy: 72 },
  { time: "3 PM", occupancy: 85 },
  { time: "4 PM", occupancy: 78 },
  { time: "5 PM", occupancy: 52 },
  { time: "6 PM", occupancy: 28 },
  { time: "7 PM", occupancy: 12 },
]

export function OccupancyChart() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    checkTheme()

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  // Define explicit colors for light and dark modes
  const colors = isDark
    ? {
        foreground: "#e5e5e5",
        primary: "#a78bfa",
        popover: "#262626",
        popoverForeground: "#f5f5f5",
        border: "#404040",
      }
    : {
        foreground: "#404040",
        primary: "#7c3aed",
        popover: "#ffffff",
        popoverForeground: "#171717",
        border: "#e5e5e5",
      }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
            <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.foreground} opacity={0.1} />
        <XAxis
          dataKey="time"
          stroke={colors.foreground}
          fontSize={12}
          tick={{ fill: colors.foreground }}
        />
        <YAxis
          stroke={colors.foreground}
          fontSize={12}
          tickFormatter={(value) => `${value}%`}
          tick={{ fill: colors.foreground }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: colors.popover,
            border: `1px solid ${colors.border}`,
            borderRadius: "8px",
            color: colors.popoverForeground,
          }}
          formatter={(value) => [`${value}%`, "Occupancy"]}
        />
        <Area
          type="monotone"
          dataKey="occupancy"
          stroke={colors.primary}
          strokeWidth={2}
          fill="url(#occupancyGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
