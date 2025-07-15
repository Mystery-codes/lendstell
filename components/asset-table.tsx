"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Asset } from "@/lib/api"

interface AssetTableProps {
  assets: Asset[]
  onAction: (action: string, asset: Asset) => void
}

export function AssetTable({ assets, onAction }: AssetTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Asset>("apy")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (column: keyof Asset) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  const sortedAssets = [...assets].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Asset</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
              Price
              {sortColumn === "price" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("apy")}>
              APY
              {sortColumn === "apy" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("totalSupplied")}>
              Total Supplied
              {sortColumn === "totalSupplied" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("totalBorrowed")}>
              Total Borrowed
              {sortColumn === "totalBorrowed" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("utilizationRate")}>
              Utilization
              {sortColumn === "utilizationRate" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAssets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <img src={`/placeholder.svg?height=24&width=24`} alt={asset.name} className="h-6 w-6 rounded-full" />
                  <div>
                    <div>{asset.name}</div>
                    <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>${asset.price.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  {asset.apy.toFixed(2)}%
                </Badge>
              </TableCell>
              <TableCell>${asset.totalSupplied.toLocaleString()}</TableCell>
              <TableCell>${asset.totalBorrowed.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="text-sm">{asset.utilizationRate.toFixed(2)}%</div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${asset.utilizationRate}%` }} />
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Actions <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onAction("deposit", asset)}>Deposit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAction("withdraw", asset)}>Withdraw</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAction("borrow", asset)}>Borrow</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAction("repay", asset)}>Repay</DropdownMenuItem>
                    <DropdownMenuItem>
                      <a
                        href={`https://starkscan.co/token/${asset.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center"
                      >
                        View on Explorer
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
