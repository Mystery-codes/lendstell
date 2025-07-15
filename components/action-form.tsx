"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useWalletContext } from "@/context/wallet-context"
import { executeAction } from "@/lib/contract-interactions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import type { Asset } from "@/lib/api"

const formSchema = z.object({
  asset: z.string({
    required_error: "Please select an asset",
  }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
})

interface ActionFormProps {
  type: "deposit" | "withdraw" | "borrow" | "repay"
  assets: Asset[]
}

export function ActionForm({ type, assets }: ActionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { connected } = useWalletContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!connected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to perform this action",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const asset = assets.find((a) => a.id === values.asset)
      if (!asset) throw new Error("Asset not found")

      const result = await executeAction({
        type,
        assetId: values.asset,
        amount: values.amount,
      })

      toast({
        title: "Transaction submitted (Demo)",
        description: `Your ${type} transaction for ${values.amount} ${asset.symbol} has been simulated`,
      })

      form.reset()
    } catch (error) {
      console.error(`${type} error:`, error)
      toast({
        title: "Transaction failed",
        description: `Failed to ${type}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const actionTitles = {
    deposit: "Deposit Assets",
    withdraw: "Withdraw Assets",
    borrow: "Borrow Assets",
    repay: "Repay Loan",
  }

  const actionDescriptions = {
    deposit: "Deposit your assets to earn interest",
    withdraw: "Withdraw your deposited assets",
    borrow: "Borrow assets using your collateral",
    repay: "Repay your borrowed assets",
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{actionTitles[type]}</h2>
          <p className="text-muted-foreground">{actionDescriptions[type]}</p>
        </div>

        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Preview Mode</AlertTitle>
          <AlertDescription>
            You are in preview mode. Transactions are simulated and no real assets will be transferred.
          </AlertDescription>
        </Alert>

        <FormField
          control={form.control}
          name="asset"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an asset" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {assets.map((asset) => (
                    <SelectItem key={asset.id} value={asset.id}>
                      <div className="flex items-center gap-2">
                        <img
                          src={`/placeholder.svg?height=20&width=20`}
                          alt={asset.name}
                          className="h-5 w-5 rounded-full"
                        />
                        <span>
                          {asset.name} ({asset.symbol})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                {type === "deposit" || type === "repay"
                  ? "Select the asset you want to deposit or repay"
                  : "Select the asset you want to withdraw or borrow"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="0.00" {...field} type="number" step="any" />
                  {field.value && form.getValues("asset") && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
                      onClick={() => {
                        const asset = assets.find((a) => a.id === form.getValues("asset"))
                        if (asset) {
                          form.setValue("amount", asset.available.toString())
                        }
                      }}
                    >
                      MAX
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormDescription>Enter the amount you want to {type}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting || !connected}>
          {isSubmitting ? "Processing..." : `${type.charAt(0).toUpperCase() + type.slice(1)}`}
        </Button>
      </form>
    </Form>
  )
}
