
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { AppSideBar } from "@/components/layout/AppSideBar";
import { AppHeader } from "@/components/layout/AppHeader";
import { SidebarProvider } from "@/components/ui/SideBar/sidebarProvider";
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BibJotz",
  description: "BibJotz is a platform for creating and sharing your own stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body>
        <div className="min-h-screen flex w-full">
        <AppSideBar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <main className="flex-1">
            {children}
          </main>
        </div>
        </div>
      </body>
    </html>
    </SidebarProvider>
  );
}
