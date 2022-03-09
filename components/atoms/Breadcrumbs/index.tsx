import React from "react";
import cn from "classnames";
import Link from "next/link";
import styles from "./Breadcrumbs.module.sass";

export type BreadcrumbsItem = {
  title: string;
  url: string;
  icon?: string;
  separator?: string;
};

const Breadcrumbs = ({
  className,
  items,
}: {
  className: string;
  items: BreadcrumbsItem[];
}) => {
  return (
    <div className={cn(className, styles.breadcrumbs)}>
      {items.map((x, index) => (
        <div className={styles.item} key={index}>
          {x.url ? (
            <Link href={x.url}>
              <a className={styles.link}>{x.title}</a>
            </Link>
          ) : (
            x.title
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
