
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import './globals.css'
import { Toaster } from "@/component/auth/ui/sonner";
import { MainProvider } from '@/provider/main'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Databayt',
  description: 'Business Automation',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

 

  return (
    <MainProvider>
      <SessionProvider session={session}>
        <html lang="en">
          <body className={`${inter.className}  overflow-x-hidden`}>
            <Toaster />
            {children}
          </body>
        </html>
      </SessionProvider>
    </MainProvider >
  )
}
