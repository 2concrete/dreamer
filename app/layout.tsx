import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DreamProvider } from "./hooks/DreamProvider";
import NewDream from "./components/NewDream";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dreamer",
  description: "track your dreams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DreamProvider>
        <header className="lg:w-xl md:w-lg sm:w-lg w-auto px-4 mx-auto font-sans lg:mt-16 md:lg-16 sm:lg-16 mt-3">
          <span className="flex justify-between w-full">
            <span className="text-lg font-extralight">dreamer</span>
            <NewDream />
          </span>
        </header>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
          >
            {children}
          </body>
        </html>
      </DreamProvider>
    </>
  );
}
