"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ConnectWallet } from "@/components/connect-wallet"
import { useWalletContext } from "@/context/wallet-context"
import { BarChart, LineChart, PieChart, Download, Calendar, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PortfolioChart } from "@/components/portfolio-chart"
import { PortfolioAssets } from "@/components/portfolio-assets"
import { PortfolioHistory } from "@/components/portfolio-history"
import { PortfolioMetrics } from "@/components/portfolio-metrics"

export default function PortfolioPage() {
  const { connected } = useWalletContext()
  const [timeframe, setTimeframe] = useState("1m")

  if (!connected) {
    return (
      <div className="container mx-auto p-4 md:p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Portfolio Dashboard</h1>
            <p className="text-muted-foreground">Track your performance and asset allocation</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Connect your wallet to view your portfolio</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Your portfolio dashboard provides comprehensive analytics and performance metrics for your positions.
          </p>
          <ConnectWallet />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Dashboard</h1>
          <p className="text-muted-foreground">Track your performance and asset allocation</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[120px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">1 Day</SelectItem>
              <SelectItem value="1w">1 Week</SelectItem>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <PortfolioMetrics />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-5">
              <CardHeader>
                <CardTitle>Portfolio Value</CardTitle>
                <CardDescription>Total value of your supplied and borrowed assets</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <PortfolioChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Distribution of your assets</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-[300px] w-[300px]">
                  <PieChartPlaceholder />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">APY Performance</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+5.2%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last period</p>
                <div className="mt-4 h-[80px]">
                  <LineChartPlaceholder />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Liquidation Risk</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Low</div>
                <p className="text-xs text-muted-foreground">Health factor: 1.82</p>
                <div className="mt-4 h-[80px]">
                  <BarChartPlaceholder />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Worth Change</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+$1,234.56</div>
                <p className="text-xs text-muted-foreground">+12.3% from last period</p>
                <div className="mt-4 h-[80px]">
                  <LineChartPlaceholder />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="assets">
          <Card>
            <CardHeader>
              <CardTitle>Your Assets</CardTitle>
              <CardDescription>All assets in your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioAssets />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your recent activity</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioHistory />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Detailed performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                <p className="text-muted-foreground max-w-md">
                  Advanced analytics features are currently in development and will be available soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PieChartPlaceholder() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold">$45,231</div>
          <div className="text-xs text-muted-foreground">Total Value</div>
        </div>
      </div>
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="hsl(var(--primary))"
          strokeWidth="20"
          strokeDasharray="75 25"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke="hsl(var(--primary)/0.3)"
          strokeWidth="20"
          strokeDasharray="25 75"
          strokeDashoffset="75"
        />
      </svg>
    </div>
  )
}

function LineChartPlaceholder() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 40">
      <path
        d="M0,20 Q10,15 20,25 T40,15 T60,25 T80,10 T100,20"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
      />
    </svg>
  )
}

function BarChartPlaceholder() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 40">
      <rect x="5" y="10" width="10" height="30" fill="hsl(var(--primary)/0.3)" />
      <rect x="25" y="15" width="10" height="25" fill="hsl(var(--primary)/0.5)" />
      <rect x="45" y="5" width="10" height="35" fill="hsl(var(--primary)/0.7)" />
      <rect x="65" y="20" width="10" height="20" fill="hsl(var(--primary)/0.9)" />
      <rect x="85" y="15" width="10" height="25" fill="hsl(var(--primary))" />
    </svg>
  )
}
