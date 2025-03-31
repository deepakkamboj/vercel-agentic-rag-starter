import { CheckCheck, Info, AlertTriangle, AlertCircle, X } from "lucide-react"

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type NotificationType = "info" | "success" | "warning" | "error"

interface Notification {
  id: string
  type: NotificationType
  message: string
  time: string
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "info",
    message: "New update available",
    time: "5 min ago",
  },
  {
    id: "2",
    type: "success",
    message: "Files uploaded successfully",
    time: "10 min ago",
  },
  {
    id: "3",
    type: "warning",
    message: "Storage almost full",
    time: "30 min ago",
  },
  {
    id: "4",
    type: "error",
    message: "Failed to connect to API",
    time: "1 hour ago",
  },
]

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "info":
      return <Info className="h-4 w-4 text-blue-500" />
    case "success":
      return <CheckCheck className="h-4 w-4 text-green-500" />
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-500" />
  }
}

export function NotificationDropdown() {
  return (
    <DropdownMenuContent className="w-80">
      <div className="flex items-center justify-between p-2">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <Button variant="ghost" size="sm" className="h-auto p-1 text-xs">
          Clear All
        </Button>
      </div>
      <DropdownMenuSeparator />
      <div className="max-h-80 overflow-y-auto">
        {notifications.map((notification) => (
          <DropdownMenuItem key={notification.id} className="flex cursor-pointer gap-2 p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <X className="h-3 w-3" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </DropdownMenuItem>
        ))}
      </div>
    </DropdownMenuContent>
  )
}

