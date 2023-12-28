import { ModeToggle } from "@/components/mode-toggle";
import { getNhost } from "@/lib/nhost/nhost";
import { redirect } from "next/navigation";
import { UserNav } from "./UserNav";

export default async function DashbboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nhost = await getNhost();
  const session = nhost.auth.getSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="h-full bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-1 flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <MainNav userData={userData!} className="mx-6" /> */}
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
              <UserNav userData={session.user} />
            </div>
          </div>
        </div>

        <main className="bg-gray-100 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  );
}
