import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "./providers"
import { MainNav } from "@/components/main-nav"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lendstell - DeFi Lending Platform",
  description: "Lend, borrow, and manage positions on Starknet",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Providers>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <div className="flex flex-col min-h-screen">
                  <MainNav />
                  <main className="flex-1 p-4">{children}</main>
                </div>
              </SidebarInset>
              <Toaster />
            </SidebarProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
