"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ConnectWallet } from "@/components/connect-wallet"
import { useWalletContext } from "@/context/wallet-context"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Cpu, Shield, Zap, TrendingUp, BarChart } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StrategiesPage() {
  const { connected } = useWalletContext()
  const [autoRepayEnabled, setAutoRepayEnabled] = useState(false)
  const [yieldOptimizationEnabled, setYieldOptimizationEnabled] = useState(false)
  const [healthFactorThreshold, setHealthFactorThreshold] = useState([1.5])

  if (!connected) {
    return (
      <div className="container mx-auto p-4 md:p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Automated Strategies</h1>
            <p className="text-muted-foreground">Set up automated strategies to optimize your positions</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Connect your wallet to set up strategies</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Automated strategies help you manage your positions and optimize your returns without manual intervention.
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
          <h1 className="text-3xl font-bold">Automated Strategies</h1>
          <p className="text-muted-foreground">Set up automated strategies to optimize your positions</p>
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Preview Mode</AlertTitle>
        <AlertDescription>
          You are in preview mode. Strategy settings are simulated and no real actions will be taken.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="auto-repay" className="space-y-4">
        <TabsList>
          <TabsTrigger value="auto-repay">Auto-Repay</TabsTrigger>
          <TabsTrigger value="yield-optimization">Yield Optimization</TabsTrigger>
          <TabsTrigger value="dca">Dollar-Cost Averaging</TabsTrigger>
          <TabsTrigger value="templates">Strategy Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="auto-repay" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-primary" /> Auto-Repay Strategy
                  </CardTitle>
                  <CardDescription>
                    Automatically repay your loans when health factor drops below threshold
                  </CardDescription>
                </div>
                <Switch
                  checked={autoRepayEnabled}
                  onCheckedChange={setAutoRepayEnabled}
                  aria-label="Toggle auto-repay"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="health-factor">Health Factor Threshold</Label>
                  <span className="text-sm font-medium">{healthFactorThreshold[0].toFixed(2)}</span>
                </div>
                <Slider
                  id="health-factor"
                  min={1.05}
                  max={2}
                  step={0.05}
                  value={healthFactorThreshold}
                  onValueChange={setHealthFactorThreshold}
                  disabled={!autoRepayEnabled}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Risky (1.05)</span>
                  <span>Safe (2.00)</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="repay-asset">Repayment Asset</Label>
                <Select disabled={!autoRepayEnabled} defaultValue="usdc">
                  <SelectTrigger id="repay-asset">
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usdc">USDC</SelectItem>
                    <SelectItem value="dai">DAI</SelectItem>
                    <SelectItem value="eth">ETH</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Select which asset to use for automatic repayments</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-repay">Maximum Repayment (% of debt)</Label>
                <div className="flex items-center gap-2">
                  <Input id="max-repay" type="number" placeholder="50" disabled={!autoRepayEnabled} defaultValue="50" />
                  <span>%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Maximum percentage of debt to repay in a single transaction
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button disabled={!autoRepayEnabled}>Save Strategy</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Auto-Repay History</CardTitle>
              <CardDescription>Recent automatic repayments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-8 text-center">
                <p className="text-muted-foreground">No automatic repayments have been made yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yield-optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-primary" /> Yield Optimization
                  </CardTitle>
                  <CardDescription>Automatically move your assets to the highest yielding markets</CardDescription>
                </div>
                <Switch
                  checked={yieldOptimizationEnabled}
                  onCheckedChange={setYieldOptimizationEnabled}
                  aria-label="Toggle yield optimization"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="min-apy-diff">Minimum APY Difference</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="min-apy-diff"
                    type="number"
                    placeholder="0.5"
                    disabled={!yieldOptimizationEnabled}
                    defaultValue="0.5"
                  />
                  <span>%</span>
                </div>
                <p className="text-xs text-muted-foreground">Minimum APY difference required to trigger rebalancing</p>
              </div>

              <div className="space-y-2">
                <Label>Assets to Optimize</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="optimize-eth" disabled={!yieldOptimizationEnabled} defaultChecked />
                    <label
                      htmlFor="optimize-eth"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Ethereum (ETH)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="optimize-usdc" disabled={!yieldOptimizationEnabled} defaultChecked />
                    <label
                      htmlFor="optimize-usdc"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      USD Coin (USDC)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="optimize-dai" disabled={!yieldOptimizationEnabled} defaultChecked />
                    <label
                      htmlFor="optimize-dai"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Dai (DAI)
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rebalance-frequency">Rebalancing Frequency</Label>
                <Select disabled={!yieldOptimizationEnabled} defaultValue="weekly">
                  <SelectTrigger id="rebalance-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">How often to check and rebalance your assets</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button disabled={!yieldOptimizationEnabled}>Save Strategy</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Yield Optimization History</CardTitle>
              <CardDescription>Recent yield optimization actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-8 text-center">
                <p className="text-muted-foreground">No yield optimization actions have been taken yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dca" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="mr-2 h-5 w-5 text-primary" /> Dollar-Cost Averaging
              </CardTitle>
              <CardDescription>
                Automatically deposit assets at regular intervals to average your entry price
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <Cpu className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Coming Soon</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md">
                    Dollar-Cost Averaging strategies are currently in development and will be available soon.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" /> Conservative
                </CardTitle>
                <CardDescription>Low risk, stable returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Auto-Repay</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Health Factor Threshold</span>
                    <span>1.75</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Yield Optimization</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Rebalancing Frequency</span>
                    <span>Monthly</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Apply Template</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" /> Balanced
                </CardTitle>
                <CardDescription>Moderate risk, higher returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Auto-Repay</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Health Factor Threshold</span>
                    <span>1.5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Yield Optimization</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Rebalancing Frequency</span>
                    <span>Weekly</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Apply Template</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-primary" /> Aggressive
                </CardTitle>
                <CardDescription>Higher risk, maximum returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Auto-Repay</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Health Factor Threshold</span>
                    <span>1.2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Yield Optimization</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      Enabled
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Rebalancing Frequency</span>
                    <span>Daily</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Apply Template</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
