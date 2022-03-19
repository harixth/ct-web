import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Home from "../containers/Home";
import ky from "ky";

type MarketData = {
  active_cryptocurrencies: number;
  total_market_cap: { [key: string]: number };
  total_volume: { [key: string]: number };
  updated_at: number;
};

const Index: NextPage<{ marketData: MarketData }> = ({
  marketData,
}: {
  marketData: MarketData;
}) => {
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
      <Home marketData={marketData} />
    </div>
  );
};

export default Index;

export async function getServerSideProps() {
  let marketData = {
    active_cryptocurrencies: 12444,
    total_market_cap: {
      btc: 773688131095.4792,
      eth: 332581600398.6395,
      uni: 6322059404.1351185,
      dot: 18559418414.38427,
    },
    total_volume: {
      btc: 32393306805.63477,
      eth: 15332703032.676222,
      uni: 227625494.029907,
      dot: 1076720598.8043926,
    },
  };
  try {
    // const response = await ky(
    //   "https://pro-api.coinmarketcap.com/v1/cryptocurrency/category?id=605e2967d41eae1066535f70",
    //   {
    //     headers: { "X-CMC_PRO_API_KEY": process.env.CMC_PRO_API_KEY },
    //   }
    // );
    // const { data } = await response.json();
    // marketData = {
    //   active_cryptocurrencies: 12444,
    //   total_market_cap: {
    //     btc: getMarketCap(data.coins, "BTC"),
    //     eth: getMarketCap(data.coins, "ETH"),
    //     uni: getMarketCap(data.coins, "UNI"),
    //     dot: getMarketCap(data.coins, "DOT"),
    //   },
    //   total_volume: {
    //     btc: getVolume(data.coins, "BTC"),
    //     eth: getVolume(data.coins, "ETH"),
    //     uni: getVolume(data.coins, "UNI"),
    //     dot: getVolume(data.coins, "DOT"),
    //   },
    // };
    console.log(marketData);
  } catch (err) {
    console.log(err);
  }
  return {
    props: { marketData },
  };
}

function getMarketCap(coins: any[], symbol: string) {
  const selected = coins.find((coin) => coin.symbol === symbol);
  return selected?.quote?.USD.market_cap ?? null;
}

function getVolume(coins: any[], symbol: string) {
  const selected = coins.find((coin) => coin.symbol === symbol);
  return selected?.quote?.USD.volume_24h ?? null;
}

function getpriceChange(coins: any[], symbol: string) {
  const selected = coins.find((coin) => coin.symbol === symbol);
  return selected.quote["USD"].percent_change_24h;
}
