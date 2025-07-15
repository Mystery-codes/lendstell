"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ConnectWallet } from "@/components/connect-wallet"
import { ActionForm } from "@/components/action-form"
import { useWalletContext } from "@/context/wallet-context"
import { fetchAssets } from "@/lib/api"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Actions() {
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const { connected } = useWalletContext()
  const searchParams = useSearchParams()

  const defaultType = searchParams.get("type") || "deposit"
  const defaultAsset = searchParams.get("asset")

  useEffect(() => {
    const getAssets = async () => {
      try {
        const data = await fetchAssets()
        setAssets(data)
      } catch (error) {
        console.error("Failed to fetch assets:", error)
      } finally {
        setLoading(false)
      }
    }

    getAssets()
  }, [])

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Actions</h1>
          <p className="text-muted-foreground">Deposit, withdraw, borrow, or repay assets</p>
        </div>
        {!connected && <ConnectWallet />}
      </div>

      {!connected ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-xl mb-4">Connect your wallet to perform actions</p>
          <ConnectWallet />
        </div>
      ) : loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto">
          <Tabs defaultValue={defaultType} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
              <TabsTrigger value="borrow">Borrow</TabsTrigger>
              <TabsTrigger value="repay">Repay</TabsTrigger>
            </TabsList>
            <TabsContent value="deposit">
              <ActionForm type="deposit" assets={assets} />
            </TabsContent>
            <TabsContent value="withdraw">
              <ActionForm type="withdraw" assets={assets} />
            </TabsContent>
            <TabsContent value="borrow">
              <ActionForm type="borrow" assets={assets} />
            </TabsContent>
            <TabsContent value="repay">
              <ActionForm type="repay" assets={assets} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
