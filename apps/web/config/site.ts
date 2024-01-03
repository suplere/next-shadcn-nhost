import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "Template",
  author: "suplere",
  description:
    "Webové stránky Template template with app router, shadcn/ui, typesafe env, icons, Nhost and configs setup.",
  keywords: ["Next.js", "React", "Tailwind CSS", "Radix UI", "shadcn/ui", "Nhost"],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://supler.eu",
  },
  links: {
    github: "https://github.com/suplere/next-shadcn-nhost.git",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
