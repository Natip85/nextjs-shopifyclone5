"use client";
import { Product, Variant } from "@prisma/client";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ArrowLeft } from "lucide-react";
import { Separator } from "../ui/separator";

interface EditVariantFormProps {
  product: ProductWithVariants | null;
}
export type ProductWithVariants = Product & {
  variants: Variant[];
};
const EditVariantForm = ({ product }: EditVariantFormProps) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center mb-5">
        <Dialog>
          <Button
            type="button"
            variant={"ghost"}
            onClick={() => router.push(`/products/${product?.id}`)}
            className="hover:bg-gray-200 p-0 px-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <DialogContent className="max-w-[900px] w-[90%]">
            <DialogHeader>
              <DialogTitle className="my-3">
                Leave page with unsaved changes?
              </DialogTitle>
              <Separator />
              <DialogDescription className="py-5 text-black">
                Leaving this page will delete all unsaved changes.
              </DialogDescription>
              <Separator />
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  size={"sm"}
                  variant={"outline"}
                  className="h-[35px]"
                  // onClick={() => setLeave(!leave)}
                >
                  Stay
                </Button>
              </DialogClose>
              <Button
                type="button"
                variant="destructive"
                size={"sm"}
                onClick={() => {
                  // setLeave(!leave);
                  router.push(`/products/${product?.id}`);
                }}
                className="h-[35px]"
              >
                Leave page
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="font-bold text-2xl ml-2">{product?.title}</div>
      </div>
      <div className="lg:flex w-full">
        <div className="mr-5 w-full lg:w-[35%]">
          <div className="w-full rounded-lg overflow-hidden bg-white p-4 border-2 border-gray-200 shadow-lg mb-5">
            <div className="flex justify-between items-center">
              <div className="w-[90px] h-[90px] overflow-hidden relative aspect-video">
                <Image
                  src={
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTv2rNkxu82jwemyb3lSLkmbyLCqflQDMJPA&usqp=CAU"
                  }
                  alt="prod img"
                  priority
                  fill
                  sizes="20"
                  className="object-contain rounded-md"
                />
              </div>
              <div className="flex-1 ml-5 gap-2 flex flex-col">
                <p>{product?.title}</p>
                <div>
                  <Badge variant={"success"}>{product?.status}</Badge>
                </div>
                <div className="text-muted-foreground text-sm">
                  {
                    product?.variants
                      .map((variant) => {
                        return variant.options.map((option) => option);
                      })
                      .flat(2).length
                  }{" "}
                  {product?.variants.length! > 1 ? "variants" : "variant"}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full rounded-lg overflow-hidden bg-white p-4 border-2 border-gray-200 shadow-lg mb-5">
            <h2 className="font-semibold">Variants</h2>
            {product?.variants.map((variant) =>
              variant.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 hover:bg-gray-200 hover:cursor-pointer p-1"
                  // onClick={() => router.push(`/products/${product.id}/variants/${value.id}`)}
                >
                  <div>
                    <Image
                      priority
                      width={60}
                      height={60}
                      src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTv2rNkxu82jwemyb3lSLkmbyLCqflQDMJPA&usqp=CAU"
                      }
                      alt={product.title}
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">{option.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {/* {option.sku} */}
                    </span>
                  </div>
                  <div>${variant.price}</div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="w-full rounded-lg overflow-hidden bg-white p-4 border-2 border-gray-200 shadow-lg mb-5">
            ghthgt
          </div>
          <div className="w-full rounded-lg overflow-hidden bg-white p-4 border-2 border-gray-200 shadow-lg mb-5">
            fg
          </div>
          <div className="w-full rounded-lg overflow-hidden bg-white p-4 border-2 border-gray-200 shadow-lg mb-5">
            yighik
          </div>
          <div className="w-full rounded-lg overflow-hidden bg-white p-4 border-2 border-gray-200 shadow-lg mb-5">
            frgtr
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVariantForm;
