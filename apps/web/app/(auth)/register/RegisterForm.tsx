"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/form";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import InputMask, { Props } from "react-input-mask";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/app/server-actions/auth";

const registerFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email je povinný." })
      .email("Musí být platná emailová adresa"),
    password: z
      .string()
      .min(6, { message: "Heslo musí být minimálně 6 znaků." }),
    confirm: z.string().min(1, { message: "Potvrzení hesla je povinné." }),
    firstname: z.string().min(1, { message: "Jméno je povinné" }),
    lastname: z.string().min(1, { message: "Příjmení je povinné" }),
    mobile: z.string().min(1, { message: "Telefon je povinné pole" }),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Hesla nesouhlasí.",
  });

export const RegisterForm = () => {
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      confirm: "",
      mobile: ""
    },
  });
  const action: () => void = registerForm.handleSubmit(async (data) => {
    // console.log("DATA", data)
    const form = new FormData()
    form.append('firstName', data.firstname)
    form.append('lastName', data.lastname)
    form.append('email', data.email)
    form.append('password', data.password)

    const response = await signUp(form);
    if (response?.error) {
      console.error(response.error);
    }
  });
  return (
    <Form {...registerForm}>
      <form className="mt-5 grid grid-cols-1 gap-y-3" action={action}>
        <FormField
          name="email"
          control={registerForm.control}
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
          control={registerForm.control}
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
        <FormField
          name="confirm"
          control={registerForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Potvrzení hesla</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="firstname"
          control={registerForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jméno</FormLabel>
              <FormControl>
                <Input placeholder="Jméno" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="lastname"
          control={registerForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Příjmení</FormLabel>
              <FormControl>
                <Input placeholder="Příjmení" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="mobile"
          control={registerForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobilní telefon</FormLabel>
              <FormControl>
                <InputMask
                  {...field}
                  mask={"+420 999 999 999"}
                  className="form-input focus:ring-offset-2 focus:ring-2 border-gray-200 focus:ring-black focus:border-black dark:border-gray-800 text-gray-900 mt-1 block w-full rounded-md shadow-sm bg-background dark:text-gray-100 dark:focus:border-white text-sm"
                  type="text"
                ></InputMask>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-full mb-5">
          <Button type="submit" color="blue" className="w-full">
            <span>
              Registrace <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
};
