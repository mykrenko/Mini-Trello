import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/graphql", // This can be server URI, but for mocking, it won't be used.
  cache: new InMemoryCache(),
});

export default client;
