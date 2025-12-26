"use client";

import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/lib/client";

const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
