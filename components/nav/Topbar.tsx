"use client";

import { topbarLinks } from "@/constants/topbarLinks";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import { TopbarNavMenu } from "./TopbarNavMenu";
import SideDrawer from "../SideDrawer";

const Topbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-white py-2 lg:py-4">
      <div className="mx-auto box-border flex w-full max-w-screen-xl items-center justify-between px-3 lg:px-8">
        <Link href={"/"}>
          <div className="relative">
            <Image
              src={"/logo.svg"}
              alt="logo"
              width="30"
              height="30"
              className="aspect-square"
            />
          </div>
        </Link>
        <nav className="z-10 max-w-max flex-1 items-center justify-center hidden lg:block">
          <div className="relative">
            <ul className="flex flex-1 list-none items-center justify-center space-x-1">
              <TopbarNavMenu />
              {/* {topbarLinks.map((link) => {
                return (
                  <li key={link.label}>
                    <Link
                      href={link.route}
                      className="px-8 text-lg font-bold text-gray-700 transition-colors hover:text-gray-600 focus:text-gray-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })} */}
            </ul>
          </div>
        </nav>
        <div className="flex justify-between items-center gap-4">
          <div>
            <Button variant={"ghost"} className="p-0">
              <User />
            </Button>
          </div>
          <div>
            <Button variant={"ghost"} className="p-0">
              <SideDrawer />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
