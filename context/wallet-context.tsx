"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { toast } from "@/components/ui/use-toast"

type WalletContextType = {
  connected: boolean
  address: string | undefined
  connect: (walletType: string) => void
  disconnect: () => void
  loading: boolean
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  address: undefined,
  connect: () => {},
  disconnect: () => {},
  loading: false,
})

// This is a mock implementation for preview mode
export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  // Mock wallet addresses for different wallet types
  const mockAddresses: Record<string, string> = {
    argentX: "0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234",
    braavos: "0xabcdef123456789abcdef123456789abcdef123456789abcdef123456789abcd",
  }

  const connect = async (walletType: string) => {
    try {
      setLoading(true)

      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockAddress = mockAddresses[walletType]
      if (!mockAddress) {
        toast({
          title: "Wallet not found",
          description: `${walletType} wallet not available`,
          variant: "destructive",
        })
        return
      }

      setConnected(true)
      setAddress(mockAddress)

      toast({
        title: "Wallet connected (Demo)",
        description: "This is a simulated wallet connection for preview mode",
      })
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
      console.error("Wallet connection error:", error)
    } finally {
      setLoading(false)
    }
  }

  const disconnect = async () => {
    try {
      // Simulate disconnection delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      setConnected(false)
      setAddress(undefined)

      toast({
        title: "Wallet disconnected",
        description: "Your wallet has been disconnected",
      })
    } catch (error) {
      console.error("Wallet disconnection error:", error)
    }
  }

  return (
    <WalletContext.Provider
      value={{
        connected,
        address,
        connect,
        disconnect,
        loading,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWalletContext = () => useContext(WalletContext)
