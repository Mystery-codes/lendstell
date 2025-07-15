"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { useWalletContext } from "@/context/wallet-context"
import { liquidatePosition } from "@/lib/contract-interactions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

interface Position {
  id: string
  address: string
  collateral: {
    asset: string
    symbol: string
    amount: number
    value: number
  }
  debt: {
    asset: string
    symbol: string
    amount: number
    value: number
  }
  healthFactor: number
  liquidationThreshold: number
}

interface LiquidationTableProps {
  positions: Position[]
}

export function LiquidationTable({ positions }: LiquidationTableProps) {
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const { connected } = useWalletContext()

  const handleLiquidate = async (position: Position) => {
    if (!connected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to liquidate positions",
        variant: "destructive",
      })
      return
    }

    setLoading((prev) => ({ ...prev, [position.id]: true }))
    try {
      await liquidatePosition(position.id)
      toast({
        title: "Liquidation successful (Demo)",
        description: `Position ${position.id.slice(0, 6)}...${position.id.slice(-4)} has been simulated as liquidated`,
      })
    } catch (error) {
      console.error("Liquidation error:", error)
      toast({
        title: "Liquidation failed",
        description: "Failed to liquidate position. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, [position.id]: false }))
    }
  }

  const sortedPositions = [...positions].sort((a, b) => a.healthFactor - b.healthFactor)

  return (
    <div className="space-y-4">
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Preview Mode</AlertTitle>
        <AlertDescription>
          You are in preview mode. Liquidations are simulated and no real assets will be transferred.
        </AlertDescription>
      </Alert>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
              <TableHead>Collateral</TableHead>
              <TableHead>Debt</TableHead>
              <TableHead>Health Factor</TableHead>
              <TableHead>Liquidation Threshold</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPositions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No positions available for liquidation
                </TableCell>
              </TableRow>
            ) : (
              sortedPositions.map((position) => (
                <TableRow key={position.id}>
                  <TableCell className="font-medium">
                    {position.address.slice(0, 6)}...{position.address.slice(-4)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>${position.collateral.value.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">
                        {position.collateral.amount.toFixed(4)} {position.collateral.symbol}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>${position.debt.value.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">
                        {position.debt.amount.toFixed(4)} {position.debt.symbol}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{position.healthFactor.toFixed(2)}</span>
                        <Badge
                          variant="outline"
                          className={
                            position.healthFactor < 1.05 ? "bg-red-500 text-white" : "bg-yellow-500 text-white"
                          }
                        >
                          {position.healthFactor < 1.05 ? "Critical" : "At Risk"}
                        </Badge>
                      </div>
                      <Progress value={Math.min(position.healthFactor * 50, 100)} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>{position.liquidationThreshold.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleLiquidate(position)}
                      disabled={loading[position.id] || !connected || position.healthFactor > 1}
                    >
                      {loading[position.id] ? "Processing..." : "Liquidate"}
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
