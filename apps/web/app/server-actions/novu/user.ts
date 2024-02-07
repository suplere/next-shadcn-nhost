"use server";

import { env } from "@/env.mjs";
import { getNhost } from "@/lib/nhost/nhost";
import { UserMetadata } from "@/types";
import { Novu, PushProviderIdEnum } from "@novu/node";

const novu = new Novu(env.NOVU_API_KEY, {
  backendUrl: env.NEXT_PUBLIC_NOVU_BACKEND_URL,
});

export const subscribeUser = async () => {
  const nhost = await getNhost();
  const user = nhost.auth.getUser();
  if (user) {
    try {
      const metadata = user.metadata as UserMetadata;
      // const isAdmin = user.roles.includes("admin_app");
      // const isEditor = user.roles.includes("editor");
      // const isUser = user.roles.includes("user");
      // Create a subscriber on Novu
      const res = await novu.subscribers.identify(user.id, {
        email: user.email,
        firstName: metadata.firstname,
        lastName: metadata.lastname,
        avatar: user.avatarUrl,
        locale: "cs",
        data: {
          // admin: isAdmin,
          // editor: isEditor,
          // user: isUser,
        },
      });
      // console.log(res.data)
      // await Promise.all([
      //   novu.topics.removeSubscribers(USER_TOPIC, {
      //     subscribers: [user.id],
      //   }),
      //   novu.topics.removeSubscribers(EDITOR_TOPIC, {
      //     subscribers: [user.id],
      //   }),
      //   await novu.topics.removeSubscribers(ADMIN_TOPIC, {
      //     subscribers: [user.id],
      //   }),
      // ]);
      // if (isAdmin) {
      //   await novu.topics.addSubscribers(ADMIN_TOPIC, {
      //     subscribers: [user.id],
      //   });
      // }
      // if (isEditor) {
      //   await novu.topics.addSubscribers(EDITOR_TOPIC, {
      //     subscribers: [user.id],
      //   });
      // }
      // await novu.topics.addSubscribers(USER_TOPIC, {
      //   subscribers: [user.id],
      // });

      // const res = await novu.subscribers.get(user.id)
      // console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }
};

export const setOneSignalIdToUser = async (oneSignalSubscriberId: string) => {
  const nhost = await getNhost();
  const user = nhost.auth.getUser();
  if (user) {
    if (oneSignalSubscriberId) {
      try {
        await novu.subscribers.setCredentials(
          user.id,
          PushProviderIdEnum.OneSignal,
          {
            deviceTokens: [oneSignalSubscriberId],
          },
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export type TriggerTestPayload = {
  subject: string
  message: string
}

export const testOneSignalWorkFlow = async (payload: TriggerTestPayload) => {
  const nhost = await getNhost();
  const user = nhost.auth.getUser();
  if (user) {
    try {
      novu.trigger("onesignal-test", {
        to: {
          subscriberId: user.id,
        },
        payload: {
          message: payload.message,
          subject: payload.subject
        },
        actor:{
          subscriberId: user.id,
          avatar: user.avatarUrl
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const testInAppWorkFlow = async (payload: TriggerTestPayload) => {
  const nhost = await getNhost();
  const user = nhost.auth.getUser();
  if (user) {
    try {
      novu.trigger("inapp-test", {
        to: {
          subscriberId: user.id,
        },
        payload: {
          message: payload.message,
          subject: payload.subject
        },
        actor:{
          subscriberId: user.id,
          avatar: user.avatarUrl
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const testEmailWorkFlow = async (payload: TriggerTestPayload) => {
  const nhost = await getNhost();
  const user = nhost.auth.getUser();
  if (user) {
    try {
      novu.trigger("email-test", {
        to: {
          subscriberId: user.id,
        },
        payload: {
          message: payload.message,
          subject: payload.subject
        },
        actor:{
          subscriberId: user.id,
          avatar: user.avatarUrl
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const testAllWorkFlow = async (payload: TriggerTestPayload) => {
  const nhost = await getNhost();
  const user = nhost.auth.getUser();
  if (user) {
    try {
      novu.trigger("all-test", {
        to: {
          subscriberId: user.id,
        },
        payload: {
          message: payload.message,
          subject: payload.subject
        },
        actor:{
          subscriberId: user.id,
          avatar: user.avatarUrl
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
};
