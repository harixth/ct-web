import React from "react";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import "../styles/app.sass";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/client";
import { socket, SocketContext } from "../context/socket";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <CookiesProvider>
        <SocketContext.Provider value={socket}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </SocketContext.Provider>
      </CookiesProvider>
    </RecoilRoot>
  );
}

export default MyApp;
