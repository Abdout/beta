import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Side from "@/component/layout/side";
import Header from "@/component/layout/header";
import { MainProvider } from "@/provider/main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "T&C",
  description: "Testing and commissioning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainProvider>
      <html lang="en">
        <body className={`${inter.className} flex`}>
        <div className="w-1/5">
          <Side />
        </div>
        <div className="w-4/5 flex flex-col">
          <Header />
          {children}
        </div>
        </body>
      </html>
    </MainProvider>
  );
}
