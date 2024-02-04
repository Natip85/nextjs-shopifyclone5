"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";

type TobarProps = {
  currentUser: any;
};
const Topbar = ({ currentUser }: TobarProps) => {
  const [topOfPage, setTopOfPage] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setTopOfPage(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (pathname !== "/") return null;

  return (
    <div
      className={cn(
        "fixed top-0 z-30 w-full py-6 px-4",
        topOfPage ? "" : "bg-stone-900"
      )}
    >
      <div className="flex justify-between items-center">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src={"/logo.svg"}
            alt="logo"
            width="30"
            height="30"
            className="aspect-square"
          />
          <div
            className={cn("font-bold text-xl", topOfPage ? "" : "text-white")}
          >
            Shopifyclone
          </div>
        </div>
        {/* <SearchInput /> */}
        <div className="flex gap-1 items-center">
          <div className="flex mr-2">
            {/* <ThemeToggle /> */}toggle
            {/* <NavMenu /> */}
          </div>
          {/* <UserButton afterSignOutUrl="/" /> */}
          {!currentUser ? (
            <div className="flex gap-2 items-center">
              <Link
                href={"/auth"}
                className={cn("hover:underline", topOfPage ? "" : "text-white")}
              >
                Sign in
              </Link>
              <Button
                onClick={() => router.push("/auth")}
                size={"sm"}
                className={cn(
                  "rounded-2xl py-4 px-5",
                  topOfPage ? "" : "bg-white text-black"
                )}
              >
                Sign up now
              </Button>
            </div>
          ) : (
            <div>
              <Button
                onClick={() => router.push("/store")}
                size={"sm"}
                className={cn(
                  "py-4 px-5",
                  topOfPage ? "" : "bg-white text-black hover:text-white"
                )}
              >
                Go to admin
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
