"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/form";
import { Input } from "@ui/components/input";
import { Button } from "@ui/components/button";
import { UserMetatdata } from "@/types";
import { updateUser } from "../../server-actions/user";
import { NHostAvatarEdit } from "@/components/nhost/NHostAvatarEdit";
import dayjs from "@/lib/dayjs";
import { toast } from "sonner"

export const profileForm = z.object({
  firstname: z.string().min(1, "Jméno je povinná položka."),
  lastname: z.string().min(1, "Příjmení je povinná položka"),
  mobile: z.string().min(1, "Telefonní číslo je povinná položka"),
  avatarUrl: z.string(),
  emailAddress: z.string(),
});

const DEFAULT_AVATAR_URL =
  "https://s.gravatar.com/avatar/226cd92f12774ad9ec869d138ffb26bd?r=g&default=mp";

export const ProfileForm = ({
  init,
  accountCreated,
  id
}: {
  init: z.infer<typeof profileForm>;
  accountCreated: string;
  id: string
}) => {
  const form = useForm<z.infer<typeof profileForm>>({
    resolver: zodResolver(profileForm),
    defaultValues: {
      avatarUrl: init.avatarUrl || DEFAULT_AVATAR_URL,
      firstname: init.firstname,
      lastname: init.lastname,
      mobile: init.mobile,
      emailAddress: init.emailAddress,
    },
  });

  const onSubmit = async (data: z.infer<typeof profileForm>) => {
    const metadata: UserMetatdata = {
      firstname: data.firstname,
      lastname: data.lastname,
      mobile: data.mobile
    }
    const res = await updateUser({
      id,
      data: {
        metadata,
        avatarUrl: data.avatarUrl,
        displayName: `${data.lastname} ${data.firstname}`
      }
    })
    if (res.result) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 divide-y"
      >
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-3">
            <FormField
              control={form.control}
              name="firstname"
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
          </div>

          <div className="sm:col-span-3">
            <FormField
              control={form.control}
              name="lastname"
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
          </div>

          <div className="sm:col-span-6">
            <FormField
              control={form.control}
              name="avatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <NHostAvatarEdit
                      id={id}
                      filename={`${id}_avatar`}
                      maxSize={150}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
          <div className="sm:col-span-6">
            <h2 className="text-blue-gray-900 text-xl font-medium">
              Kontaktní informace
            </h2>
            <p className="text-blue-gray-500 mt-1 text-sm">
              Informace budou viditelné pro ostatní členy.
            </p>
          </div>

          <div className="sm:col-span-3">
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emailová adresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" disabled {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="sm:col-span-3">
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobilní telefon</FormLabel>
                  <FormControl>
                    <InputMask
                      mask="+420 999 999 999"
                      type="text"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    ></InputMask>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <p className="text-blue-gray-500 text-sm sm:col-span-6">
            Účet byl vytvořen{" "}
            <time
              dateTime={dayjs(accountCreated).format("YYYY-MM-DDTHH:mm:ss")}
            >
              {dayjs(accountCreated).format("D. MMM YYYY HH:mm:ss")}
            </time>
            .
          </p>
        </div>

        <div className="flex justify-end pt-8">
          <Button
            type="submit"
            // className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Uložit
          </Button>
        </div>
      </form>
    </Form>
  );
};
