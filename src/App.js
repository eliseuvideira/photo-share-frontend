import { ApolloProvider } from "@apollo/client";
import { apollo } from "./functions/apollo";
import { Routes } from "./Routes";

export const App = () => (
  <ApolloProvider client={apollo}>
    <Routes />
  </ApolloProvider>
);
