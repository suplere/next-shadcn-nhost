import { GraphQLClient } from "graphql-request";
// import { getSdk } from "./__generated__/graphql";

const endpoint = `${process.env.NHOST_GRAPHQL_URL}`;

// This GraphQL Client is only used in serverless functions (secure).
const client = new GraphQLClient(endpoint, {
  headers: {
    ["x-hasura-admin-secret"]: process.env.NHOST_ADMIN_SECRET as string,
  },
});

// export const sdk = getSdk(client);
