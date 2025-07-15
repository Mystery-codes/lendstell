import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface PositionCardProps {
  title: string
  value: string
  healthFactor?: number
  description?: string
  className?: string
}

export function PositionCard({ title, value, healthFactor, description, className }: PositionCardProps) {
  const getHealthColor = (factor: number) => {
    if (factor < 1.1) return "bg-red-500"
    if (factor < 1.5) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getHealthStatus = (factor: number) => {
    if (factor < 1.1) return "At Risk"
    if (factor < 1.5) return "Caution"
    return "Healthy"
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>

        {healthFactor && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Health Factor</span>
              <Badge
                variant="outline"
                className={cn(
                  "text-white",
                  healthFactor < 1.1 ? "bg-red-500" : healthFactor < 1.5 ? "bg-yellow-500" : "bg-green-500",
                )}
              >
                {getHealthStatus(healthFactor)}
              </Badge>
            </div>
            <Progress value={Math.min(healthFactor * 33.3, 100)} className="h-2" />
            <div className="flex justify-between text-xs">
              <span>1.0</span>
              <span>2.0</span>
              <span>3.0</span>
            </div>
            <div className="text-center text-sm font-medium">{healthFactor.toFixed(2)}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
