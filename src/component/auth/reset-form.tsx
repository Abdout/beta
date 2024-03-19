"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";


import { Input } from "@/component/auth/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/component/auth/ui/form";
import { CardWrapper } from "@/component/auth/card-wrapper"
import { Button } from "@/component/auth/ui/button";
import { FormError } from "@/component/auth/error";
import { FormSuccess } from "@/component/auth/success";
import { ResetSchema } from "@/model/auth/zod";
// import { reset } from "@/server/auth/reset";


export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    // startTransition(() => {
    //   reset(values)
    //     .then((data) => {
    //       setError(data?.error);
    //       setSuccess(data?.success);
    //     });
    // });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
    <CardWrapper
      headerLabel="القلم أقوى من الذاكرة"
      backButtonLabel="Back to login"
      backButtonHref="/"
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Email"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            className="w-full text-[#fcfcfc]"
          >
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
    </div>
  );
};
