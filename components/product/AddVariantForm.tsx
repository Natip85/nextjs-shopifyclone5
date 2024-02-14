"use client";
import * as z from "zod";
import { Loader2Icon, Pencil, PencilLine, Trash2, XIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { createVariantSchema } from "@/validations/createVariant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Product, Variant } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "../ui/use-toast";
interface AddVariantFormProps {
  product?: Product & {
    variants: Variant[];
  };
  variant?: Variant;
  handleDialogOpen: () => void;
}
const AddVariantForm = ({
  product,
  variant,
  handleDialogOpen,
}: AddVariantFormProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [valuesData, setValuesData] = useState<string[]>(
    variant?.options.flatMap((option) =>
      option.values.map((value) => value.name ?? value.name ?? "")
    ) || []
  );
  const [pendingDataPoint, setPendingDataPoint] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log("PRODUCT>>>", product);
  console.log("VARIANT>>>>", variant);

  const form = useForm<z.infer<typeof createVariantSchema>>({
    resolver: zodResolver(createVariantSchema),
    defaultValues: variant || {
      title: "",
      options: [],
      secondOptions: [],
    },
  });

  const addPendingDataPoint = () => {
    if (pendingDataPoint) {
      const newDataPoints = new Set([...valuesData, pendingDataPoint]);
      setValuesData(Array.from(newDataPoints));
      setPendingDataPoint("");
    }
  };
  function onSubmit(values: z.infer<typeof createVariantSchema>) {
    setIsLoading(true);
    if (product && variant) {
      //UPDATE
      const options = valuesData.map((value) => ({
        id: uuidv4(),
        name: values.title,
        values: {
          id: uuidv4(),
          price: 0,
          title: values.title,
          name: value,
          weight: 0,
          weightUnit: "lb",
          inventoryQuantity: 0,
          sku: uuidv4(),
          images: [],
        },
      }));
      const finalData = {
        options: options,
        title: values.title,
      };
      axios
        .patch(`/api/variant/${variant.id}`, finalData)
        .then((res) => {
          toast({
            variant: "success",
            description: "Variant updated",
          });

          handleDialogOpen();
          router.refresh();
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
          setIsLoading(false);
        });
    } else {
      //CREATE
      if (!product) return;
      // const prodOpts = product.variants?.map((variant) => {
      //   return variant;
      // });

      // console.log("PRODOPTS>>", prodOpts);

      // const combinations = [];

      // prodOpts.forEach((option) => {
      //   size.options.forEach((sizeOption) => {
      //     combinations.push({ name: `${colorOption.name}/${sizeOption.name}` });
      //   });
      // });

      const options = valuesData.map((value) => ({
        id: uuidv4(),
        name: values.title,
        values: {
          id: uuidv4(),
          price: 0,
          title: values.title,
          name: value,
          weight: 0,
          weightUnit: "lb",
          inventoryQuantity: 0,
          sku: uuidv4(),
          images: [],
        },
      }));

      const finalData = {
        options: options,
        title: values.title,
        available: product?.totalInventory! > 0 ? true : false,
        comparePriceAt: 0,
        price: 0,
        requiresShipping: true,
        sku: uuidv4(),
        taxable: product?.taxable,
        weight: 0,
        weightUnit: "lb",
        inventoryQuantity: 0,
      };

      axios
        .post("/api/variant", { ...finalData, parentId: product?.id })
        .then((res) => {
          toast({
            variant: "success",
            description: "Variant created",
          });
          setIsLoading(false);
          handleDialogOpen();
          router.refresh();
        })
        .catch((err) => {
          console.log(err);
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
          setIsLoading(false);
        });
    }
  }

  const handleDeleteVariant = (variant: Variant) => {
    setIsLoading(true);

    const imageKeys = variant.images.map((imgKey) => {
      return imgKey.key;
    });

    axios
      .post("/api/uploadthing/delete", { imageKeys: [imageKeys] })
      .then(() => {
        axios.delete(`/api/variant/${variant.id}`);
      })
      .then(() => {
        toast({
          variant: "success",
          description: "Variant deleted",
        });
        setIsLoading(false);
        handleDialogOpen();
        router.refresh();
      })
      .catch(() => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          description: "Something went wrong deleting",
        });
      })
      .catch(() => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          description: "Something went wrong deleting",
        });
      });
  };
  return (
    <div>
      <Form {...form}>
        <div className="border rounded-md p-4">
          <div>
            <div className="flex justify-between items-end mb-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Option name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Like Color or Size..."
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-end justify-between">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="options"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Add option value(s)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Like Blue or Medium..."
                          value={pendingDataPoint}
                          onChange={(e) => setPendingDataPoint(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addPendingDataPoint();
                            } else if (e.key === "," || e.key === " ") {
                              e.preventDefault();
                              addPendingDataPoint();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                size={"sm"}
                variant={"outline"}
                onClick={addPendingDataPoint}
                className="ml-5"
              >
                Add
              </Button>
            </div>
            <div className="min-h-[2.5rem] overflow-y-auto p-2 flex gap-2 flex-wrap items-center mt-2">
              {valuesData.map((item, idx) => (
                <Badge key={idx} variant="secondary">
                  {item}
                  <button
                    type="button"
                    className="w-3 ml-2"
                    onClick={() => {
                      setValuesData(valuesData.filter((i) => i !== item));
                    }}
                  >
                    <XIcon className="w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-4 pb-2">
          {variant ? (
            <div className="flex gap-2">
              <Button
                onClick={form.handleSubmit(onSubmit)}
                type="button"
                disabled={isLoading}
                className="h-[30px]"
              >
                {isLoading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4" /> Updating...
                  </>
                ) : (
                  <>
                    <PencilLine className="mr-2 h-4 w-4" /> Update variant
                  </>
                )}
              </Button>
              <Button
                onClick={() => handleDeleteVariant(variant)}
                type="button"
                variant={"destructive"}
                disabled={isLoading}
                className="h-[30px]"
              >
                {isLoading ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4" /> Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete variant
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Button
              onClick={form.handleSubmit(onSubmit)}
              type="button"
              disabled={valuesData.length === 0 ? true : false}
              className="h-[30px]"
            >
              {isLoading ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4" /> Creating variant...
                </>
              ) : (
                <>
                  <Pencil className="mr-2 h-4 w-4" /> Create variant
                </>
              )}
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default AddVariantForm;
