"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { MoonStar, Sun, Bell, Settings, HelpCircle } from "lucide-react"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useWalletContext } from "@/context/wallet-context"
import { ConnectWallet } from "@/components/connect-wallet"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function MainNav() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { connected, address } = useWalletContext()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <SidebarTrigger />
        <NavigationMenu className="hidden md:flex ml-4">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Core</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mt-4 mb-2 text-lg font-medium text-white">Lendstell</div>
                        <p className="text-sm leading-tight text-white/90">
                          Advanced DeFi lending platform on Starknet
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/" title="Dashboard" isActive={pathname === "/"}>
                    Overview of market stats and assets
                  </ListItem>
                  <ListItem href="/positions" title="My Positions" isActive={pathname === "/positions"}>
                    View and manage your lending and borrowing
                  </ListItem>
                  <ListItem href="/actions" title="Actions" isActive={pathname === "/actions"}>
                    Deposit, withdraw, borrow, and repay
                  </ListItem>
                  <ListItem href="/liquidations" title="Liquidations" isActive={pathname === "/liquidations"}>
                    View and liquidate risky positions
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Advanced</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/portfolio" title="Portfolio Dashboard">
                    Comprehensive analytics and performance metrics
                  </ListItem>
                  <ListItem href="/strategies" title="Automated Strategies">
                    Set up auto-repay and yield optimization
                  </ListItem>
                  <ListItem href="/risk" title="Risk Assessment">
                    Stress testing and risk scoring for positions
                  </ListItem>
                  <ListItem href="/flash-loans" title="Flash Loans">
                    Zero-collateral loans for single transactions
                  </ListItem>
                  <ListItem href="/leverage" title="Leveraged Positions">
                    Create and manage leveraged positions
                  </ListItem>
                  <ListItem href="/simulator" title="Transaction Simulator">
                    Preview outcomes before execution
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Markets</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/markets/explorer" title="Market Explorer">
                    Detailed market statistics and trends
                  </ListItem>
                  <ListItem href="/markets/history" title="Historical Data">
                    Track protocol growth and liquidation events
                  </ListItem>
                  <ListItem href="/markets/yield" title="Yield Comparison">
                    Compare yields across different platforms
                  </ListItem>
                  <ListItem href="/markets/analytics" title="On-Chain Analytics">
                    Protocol TVL and user adoption metrics
                  </ListItem>
                  <ListItem href="/markets/swap" title="DEX Integration">
                    Swap assets directly in the app
                  </ListItem>
                  <ListItem href="/markets/fiat" title="Fiat On/Off Ramps">
                    Direct fiat deposits and withdrawals
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Security</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/security/insurance" title="Insurance Options">
                    Protect against liquidations and smart contract risks
                  </ListItem>
                  <ListItem href="/security/multisig" title="Multi-Signature">
                    Enhanced security for institutional users
                  </ListItem>
                  <ListItem href="/security/audit" title="Audit Dashboard">
                    Security audits and monitoring
                  </ListItem>
                  <ListItem href="/security/privacy" title="Privacy Features">
                    Private transactions and address masking
                  </ListItem>
                  <ListItem href="/security/tax" title="Tax Reporting">
                    Generate reports for lending/borrowing activities
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Community</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/community/social" title="Social Trading">
                    Follow successful strategies and leaderboards
                  </ListItem>
                  <ListItem href="/community/referral" title="Referral Program">
                    Earn rewards for referring new users
                  </ListItem>
                  <ListItem href="/community/learn" title="Educational Content">
                    Interactive tutorials on DeFi concepts
                  </ListItem>
                  <ListItem href="/community/governance" title="Governance">
                    Vote on protocol parameters and proposals
                  </ListItem>
                  <ListItem href="/community/forum" title="Community Forum">
                    Discuss features and development roadmap
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:flex">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
          </Button>

          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
            </Button>
          </Link>

          <Link href="/help">
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>

          {connected ? (
            <Link href="/profile">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>{address ? address.substring(0, 2).toUpperCase() : "US"}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <div className="hidden md:block">
              <ConnectWallet />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { isActive?: boolean }>(
  ({ className, title, children, isActive, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              isActive && "bg-accent text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
