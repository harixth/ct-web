import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import cn from "classnames";
import styles from "./PricePanel.module.sass";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import Link from "next/link";
import Dropdown from "../../atoms/Dropdown";
import { SocketContext } from "../../../context/socket";

const navigation = ["Cryptocurrencies"];

const chart = [
  {
    name: "1",
    price: 0,
  },
  {
    name: "2",
    price: 0,
  },
  {
    name: "3",
    price: 0,
  },
  {
    name: "4",
    price: 0,
  },
  {
    name: "5",
    price: 0,
  },
  {
    name: "6",
    price: 0,
  },
];

const initial = {
  currency: "$",
  value: "0",
  change: 0.0,
  previous: "0",
  chartData: chart,
};

const PricePanel = () => {
  const socket = useContext(SocketContext);
  const [BTC, setBTC] = useState(initial);
  const [ETH, setETH] = useState(initial);
  const [DOGE, setDOGE] = useState(initial);

  useEffect(() => {
    socket.on("BTCUSD_PRICE_UPDATED", (price) => {
      const { chartData } = BTC;
      const name = chartData[0].name;
      chartData.shift();
      chartData?.push({ name, price: Number(price.value?.replace(",", "")) });
      console.log(chartData);
      setBTC({ ...price, chartData });
    });

    socket.on("ETHUSD_PRICE_UPDATED", (price) => {
      const { chartData } = ETH;
      const name = chartData[0].name;
      chartData.shift();
      chartData?.push({ name, price: Number(price.value?.replace(",", "")) });
      console.log(chartData);
      setETH({ ...price, chartData });
    });

    socket.on("DOGEUSD_PRICE_UPDATED", (price) => {
      const { chartData } = DOGE;
      const name = chartData[0].name;
      chartData.shift();
      chartData?.push({ name, price: Number(price.value?.replace(",", "")) });
      console.log(chartData);
      setDOGE({ ...price, chartData });
    });
  }, [socket]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sorting, setSorting] = useState(navigation[0]);

  return (
    <div className={styles.panel}>
      <div className={styles.body}>
        <div className={styles.list}>
          {[
            {
              title: "BTCUSD",
              value: `${BTC.value}`,
              currency: `${BTC.currency}`,
              change: BTC.change,
              previous: `${BTC.previous}`,
              chartData: BTC.chartData,
              image: "/images/content/currency/bitcoin.svg",
              url: "#",
            },
            {
              title: "ETHUSD",
              value: `${ETH.value}`,
              currency: `${ETH.currency}`,
              change: ETH.change,
              previous: `${ETH.previous}`,
              chartData: ETH.chartData,
              image: "/images/content/currency/ethereum.svg",
              url: "#",
            },
            {
              title: "DOGEUSD",
              value: `${DOGE.value}`,
              currency: `${DOGE.currency}`,
              change: DOGE.change,
              previous: `${DOGE.previous}`,
              chartData: DOGE.chartData,
              image: "/images/content/currency/dogecoin.svg",
              url: "#",
            },
          ].map((x, index) => (
            <Link key={index} href={x.url}>
              <a className={styles.item}>
                <div className={styles.icon}>
                  <Image width={40} height={40} src={x.image} alt="Currency" />
                </div>
                <div className={styles.details}>
                  <div className={styles.line}>
                    <div className={styles.title}>{x.title}</div>
                    {x.change && (
                      <div
                        className={
                          Math.sign(x.change) === 1
                            ? styles.positive
                            : styles.negative
                        }
                      >
                        {x.change === 0 ? "0.00" : x.change.toFixed(2)}
                      </div>
                    )}
                  </div>
                  <div className={styles.price}>
                    {x.currency}
                    {x.value}
                  </div>
                  <div className={styles.currency}>Last: {x.previous}</div>
                </div>
                <div className={styles.chart}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      width={500}
                      height={400}
                      data={x.chartData}
                      margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="colorPrice"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#45B36B"
                            stopOpacity={0.6}
                          />
                          <stop
                            offset="95%"
                            stopColor="#45B36B"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#58BD7D"
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.foot}>
        <div className={styles.nav}>
          {navigation.map((x, index) => (
            <button
              className={cn(styles.link, {
                [styles.active]: index === activeIndex,
              })}
              onClick={() => setActiveIndex(index)}
              key={index}
            >
              {x}
            </button>
          ))}
        </div>
        <Link href="/exchange">
          <a className={cn("button-stroke button-small", styles.button)}>
            Trade
          </a>
        </Link>
        <Dropdown
          className={styles.dropdown}
          value={sorting}
          setValue={setSorting}
          options={navigation}
        />
      </div>
    </div>
  );
};

export default PricePanel;
