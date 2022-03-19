import React, { useState } from "react";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "./Trading.module.sass";
import Main from "./Main";
import Balance from "./Balance";
import Currency from "./Currency";
import Trades from "./Trades";
import Table from "./Table";
import Actions from "./Actions";
import Charts from "./Charts";
import { useMediaQuery } from "react-responsive";
import Modal from "../../components/atoms/Modal";

const navigation = ["Chart", "Order books", "Trades"];

const Trading = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isTablet = useMediaQuery({ query: "(max-width: 1023px)" });
  const [visible, setVisible] = useState(true);

  return (
    <>
      <Modal
        visible={visible}
        onClose={() => {}}
        title={"Page is still in construction"}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "50vh",
            textAlign: "center",
          }}
        >
          <Image width={512} height={512} src="/images/404.png" alt="hero" />
          <Link href="/">
            <a onClick={() => setVisible(false)}>Back to home</a>
          </Link>
        </div>
      </Modal>
      <div className={styles.exchange}>
        <Main />
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
        {isTablet ? (
          <>
            <Actions />
            {activeIndex === 0 && (
              <div className={styles.box}>
                <Charts />
                <Table />
              </div>
            )}
            {activeIndex === 1 && (
              <div className={styles.box}>
                <Balance />
              </div>
            )}
            {activeIndex === 2 && (
              <div className={styles.box}>
                <Currency />
                <Trades />
              </div>
            )}
          </>
        ) : (
          <div className={styles.row}>
            <div className={styles.col}>
              <Balance />
            </div>
            <div className={styles.col}>
              <Charts />
              <Actions />
              <Table />
            </div>
            <div className={styles.col}>
              <Currency />
              <Trades />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Trading;
