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
import { Layers, AlertTriangle, TrendingUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { createLeveragedPosition } from "@/lib/leverage-api"
import { toast } from "@/components/ui/use-toast"

export default function LeveragePage() {
  const { connected } = useWalletContext()
  const [collateralAsset, setCollateralAsset] = useState("")
  const [collateralAmount, setCollateralAmount] = useState("")
  const [leverageMultiplier, setLeverageMultiplier] = useState([2])
  const [targetAsset, setTargetAsset] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const availableAssets = [
    { symbol: "ETH", name: "Ethereum", price: 3500, maxLeverage: 5 },
    { symbol: "BTC", name: "Bitcoin", price: 65000, maxLeverage: 3 },
    { symbol: "USDC", name: "USD Coin", price: 1, maxLeverage: 10 },
    { symbol: "DAI", name: "Dai", price: 1, maxLeverage: 10 },
  ]

  const mockPositions = [
    {
      id: "1",
      collateral: "ETH",
      collateralAmount: 5,
      leverage: 3,
      targetAsset: "ETH",
      positionSize: 15,
      entryPrice: 3400,
      currentPrice: 3500,
      pnl: 1500,
      pnlPercentage: 8.8,
      healthFactor: 1.45,
    },
    {
      id: "2",
      collateral: "USDC",
      collateralAmount: 10000,
      leverage: 2,
      targetAsset: "BTC",
      positionSize: 0.3,
      entryPrice: 63000,
      currentPrice: 65000,
      pnl: 600,
      pnlPercentage: 6.0,
      healthFactor: 1.82,
    },
  ]

  const calculatePositionDetails = () => {
    if (!collateralAmount || !leverageMultiplier[0] || !collateralAsset) return null

    const collateralValue =
      Number.parseFloat(collateralAmount) * (availableAssets.find((a) => a.symbol === collateralAsset)?.price || 0)
    const totalPositionValue = collateralValue * leverageMultiplier[0]
    const borrowedAmount = totalPositionValue - collateralValue
    const liquidationPrice = collateralValue * 0.8 // 80% of collateral value

    return {
      collateralValue,
      totalPositionValue,
      borrowedAmount,
      liquidationPrice,
    }
  }

  const handleCreatePosition = async () => {
    if (!connected || !collateralAsset || !collateralAmount || !targetAsset) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)
    try {
      await createLeveragedPosition({
        collateralAsset,
        collateralAmount,
        leverage: leverageMultiplier[0],
        targetAsset,
      })

      toast({
        title: "Leveraged Position Created (Demo)",
        description: `Successfully created ${leverageMultiplier[0]}x leveraged position`,
      })
    } catch (error) {
      toast({
        title: "Position Creation Failed",
        description: "Failed to create leveraged position. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  const positionDetails = calculatePositionDetails()

  if (!connected) {
    return (
      <div className="container mx-auto p-4 md:p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Leveraged Positions</h1>
            <p className="text-muted-foreground">Amplify your exposure with leveraged trading</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Connect your wallet to access leverage</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Create leveraged positions to amplify your gains (and losses) in the crypto market.
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
          <h1 className="text-3xl font-bold">Leveraged Positions</h1>
          <p className="text-muted-foreground">Amplify your exposure with leveraged trading</p>
        </div>
      </div>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>High Risk Warning</AlertTitle>
        <AlertDescription>
          Leveraged trading can result in significant losses. You may lose more than your initial investment.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList>
          <TabsTrigger value="create">Create Position</TabsTrigger>
          <TabsTrigger value="positions">My Positions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layers className="mr-2 h-5 w-5 text-primary" />
                  Create Leveraged Position
                </CardTitle>
                <CardDescription>Set up your leveraged trading position</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="collateral-asset">Collateral Asset</Label>
                  <Select value={collateralAsset} onValueChange={setCollateralAsset}>
                    <SelectTrigger id="collateral-asset">
                      <SelectValue placeholder="Select collateral asset" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableAssets.map((asset) => (
                        <SelectItem key={asset.symbol} value={asset.symbol}>
                          {asset.name} ({asset.symbol}) - ${asset.price.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collateral-amount">Collateral Amount</Label>
                  <Input
                    id="collateral-amount"
                    type="number"
                    placeholder="0.00"
                    value={collateralAmount}
                    onChange={(e) => setCollateralAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="leverage">Leverage Multiplier</Label>
                    <span className="text-sm font-medium">{leverageMultiplier[0]}x</span>
                  </div>
                  <Slider
                    id="leverage"
                    min={1.1}
                    max={
                      collateralAsset ? availableAssets.find((a) => a.symbol === collateralAsset)?.maxLeverage || 5 : 5
                    }
                    step={0.1}
                    value={leverageMultiplier}
                    onValueChange={setLeverageMultiplier}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1.1x (Low risk)</span>
                    <span>
                      {collateralAsset ? availableAssets.find((a) => a.symbol === collateralAsset)?.maxLeverage : 5}x
                      (High risk)
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-asset">Target Asset</Label>
                  <Select value={targetAsset} onValueChange={setTargetAsset}>
                    <SelectTrigger id="target-asset">
                      <SelectValue placeholder="Select target asset" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableAssets.map((asset) => (
                        <SelectItem key={asset.symbol} value={asset.symbol}>
                          {asset.name} ({asset.symbol})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleCreatePosition}
                  disabled={isCreating || !collateralAsset || !collateralAmount || !targetAsset}
                  className="w-full"
                >
                  {isCreating ? "Creating Position..." : "Create Leveraged Position"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Position Preview</CardTitle>
                <CardDescription>Preview of your leveraged position</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {positionDetails ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Collateral Value:</span>
                      <span className="text-sm font-medium">${positionDetails.collateralValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Position Value:</span>
                      <span className="text-sm font-medium">
                        ${positionDetails.totalPositionValue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Borrowed Amount:</span>
                      <span className="text-sm font-medium">${positionDetails.borrowedAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Liquidation Threshold:</span>
                      <span className="text-sm font-medium text-red-500">
                        ${positionDetails.liquidationPrice.toLocaleString()}
                      </span>
                    </div>

                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Risk Assessment</AlertTitle>
                      <AlertDescription>
                        {leverageMultiplier[0] > 3
                          ? "High risk position. Small price movements can result in liquidation."
                          : leverageMultiplier[0] > 2
                            ? "Medium risk position. Monitor price movements carefully."
                            : "Lower risk position with moderate leverage."}
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Fill in the form to preview your position</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="positions" className="space-y-4">
          <div className="grid gap-4">
            {mockPositions.map((position) => (
              <Card key={position.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {position.leverage}x {position.targetAsset} Position
                        <Badge variant={position.pnl > 0 ? "default" : "destructive"}>
                          {position.pnl > 0 ? "Profit" : "Loss"}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Collateral: {position.collateralAmount} {position.collateral}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${position.pnl > 0 ? "text-green-500" : "text-red-500"}`}>
                        {position.pnl > 0 ? "+" : ""}${position.pnl.toLocaleString()}
                      </div>
                      <div className={`text-sm ${position.pnl > 0 ? "text-green-500" : "text-red-500"}`}>
                        {position.pnl > 0 ? "+" : ""}
                        {position.pnlPercentage.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Position Size:</span>
                      <div className="font-medium">
                        {position.positionSize} {position.targetAsset}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Entry Price:</span>
                      <div className="font-medium">${position.entryPrice.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Current Price:</span>
                      <div className="font-medium">${position.currentPrice.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Health Factor:</span>
                      <div className={`font-medium ${position.healthFactor < 1.2 ? "text-red-500" : "text-green-500"}`}>
                        {position.healthFactor.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Health Factor</span>
                      <span>{position.healthFactor.toFixed(2)}</span>
                    </div>
                    <Progress value={Math.min(position.healthFactor * 50, 100)} className="h-2" />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Add Collateral
                    </Button>
                    <Button variant="outline" size="sm">
                      Reduce Position
                    </Button>
                    <Button variant="destructive" size="sm">
                      Close Position
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total PnL</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">+$2,100</div>
                <p className="text-xs text-muted-foreground">+7.2% overall</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
                <Layers className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Total value: $45,000</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Leverage</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.5x</div>
                <p className="text-xs text-muted-foreground">Across all positions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Medium</div>
                <p className="text-xs text-muted-foreground">Health factor: 1.64</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Chart</CardTitle>
              <CardDescription>Your leveraged positions performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Performance chart would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
