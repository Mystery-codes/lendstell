"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, CheckCircle, Info, Trash2, Settings } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "warning",
      title: "Health Factor Warning",
      message: "Your health factor is approaching the liquidation threshold.",
      timestamp: "2023-06-15T14:32:21Z",
      read: false,
    },
    {
      id: "2",
      type: "success",
      title: "Deposit Successful",
      message: "Successfully deposited 2.5 ETH into the protocol.",
      timestamp: "2023-06-14T09:15:43Z",
      read: false,
    },
    {
      id: "3",
      type: "info",
      title: "Interest Rate Update",
      message: "The interest rate for USDC has changed to 5.1% APY.",
      timestamp: "2023-06-10T16:45:12Z",
      read: true,
    },
    {
      id: "4",
      type: "success",
      title: "Borrow Successful",
      message: "Successfully borrowed 5,000 USDC from the protocol.",
      timestamp: "2023-06-05T11:22:33Z",
      read: true,
    },
    {
      id: "5",
      type: "warning",
      title: "Market Volatility Alert",
      message: "High market volatility detected. Consider adjusting your positions.",
      timestamp: "2023-06-01T08:12:45Z",
      read: true,
    },
  ])

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    healthFactorAlerts: true,
    transactionUpdates: true,
    marketAlerts: false,
    governanceUpdates: true,
  })

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && <Badge className="ml-2">{unreadCount} unread</Badge>}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark all as read
          </Button>
          <Button variant="outline" onClick={clearAllNotifications} disabled={notifications.length === 0}>
            Clear all
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>View all your recent notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No notifications</h3>
                    <p className="text-muted-foreground">You don't have any notifications yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`rounded-lg border p-4 ${!notification.read ? "bg-muted/30" : ""}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            {getNotificationIcon(notification.type)}
                            <div>
                              <h3 className="font-medium">{notification.title}</h3>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{formatDate(notification.timestamp)}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                Mark as read
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="unread">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>View your unread notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                {notifications.filter((n) => !n.read).length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">All caught up!</h3>
                    <p className="text-muted-foreground">You have no unread notifications</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notifications
                      .filter((notification) => !notification.read)
                      .map((notification) => (
                        <div key={notification.id} className="rounded-lg border p-4 bg-muted/30">
                          <div className="flex items-start justify-between">
                            <div className="flex gap-3">
                              {getNotificationIcon(notification.type)}
                              <div>
                                <h3 className="font-medium">{notification.title}</h3>
                                <p className="text-sm text-muted-foreground">{notification.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {formatDate(notification.timestamp)}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                Mark as read
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
              <CardDescription>View important alerts and warnings</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                {notifications.filter((n) => n.type === "warning").length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No alerts</h3>
                    <p className="text-muted-foreground">You don't have any alerts at the moment</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notifications
                      .filter((notification) => notification.type === "warning")
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className={`rounded-lg border p-4 ${!notification.read ? "bg-muted/30" : ""}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex gap-3">
                              {getNotificationIcon(notification.type)}
                              <div>
                                <h3 className="font-medium">{notification.title}</h3>
                                <p className="text-sm text-muted-foreground">{notification.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {formatDate(notification.timestamp)}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {!notification.read && (
                                <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                  Mark as read
                                </Button>
                              )}
                              <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>View notifications related to your transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                {notifications.filter((n) => n.type === "success").length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No transaction notifications</h3>
                    <p className="text-muted-foreground">You don't have any transaction notifications</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notifications
                      .filter((notification) => notification.type === "success")
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className={`rounded-lg border p-4 ${!notification.read ? "bg-muted/30" : ""}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex gap-3">
                              {getNotificationIcon(notification.type)}
                              <div>
                                <h3 className="font-medium">{notification.title}</h3>
                                <p className="text-sm text-muted-foreground">{notification.message}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {formatDate(notification.timestamp)}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {!notification.read && (
                                <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                                  Mark as read
                                </Button>
                              )}
                              <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Delivery Methods</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Types</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="health-factor-alerts">Health Factor Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts when your health factor is at risk</p>
                  </div>
                  <Switch
                    id="health-factor-alerts"
                    checked={settings.healthFactorAlerts}
                    onCheckedChange={(checked) => setSettings({ ...settings, healthFactorAlerts: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="transaction-updates">Transaction Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about your transactions</p>
                  </div>
                  <Switch
                    id="transaction-updates"
                    checked={settings.transactionUpdates}
                    onCheckedChange={(checked) => setSettings({ ...settings, transactionUpdates: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="market-alerts">Market Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts about market conditions</p>
                  </div>
                  <Switch
                    id="market-alerts"
                    checked={settings.marketAlerts}
                    onCheckedChange={(checked) => setSettings({ ...settings, marketAlerts: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="governance-updates">Governance Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about governance proposals</p>
                  </div>
                  <Switch
                    id="governance-updates"
                    checked={settings.governanceUpdates}
                    onCheckedChange={(checked) => setSettings({ ...settings, governanceUpdates: checked })}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
