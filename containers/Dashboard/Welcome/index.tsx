import React from "react";
import Image from "next/image";
import styles from "./Welcome.module.sass";
import Dashboard from "../../../layout/Dashboard";
import classNames from "classnames";

const Welcome = () => {
  return (
    <Dashboard>
      <div className={styles.container}>
        <div>
          <h3 className={classNames("h3", styles.title)}>
            Welcome to Cyrpto Tracker
          </h3>
          <p className={styles.text}>
            You can visit profile tab to see user details and change password.
            <br />
            However there's no crypto stuff yet. Stay Tuned!
          </p>
        </div>
        <Image width={640} height={500} src="/images/overview.png" alt="hero" />
      </div>
    </Dashboard>
  );
};

export default Welcome;
