import React from "react";
import cn from "classnames";
import styles from "./CryptoPrices.module.sass";
import PricePanel from "../../molecules/PricePanel";
import PriceTable from "../../molecules/PriceTable";

const CryptoPrices = () => {
  return (
    <div className={cn("section", styles.details)}>
      <div className={cn("container", styles.container)}>
        <PricePanel />
        <PriceTable />
      </div>
    </div>
  );
};

export default CryptoPrices;
