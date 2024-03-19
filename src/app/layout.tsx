import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

import './globals.css'
import { Toaster } from "@/component/auth/ui/sonner";
// import { auth } from '../auth';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "T&C",
  description: "Testing and commissioning",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const session = await auth();

  return (
    <SessionProvider >
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}
