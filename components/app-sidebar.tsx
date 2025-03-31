"use client";

import { useState } from "react";
import { FileText, Home, MessageSquare, Settings, Coffee } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SettingsDialog } from "./settings-dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Chat", href: "/chat", icon: MessageSquare },
    { name: "AI Agents", href: "/agents", icon: Coffee },

    { name: "RAG System", href: "/rag", icon: FileText },
  ];

  return (
    <>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="border-b">
          <div className="p-2 text-center font-semibold">Dashboard</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        flex items-center px-3 py-2 rounded-md text-sm font-medium
                        ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        }
                      `}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="flex flex-col gap-2">
          {/* Settings Button */}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Settings"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
