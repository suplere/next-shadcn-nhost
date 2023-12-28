import { getNhost } from "@/lib/nhost/nhost";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";

export default async function Login() {
  const nhost = await getNhost();
  const session = nhost.auth.getSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="mt-20">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Přihlášení do účtu
        </h2>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
          Nemáte účet?{' '}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Vytvořte si ho
          </Link>{' '}
            pro využívání aplikace.
        </p>
      </div>
      <div className="mt-1">
        <h2 className="text-md font-semibold text-gray-900 dark:text-gray-100">
          Zapoměli jste heslo?
        </h2>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
          Obnovte si ho{' '}
          <Link
            href="/forgot"
            className="font-medium text-blue-600 hover:underline"
          >
            zde
          </Link>{' '}
          pro využívání aplikace.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
