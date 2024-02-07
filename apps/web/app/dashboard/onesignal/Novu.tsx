"use client";
import { Button } from "@ui/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@ui/components/ui/radio-group";
import { toast } from "sonner";
import {
  testAllWorkFlow,
  testEmailWorkFlow,
  testInAppWorkFlow,
  testOneSignalWorkFlow,
} from "@/app/server-actions/novu";
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
  FormMessage,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";

const schema = z.object({
  subject: z.string().min(1, "Je třeba zadat předmět"),
  message: z.string().min(1, "Je třeba zadat text zprávy"),
  channel: z.enum(["all", "email", "push", "inapp"], {
    required_error: "Je třeba vybrat typ notifikace.",
  }),
});

export const NovuTest = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: "",
      subject: "",
      channel: "push",
    },
  });

  const sendNotification = async (data: z.infer<typeof schema>) => {
    const payload = {
      message: data.message,
      subject: data.subject,
    };
    try {
      switch (data.channel) {
        case "push":
          testOneSignalWorkFlow(payload);
          break;
        case "inapp":
          testInAppWorkFlow(payload);
          break;
        case "email":
          testEmailWorkFlow(payload);
          break;
        case "all":
          testAllWorkFlow(payload);
          break;
        default:
          break;
      }
      toast.success(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>,
      );
    } catch (error) {}
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(sendNotification)}>
        <Card>
          <CardHeader>
            <CardTitle>Novu</CardTitle>
            <CardDescription>
              Test funkčnosti nastavení kanálů Novu .....
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Předmět notifikace</FormLabel>
                    <FormControl>
                      <Input placeholder="Zadejte předmět" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text notifikace</FormLabel>
                    <FormControl>
                      <Input placeholder="Zadejte text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="channel"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Pošli notifikaci...</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="all" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Všechny kanály
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="email" />
                          </FormControl>
                          <FormLabel className="font-normal">Email</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="push" />
                          </FormControl>
                          <FormLabel className="font-normal">Webpush</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="inapp" />
                          </FormControl>
                          <FormLabel className="font-normal">InApp</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-row-reverse gap-2">
            <Button type="submit">Zaslat notifikaci</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
