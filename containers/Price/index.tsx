import React from "react";
import cn from "classnames";
import Image from "next/image";
import styles from "./Price.module.sass";
import CryptoPrices from "../../components/organisms/CryptoPrices";
import Header from "../../components/molecules/Header";

const Price = () => {
  return (
    <>
      <Header />
      <div className={cn("section-mb0", styles.main)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrap}>
            <div>
              <h2 className={cn("h2", styles.title)}>
                Today’s Cryptocurrency prices
              </h2>
              <div className={styles.text}>
                The global crypto market cap is <strong>$1.86T</strong>
              </div>
            </div>
            <Image
              width={364}
              height={364}
              src="/images/3d/prices.png"
              alt="prices"
            />
          </div>
        </div>
      </div>
      <CryptoPrices />
    </>
  );
};

export default Price;
