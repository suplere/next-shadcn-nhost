import "ui/styles/globals.css";
import { Toaster } from "@ui/components/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="m-4">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
