"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Clipboard,
  EyeIcon,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "",
    accessorKey: "images",
    cell: ({ row }) => {
      const product = row.original;
      const productId = product.id;
      const images: any[] = row.getValue("images");
      const allImages = images.map((img) => {
        return img.url;
      });

      return (
        <Link href={`/products/${productId}`}>
          <div className="w-[60px] h-[60px] overflow-hidden relative aspect-video">
            <Image
              src={
                allImages[0] ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTv2rNkxu82jwemyb3lSLkmbyLCqflQDMJPA&usqp=CAU"
              }
              alt="prod img"
              priority
              fill
              sizes="20"
              className="object-contain"
            />
          </div>
        </Link>
      );
    },
  },
  {
    header: "Product",
    accessorKey: "title",
    cell: ({ row }) => {
      const product = row.original;
      const productId = product.id;
      const allTitles: string = row.getValue("title");
      return (
        <Link
          href={`/products/${productId}`}
          className="font-bold hover:underline "
        >
          {allTitles}
        </Link>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Product Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "status",
    cell: ({ row }) => {
      const product = row.original;
      const prodStatus = product.status;
      return (
        <span
          className={`inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  
          ${
            product.status === "Active"
              ? "bg-green-200 text-green-700 "
              : "bg-red-50 text-red-700 "
          }
          `}
        >
          {prodStatus}
        </span>
      );
    },
  },
  {
    header: "Product Inventory",
    accessorKey: "totalInventory",

    cell: ({ row }) => {
      const quantity = row.getValue("totalInventory") as number;
      return <span className="text-stone-500">{quantity} in stock</span>;
    },
  },

  {
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Product Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      const category = product.productCategory;
      const type = product.productType;
      return (
        <div> {category ? <span>{category}</span> : <span>{type}</span>}</div>
      );
    },
    accessorKey: "productCategory",
  },
  {
    header: "",
    id: "id",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const productId = product.id;
      return (
        <div className="flex">
          {/* <Modal
            icon={<FaTrashCan style={{ color: "red" }} />}
            onConfirm={() => handleDelete(product.id, product.images)}
            title="Delete product?"
            description="If you delete, this cannot be undone."
            btnTitle="Delete product"
          /> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Separator />
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(product.title.toString());
                }}
                className="hover:cursor-pointer"
              >
                <Clipboard className="h-4 w-4 mr-2" />
                Copy product name
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={`/products/${productId}`}
                  className="flex items-center"
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  View product
                </Link>
              </DropdownMenuItem>
              <Dialog>
                <DialogTrigger className="w-full p-1 rounded-md hover:bg-slate-100 ">
                  <div className="flex items-center hover:cursor-pointer text-sm p-1">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete product
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-[900px] w-[90%]">
                  <DialogHeader className="px-2">
                    <DialogTitle>Add a room</DialogTitle>
                    <DialogDescription>
                      Add details about the room in your hotel
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
