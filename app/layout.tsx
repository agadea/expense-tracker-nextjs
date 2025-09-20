import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import { Roboto } from "next/font/google";

import "./globals.css";
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your expenses and create a budget.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={roboto.className} suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          {/* <Header /> */}
          <Toaster /> 
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
