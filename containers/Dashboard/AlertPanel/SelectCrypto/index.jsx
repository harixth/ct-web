import React, { useState } from "react";
import cn from "classnames";
import styles from "./SelectCrypto.module.sass";
import Icon from "../../../../components/atoms/Icon";

const items = [
  {
    title: "Bitcoin",
    currency: "BTC",
    price: "$36,201.34",
    positiveDay: "+6.04%",
    image: "/images/content/currency/bitcoin.svg",
  },
  {
    title: "Ethereum",
    currency: "ETH",
    price: "$2,605.95",
    positiveDay: "+6.04%",
    image: "/images/content/currency/ethereum.svg",
  },
  {
    title: "Dogecoin",
    currency: "DOGE",
    price: "$0.4139",
    negativeDay: "-0.56",
    image: "/images/content/currency/dogecoin.svg",
  },
];

const SelectCrypto = ({ goNext }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <div className={styles.crypto}>
      <div className={styles.title}>Select crypto</div>
      <form className={styles.form} action="" onSubmit={() => handleSubmit()}>
        <input
          className={styles.input}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name="search"
          placeholder="Search coin"
          required
        />
        <button className={styles.result}>
          <Icon name="search" size="20" />
        </button>
      </form>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className="sorting">#</div>
          </div>
          <div className={styles.col}>
            <div className="sorting">Name</div>
          </div>
          <div className={styles.col}>
            <div className="sorting">Price</div>
          </div>
          <div className={styles.col}>24h %</div>
        </div>
        {items.map((x, index) => (
          <div className={styles.row} key={index} onClick={goNext}>
            <div className={styles.col}>
              <div className={styles.line}>
                <button className={cn("favorite", styles.favorite)}>
                  <Icon name="star-outline" size="16" />
                </button>
                {index + 1}
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.item}>
                <div className={styles.icon}>
                  <img src={x.image} alt="Coin" />
                </div>
                <div className={styles.details}>
                  <span className={styles.subtitle}>{x.title}</span>
                  <span className={styles.currency}>{x.currency}</span>
                </div>
              </div>
            </div>
            <div className={styles.col}>{x.price}</div>
            <div className={styles.col}>
              {x.positiveDay && (
                <div className={styles.positive}>{x.positiveDay}</div>
              )}
              {x.negativeDay && (
                <div className={styles.negative}>{x.negativeDay}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCrypto;
