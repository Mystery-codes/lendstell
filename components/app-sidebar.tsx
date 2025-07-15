"use client"

import {
  LayoutDashboard,
  Wallet,
  BarChart3,
  ArrowDownUp,
  AlertTriangle,
  LogOut,
  LineChart,
  Zap,
  Shield,
  Users,
  BookOpen,
  Layers,
  Briefcase,
  Cpu,
  BarChart2,
  DollarSign,
  Settings,
  HelpCircle,
  Bell,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useWalletContext } from "@/context/wallet-context"
import { toast } from "@/components/ui/use-toast"

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { connected, disconnect } = useWalletContext()

  const coreMenuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
    },
    {
      title: "My Positions",
      icon: BarChart3,
      href: "/positions",
    },
    {
      title: "Actions",
      icon: ArrowDownUp,
      href: "/actions",
    },
    {
      title: "Liquidations",
      icon: AlertTriangle,
      href: "/liquidations",
    },
  ]

  const advancedMenuItems = [
    {
      title: "Portfolio",
      icon: Briefcase,
      href: "/portfolio",
    },
    {
      title: "Strategies",
      icon: Cpu,
      href: "/strategies",
    },
    {
      title: "Risk Assessment",
      icon: Shield,
      href: "/risk",
    },
    {
      title: "Flash Loans",
      icon: Zap,
      href: "/flash-loans",
    },
    {
      title: "Leverage",
      icon: Layers,
      href: "/leverage",
    },
  ]

  const marketMenuItems = [
    {
      title: "Market Explorer",
      icon: BarChart2,
      href: "/markets/explorer",
    },
    {
      title: "Yield Comparison",
      icon: LineChart,
      href: "/markets/yield",
      disabled: true,
    },
    {
      title: "DEX Integration",
      icon: DollarSign,
      href: "/markets/swap",
      disabled: true,
    },
  ]

  const communityMenuItems = [
    {
      title: "Social Trading",
      icon: Users,
      href: "/community/social",
      disabled: true,
    },
    {
      title: "Learn",
      icon: BookOpen,
      href: "/community/learn",
      disabled: true,
    },
  ]

  const otherMenuItems = [
    {
      title: "Notifications",
      icon: Bell,
      href: "/notifications",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
    {
      title: "Help",
      icon: HelpCircle,
      href: "/help",
    },
  ]

  const handleNavigation = (href: string, title: string, disabled?: boolean) => {
    if (disabled) {
      toast({
        title: "Coming Soon",
        description: `${title} feature is currently in development`,
      })
      return
    }

    router.push(href)
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-center py-6">
        <Link href="/" className="flex items-center space-x-2">
          <Wallet className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Lendstell</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Core Section */}
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-tight text-muted-foreground">Core</h3>
          <SidebarMenu>
            {coreMenuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>

        <SidebarSeparator />

        {/* Advanced Section */}
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-tight text-muted-foreground">Advanced</h3>
          <SidebarMenu>
            {advancedMenuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.title}
                  onClick={() => handleNavigation(item.href, item.title, item.disabled)}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>

        <SidebarSeparator />

        {/* Markets Section */}
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-tight text-muted-foreground">Markets</h3>
          <SidebarMenu>
            {marketMenuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.title}
                  onClick={() => handleNavigation(item.href, item.title, item.disabled)}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>

        <SidebarSeparator />

        {/* Community Section */}
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-tight text-muted-foreground">Community</h3>
          <SidebarMenu>
            {communityMenuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.title}
                  onClick={() => handleNavigation(item.href, item.title, item.disabled)}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>

        <SidebarSeparator />

        {/* Other Section */}
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-tight text-muted-foreground">Other</h3>
          <SidebarMenu>
            {otherMenuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.title}
                  onClick={() => handleNavigation(item.href, item.title, item.disabled)}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter>
        {connected && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => disconnect()} tooltip="Disconnect Wallet">
                <LogOut />
                <span>Disconnect</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
