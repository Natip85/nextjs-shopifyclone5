import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Topbar from "@/components/nav/Topbar";
import getCurrentUser from "@/actions/getCurrentUser";
import AuthContext from "@/components/AuthContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopify",
  description: "A clone of Shopify",
  icons: { icon: "/logo.svg" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <AuthContext>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <main className="flex flex-col min-h-screen bg-secondary">
              <Topbar currentUser={currentUser} />
              <section className="flex-grow">{children}</section>
            </main>
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  );
}
