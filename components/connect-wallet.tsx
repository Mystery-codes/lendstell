"use client"

import { useState } from "react"
import { Wallet, ArrowRight, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useWalletContext } from "@/context/wallet-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ConnectWallet() {
  const [open, setOpen] = useState(false)
  const { connect, connected, loading } = useWalletContext()

  const wallets = [
    {
      name: "Argent X",
      id: "argentX",
      icon: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Braavos",
      id: "braavos",
      icon: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleConnect = (walletId: string) => {
    connect(walletId)
    setOpen(false)
  }

  if (connected) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Wallet className="h-5 w-5" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect wallet</DialogTitle>
          <DialogDescription>Connect your Starknet wallet to access Lendstell</DialogDescription>
        </DialogHeader>

        <Alert variant="warning" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Preview Mode</AlertTitle>
          <AlertDescription>
            You are in preview mode. Wallet connections are simulated and no real transactions will occur.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col gap-4 py-4">
          {wallets.map((wallet) => (
            <Button
              key={wallet.id}
              variant="outline"
              className="flex justify-between p-6"
              onClick={() => handleConnect(wallet.id)}
              disabled={loading}
            >
              <div className="flex items-center gap-3">
                <img src={wallet.icon || "/placeholder.svg"} alt={wallet.name} className="h-8 w-8 rounded-full" />
                <span className="text-lg font-medium">{wallet.name}</span>
              </div>
              <ArrowRight className="h-5 w-5" />
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
