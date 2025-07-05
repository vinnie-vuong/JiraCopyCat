import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";


export const metadata = {
  title: "Zcrum",
  description: "Project management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}