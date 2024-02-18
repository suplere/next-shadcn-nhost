import { NhostClient, NhostClientConstructorParams } from "@nhost/nhost-js";

const config:NhostClientConstructorParams = process.env.NHOST_SUBDOMAIN
  ? {
      subdomain: process.env.NHOST_SUBDOMAIN,
      region: process.env.NHOST_REGION,
    }
  : {
      authUrl: process.env.NHOST_AUTH_URL,
      graphqlUrl: process.env.NHOST_GRAPHQL_URL,
      functionsUrl: process.env.NHOST_FUNCTIONS_URL,
      storageUrl: process.env.NHOST_STORAGE_URL,
    };

const nhost = new NhostClient(config);

export { nhost };
