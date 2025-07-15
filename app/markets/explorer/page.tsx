"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download, TrendingUp, PieChart, ArrowUpDown } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MarketExplorerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState<string>("tvl")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Mock data for market assets
  const markets = [
    {
      id: "0x123",
      name: "Ethereum",
      symbol: "ETH",
      price: 3500,
      change24h: 2.5,
      tvl: 15000000,
      supplyApy: 3.2,
      borrowApy: 4.5,
      utilizationRate: 60,
    },
    {
      id: "0x456",
      name: "USD Coin",
      symbol: "USDC",
      price: 1,
      change24h: 0.1,
      tvl: 25000000,
      supplyApy: 5.1,
      borrowApy: 6.8,
      utilizationRate: 80,
    },
    {
      id: "0x789",
      name: "Dai",
      symbol: "DAI",
      price: 1,
      change24h: 0.0,
      tvl: 18000000,
      supplyApy: 4.8,
      borrowApy: 6.2,
      utilizationRate: 66.7,
    },
    {
      id: "0xabc",
      name: "Bitcoin",
      symbol: "BTC",
      price: 65000,
      change24h: -1.2,
      tvl: 30000000,
      supplyApy: 2.5,
      borrowApy: 3.8,
      utilizationRate: 50,
    },
    {
      id: "0xdef",
      name: "Solana",
      symbol: "SOL",
      price: 120,
      change24h: 5.3,
      tvl: 8000000,
      supplyApy: 4.2,
      borrowApy: 5.5,
      utilizationRate: 70,
    },
  ]

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const filteredMarkets = markets.filter(
    (market) =>
      market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedMarkets = [...filteredMarkets].sort((a, b) => {
    const aValue = a[sortColumn as keyof typeof a]
    const bValue = b[sortColumn as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Market Explorer</h1>
          <p className="text-muted-foreground">Detailed market statistics and trends</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assets</SelectItem>
              <SelectItem value="stablecoins">Stablecoins</SelectItem>
              <SelectItem value="defi">DeFi Tokens</SelectItem>
              <SelectItem value="l1">L1 Tokens</SelectItem>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Value Locked</p>
              <h2 className="text-3xl font-bold">$96,000,000</h2>
              <p className="text-sm text-green-500">+$12,000,000 (14.3%)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium text-muted-foreground">24h Volume</p>
              <h2 className="text-3xl font-bold">$15,432,100</h2>
              <p className="text-sm text-green-500">+$2,543,200 (19.7%)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Average Supply APY</p>
              <h2 className="text-3xl font-bold">3.96%</h2>
              <p className="text-sm text-green-500">+0.32% from last week</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Average Borrow APY</p>
              <h2 className="text-3xl font-bold">5.36%</h2>
              <p className="text-sm text-green-500">+0.45% from last week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="markets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="markets">Markets</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>
        <TabsContent value="markets" className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search markets..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
                    Price
                    {sortColumn === "price" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("change24h")}>
                    24h Change
                    {sortColumn === "change24h" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("tvl")}>
                    TVL
                    {sortColumn === "tvl" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("supplyApy")}>
                    Supply APY
                    {sortColumn === "supplyApy" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("borrowApy")}>
                    Borrow APY
                    {sortColumn === "borrowApy" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("utilizationRate")}>
                    Utilization
                    {sortColumn === "utilizationRate" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedMarkets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No markets found
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedMarkets.map((market) => (
                    <TableRow key={market.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <img
                            src={`/placeholder.svg?height=24&width=24`}
                            alt={market.name}
                            className="h-6 w-6 rounded-full"
                          />
                          <div>
                            <div>{market.name}</div>
                            <div className="text-xs text-muted-foreground">{market.symbol}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>${market.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <span
                          className={
                            market.change24h > 0 ? "text-green-500" : market.change24h < 0 ? "text-red-500" : ""
                          }
                        >
                          {market.change24h > 0 ? "+" : ""}
                          {market.change24h.toFixed(2)}%
                        </span>
                      </TableCell>
                      <TableCell>${market.tvl.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          {market.supplyApy.toFixed(2)}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                          {market.borrowApy.toFixed(2)}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="text-sm">{market.utilizationRate.toFixed(1)}%</div>
                          <div className="h-2 w-full rounded-full bg-secondary">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${market.utilizationRate}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" /> Market Trends
              </CardTitle>
              <CardDescription>Historical trends for key market metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">TVL Trend</h3>
                  <div className="h-[300px] w-full">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line
                        x1="0"
                        y1="25"
                        x2="100"
                        y2="25"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.5"
                        strokeDasharray="2 2"
                      />
                      <line
                        x1="0"
                        y1="50"
                        x2="100"
                        y2="50"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.5"
                        strokeDasharray="2 2"
                      />
                      <line
                        x1="0"
                        y1="75"
                        x2="100"
                        y2="75"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.5"
                        strokeDasharray="2 2"
                      />

                      {/* Line */}
                      <path
                        d="M0,80 C10,75 20,85 30,70 C40,55 50,60 60,40 C70,20 80,30 90,15 L100,10"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                      />

                      {/* Area fill */}
                      <path
                        d="M0,80 C10,75 20,85 30,70 C40,55 50,60 60,40 C70,20 80,30 90,15 L100,10 L100,100 L0,100 Z"
                        fill="hsl(var(--primary)/0.2)"
                      />
                    </svg>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">APY Trend</h3>
                  <div className="h-[300px] w-full">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line
                        x1="0"
                        y1="25"
                        x2="100"
                        y2="25"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.5"
                        strokeDasharray="2 2"
                      />
                      <line
                        x1="0"
                        y1="50"
                        x2="100"
                        y2="50"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.5"
                        strokeDasharray="2 2"
                      />
                      <line
                        x1="0"
                        y1="75"
                        x2="100"
                        y2="75"
                        stroke="hsl(var(--border))"
                        strokeWidth="0.5"
                        strokeDasharray="2 2"
                      />

                      {/* Supply APY Line */}
                      <path
                        d="M0,60 C10,65 20,55 30,50 C40,45 50,40 60,45 C70,50 80,45 90,40 L100,35"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                      />

                      {/* Borrow APY Line */}
                      <path
                        d="M0,40 C10,45 20,35 30,30 C40,25 50,20 60,25 C70,30 80,25 90,20 L100,15"
                        fill="none"
                        stroke="hsl(var(--destructive))"
                        strokeWidth="2"
                      />

                      {/* Legend */}
                      <circle cx="10" cy="90" r="2" fill="hsl(var(--primary))" />
                      <circle cx="40" cy="90" r="2" fill="hsl(var(--destructive))" />
                    </svg>
                    <div className="flex gap-8 text-xs text-muted-foreground mt-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>Supply APY</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-destructive"></div>
                        <span>Borrow APY</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5" /> Asset Distribution
              </CardTitle>
              <CardDescription>Distribution of assets in the protocol</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">TVL Distribution</h3>
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <div className="relative h-64 w-64">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold">$96M</div>
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
                          strokeDasharray="31.4 188.6"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="hsl(var(--destructive))"
                          strokeWidth="20"
                          strokeDasharray="47.1 188.6"
                          strokeDashoffset="-31.4"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="hsl(var(--secondary))"
                          strokeWidth="20"
                          strokeDasharray="62.8 188.6"
                          strokeDashoffset="-78.5"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="hsl(var(--accent))"
                          strokeWidth="20"
                          strokeDasharray="31.4 188.6"
                          strokeDashoffset="-141.3"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="hsl(var(--muted))"
                          strokeWidth="20"
                          strokeDasharray="15.7 188.6"
                          strokeDashoffset="-172.7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                      <span>ETH (31.3%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-destructive"></div>
                      <span>USDC (26.0%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-secondary"></div>
                      <span>BTC (18.8%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-accent"></div>
                      <span>DAI (16.7%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-muted"></div>
                      <span>Others (7.2%)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Utilization Rates</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>ETH</span>
                        <span>60%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "60%" }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>USDC</span>
                        <span>80%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "80%" }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>BTC</span>
                        <span>50%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "50%" }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>DAI</span>
                        <span>66.7%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "66.7%" }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>SOL</span>
                        <span>70%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div className="h-2 rounded-full bg-primary" style={{ width: "70%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
