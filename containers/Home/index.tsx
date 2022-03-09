import { useState } from "react";
import cn from "classnames";
import styles from "./Home.module.sass";
import Header from "../../components/molecules/Header";
import Footer from "../../components/molecules/Footer";
import Hero from "../../components/organisms/Hero";

const Home = () => {
  const [marketCap, _setMarketCap] = useState(1.91);

  return (
    <>
      <Header />
      <div className={cn("section", styles.main)}>
        <Hero marketCap={marketCap} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
