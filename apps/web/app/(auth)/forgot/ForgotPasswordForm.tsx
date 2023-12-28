"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/components/form";
import { Input } from "@ui/components/input";
import { Button } from "@ui/components/button";
import * as z from "zod";
import { forgotPassword } from "@/app/server-actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email je povinná hodnota").email("Nesprávný formát emailu.")
})

export const ForgotPasswordForm = () => {
  const forgotForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const action: () => void = forgotForm.handleSubmit(async (data) => {
    const form = new FormData()
    form.append("email", data.email)
    const response = await forgotPassword(form);
    if (response?.error) {
      console.error(response.error);
    }
  });
  return (
    <Form {...forgotForm}>
      <form className="mt-5 grid grid-cols-1 gap-y-8" action={action}>
        <FormField
          name="email"
          control={forgotForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emailová adresa</FormLabel>
              <FormControl>
              <Input placeholder="Emailová adresa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-full">
          <Button
            type="submit"
            variant="default"
            color="blue"
            className="w-full"
            // disabled={isLoading}
          >
            <span>
              Odeslání požadavku <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
