"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ConnectWallet } from "@/components/connect-wallet"
import { useWalletContext } from "@/context/wallet-context"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Zap, AlertTriangle, Code, DollarSign, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { executeFlashLoan } from "@/lib/flash-loan-api"
import { toast } from "@/components/ui/use-toast"

export default function FlashLoansPage() {
  const { connected } = useWalletContext()
  const [selectedAsset, setSelectedAsset] = useState("")
  const [loanAmount, setLoanAmount] = useState("")
  const [strategy, setStrategy] = useState("")
  const [customCode, setCustomCode] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)

  const availableAssets = [
    { symbol: "ETH", name: "Ethereum", available: "1,000 ETH", fee: "0.09%" },
    { symbol: "USDC", name: "USD Coin", available: "5,000,000 USDC", fee: "0.09%" },
    { symbol: "DAI", name: "Dai", available: "3,000,000 DAI", fee: "0.09%" },
    { symbol: "BTC", name: "Bitcoin", available: "50 BTC", fee: "0.09%" },
  ]

  const strategies = [
    {
      id: "arbitrage",
      name: "DEX Arbitrage",
      description: "Exploit price differences between decentralized exchanges",
      complexity: "Medium",
    },
    {
      id: "liquidation",
      name: "Liquidation",
      description: "Liquidate undercollateralized positions for profit",
      complexity: "High",
    },
    {
      id: "refinancing",
      name: "Debt Refinancing",
      description: "Refinance existing debt at better rates",
      complexity: "Low",
    },
    {
      id: "custom",
      name: "Custom Strategy",
      description: "Execute custom smart contract logic",
      complexity: "Expert",
    },
  ]

  const handleExecuteFlashLoan = async () => {
    if (!connected || !selectedAsset || !loanAmount || !strategy) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsExecuting(true)
    try {
      await executeFlashLoan({
        asset: selectedAsset,
        amount: loanAmount,
        strategy,
        customCode: strategy === "custom" ? customCode : undefined,
      })

      toast({
        title: "Flash Loan Executed (Demo)",
        description: `Successfully executed flash loan for ${loanAmount} ${selectedAsset}`,
      })
    } catch (error) {
      toast({
        title: "Flash Loan Failed",
        description: "Failed to execute flash loan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExecuting(false)
    }
  }

  if (!connected) {
    return (
      <div className="container mx-auto p-4 md:p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Flash Loans</h1>
            <p className="text-muted-foreground">Zero-collateral loans for single transactions</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Connect your wallet to access flash loans</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Flash loans allow you to borrow large amounts without collateral for arbitrage and other strategies.
          </p>
          <ConnectWallet />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Flash Loans</h1>
          <p className="text-muted-foreground">Zero-collateral loans for single transactions</p>
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>High Risk Feature</AlertTitle>
        <AlertDescription>
          Flash loans are advanced DeFi tools. Ensure you understand the risks and have tested your strategy thoroughly.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="execute" className="space-y-4">
        <TabsList>
          <TabsTrigger value="execute">Execute Flash Loan</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="execute" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-primary" />
                  Flash Loan Configuration
                </CardTitle>
                <CardDescription>Set up your flash loan parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="asset">Asset</Label>
                  <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                    <SelectTrigger id="asset">
                      <SelectValue placeholder="Select asset to borrow" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableAssets.map((asset) => (
                        <SelectItem key={asset.symbol} value={asset.symbol}>
                          <div className="flex items-center justify-between w-full">
                            <span>
                              {asset.name} ({asset.symbol})
                            </span>
                            <Badge variant="outline" className="ml-2">
                              Fee: {asset.fee}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedAsset && (
                    <p className="text-xs text-muted-foreground">
                      Available: {availableAssets.find((a) => a.symbol === selectedAsset)?.available}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Loan Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Flash loan fee:{" "}
                    {selectedAsset && loanAmount
                      ? `${(Number.parseFloat(loanAmount) * 0.0009).toFixed(4)} ${selectedAsset}`
                      : "0.09% of loan amount"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="strategy">Strategy</Label>
                  <Select value={strategy} onValueChange={setStrategy}>
                    <SelectTrigger id="strategy">
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      {strategies.map((strat) => (
                        <SelectItem key={strat.id} value={strat.id}>
                          <div className="flex flex-col">
                            <span>{strat.name}</span>
                            <span className="text-xs text-muted-foreground">{strat.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {strategy === "custom" && (
                  <div className="space-y-2">
                    <Label htmlFor="custom-code">Custom Contract Code</Label>
                    <Textarea
                      id="custom-code"
                      placeholder="Enter your custom smart contract logic..."
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value)}
                      rows={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      Write Cairo code that will be executed during the flash loan
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleExecuteFlashLoan}
                  disabled={isExecuting || !selectedAsset || !loanAmount || !strategy}
                  className="w-full"
                >
                  {isExecuting ? "Executing Flash Loan..." : "Execute Flash Loan"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Flash Loan Details</CardTitle>
                <CardDescription>Important information about flash loans</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <h4 className="font-medium">Single Transaction</h4>
                      <p className="text-sm text-muted-foreground">Loan must be repaid within the same transaction</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <div>
                      <h4 className="font-medium">No Collateral Required</h4>
                      <p className="text-sm text-muted-foreground">Borrow without providing upfront collateral</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    <div>
                      <h4 className="font-medium">Smart Contract Execution</h4>
                      <p className="text-sm text-muted-foreground">
                        Your strategy runs as part of the loan transaction
                      </p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Risk Warning</AlertTitle>
                  <AlertDescription>
                    If your strategy fails to generate enough profit to repay the loan + fees, the entire transaction
                    will revert and you'll lose gas fees.
                  </AlertDescription>
                </Alert>

                {selectedAsset && loanAmount && (
                  <div className="space-y-2 p-3 bg-muted rounded-lg">
                    <h4 className="font-medium">Transaction Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Loan Amount:</span>
                        <span>
                          {loanAmount} {selectedAsset}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Flash Loan Fee:</span>
                        <span>
                          {(Number.parseFloat(loanAmount) * 0.0009).toFixed(4)} {selectedAsset}
                        </span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total to Repay:</span>
                        <span>
                          {(Number.parseFloat(loanAmount) * 1.0009).toFixed(4)} {selectedAsset}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {strategies.map((strat) => (
              <Card key={strat.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{strat.name}</CardTitle>
                    <Badge
                      variant={
                        strat.complexity === "Low"
                          ? "default"
                          : strat.complexity === "Medium"
                            ? "secondary"
                            : strat.complexity === "High"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {strat.complexity}
                    </Badge>
                  </div>
                  <CardDescription>{strat.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" onClick={() => setStrategy(strat.id)} className="w-full">
                    Use This Strategy
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flash Loan History</CardTitle>
              <CardDescription>Your recent flash loan transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">No flash loan history yet</p>
                <p className="text-sm text-muted-foreground mt-2">Your executed flash loans will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
