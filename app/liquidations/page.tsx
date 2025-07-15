"use client"

import { useState, useEffect } from "react"
import { ConnectWallet } from "@/components/connect-wallet"
import { LiquidationTable } from "@/components/liquidation-table"
import { useWalletContext } from "@/context/wallet-context"
import { fetchLiquidationPositions } from "@/lib/api"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function Liquidations() {
  const [positions, setPositions] = useState([])
  const [loading, setLoading] = useState(true)
  const { connected } = useWalletContext()

  useEffect(() => {
    const getPositions = async () => {
      try {
        const data = await fetchLiquidationPositions()
        setPositions(data)
      } catch (error) {
        console.error("Failed to fetch liquidation positions:", error)
      } finally {
        setLoading(false)
      }
    }

    getPositions()
  }, [])

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Liquidations</h1>
          <p className="text-muted-foreground">View and liquidate positions with health factor below threshold</p>
        </div>
        {!connected && <ConnectWallet />}
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Liquidation Information</AlertTitle>
        <AlertDescription>
          Positions with health factor below 1.0 can be liquidated. Liquidators receive a bonus for helping maintain
          protocol solvency.
        </AlertDescription>
      </Alert>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <LiquidationTable positions={positions} />
      )}
    </div>
  )
}
