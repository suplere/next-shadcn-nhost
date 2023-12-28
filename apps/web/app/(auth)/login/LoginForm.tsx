"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/form";
import * as z from "zod";
import { Input } from "@ui/components/input";
import { Button } from "@ui/components/button";
import { toast } from "sonner";
import { signIn } from "@/app/server-actions/auth";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email je povinný." })
    .email("Musí být platná emailová adresa"),
  password: z.string().min(1, { message: "Heslo je povinné." }),
});

export const LoginForm = () => {
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const action: () => void = loginForm.handleSubmit(async (data) => {
    const form = new FormData()
    form.append("password", data.password)
    form.append("email", data.email)
    const response = await signIn(form);
    if (response?.error) {
      toast.error(response.error)
      console.error(response.error);
    }
  });

  return (
    <Form {...loginForm}>
      <form className="mt-5 grid grid-cols-1 gap-y-3" action={action}>
        <FormField
          name="email"
          control={loginForm.control}
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
        <FormField
          name="password"
          control={loginForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heslo</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-full">
          <Button type="submit" color="blue" className="w-full">
            <span>
              Přihlášení <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
