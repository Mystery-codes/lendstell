"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Search, Book, MessageCircle, Mail, ExternalLink, Video, FileText } from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqItems = [
    {
      id: "what-is-lendstell",
      question: "What is Lendstell?",
      answer:
        "Lendstell is a decentralized lending protocol built on Starknet that allows users to lend and borrow crypto assets. It provides features like flash loans, leveraged positions, and automated strategies.",
    },
    {
      id: "how-to-connect-wallet",
      question: "How do I connect my wallet?",
      answer:
        "Click the 'Connect Wallet' button in the top right corner and select your preferred Starknet wallet (Argent X or Braavos). Make sure you have the wallet extension installed in your browser.",
    },
    {
      id: "what-is-health-factor",
      question: "What is a health factor?",
      answer:
        "Health factor represents the safety of your deposited assets against the borrowed assets and their underlying value. If the health factor reaches 1, the liquidation of your deposits will be triggered.",
    },
    {
      id: "liquidation-process",
      question: "How does liquidation work?",
      answer:
        "When your health factor drops below 1, your collateral can be liquidated to repay your debt. Liquidators receive a bonus for maintaining protocol solvency, typically 5-10% of the liquidated amount.",
    },
    {
      id: "flash-loans-explained",
      question: "What are flash loans?",
      answer:
        "Flash loans are uncollateralized loans that must be borrowed and repaid within the same transaction. They're useful for arbitrage, liquidations, and other advanced DeFi strategies.",
    },
    {
      id: "interest-rates",
      question: "How are interest rates determined?",
      answer:
        "Interest rates are determined algorithmically based on supply and demand. When utilization is high, rates increase to incentivize more supply and reduce demand.",
    },
    {
      id: "gas-fees",
      question: "What about gas fees?",
      answer:
        "Starknet offers significantly lower gas fees compared to Ethereum mainnet. Most transactions cost a fraction of what they would on other networks.",
    },
    {
      id: "security-measures",
      question: "How secure is Lendstell?",
      answer:
        "Lendstell has been audited by leading security firms and implements best practices including multi-signature controls, time locks, and emergency pause mechanisms.",
    },
  ]

  const tutorials = [
    {
      title: "Getting Started with Lendstell",
      description: "Learn the basics of lending and borrowing",
      duration: "5 min",
      type: "video",
    },
    {
      title: "Understanding Health Factors",
      description: "Deep dive into liquidation mechanics",
      duration: "8 min",
      type: "article",
    },
    {
      title: "Flash Loan Strategies",
      description: "Advanced techniques for flash loans",
      duration: "12 min",
      type: "video",
    },
    {
      title: "Risk Management Best Practices",
      description: "How to manage your DeFi risks",
      duration: "6 min",
      type: "article",
    },
  ]

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground">Find answers and get help with Lendstell</p>
        </div>
      </div>

      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="mr-2 h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQ..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Accordion type="single" collapsible className="w-full">
                {filteredFAQ.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFAQ.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No FAQ items found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="mr-2 h-5 w-5" />
                Tutorials & Guides
              </CardTitle>
              <CardDescription>Learn how to use Lendstell effectively</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {tutorials.map((tutorial, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {tutorial.type === "video" ? <Video className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                          {tutorial.type}
                        </Badge>
                      </div>
                      <CardDescription>{tutorial.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{tutorial.duration}</span>
                        <Button size="sm">
                          Start Tutorial
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Community Support
                </CardTitle>
                <CardDescription>Get help from the community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Discord Community
                    <ExternalLink className="ml-auto h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Telegram Group
                    <ExternalLink className="ml-auto h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Reddit Community
                    <ExternalLink className="ml-auto h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Direct Support
                </CardTitle>
                <CardDescription>Contact our support team directly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">General Support</h4>
                    <p className="text-sm text-muted-foreground">support@lendstell.com</p>
                    <p className="text-xs text-muted-foreground">Response time: 24-48 hours</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Technical Issues</h4>
                    <p className="text-sm text-muted-foreground">tech@lendstell.com</p>
                    <p className="text-xs text-muted-foreground">Response time: 12-24 hours</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Security Concerns</h4>
                    <p className="text-sm text-muted-foreground">security@lendstell.com</p>
                    <p className="text-xs text-muted-foreground">Response time: 2-6 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>Technical documentation and API references</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  View Docs
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GitHub</CardTitle>
                <CardDescription>Source code and development updates</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  View Repository
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Reports</CardTitle>
                <CardDescription>Security audit reports and findings</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  View Audits
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bug Bounty</CardTitle>
                <CardDescription>Report security vulnerabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Submit Report
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Governance</CardTitle>
                <CardDescription>Participate in protocol governance</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  View Proposals
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Page</CardTitle>
                <CardDescription>Real-time system status and uptime</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Check Status
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
