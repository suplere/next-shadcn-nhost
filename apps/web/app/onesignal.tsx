"use client";
import { env } from "@/env.mjs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import OneSignal from "react-onesignal";

type PushSubscriptionNamespaceProperties = {
  id: string | null | undefined;
  token: string | null | undefined;
  optedIn: boolean;
};
type SubscriptionChangeEvent = {
  previous: PushSubscriptionNamespaceProperties;
  current: PushSubscriptionNamespaceProperties;
};

type OneSignalContext = {
  oneSignal: typeof OneSignal;
  isInit: boolean;
  isOptIn: boolean;
};

export const OneSignalReactContext = createContext<OneSignalContext>({
  oneSignal: {} as typeof OneSignal,
  isInit: false,
  isOptIn: false,
});

export const OneSignalProvider = (props: {
  children?: ReactNode | ReactNode[];
}) => {
  const [isInit, setIsInit] = useState<boolean>(false);
  const [isOptIn, setIsOptIn] = useState<boolean>(false);

  function pushSubscriptionChangeListener(event: SubscriptionChangeEvent) {
    // console.log(event.current);
    setIsOptIn(event.current.optedIn)
  }

  useEffect(() => {
    if (!isInit) {
      try {
        OneSignal.init({
          appId: env.NEXT_PUBLIC_NHOST_ONESEGNAL_APP_ID || "",
          safari_web_id: env.NEXT_PUBLIC_NHOST_ONESEGNAL_SAFARI_ID,
          allowLocalhostAsSecureOrigin: process.env.NODE_ENV === "development",
          serviceWorkerParam: {
            scope: "/js/onesignal/",
          },
          serviceWorkerPath: "js/onesignal/OneSignalSDKWorker.js",
          promptOptions: {
            actionMessage:
              "Pokud chcete v budoucnu dostávat webpush notifikace, povolte je prosím zde.",
            acceptButton: "Povolit",
            cancelButton: "Zrušit",
          },
        }).then(() => {
          // console.log('Onesignal init - done')
          // OneSignal.login(user.id)
          // OneSignal.Debug.setLogLevel('trace')
          // OneSignal.login('rodrigo')
          // OneSignal.User.addAlias('myAlias', '1')
          setIsInit(true);
          setIsOptIn(OneSignal.User.PushSubscription.optedIn || false);
          OneSignal.User.PushSubscription.addEventListener("change", pushSubscriptionChangeListener);
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <OneSignalReactContext.Provider
      value={{ oneSignal: OneSignal, isInit, isOptIn }}
    >
      {props.children}
    </OneSignalReactContext.Provider>
  );
};

export function useOneSignalContext() {
  return useContext(OneSignalReactContext);
}
