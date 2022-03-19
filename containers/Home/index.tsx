import { useState } from "react";
import cn from "classnames";
import styles from "./Home.module.sass";
import Header from "../../components/molecules/Header";
import Footer from "../../components/molecules/Footer";
import Hero from "../../components/organisms/Hero";
import MarketCap from "../../components/organisms/MarketCap";

const Home = ({ marketData }: any) => {
  return (
    <>
      <Header />
      <div className={cn("section", styles.main)}>
        <div className={cn("container", styles.container)}>
          <Hero active={marketData.active_cryptocurrencies} />
          {marketData?.total_market_cap && (
            <MarketCap
              className={styles.cards}
              btc={{
                cap: marketData?.total_market_cap?.btc?.toLocaleString(),
                vol: marketData?.total_volume?.btc?.toLocaleString(),
              }}
              eth={{
                cap: marketData?.total_market_cap?.eth?.toLocaleString(),
                vol: marketData?.total_volume?.eth?.toLocaleString(),
              }}
              uni={{
                cap: marketData?.total_market_cap?.uni?.toLocaleString(),
                vol: marketData?.total_volume?.uni?.toLocaleString(),
              }}
              dot={{
                cap: marketData?.total_market_cap?.dot?.toLocaleString(),
                vol: marketData?.total_volume?.dot?.toLocaleString(),
              }}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
