import { GraphQLClient } from "graphql-request";

import config from "src/config";
import { ACCESS_TOKEN_KEY } from "./constant";
import { getCookieStorage } from "../storage";

const idToken = getCookieStorage(ACCESS_TOKEN_KEY);

const client = new GraphQLClient(config.baseUrl, {
  headers: { Authorization: `Bearer ${idToken}` },
});

export function setAuthHeader(idToken: string) {
  client.setHeader("Authorization", `Bearer ${idToken}`);
}

export default client;
