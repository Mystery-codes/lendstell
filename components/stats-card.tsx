import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatsCard({ title, value, description, icon, trend, className }: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <CardDescription className="mt-1">{description}</CardDescription>}
        {trend && (
          <p className={cn("mt-2 text-xs", trend.isPositive ? "text-green-500" : "text-red-500")}>
            {trend.isPositive ? "+" : "-"}
            {Math.abs(trend.value).toFixed(2)}% from last period
          </p>
        )}
      </CardContent>
    </Card>
  )
}
