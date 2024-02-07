"use client";
import { useOneSignalContext } from "@/app/onesignal";
import { Button } from "@ui/components/ui/button";
import { Switch } from "@ui/components/ui/switch";
import { toast } from "sonner";
import { setOneSignalIdToUser } from "@/app/server-actions/novu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@ui/components/ui/form";

const schema = z.object({
  notifyApproved: z.boolean(),
});

export const OnesignalTest = ({ userId }: { userId: string }) => {
  const { isInit, oneSignal, isOptIn } = useOneSignalContext();

  if (!isInit) return null;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      notifyApproved: isOptIn,
    },
  });

  const approveOpt = async (data: z.infer<typeof schema>) => {
    const permission = oneSignal.Notifications.permission;
    const subscriptionId = oneSignal.User.PushSubscription.id;
    if (subscriptionId && data.notifyApproved)
      setOneSignalIdToUser(subscriptionId);
    if (!permission) {
      await oneSignal.Slidedown.promptPush();
    }
    try {
      if (isInit && data.notifyApproved) {
        await oneSignal.login(userId);
        await oneSignal.User.PushSubscription.optIn();
        toast.success("Povolení webpush oznámení bylo provedeno.");
      }
      if (isInit && !data.notifyApproved) {
        await oneSignal.logout();
        await oneSignal.User.PushSubscription.optOut();
        toast.success("Bylo provedeno odhlášení odběru webpush notifikací.");
      }
    } catch (error) {}
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(approveOpt)}>
        <Card>
          <CardHeader>
            <CardTitle>Oznámení</CardTitle>
            <CardDescription>
              Nastavení pro zasílání oznámení .....
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="notifyApproved"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between py-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Webové notifikace povoleny?
                    </FormLabel>
                    <FormDescription>
                      Nutné pro možnost zasílání webových oznámení.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-row-reverse gap-2">
            <Button type="submit">Potvrdit</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
