import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.sass";

type HeroProps = {
  active: number;
};

const Hero = ({ active }: HeroProps): JSX.Element => {
  return (
    <div className={cn("container", styles.container)}>
      <div className={styles.wrap}>
        <h1 className={cn("h3", styles.title)}>
          There are about {active?.toLocaleString()} active cryptocurrencies as
          of today
        </h1>
        <div className={styles.text}>
          Never missed the next bull run as we created an intelligent price
          notifier so that you did
        </div>
        <Link href="/prices">
          <a className={cn("button", styles.button)}>Check Coin Prices</a>
        </Link>
      </div>
      <div className={styles.bg}>
        <Image width={500} height={500} src="/images/home.png" alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
