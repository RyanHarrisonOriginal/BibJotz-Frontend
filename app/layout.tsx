
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider } from "@/components/ui/SideBar/sidebarProvider";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { QueryProvider } from "@/components/providers/QueryProvider";
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
    <ClerkProvider>
      <QueryProvider>
        <SidebarProvider>
          <html lang="en" className={`${inter.variable} ${lora.variable}`}>
            <body>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </body>
          </html>
        </SidebarProvider>
      </QueryProvider>
    </ClerkProvider>
  );
}
