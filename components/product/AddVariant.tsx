"use client";
import * as z from "zod";
import { Trash2 } from "lucide-react";
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

interface AddRoomFormProps {
  product?: Product & {
    variants: Variant[];
  };
  variant?: Variant;
  close?: () => void;
}
const AddVariant = ({ product, variant, close }: AddRoomFormProps) => {
  const [values, setValues] = useState<string[]>([]);

  const form = useForm<z.infer<typeof createVariantSchema>>({
    resolver: zodResolver(createVariantSchema),
    defaultValues: { name: "" },
  });
  function onSubmit(values: z.infer<typeof createVariantSchema>) {
    console.log("VARVALUES>>>", values);
  }

  const handleSetTags = (value: any) => {
    console.log("THEVALS>>", value);
    setValues(value);
  };
  return (
    <div className="border rounded-md p-4">
      <Form {...form}>
        <div className="flex justify-between items-center mb-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Option name</FormLabel>
                <FormControl>
                  <Input placeholder="Size" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Trash2
            className="h-4 w-4 ml-5 hover:cursor-pointer text-red-600"
            onClick={close}
          />
        </div>

        <FormField
          control={form.control}
          name="values"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Data Point(s)</FormLabel>
              <FormControl>
                <MultiInput value={values} onChange={handleSetTags} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" onClick={form.handleSubmit(onSubmit)}>
          Done
        </Button>
      </Form>
    </div>
  );
};

export default AddVariant;
