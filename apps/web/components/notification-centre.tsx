"use client";
import { env } from "@/env.mjs";
import {
  ColorScheme,
  IMessage,
  NotificationBell,
  NovuProvider,
  PopoverNotificationCenter,
} from "@novu/notification-center";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";

export const NotificationCentre = ({ userId }: { userId: string }) => {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const currentTheme: ColorScheme =
    resolvedTheme === "light" ? "light" : "dark";

  function handleOnNotificationClick(message: IMessage) {
    // your logic to handle the notification click
    if (message?.cta?.data?.url) {
      router.push(message.cta.data.url);
    }
  }
  return (
    <NovuProvider
      backendUrl={env.NEXT_PUBLIC_NOVU_BACKEND_URL}
      socketUrl={env.NEXT_PUBLIC_NOVU_SOCKET_URL}
      subscriberId={userId}
      applicationIdentifier={env.NEXT_PUBLIC_NOVU_APP_ID}
      i18n={"cs"}
    >
      <PopoverNotificationCenter
        colorScheme={currentTheme}
        onNotificationClick={handleOnNotificationClick}
      >
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
};
