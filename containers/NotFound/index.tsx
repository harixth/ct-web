import React from "react";
import cn from "classnames";
import Image from "next/image";
import styles from "./NotFound.module.sass";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <div className={cn("section", styles.main)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrap}>
            <div className={cn("stage", styles.stage)}>404</div>
            <h1 className={cn("h1", styles.title)}>Page Not Found</h1>
            <div className={styles.text}>
              Sorry for the inconvenience. Please direct to our homepage so that
              you will be back on the right page
            </div>
            <Link href="/">
              <a className={cn("button", styles.button)}>Back to Home</a>
            </Link>
          </div>
          <div className={styles.bg}>
            <Image width={640} height={640} src="/images/404.png" alt="hero" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
