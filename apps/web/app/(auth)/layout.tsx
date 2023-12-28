import { Viewport } from "next";

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  viewportFit: "cover",
  width: "device-width",
  themeColor: "#FFFFFF",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          {/* <Logo className="h-10 w-auto" /> */}
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Zde se můžete přihlásit, nebo si vytvořit nový účet&rdquo;
            </p>
            <footer className="text-sm">Evžen Šupler</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 h-full">{children}</div>
    </div>
  );
}
