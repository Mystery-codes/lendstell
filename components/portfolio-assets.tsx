"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowUpDown, ExternalLink } from "lucide-react"

export function PortfolioAssets() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState<string>("value")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // Mock data for portfolio assets
  const assets = [
    {
      id: "0x123",
      name: "Ethereum",
      symbol: "ETH",
      type: "Supplied",
      amount: 5.25,
      value: 18375,
      apy: 3.2,
      change24h: 2.5,
    },
    {
      id: "0x456",
      name: "USD Coin",
      symbol: "USDC",
      type: "Supplied",
      amount: 15000,
      value: 15000,
      apy: 5.1,
      change24h: 0.1,
    },
    {
      id: "0x789",
      name: "Dai",
      symbol: "DAI",
      type: "Borrowed",
      amount: 10000,
      value: 10000,
      apy: 4.8,
      change24h: 0.0,
    },
    {
      id: "0xabc",
      name: "Bitcoin",
      symbol: "BTC",
      type: "Supplied",
      amount: 0.15,
      value: 9750,
      apy: 2.5,
      change24h: -1.2,
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

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedAssets = [...filteredAssets].sort((a, b) => {
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
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assets..."
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
              <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>
                Type
                {sortColumn === "type" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("amount")}>
                Amount
                {sortColumn === "amount" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("value")}>
                Value
                {sortColumn === "value" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("apy")}>
                APY
                {sortColumn === "apy" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("change24h")}>
                24h Change
                {sortColumn === "change24h" && <ArrowUpDown className="ml-2 h-4 w-4 inline" />}
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAssets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No assets found
                </TableCell>
              </TableRow>
            ) : (
              sortedAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <img
                        src={`/placeholder.svg?height=24&width=24`}
                        alt={asset.name}
                        className="h-6 w-6 rounded-full"
                      />
                      <div>
                        <div>{asset.name}</div>
                        <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        asset.type === "Supplied" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                      }
                    >
                      {asset.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {asset.amount.toLocaleString()} {asset.symbol}
                  </TableCell>
                  <TableCell>${asset.value.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {asset.apy.toFixed(2)}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={asset.change24h > 0 ? "text-green-500" : asset.change24h < 0 ? "text-red-500" : ""}
                    >
                      {asset.change24h > 0 ? "+" : ""}
                      {asset.change24h.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={`https://starkscan.co/token/${asset.id}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View on Explorer</span>
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
