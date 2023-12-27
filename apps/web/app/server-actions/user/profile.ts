"use server";

import { UpdateUserDataDocument, Users_Set_Input } from "@/lib/graphql/__generated__/gql/graphql";
import { getNhost } from "@/lib/nhost/nhost";
import { revalidatePath } from "next/cache";

export type ProfileEvent = {
  result: boolean;
  message: string | null;
};

export const deleteAvatar = async (avatar: string): Promise<ProfileEvent> => {
  const nhost = await getNhost();
  const user = nhost.auth.getUser();
  if (!user) {
    return {
      result: false,
      message: "Nejste přihlášen. Pro uložení rezervace musí být přihlášen.",
    };
  }
  const hasStorage = avatar.includes("/v1/files/")
  if (hasStorage) {
    const id = avatar.split('/v1/files/');
    if (id[1]) {
      try {
        await nhost.storage.delete({
          fileId: id[1],
        });
        return {
          result: true,
          message: "Avatar byl smazán.",
        };
      } catch (error) {
        return {
          result: false,
          message: "Došlo k chybě.",
        };
      }
    }
  }
  return {
    result: false,
    message: "Došlo k chybě.",
  };
};

export const uploadAvatar = async ({
  id,
  formData,
  bucketId,
  name,
}: {
  id: string;
  formData: FormData;
  bucketId: string;
  name: string;
}): Promise<ProfileEvent> => {
  const nhost = await getNhost();
  const user = nhost.auth.getUser();
  if (!user) {
    return {
      result: false,
      message: "Nejste přihlášen. Pro uložení rezervace musí být přihlášen.",
    };
  }
  try {
    const uploadRes = await nhost.storage.upload({
      formData,
      bucketId,
    });
    if (uploadRes.fileMetadata) {
      const url = nhost.storage.getPublicUrl({fileId: uploadRes.fileMetadata.processedFiles[0].id})
      return {
        result: true,
        message: url
      }
    }

    return {
      result: false,
      message: "Došlo k chybě.",
    };
  } catch (error) {
    return {
      result: false,
      message: "Došlo k chybě.",
    };
  }
};

export const updateUser = async ({
  data,
  id
}: {
  data: Users_Set_Input;
  id: string
}): Promise<ProfileEvent> => {
  const nhost = await getNhost();
  const user = nhost.auth.getUser();
  if (!user) {
    return {
      result: false,
      message: "Nejste přihlášen. Pro uložení rezervace musí být přihlášen.",
    };
  }
  try {
    const res = await nhost.graphql.request(UpdateUserDataDocument, {id, user: data})
    if (res.data?.updateUser) {
      // console.log("DATA", res.data.updateUser)
      revalidatePath("/dashboard/profile")
      return {
        result: true,
        message: "Data byla uložena.",
      };
    }
    return {
      result: false,
      message: "Došlo k chybě.",
    };
  } catch (error) {
    return {
      result: false,
      message: "Došlo k chybě.",
    };
  }
}

