import { NhostClient } from "@nhost/nhost-js";

const config = process.env.NHOST_SUBDOMAIN
  ? {
      subdomain: process.env.NHOST_SUBDOMAIN,
      region: process.env.NHOST_REGION,
    }
  : {
      backendUrl: process.env.NHOST_BACKEND_URL,
    };

const nhost = new NhostClient(config);

export { nhost };
