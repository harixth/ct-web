import React, { useState, useEffect } from "react";
import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.sass";
import User from "../../atoms/User";
import { useRecoilValue } from "recoil";
import { isAuthorized } from "../../../store/auth";

const Header = () => {
  const [visibleNav, setVisibleNav] = useState(false);
  const isAuthenticated = useRecoilValue(isAuthorized);

  return (
    <div className={cn(styles.header, styles.wide)}>
      <div className={styles.container}>
        <Link href="/">
          <a className={styles.logo}>
            <Image
              width={192}
              height={128}
              src="/images/logo-black.png"
              alt="main-logo"
            />
          </a>
        </Link>
        <div className={styles.wrapper}>
          <div
            className={cn(styles.wrap, { [styles.visible]: visibleNav })}
          ></div>
          {isAuthenticated ? (
            <>
              <div className={styles.control}>
                <Link href="/dashboard/overview">
                  <a
                    className={cn("button-stroke button-small", styles.button)}
                  >
                    My Account
                  </a>
                </Link>
                <User className={styles.user} />
              </div>
            </>
          ) : (
            <div className={styles.btns}>
              <Link href="/auth/register">
                <a className={cn("button-small", styles.button)}>Register</a>
              </Link>
              <Link href="/auth/login">
                <a className={cn("button-stroke button-small", styles.button)}>
                  Login
                </a>
              </Link>
            </div>
          )}
        </div>
        <button
          className={cn(styles.burger, { [styles.active]: visibleNav })}
          onClick={() => setVisibleNav(!visibleNav)}
        ></button>
      </div>
    </div>
  );
};

export default Header;
