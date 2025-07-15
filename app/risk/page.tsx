"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ConnectWallet } from "@/components/connect-wallet"
import { useWalletContext } from "@/context/wallet-context"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Shield, TrendingUp, Activity } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { fetchRiskAssessment, simulateStressTest } from "@/lib/risk-api"

export default function RiskAssessmentPage() {
  const { connected } = useWalletContext()
  const [riskData, setRiskData] = useState(null)
  const [stressTestResults, setStressTestResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stressTestLoading, setStressTestLoading] = useState(false)
  const [priceDropPercentage, setPriceDropPercentage] = useState([20])

  useEffect(() => {
    const getRiskData = async () => {
      if (!connected) {
        setLoading(false)
        return
      }

      try {
        const data = await fetchRiskAssessment()
        setRiskData(data)
      } catch (error) {
        console.error("Failed to fetch risk assessment:", error)
      } finally {
        setLoading(false)
      }
    }

    getRiskData()
  }, [connected])

  const runStressTest = async () => {
    setStressTestLoading(true)
    try {
      const results = await simulateStressTest(priceDropPercentage[0])
      setStressTestResults(results)
    } catch (error) {
      console.error("Failed to run stress test:", error)
    } finally {
      setStressTestLoading(false)
    }
  }

  if (!connected) {
    return (
      <div className="container mx-auto p-4 md:p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Risk Assessment</h1>
            <p className="text-muted-foreground">Analyze and manage your portfolio risk</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Connect your wallet to assess risk</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Get detailed risk analysis and stress testing for your positions.
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
          <h1 className="text-3xl font-bold">Risk Assessment</h1>
          <p className="text-muted-foreground">Analyze and manage your portfolio risk</p>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Risk Overview</TabsTrigger>
            <TabsTrigger value="stress-test">Stress Testing</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7.2/10</div>
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 mt-2">
                    Moderate Risk
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Liquidation Risk</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Low</div>
                  <p className="text-xs text-muted-foreground mt-2">Health Factor: 1.82</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Concentration Risk</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Medium</div>
                  <p className="text-xs text-muted-foreground mt-2">65% in ETH</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Volatility Risk</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">High</div>
                  <p className="text-xs text-muted-foreground mt-2">30-day volatility: 45%</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Breakdown</CardTitle>
                  <CardDescription>Detailed risk analysis by category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Market Risk</span>
                      <span>8.5/10</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Liquidity Risk</span>
                      <span>4.2/10</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Credit Risk</span>
                      <span>3.1/10</span>
                    </div>
                    <Progress value={31} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Operational Risk</span>
                      <span>2.8/10</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Metrics</CardTitle>
                  <CardDescription>Key risk indicators for your portfolio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Value at Risk (95%)</span>
                    <span className="text-sm font-medium">$2,341</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Expected Shortfall</span>
                    <span className="text-sm font-medium">$3,892</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Maximum Drawdown</span>
                    <span className="text-sm font-medium">-15.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sharpe Ratio</span>
                    <span className="text-sm font-medium">1.24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Beta (vs ETH)</span>
                    <span className="text-sm font-medium">0.87</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stress-test" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Stress Test Simulator</CardTitle>
                <CardDescription>Test how your portfolio would perform under adverse market conditions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="price-drop">Market Price Drop</Label>
                    <span className="text-sm font-medium">{priceDropPercentage[0]}%</span>
                  </div>
                  <Slider
                    id="price-drop"
                    min={5}
                    max={50}
                    step={5}
                    value={priceDropPercentage}
                    onValueChange={setPriceDropPercentage}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5% (Minor correction)</span>
                    <span>50% (Major crash)</span>
                  </div>
                </div>

                <Button onClick={runStressTest} disabled={stressTestLoading} className="w-full">
                  {stressTestLoading ? "Running Stress Test..." : "Run Stress Test"}
                </Button>

                {stressTestResults && (
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">Stress Test Results</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">New Health Factor</span>
                          <span
                            className={`text-sm font-medium ${stressTestResults.newHealthFactor < 1.1 ? "text-red-500" : "text-green-500"}`}
                          >
                            {stressTestResults.newHealthFactor.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Portfolio Value Loss</span>
                          <span className="text-sm font-medium text-red-500">
                            -${stressTestResults.portfolioLoss.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Liquidation Risk</span>
                          <Badge variant={stressTestResults.liquidationRisk === "High" ? "destructive" : "outline"}>
                            {stressTestResults.liquidationRisk}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Required Collateral</span>
                          <span className="text-sm font-medium">
                            ${stressTestResults.requiredCollateral.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Margin Call Threshold</span>
                          <span className="text-sm font-medium">
                            ${stressTestResults.marginCallThreshold.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Recovery Time</span>
                          <span className="text-sm font-medium">{stressTestResults.recoveryTime}</span>
                        </div>
                      </div>
                    </div>

                    {stressTestResults.liquidationRisk === "High" && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>High Liquidation Risk</AlertTitle>
                        <AlertDescription>
                          Your position would be at high risk of liquidation under these conditions. Consider reducing
                          leverage or adding more collateral.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                    Risk Reduction Recommendations
                  </CardTitle>
                  <CardDescription>Actions to improve your risk profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg border">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                      <div>
                        <h4 className="font-medium">Reduce ETH Concentration</h4>
                        <p className="text-sm text-muted-foreground">
                          65% of your portfolio is in ETH. Consider diversifying into stablecoins or other assets.
                        </p>
                        <Badge variant="outline" className="mt-2">
                          High Priority
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg border">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                      <div>
                        <h4 className="font-medium">Increase Health Factor Buffer</h4>
                        <p className="text-sm text-muted-foreground">
                          Add more collateral or reduce borrowing to maintain a health factor above 2.0.
                        </p>
                        <Badge variant="outline" className="mt-2">
                          Medium Priority
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg border">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <div>
                        <h4 className="font-medium">Enable Auto-Repay</h4>
                        <p className="text-sm text-muted-foreground">
                          Set up automatic loan repayment to prevent liquidation during market volatility.
                        </p>
                        <Badge variant="outline" className="mt-2">
                          Low Priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Monitoring Alerts</CardTitle>
                  <CardDescription>Set up alerts to monitor your risk levels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Health Factor Alert</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Alert when below:</span>
                        <Badge variant="outline">1.5</Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Portfolio Loss Alert</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Alert when loss exceeds:</span>
                        <Badge variant="outline">10%</Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
