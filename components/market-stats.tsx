"use client"

import { useState, useEffect } from "react"
import { BarChart3, DollarSign, TrendingUp, Users } from "lucide-react"
import { StatsCard } from "@/components/stats-card"
import { fetchMarketStats } from "@/lib/api"

interface MarketStatsData {
  tvl: number
  totalBorrowed: number
  totalSupplied: number
  activeUsers: number
  tvlTrend: number
}

export function MarketStats() {
  const [stats, setStats] = useState<MarketStatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchMarketStats()
        setStats(data)
      } catch (error) {
        console.error("Failed to fetch market stats:", error)
      } finally {
        setLoading(false)
      }
    }

    getStats()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <StatsCard key={i} title="Loading..." value="..." className="animate-pulse" />
        ))}
      </div>
    )
  }

  if (!stats) {
    return <div className="rounded-lg border p-4 text-center">Failed to load market statistics</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Value Locked"
        value={`$${stats.tvl.toLocaleString()}`}
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        trend={{ value: stats.tvlTrend, isPositive: stats.tvlTrend > 0 }}
      />
      <StatsCard
        title="Total Borrowed"
        value={`$${stats.totalBorrowed.toLocaleString()}`}
        icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Total Supplied"
        value={`$${stats.totalSupplied.toLocaleString()}`}
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Active Users"
        value={stats.activeUsers.toLocaleString()}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  )
}
