"use client";
import * as z from "zod";
import { createProductSchema } from "@/validations/createProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FulfillmentStatusLabel,
  Image as prisImg,
  Product,
  Variant,
} from "@prisma/client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Loader2,
  Loader2Icon,
  Pencil,
  PencilLine,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { WeightUnits } from "@/lib/utils";

interface AddProductFormProps {
  product: ProductWithVariants | null;
}
export type ProductWithVariants = Product & {
  variants: Variant[];
};
const AddProductForm = ({ product }: AddProductFormProps) => {
  console.log("FORMPRODUCT>>>", product);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<prisImg[] | undefined>(product?.images);
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const [shipping, setShipping] = useState(true);
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: product || {
      title: "",
      description: "",
      taxable: true,
      price: 0,
      comparePriceAt: 0,
      totalInventory: 0,
      weight: 0,
    },
  });
  function onSubmit(values: z.infer<typeof createProductSchema>) {
    console.log("VALUES>>>", values);
  }
  return (
    <div className="bg-green-200 p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-red-300 p-2">
          <div className="bg-blue-400 w-[200px]">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Short sleeve t-shirt" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product description *</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="bg-purple-500">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-3">
                  <FormLabel>Uppload an image *</FormLabel>
                  <FormDescription>
                    Choose an image that will show-case your hotel
                  </FormDescription>
                  <FormControl>
                    {images ? (
                      <>
                        <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
                          <Image
                            fill
                            sizes="30"
                            src={""}
                            alt="Hotel image"
                            className="object-contain"
                          />
                          <Button
                            // onClick={() => handleImageDelete(image)}
                            type="button"
                            variant={"ghost"}
                            size={"icon"}
                            className="absolute right-[-12px] top-0"
                          >
                            {imageIsDeleting ? <Loader2 /> : <XCircle />}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col items-center max-w-[400px]">
                          {/* <UploadDropzone
                            className="w-full"
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              setImage(res[0].url);
                              toast({
                                variant: "success",
                                description: "Upload Completed",
                              });
                            }}
                            onUploadError={(error: Error) => {
                              toast({
                                variant: "destructive",
                                description: `ERROR! ${error.message}`,
                              });
                            }}
                          /> */}
                          doprzone here
                        </div>
                      </>
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="bg-yellow-400 w-[200px]">
            <h2 className="font-semibold">Pricing</h2>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">Price</FormLabel>
                  <FormControl>
                    <Input placeholder="$ 0.00" {...field} type="number" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comparePriceAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compare-at price</FormLabel>
                  <FormControl>
                    <Input placeholder="$ 0.00" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taxable"
              render={({ field }) => (
                <FormItem className="flex items-end space-x-2 rounded-md border p-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-xs cursor-pointer">
                    Charge tax on this product
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
          <div className="bg-orange-400 w-[200px]">
            <h2 className="font-semibold">Inventory</h2>
            {/* <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal">
                    SKU (Stock Keeping Unit)
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="totalInventory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="bg-red-600">
            <h2 className="font-semibold">Shipping</h2>

            <Checkbox
              checked={shipping}
              onCheckedChange={() => setShipping(!shipping)}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="weightUnit"
              render={({ field }) => (
                <FormItem>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a weight unit"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {WeightUnits.map((unit) => {
                        return (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            /> */}
          </div>
          {product ? (
            <div>
              <Button disabled={isLoading} className="max-w-[150px]">
                {isLoading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4" /> Updating
                  </>
                ) : (
                  <>
                    <PencilLine className="mr-2 h-4 w-4" /> Update
                  </>
                )}
              </Button>
            </div>
          ) : (
            <>
              <Button disabled={isLoading} className="max-w-[150px]">
                {isLoading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4" /> Creating
                  </>
                ) : (
                  <>
                    <Pencil className="mr-2 h-4 w-4" /> Create product
                  </>
                )}
              </Button>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AddProductForm;
