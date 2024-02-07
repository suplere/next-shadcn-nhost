import { ProfileForm } from "./ProfileForm";
import { getNhost } from "@/lib/nhost/nhost";
import { UserMetadata } from "@/types";
import { redirect } from "next/navigation";

const Profile = async () => {
  const nhost = await getNhost();
  const session = nhost.auth.getSession();
  if (!session) {
    redirect("/sign-in");
  }
  const { firstname, lastname, mobile } = session.user
    .metadata as UserMetadata;
  return (
    <div className="flex flex-col max-w-3xl mx-auto space-y-4">

      <ProfileForm
        accountCreated={session.user.createdAt}
        id={session.user.id}
        init={{
          firstname,
          lastname,
          mobile,
          avatarUrl: session.user.avatarUrl,
          emailAddress: session.user.email as string,
        }}
      />
    </div>
  );
};

export default Profile;
