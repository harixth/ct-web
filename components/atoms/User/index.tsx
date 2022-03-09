import React, { useState } from "react";
import Image from "next/image";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../Icon";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { useCookies } from "react-cookie";
import { authState } from "../../../store/auth";

const User = ({ className }: { className: string }) => {
  const [visible, setVisible] = useState(false);
  const [_cookies, setCookie] = useCookies();
  const [_accessToken, setAccessToken] = useRecoilState(authState);

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(className, styles.user, { [styles.active]: visible })}>
        <button className={styles.head} onClick={() => setVisible(!visible)}>
          <Image
            width={32}
            height={32}
            src="/images/avatar-user.jpg"
            alt="Avatar"
          />
        </button>
        <div className={styles.body}>
          <div className={styles.menu}>
            <Link href="/">
              <a
                className={styles.item}
                onClick={() => {
                  setCookie("jwt", "");
                  setAccessToken("");
                }}
              >
                <div className={styles.icon}>
                  <Icon name="exit" size="20" />
                </div>
                <div className={styles.details}>
                  <div className={styles.title}>Log Out</div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default User;
