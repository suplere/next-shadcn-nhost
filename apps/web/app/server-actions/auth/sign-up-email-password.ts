"use server";

import { NHOST_SESSION_KEY, getNhost } from "@/lib/nhost/nhost";
import { UserMetadata } from "@/types";
import { DEFAULT_COOKIE_OPTIONS } from "@/utils/constants";
import { utoa } from "@/utils/string";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  firstName: zfd.text(),
  lastName: zfd.text(),
  email: zfd.text(),
  password: zfd.text(),
  mobile: zfd.text(),
});

export const signUp = async (formData: FormData) => {
  const nhost = await getNhost();

  const { firstName, lastName, email, password, mobile } =
    schema.parse(formData);

  const metadata: UserMetadata = {
    firstname: firstName,
    lastname: lastName,
    mobile: mobile,
  };

  const { session, error } = await nhost.auth.signUp({
    email,
    password,
    options: {
      locale: "cs",
      displayName: `${firstName} ${lastName}`,
      metadata,
    },
  });

  if (session) {
    cookies().set(NHOST_SESSION_KEY, utoa(JSON.stringify(session)), {
      ...DEFAULT_COOKIE_OPTIONS,
    });
    redirect("/");
  }

  if (error) {
    return {
      error: error?.message,
    };
  }
};
