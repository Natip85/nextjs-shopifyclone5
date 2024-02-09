"use client";
import * as z from "zod";
import { Plus, Trash2 } from "lucide-react";
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
import MultiInput from "../MultiInput";
import { Separator } from "../ui/separator";
import { v4 as uuidv4 } from "uuid";
import { Badge } from "../ui/badge";
interface AddRoomFormProps {
  product?: Product & {
    variants: Variant[];
  };
  variant?: Variant;
  close?: () => void;
}
const AddVariant = ({ product, variant, close }: AddRoomFormProps) => {
  const [tagValues, setValues] = useState<string[]>([]);
  const [isVariantSaved, setIsVariantSaved] = useState(false);
  const [addAnotherOptionToggle, setAddAnotherOptionToggle] = useState(false);

  const form = useForm<z.infer<typeof createVariantSchema>>({
    resolver: zodResolver(createVariantSchema),
    defaultValues: { title: "", options: [] },
  });
  const handleSetTags = (value: any) => {
    console.log("THEVALS>>", value);
    setValues(value);
  };
  function onSubmit(values: z.infer<typeof createVariantSchema>) {
    console.log("VARVALUES>>>", values);

    const options = tagValues.map((value) => ({
      id: uuidv4(),
      name: value,
    }));

    const finalData = {
      ...values,
      title: product?.title,
      options: [
        {
          id: uuidv4(),
          name: values.title,
          values: options,
        },
      ],
    };
    console.log("FINAL>>>", finalData);
  }

  return (
    <div className="border rounded-md p-4">
      <Form {...form}>
        {isVariantSaved ? (
          <div>
            <div className="min-h-[2.5rem] overflow-y-auto p-2 flex gap-2 flex-wrap items-center mt-2">
              {tagValues.map((item, idx) => (
                <Badge key={idx} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ) : (
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
                        placeholder="Size"
                        {...field}
                        className="w-[98%]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant={"outline"} type="button">
                <Trash2
                  className="h-4 w-4 hover:cursor-pointer text-red-600"
                  onClick={close}
                />
              </Button>
            </div>

            <FormField
              control={form.control}
              name="options"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add option value(s)</FormLabel>
                  <FormControl>
                    <MultiInput
                      value={tagValues}
                      onChange={handleSetTags}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <Separator className="my-3" />
        <Button
          type="button"
          variant={"outline"}
          // onClick={form.handleSubmit(onSubmit)}
          onClick={() => setIsVariantSaved(!isVariantSaved)}
          className="mt-3"
        >
          {isVariantSaved ? "Edit" : "Done"}
        </Button>
        <Separator className="my-5" />
        <Button
          type="button"
          onClick={() => setAddAnotherOptionToggle(!addAnotherOptionToggle)}
          variant={"link"}
          className="text-sky-600 hover:text-sky-800"
        >
          <Plus className="h-4 w-4 mr-2" /> Add another option
        </Button>
        {!addAnotherOptionToggle ? (
          <div>
            <div className="min-h-[2.5rem] overflow-y-auto p-2 flex gap-2 flex-wrap items-center mt-2">
              {tagValues.map((item, idx) => (
                <Badge key={idx} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ) : (
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
                        placeholder="Size"
                        {...field}
                        className="w-[98%]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant={"outline"} type="button">
                <Trash2
                  className="h-4 w-4 hover:cursor-pointer text-red-600"
                  onClick={close}
                />
              </Button>
            </div>

            <FormField
              control={form.control}
              name="options"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add option value(s)</FormLabel>
                  <FormControl>
                    <MultiInput
                      value={tagValues}
                      onChange={handleSetTags}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant={"outline"}
              // onClick={form.handleSubmit(onSubmit)}
              onClick={() => setIsVariantSaved(!isVariantSaved)}
              className="mt-3"
            >
              {isVariantSaved ? "Edit" : "Done"}
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default AddVariant;
