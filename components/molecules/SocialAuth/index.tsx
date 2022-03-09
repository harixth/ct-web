import React from "react";
import Image from "next/image";
import cn from "classnames";
import styles from "./SocialAuth.module.sass";
import { API_GATEWAY_URL } from "../../../graphql/client";

const SocialAuth = ({ info }: { info: string }) => {
  return (
    <div className={styles.top}>
      <div className={styles.info}>{info}</div>
      <div className={styles.btns}>
        <a href={`${API_GATEWAY_URL}/auth/discord`}>
          <button className={cn("button-blue", styles.button)}>
            <Image
              className={styles.icon}
              width={32}
              height={32}
              src="/svg/discord.svg"
              alt="discord"
            />
            <span>Discord</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default SocialAuth;
