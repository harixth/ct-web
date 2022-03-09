import React from "react";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import "../styles/app.sass";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <CookiesProvider>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </CookiesProvider>
    </RecoilRoot>
  );
}

export default MyApp;
