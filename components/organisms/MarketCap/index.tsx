import React from "react";
import cn from "classnames";
import Link from "next/link";
import styles from "./MarketCap.module.sass";

type MarketCapProps = {
  className: string;
  btc: { cap: string; vol: string };
  eth: { cap: string; vol: string };
  uni: { cap: string; vol: string };
  dot: { cap: string; vol: string };
};

const MarketCap = ({ className, btc, eth, uni, dot }: MarketCapProps) => {
  const items = [
    {
      title: "BTC",
      price: `$${btc?.cap}`,
      money: `Volume: ${btc?.vol}`,
      positive: "+1.19%",
      image: "images/content/currency/bitcoin.svg",
      url: "/",
    },
    {
      title: "ETH",
      price: `$${eth?.cap}`,
      money: `Volume: ${eth?.vol}`,
      positive: "+0.19%",
      image: "images/content/currency/ethereum.svg",
      url: "/",
    },
    {
      title: "UNI",
      price: `$${uni?.cap}`,
      money: `Volume: ${uni?.vol}`,
      positive: "+2.40%",
      image: "images/content/currency/uniswap.svg",
      url: "/",
    },
    {
      title: "DOT",
      price: `$${dot?.cap}`,
      money: `Volume: ${dot?.vol}`,
      positive: "+2.40%",
      image: "images/content/currency/polkadot.svg",
      url: "/",
    },
  ];
  return (
    <>
      <div className={cn(className, styles.cards)}>
        {items.map((x, index) => (
          <Link key={index} href={x.url}>
            <a className={styles.card}>
              <div className={styles.icon}>
                <img src={x.image} alt="Currency" />
              </div>
              <div className={styles.details}>
                <div className={styles.line}>
                  <div className={styles.title}>{x.title} - Market Cap</div>
                  {/* {x.positive && (
                    <div className={styles.positive}>{x.positive}</div>
                  )}
                  {x.negative && (
                    <div className={styles.negative}>{x.negative}</div>
                  )} */}
                </div>
                <div className={styles.price}>{x.price}</div>
                <div className={styles.money}>{x.money}</div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <div className={styles.text}>
        <p>updated as {new Date().toLocaleString()}</p>
      </div>
    </>
  );
};

export default MarketCap;
