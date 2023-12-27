import "ui/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body><div className="m-4">{children}</div></body>
    </html>
  );
}
