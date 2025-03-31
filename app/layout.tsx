import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Softleo Agentic RAG",
  description: "An AI assistant for Softleo LLC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <SidebarProvider defaultOpen={true}>
            <div className="flex flex-col h-screen w-full overflow-hidden bg-white dark:bg-zinc-950">
              <Header />
              <div className="flex flex-1 overflow-hidden pt-0">
                <AppSidebar />
                <SidebarInset>
                  <div className="flex flex-1 flex-col h-full">{children}</div>
                </SidebarInset>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
