"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function PortfolioChart() {
  const [chartType, setChartType] = useState<"value" | "apy">("value")

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <Button variant={chartType === "value" ? "default" : "outline"} size="sm" onClick={() => setChartType("value")}>
          Value
        </Button>
        <Button variant={chartType === "apy" ? "default" : "outline"} size="sm" onClick={() => setChartType("apy")}>
          APY
        </Button>
      </div>

      <div className="h-[350px] w-full">
        {chartType === "value" ? <ValueChartPlaceholder /> : <ApyChartPlaceholder />}
      </div>
    </div>
  )
}

function ValueChartPlaceholder() {
  // Mock data points for the chart
  const points = [
    [0, 30],
    [10, 40],
    [20, 35],
    [30, 50],
    [40, 45],
    [50, 60],
    [60, 55],
    [70, 70],
    [80, 85],
    [90, 75],
    [100, 90],
  ]

  // Create the SVG path from the points
  const pathData = points
    .map((point, i) => {
      return `${i === 0 ? "M" : "L"} ${point[0]} ${100 - point[1]}`
    })
    .join(" ")

  // Create the area fill path
  const areaData = `${pathData} L 100 100 L 0 100 Z`

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-4 left-4">
        <div className="text-3xl font-bold">$45,231.89</div>
        <div className="text-sm text-muted-foreground">+$12,234.56 (37.2%)</div>
      </div>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid lines */}
        <line x1="0" y1="25" x2="100" y2="25" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="0" y1="75" x2="100" y2="75" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* Area fill */}
        <path d={areaData} fill="hsl(var(--primary)/0.2)" />

        {/* Line */}
        <path d={pathData} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />

        {/* Data points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point[0]}
            cy={100 - point[1]}
            r="1.5"
            fill="hsl(var(--background))"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
          />
        ))}
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between px-4 text-xs text-muted-foreground">
        <div>Jan</div>
        <div>Feb</div>
        <div>Mar</div>
        <div>Apr</div>
        <div>May</div>
        <div>Jun</div>
      </div>
    </div>
  )
}

function ApyChartPlaceholder() {
  // Mock data points for the APY chart
  const points = [
    [0, 40],
    [10, 45],
    [20, 42],
    [30, 48],
    [40, 52],
    [50, 50],
    [60, 55],
    [70, 58],
    [80, 56],
    [90, 60],
    [100, 62],
  ]

  // Create the SVG path from the points
  const pathData = points
    .map((point, i) => {
      return `${i === 0 ? "M" : "L"} ${point[0]} ${100 - point[1]}`
    })
    .join(" ")

  // Create the area fill path
  const areaData = `${pathData} L 100 100 L 0 100 Z`

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-4 left-4">
        <div className="text-3xl font-bold">5.2% APY</div>
        <div className="text-sm text-muted-foreground">+0.8% from last month</div>
      </div>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid lines */}
        <line x1="0" y1="25" x2="100" y2="25" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="0" y1="75" x2="100" y2="75" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />

        {/* Area fill */}
        <path d={areaData} fill="hsl(var(--primary)/0.2)" />

        {/* Line */}
        <path d={pathData} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />

        {/* Data points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point[0]}
            cy={100 - point[1]}
            r="1.5"
            fill="hsl(var(--background))"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
          />
        ))}
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between px-4 text-xs text-muted-foreground">
        <div>Jan</div>
        <div>Feb</div>
        <div>Mar</div>
        <div>Apr</div>
        <div>May</div>
        <div>Jun</div>
      </div>
    </div>
  )
}
