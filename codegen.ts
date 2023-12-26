import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  watch: true,
  schema: [
    {
      "https://local.hasura.nhost.run/v1/graphql": {
        headers: {
          "x-hasura-admin-secret": "nhost-admin-secret",
          "x-hasura-role": "admin",
        },
      },
    },
  ],
  generates: {
    "./packages/backend/functions/_utils/__generated__/graphql.ts": {
      documents: "./packages/backend/functions/_utils/graphql/*.graphql",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
    "./apps/web/lib/graphql/__generated__/gql/": {
      documents: [
        "./apps/web/graphql/*.graphql",
        "./apps/web/app/**/*.tsx",
        "./apps/web/components/**/*.tsx",
      ],
      preset: "client",
      plugins: [],
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
      config: {
        skipTypename: true,
        enumsAsTypes: true,
        scalars: {
          numeric: "number",
        },
      },
    },
  },
};

export default config;
