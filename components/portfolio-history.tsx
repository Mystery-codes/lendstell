"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function PortfolioHistory() {
  // Mock data for transaction history
  const transactions = [
    {
      id: "0x123456789abcdef",
      type: "Deposit",
      asset: "Ethereum",
      symbol: "ETH",
      amount: 2.5,
      value: 8750,
      timestamp: "2023-06-15T14:32:21Z",
      status: "Completed",
    },
    {
      id: "0x234567890abcdef",
      type: "Borrow",
      asset: "USD Coin",
      symbol: "USDC",
      amount: 5000,
      value: 5000,
      timestamp: "2023-06-14T09:15:43Z",
      status: "Completed",
    },
    {
      id: "0x3456789abcdef01",
      type: "Repay",
      asset: "USD Coin",
      symbol: "USDC",
      amount: 1000,
      value: 1000,
      timestamp: "2023-06-10T16:45:12Z",
      status: "Completed",
    },
    {
      id: "0x456789abcdef012",
      type: "Withdraw",
      asset: "Ethereum",
      symbol: "ETH",
      amount: 0.5,
      value: 1750,
      timestamp: "2023-06-05T11:22:33Z",
      status: "Completed",
    },
    {
      id: "0x56789abcdef0123",
      type: "Deposit",
      asset: "Bitcoin",
      symbol: "BTC",
      amount: 0.15,
      value: 9750,
      timestamp: "2023-06-01T08:12:45Z",
      status: "Completed",
    },
  ]

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Function to get badge color based on transaction type
  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "Deposit":
        return "bg-green-500/10 text-green-500"
      case "Withdraw":
        return "bg-orange-500/10 text-orange-500"
      case "Borrow":
        return "bg-blue-500/10 text-blue-500"
      case "Repay":
        return "bg-purple-500/10 text-purple-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
              <TableCell>
                <Badge variant="outline" className={getTypeBadgeClass(tx.type)}>
                  {tx.type}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img src={`/placeholder.svg?height=20&width=20`} alt={tx.asset} className="h-5 w-5 rounded-full" />
                  <span>{tx.asset}</span>
                </div>
              </TableCell>
              <TableCell>
                {tx.amount.toLocaleString()} {tx.symbol}
              </TableCell>
              <TableCell>${tx.value.toLocaleString()}</TableCell>
              <TableCell>{formatDate(tx.timestamp)}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  {tx.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" asChild>
                  <a href={`https://starkscan.co/tx/${tx.id}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">View Transaction</span>
                  </a>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
