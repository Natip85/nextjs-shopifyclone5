"use client";
import { Minus, Plus, ShoppingBag, ShoppingBagIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useState } from "react";

const SideDrawer = () => {
  const [goal, setGoal] = useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <ShoppingBag />
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-3 justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBagIcon /> Mini cart
              </div>
              <DrawerClose asChild>
                <Button variant="link">
                  <X />
                </Button>
              </DrawerClose>
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">Put stuff here</div>
          <DrawerFooter>
            <Button>Checkout</Button>
            <DrawerClose asChild>
              <Button variant="outline">Continue shopping</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SideDrawer;
