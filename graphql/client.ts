import { ApolloClient, InMemoryCache } from "@apollo/client";

export const API_GATEWAY_URL =
  process.env.API_GATEWAY_URL ??
  "https://ct-main-gateway-tsiuchdv4a-as.a.run.app";

const client = new ApolloClient({
  uri: API_GATEWAY_URL + "/graphql",
  cache: new InMemoryCache(),
});

export default client;
