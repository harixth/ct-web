import React from "react";
import cn from "classnames";
import styles from "./Bidding.module.sass";

const Bidding = ({ title, items, children, activeIndex }: any) => {
  return (
    <div className={styles.bidding}>
      <div className={styles.head}>
        <div className={cn("container", styles.container)}>
          <h2 className={cn("h2", styles.title)}>{title}</h2>
        </div>
      </div>
      <div className={styles.body}>
        <div className={cn("container", styles.container)}>
          <div className={styles.steps}>
            {items.map((x: any, index: any) => (
              <div
                className={cn(
                  styles.step,
                  { [styles.next]: index === activeIndex },
                  { [styles.active]: index < activeIndex }
                )}
                key={index}
              >
                <div className={styles.number}>{index + 1}</div>
                {x}
              </div>
            ))}
          </div>
          <div className={styles.wrapper}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Bidding;
