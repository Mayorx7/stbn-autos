"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubscribeSchema, type SubscribeSchemaType } from "@/app/schemas/sub.schema";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CircleCheckIcon, Loader2 } from "lucide-react";

const NewsLetterForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<SubscribeSchemaType>({
    resolver: zodResolver(SubscribeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSuccess(true);
    form.reset();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">
        Subscribe to our inventory updates
      </h3>
      <p className="text-[#D9ECFA]">
        Enter your details to get new stock updates
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2"
        >
          <div className="grid grid-cols-2 space-x-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      className="border-white/20 bg-white text-[#062A5E]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    className="w-full border-white/20 bg-white text-[#062A5E]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            type="submit"
            className="w-full uppercase font-bold"
          >
            {loading && (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
            )}{" "}
            Subscribe Now
          </Button>

          {success && (
            <div className="flex items-center gap-2 rounded-md bg-[#0757A6] p-3 text-white">
              <CircleCheckIcon className="h-5 w-5" />
              <span>Success! Thanks for subscribing to our updates.</span>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default NewsLetterForm;
