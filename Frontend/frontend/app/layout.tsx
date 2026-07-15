import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FixFlow | ระบบแจ้งซ่อมออนไลน์",
  description: "FixFlow - แจ้งปัญหา ติดตามสถานะ และจัดการงานซ่อมออนไลน์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col overflow-x-hidden">

        {/* Floating animated background */}
        <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-sky-50 via-white to-emerald-50">
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl animate-float" />
          <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-teal-300/30 blur-3xl animate-float" />
        </div>

        {children}
      </body>
    </html>
  );
}
