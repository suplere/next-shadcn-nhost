import { ModeToggle } from "@/components/mode-toggle";
import { getNhost } from "@/lib/nhost/nhost";
import { redirect } from "next/navigation";
import { UserNav } from "./UserNav";
import { NotificationCentre } from "@/components/notification-centre";
import { UserMetadata } from "@/types";

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

  const metadata = session.user.metadata as UserMetadata;

  return (
    <div className="h-full bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-1 flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <MainNav userData={userData!} className="mx-6" /> */}
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
              <NotificationCentre userId={session.user.id} />
              <UserNav
                displayName={session.user.displayName}
                avatarUrl={session.user.avatarUrl}
                email={session.user.email as string}
                firstname={metadata.firstname}
                lastname={metadata.lastname}
              />
            </div>
          </div>
        </div>

        <main className="bg-gray-100 dark:bg-gray-900 px-2">{children}</main>
      </div>
    </div>
  );
}
