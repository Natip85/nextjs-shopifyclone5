"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { PasswordInput } from "../ui/password-input";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const session = useSession();
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/store");
    }
  }, [session?.status, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      lastName: "",
      firstName: "",
    },
  });

  useEffect(() => {
    const isFormValid = form.formState.isValid;
    setIsLoading(!isFormValid);
  }, [form.formState.isValid]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    axios
      .post("/api/register", values)
      .then(() => {
        signIn("credentials", values);
        toast({
          variant: "success",
          description: "Registered succesfully",
        });
      })
      .catch(() => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          description: "Oops!something went wrong",
        });
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="w-fit m-2">
      <div className="bg-white p-10 shadow rounded-lg w-fit">
        <div
          className="flex items-center gap-1 cursor-pointer mb-8"
          onClick={() => router.push("/")}
        >
          <Image
            src={"/logo.svg"}
            alt="logo"
            width="30"
            height="30"
            className="aspect-square"
          />
          <div className={"font-bold text-xl dark:text-black"}>
            Shopifyclone
          </div>
        </div>
        <h2 className="mb-1 text-2xl font-semibold tracking-tight dark:text-black">
          Create a shopify account
        </h2>
        <span className="text-sm text-black">
          One last step before you get started
        </span>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm w-full hover:cursor-pointer dark:text-muted-foreground">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-full dark:text-black dark:bg-white"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm w-full hover:cursor-pointer dark:text-muted-foreground">
                      First name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full dark:text-black dark:bg-white"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm w-full hover:cursor-pointer dark:text-muted-foreground">
                      Last name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full dark:text-black dark:bg-white"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="mt-3 text-muted-foreground">
              Enter your first and last name as they appear on your
              government-issued ID.
            </p>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-sm  w-full hover:cursor-pointer dark:text-muted-foreground">
                    Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      className="w-full dark:text-black dark:bg-white"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button
                className="w-full mt-5 dark:bg-slate-900 dark:text-white"
                disabled={isLoading}
              >
                {isLoading
                  ? "Create Shopify account"
                  : "Create Shopify account"}
              </Button>
            </div>
            <div className="flex justify-center items-center mt-5">
              <span className="text-xs mr-2 dark:text-black">
                Already have a Shopify account?
              </span>

              <span
                className="flex items-center text-blue-600 hover:cursor-pointer"
                onClick={() => router.push("/auth")}
              >
                Log in
                <ArrowRight
                  size={16}
                  className="ml-2 hover:translate-x-1 transition-transform"
                />
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
