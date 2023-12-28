import Link from "next/link";
import { RegisterForm } from "./RegisterForm";

export default async function Register() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="mt-5 md:mt-20">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Vytvoření účtu
        </h2>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
          Již máte účet?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Přihlašte
          </Link>{" "}
          se do svého účtu.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
