import { getNhost } from "@/lib/nhost/nhost";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export default async function Forgot() {
  const nhost = await getNhost();
  const session = nhost.auth.getSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="mt-20">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Zapomenuté heslo
        </h2>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
          Máte účet?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Přihlašte se zde
          </Link>{" "}
          pro využívání aplikace.
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
