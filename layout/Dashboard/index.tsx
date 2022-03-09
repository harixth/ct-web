import React, { useState } from "react";
import cn from "classnames";
import styles from "./Dashboard.module.sass";
import Icon from "../../components/atoms/Icon";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../../components/molecules/Header";

type NavItem = {
  title: string;
  color?: string;
  icon?: string;
  url: string;
  separator?: string;
};

const navigation: NavItem[] = [
  {
    title: "Overview",
    color: "#FFC93C",
    url: "/dashboard/overview",
  },
  {
    title: "Profile",
    color: "#16697A",
    url: "/dashboard/profile",
  },
];

const Dashboard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const Router = useRouter();
  const pathname = Router.asPath;
  const [visibleMenu, setVisibleMenu] = useState(false);

  const activeItem = navigation.find((x) => pathname.includes(x.url));
  const selected = !!navigation.find((x) => pathname === x.title);

  return (
    <>
      <Header />
      <div className={cn(className, styles.dashboard)}>
        <div className={styles.sidebar}>
          <div className={cn(styles.group, { [styles.active]: visibleMenu })}>
            <div
              className={styles.top}
              onClick={() => setVisibleMenu(!visibleMenu)}
            >
              {activeItem && (
                <>
                  <div
                    className={styles.bg}
                    style={{ backgroundColor: activeItem.color }}
                  ></div>
                  {activeItem.title}
                </>
              )}
            </div>
            <div className={styles.menu}>
              {navigation.map((item, index) =>
                item.url ? (
                  <Link href={item.url} key={index}>
                    <a
                      className={cn(
                        styles.item,
                        {
                          [styles.separator]: item.separator,
                        },
                        { [styles.active]: selected }
                      )}
                    >
                      {item.color && (
                        <div
                          className={styles.bg}
                          style={{ backgroundColor: item.color }}
                        ></div>
                      )}
                      {item.icon && <Icon name={item.icon} size="20" />}
                      {item.title}
                    </a>
                  </Link>
                ) : (
                  <></>
                )
              )}
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>{children}</div>
      </div>
    </>
  );
};

export default Dashboard;
