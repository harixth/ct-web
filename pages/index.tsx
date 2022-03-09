import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Home from "../containers/Home";

const Index: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Crypto Tracker</title>
        <meta
          name="description"
          content="Your favourite site to check latest crypto prices"
        />
        <meta
          key="keywords"
          name="keywords"
          content="bitcoin,btc,ethereum,eth,crypto,cryptocurrency"
        />
        <meta key="og:type" property="og:type" content="web" />
        <meta key="og:title" property="og:title" content="Crypto Tracker" />
        <meta
          key="og:description"
          property="og:description"
          content="Your favourite site to check latest crypto prices"
        />
        <meta key="og:image" property="og:image" content="/images/home.png" />
        <meta key="og:image:width" property="og:image:width" content="500" />
        <meta key="og:image:height" property="og:image:height" content="500" />
        <meta key="og:locale" property="og:locale" content="en_US" />
        <meta
          key="twitter:title"
          name="twitter:title"
          content="Crypto Tracker"
        />
        <meta
          key="twitter:description"
          name="twitter:description"
          content="Your favourite site to check latest crypto prices"
        />
        <meta
          key="twitter:image"
          name="twitter:image"
          content="/images/home.png"
        />
        <meta
          key="twitter:card"
          name="twitter:card"
          content="summary_large_image"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
    </div>
  );
};

export default Index;
