import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_NHOST_SUBDOMAIN: z.string().min(1),
    NEXT_PUBLIC_NHOST_REGION: z.string(),
    NEXT_PUBLIC_NHOST_ONESEGNAL_APP_ID: z.string(),
    NEXT_PUBLIC_NHOST_ONESEGNAL_SAFARI_ID: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_NHOST_SUBDOMAIN: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
    NEXT_PUBLIC_NHOST_REGION: process.env.NEXT_PUBLIC_NHOST_REGION,
    NEXT_PUBLIC_NHOST_ONESEGNAL_APP_ID: process.env.NEXT_PUBLIC_NHOST_ONESEGNAL_APP_ID,
    NEXT_PUBLIC_NHOST_ONESEGNAL_SAFARI_ID: process.env.NEXT_PUBLIC_NHOST_ONESEGNAL_SAFARI_ID

  },
})
