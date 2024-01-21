"use client";
import { useState } from "react";
import { useOneSignalContext } from "@/app/onesignal";
import { User } from "@nhost/nhost-js";
import { Button } from "@ui/components/ui/button";
import { Switch } from "@ui/components/ui/switch";
import { toast } from "sonner";
import { Label } from "@ui/components/ui/label";

export const OnesignalTest = ({ user }: { user: User }) => {
  const { isInit, oneSignal, isOptIn } = useOneSignalContext();
  const [notifyApproved, setNotifyApproved] = useState<boolean>(isOptIn);

  if (!isInit) return null;

  const approveOpt = async () => {
    const permission = oneSignal.Notifications.permission;
    console.log(permission);
    if (!permission) {
      await oneSignal.Slidedown.promptPush()
    }
    try {
      if (isInit && notifyApproved) {
        await oneSignal.login(user.id);
        await oneSignal.User.PushSubscription.optIn();
        toast.success("Povolení webpush oznámení bylo provedeno.");
      }
      if (isInit && !notifyApproved) {
        await oneSignal.logout();
        await oneSignal.User.PushSubscription.optOut();
        toast.success("Bylo provedeno odhlášení odběru webpush notifikací.");
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className="bg-white dark:bg-black px-4 py-6 sm:p-6">
        <div>
          <h3
            id="notification-settings"
            className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
          >
            Oznámení
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Nastavení pro zasílání oznámení .....
          </p>
        </div>
        <div className="mt-6">
          <div className="flex flex-row items-center justify-between p-2">
            <div className="space-y-0.5">
              <Label className="text-sm">Webové notifikace povoleny?</Label>
            </div>
            <div>
              <Switch
                checked={notifyApproved}
                onCheckedChange={setNotifyApproved}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-black px-4 py-3 text-right sm:px-6">
        <Button type="button" onClick={approveOpt}>
          Potvrdit
        </Button>
      </div>
    </div>
  );
};
