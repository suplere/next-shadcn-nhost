/* eslint-disable turbo/no-undeclared-env-vars */
import { env } from "@/env.mjs"
import { NhostClientConstructorParams } from "@nhost/nhost-js"

const AUTH_URL = env.NEXT_PUBLIC_AUTH_URL
const GRAPHQL_URL = env.NEXT_PUBLIC_GRAPHQL_URL
const STORAGE_URL = env.NEXT_PUBLIC_STORAGE_URL
const FUNCTION_URL = env.NEXT_PUBLIC_FUNCTION_URL
const SUBDOMAIN = env.NEXT_PUBLIC_NHOST_SUBDOMAIN
const REGION = env.NEXT_PUBLIC_NHOST_REGION


export const getNhostConfig = ():NhostClientConstructorParams => {
  if (AUTH_URL && GRAPHQL_URL && STORAGE_URL && FUNCTION_URL)
  return {
    authUrl: AUTH_URL,
    graphqlUrl: GRAPHQL_URL,
    storageUrl: STORAGE_URL,
    functionsUrl: FUNCTION_URL,
  }
  return {
    subdomain: SUBDOMAIN,
    region: REGION
  }
}
