"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function PortfolioMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Net Worth</p>
            <h2 className="text-3xl font-bold">$45,231.89</h2>
            <p className="text-sm text-green-500">+$12,234.56 (37.2%)</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Supplied</p>
            <h2 className="text-3xl font-bold">$43,125.00</h2>
            <p className="text-sm text-green-500">+$8,125.00 (23.2%)</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Borrowed</p>
            <h2 className="text-3xl font-bold">$10,000.00</h2>
            <p className="text-sm text-muted-foreground">23.2% of supplied</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Health Factor</p>
            <h2 className="text-3xl font-bold">1.82</h2>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-red-500">Risk</span>
                <span className="text-green-500">Safe</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
