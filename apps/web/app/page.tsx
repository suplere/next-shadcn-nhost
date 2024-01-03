import { getNhost } from "@/lib/nhost/nhost";
import { Button } from "@ui/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import Link from "next/link";

export default async function Page() {
  const nhost = await getNhost();
  const session = nhost.auth.getSession();
  return (
    <Card className="M-4">
      <CardHeader>
        <CardTitle>Test</CardTitle>
      </CardHeader>
      <CardContent>
        <h1>Web</h1>
        {session && (
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        )}
        {!session && (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
