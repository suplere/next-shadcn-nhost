import { Button } from "@ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/card";

export default function Page() {
  return (
    <Card className="M-4">
      <CardHeader>
        <CardTitle>Test</CardTitle>
      </CardHeader>
      <CardContent>
        <h1>Web</h1>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
