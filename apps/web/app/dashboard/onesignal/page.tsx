import { getNhost } from "@/lib/nhost/nhost";
import { redirect } from "next/navigation";
import { OnesignalTest } from "./Onesignal";

const Profile = async () => {
  const nhost = await getNhost();
  const session = nhost.auth.getSession();
  if (!session) {
    redirect("/sign-in");
  }
return (
    <div className="flex flex-col max-w-3xl mx-auto space-y-4">
      <OnesignalTest user={session.user} />
    </div>
  );
};

export default Profile;
