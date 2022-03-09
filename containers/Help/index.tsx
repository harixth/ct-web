import React from "react";
import cn from "classnames";
import Image from "next/image";
import styles from "./Help.module.sass";
import Header from "../../components/molecules/Header";
import TextInput from "../../components/atoms/TextInput";

const Help = () => {
  return (
    <>
      <Header />
      <div className={cn("section", styles.main)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.wrap}>
            <div className={cn("stage", styles.stage)}>
              Save your time by asking
            </div>
            <h1 className={cn("h1", styles.title)}>How can we help</h1>
            <div className={styles.text}>
              Please enter your email and we will reach out to you
            </div>
            <TextInput
              className={styles.form}
              placeholder="Search anything"
              type="text"
              name="search"
              icon="arrow-next"
            />
          </div>
          <div className={styles.bg}>
            <Image width={640} height={640} src="/images/home.png" alt="hero" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
