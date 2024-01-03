/* eslint-disable turbo/no-undeclared-env-vars */
import { env } from "@/env.mjs"
import { NhostClientConstructorParams } from "@nhost/nhost-js"

const AUTH_URL = null
const GRAPHQL_URL = null
const STORAGE_URL = null
const FUNCTION_URL = null
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
