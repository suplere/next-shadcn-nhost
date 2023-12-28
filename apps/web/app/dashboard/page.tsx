import { getNhost } from "@/lib/nhost/nhost";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const nhost = await getNhost();
  const session = nhost.auth.getSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div>Dashboard</div>
  )
}
