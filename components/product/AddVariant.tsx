"use client";
import * as z from "zod";
import { Plus, Trash2, XIcon } from "lucide-react";
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
interface AddRoomFormProps {
  product?: Product & {
    variants: Variant[];
  };
  variant?: Variant;
  close?: () => void;
}
const AddVariant = ({ product, variant, close }: AddRoomFormProps) => {
  const [valuesData, setValuesData] = useState<string[]>([]);
  const [secondValuesData, setSecondValuesData] = useState<string[]>([]);
  const [pendingDataPoint, setPendingDataPoint] = useState("");
  const [secondPendingDataPoint, setSecondPendingDataPoint] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
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
  const addSecondPendingDataPoint = () => {
    if (secondPendingDataPoint) {
      const newDataPoints = new Set([
        ...secondValuesData,
        secondPendingDataPoint,
      ]);
      setSecondValuesData(Array.from(newDataPoints));
      setSecondPendingDataPoint("");
    }
  };
  function onSubmit(values: z.infer<typeof createVariantSchema>) {
    console.log("VARVALUES>>>", values);

    const options = valuesData.map((value) => ({
      id: uuidv4(),
      name: value,
    }));

    const secondOptions = secondValuesData.map((value) => ({
      id: uuidv4(),
      name: value,
    }));

    const finalData = {
      options: [
        {
          id: uuidv4(),
          name: values.title,
          values: options,
        },
      ],
      title: values.secondTitle
        ? values.title + "/" + values.secondTitle
        : values.title,
    };
    if (values.secondTitle) {
      finalData.options.push({
        id: uuidv4(),
        name: values.secondTitle,
        values: secondOptions,
      });
    }

    console.log("FINAL>>>", finalData);
  }

  return (
    <>
      {openOptions ? (
        <>
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
                            placeholder="Size"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button variant={"outline"} type="button" className="ml-5">
                    <Trash2
                      className="h-4 w-4 hover:cursor-pointer text-red-600"
                      onClick={() => {}}
                    />
                  </Button>
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
                              placeholder="Medium"
                              value={pendingDataPoint}
                              onChange={(e) =>
                                setPendingDataPoint(e.target.value)
                              }
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
                <Button
                  variant={"outline"}
                  type="button"
                  // onClick={form.handleSubmit(onSubmit)}
                  onClick={() => {}}
                  className="mt-3"
                >
                  Done
                </Button>
              </div>

              <div>
                <div className="flex justify-between items-end mb-5">
                  <FormField
                    control={form.control}
                    name="secondTitle"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Option name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Size"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button variant={"outline"} type="button" className="ml-5">
                    <Trash2
                      className="h-4 w-4 hover:cursor-pointer text-red-600"
                      onClick={() => {}}
                    />
                  </Button>
                </div>
                <div className="flex items-end justify-between">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="secondOptions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Add option value(s)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Medium"
                              value={secondPendingDataPoint}
                              onChange={(e) =>
                                setSecondPendingDataPoint(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addSecondPendingDataPoint();
                                } else if (e.key === "," || e.key === " ") {
                                  e.preventDefault();
                                  addSecondPendingDataPoint();
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
                    onClick={addSecondPendingDataPoint}
                    className="ml-5"
                  >
                    Add
                  </Button>
                </div>
                <div className="min-h-[2.5rem] overflow-y-auto p-2 flex gap-2 flex-wrap items-center mt-2">
                  {secondValuesData.map((item, idx) => (
                    <Badge key={idx} variant="secondary">
                      {item}
                      <button
                        type="button"
                        className="w-3 ml-2"
                        onClick={() => {
                          setSecondValuesData(
                            secondValuesData.filter((i) => i !== item)
                          );
                        }}
                      >
                        <XIcon className="w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Button
                  variant={"outline"}
                  type="button"
                  // onClick={form.handleSubmit(onSubmit)}
                  onClick={() => {}}
                  className="mt-3"
                >
                  Done
                </Button>
              </div>
            </div>
          </Form>
        </>
      ) : (
        <div>
          <Button
            type="button"
            onClick={() => setOpenOptions(!openOptions)}
            variant={"link"}
            className="text-sky-600 hover:text-sky-800"
          >
            <Plus className="h-4 w-4 mr-2" /> Add options like size or color
          </Button>
        </div>
      )}
    </>
  );
};

export default AddVariant;
