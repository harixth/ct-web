import React, { useState } from "react";
import cn from "classnames";
import { useRouter } from "next/router";
import styles from "./Profile.module.sass";
import Icon from "../../components/atoms/Icon";
import Breadcrumbs, {
  BreadcrumbsItem,
} from "../../components/atoms/Breadcrumbs";
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
    title: "User Info",
    icon: "user",
    url: "/dashboard/profile",
  },
  {
    title: "Change password",
    icon: "lock",
    url: "/dashboard/change-password",
  },
];

const Proflie = ({
  title,
  breadcrumbs,
  children,
}: {
  title: string;
  breadcrumbs: BreadcrumbsItem[];
  children: React.ReactNode;
}) => {
  const Router = useRouter();
  const pathname = Router.asPath;
  const [visible, setVisible] = useState(false);

  const activeLink = navigation.find((x) => pathname.includes(x.url));
  const selected = !!navigation.find((x) => pathname === x.title);

  return (
    <>
      <Header />
      <div className={styles.profile}>
        <div className={styles.head}>
          <div className={cn("container", styles.container)}>
            <h2 className={cn("h2", styles.title)}>{title}</h2>
            <Breadcrumbs className={styles.breadcrumbs} items={breadcrumbs} />
          </div>
        </div>
        <div className={styles.body}>
          <div className={cn("container", styles.container)}>
            <div className={styles.sidebar}>
              <div
                className={cn(styles.dropdown, { [styles.active]: visible })}
              >
                <div
                  className={styles.top}
                  onClick={() => setVisible(!visible)}
                >
                  {activeLink && (
                    <>
                      <Icon name={activeLink.icon} size="24" />
                      {activeLink.title}
                    </>
                  )}
                </div>
                <div className={styles.group}>
                  <div className={styles.menu}>
                    {navigation.map((item, index) => (
                      <Link href={item.url} key={index}>
                        <a
                          className={cn(
                            styles.link,
                            {
                              [styles.separator]: item.separator,
                            },
                            { [styles.active]: selected }
                          )}
                        >
                          {item.icon && <Icon name={item.icon} size="20" />}
                          {item.title}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.wrapper}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Proflie;
