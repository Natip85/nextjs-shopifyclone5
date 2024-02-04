import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AuthContext from "@/components/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/nav/Sidebar";
import getCurrentUser from "@/actions/getCurrentUser";
import MainNavbar from "@/components/nav/MainNavbar";

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
          <Toaster />
          <MainNavbar currentUser={currentUser} />
          <main className="flex flex-row">
            <Sidebar />
            <section className="flex min-h-screen flex-1 flex-col items-center px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
              <div className="w-full max-w-5xl bg-red-500">{children}</div>
            </section>
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
