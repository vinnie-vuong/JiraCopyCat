import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Inter } from 'next/font/google'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { shadesOfPurple } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Zcrum",
  description: "Project management app",
};

export default async function RootLayout({ children }) {
  return (
    <ClerkProvider
      dynamic
      appearance={{
        baseTheme: shadesOfPurple,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#1a202c",
          colorInputBackground: "#2D3748",
          colorInputText: "#F3F4F6",
        },
        elements: {
          formButtonPrimary: "text-white",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} dotted-background`}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <footer className="bg-gray-900 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made with love by Vinnie 🦄🌈✨👋🌎🌍🌏✨🌈🦄</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}