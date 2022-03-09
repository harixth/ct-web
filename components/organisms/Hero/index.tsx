import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.sass";

const Hero = ({ marketCap }: { marketCap: number }): JSX.Element => {
  return (
    <div className={cn("container", styles.container)}>
      <div className={styles.wrap}>
        <h1 className={cn("h3", styles.title)}>
          Cryptocurrency market cap today is ${marketCap} Trillion
        </h1>
        <div className={styles.text}>
          View top cryptocurrency prices live, crypto charts, market cap, and
          trading volume by creating an account with us.
        </div>
        <Link href="/auth/login">
          <a className={cn("button", styles.button)}>Get started now</a>
        </Link>
      </div>
      <div className={styles.bg}>
        <Image width={500} height={500} src="/images/home.png" alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
