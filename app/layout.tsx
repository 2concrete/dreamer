import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { DreamProvider } from "./hooks/DreamProvider";
import NewDream from "./components/NewDream";
import { dark, shadcn } from "@clerk/ui/themes";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <ClerkProvider appearance={{ theme: shadcn }}>
          <span className="flex gap-2 text-lg px-1.5 absolute top-0 font-sans font-extralight">
            <Show when="signed-out">
              <SignInButton>
                <button className="hover:opacity-70 cursor-pointer duration-400 transition-all ">
                  sign in
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="hover:opacity-70 cursor-pointer duration-400 transition-all">
                  sign up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <button className="pt-1.5">
                <UserButton />
              </button>
            </Show>
          </span>
          <DreamProvider>
            <header className="lg:w-xl md:w-lg sm:w-lg w-auto px-4 mx-auto font-sans lg:mt-16 md:lg-16 sm:lg-16 mt-3">
              <span className="flex justify-between w-full">
                <span className="text-lg font-extralight">dreamer</span>
                <span className="flex gap-4">
                  <NewDream />
                </span>
              </span>
            </header>
            {children}
          </DreamProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
