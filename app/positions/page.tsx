"use client"

import { useState, useEffect } from "react"
import { ConnectWallet } from "@/components/connect-wallet"
import { PositionCard } from "@/components/position-card"
import { AssetTable } from "@/components/asset-table"
import { useWalletContext } from "@/context/wallet-context"
import { fetchUserPosition } from "@/lib/api"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function Positions() {
  const [position, setPosition] = useState(null)
  const [loading, setLoading] = useState(true)
  const { connected, address } = useWalletContext()
  const router = useRouter()

  useEffect(() => {
    const getPosition = async () => {
      if (!connected || !address) {
        setLoading(false)
        return
      }

      try {
        const data = await fetchUserPosition(address)
        setPosition(data)
      } catch (error) {
        console.error("Failed to fetch position:", error)
      } finally {
        setLoading(false)
      }
    }

    getPosition()
  }, [connected, address])

  const handleAssetAction = (action, asset) => {
    if (!connected) {
      return
    }

    router.push(`/actions?type=${action}&asset=${asset.id}`)
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Positions</h1>
          <p className="text-muted-foreground">View and manage your lending and borrowing positions</p>
        </div>
        {!connected && <ConnectWallet />}
      </div>

      {!connected ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-xl mb-4">Connect your wallet to view your positions</p>
          <ConnectWallet />
        </div>
      ) : loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : !position ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No positions found</AlertTitle>
          <AlertDescription>
            You don&apos;t have any active positions. Start by depositing collateral or borrowing assets.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <PositionCard
              title="Total Collateral"
              value={`$${position.collateral.totalValue.toLocaleString()}`}
              description="Your deposited assets"
            />
            <PositionCard
              title="Total Borrowed"
              value={`$${position.borrowed.totalValue.toLocaleString()}`}
              description="Your borrowed assets"
            />
            <PositionCard
              title="Health Factor"
              value={position.healthFactor.toFixed(2)}
              healthFactor={position.healthFactor}
              description="Liquidation at < 1.0"
            />
          </div>

          <Tabs defaultValue="supplied" className="mt-8">
            <TabsList>
              <TabsTrigger value="supplied">Supplied</TabsTrigger>
              <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
            </TabsList>
            <TabsContent value="supplied" className="mt-4">
              {position.collateral.assets.length === 0 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No supplied assets</AlertTitle>
                  <AlertDescription>
                    You haven&apos;t supplied any assets yet. Go to the Actions page to supply assets.
                  </AlertDescription>
                </Alert>
              ) : (
                <AssetTable
                  assets={position.collateral.assets.map((asset) => ({
                    ...asset,
                    totalSupplied: asset.value,
                    totalBorrowed: 0,
                    utilizationRate: 0,
                    price: asset.value / asset.amount,
                  }))}
                  onAction={handleAssetAction}
                />
              )}
            </TabsContent>
            <TabsContent value="borrowed" className="mt-4">
              {position.borrowed.assets.length === 0 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No borrowed assets</AlertTitle>
                  <AlertDescription>
                    You haven&apos;t borrowed any assets yet. Go to the Actions page to borrow assets.
                  </AlertDescription>
                </Alert>
              ) : (
                <AssetTable
                  assets={position.borrowed.assets.map((asset) => ({
                    ...asset,
                    totalSupplied: 0,
                    totalBorrowed: asset.value,
                    utilizationRate: 100,
                    price: asset.value / asset.amount,
                  }))}
                  onAction={handleAssetAction}
                />
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
