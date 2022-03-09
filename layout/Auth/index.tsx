import React from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import styles from "./Auth.module.sass";

type AuthProps = {
  className?: string;
  content: string;
  linkText: string;
  linkUrl: string;
  children: React.ReactNode;
};

const Auth = ({ content, linkText, linkUrl, children }: AuthProps) => {
  return (
    <div className={cn(styles.auth)}>
      <div
        className={styles.col}
        style={{
          backgroundImage: "url(/images/bg-auth.png)",
        }}
      >
        <Link href="/">
          <a className={styles.logo}>
            <Image
              width={192}
              height={128}
              src="/images/logo-white.png"
              alt="main-logo"
            />
          </a>
        </Link>
      </div>
      <div className={styles.col}>
        <div className={styles.head}>
          <span>{content}</span>
          <Link href={linkUrl}>
            <a className={styles.link}>{linkText}</a>
          </Link>
        </div>
        <div className={styles.wrap}>{children}</div>
      </div>
    </div>
  );
};

export default Auth;
