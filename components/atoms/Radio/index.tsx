import React from "react";
import cn from "classnames";
import styles from "./Radio.module.sass";

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    content: string;
  }

const Radio = ({ className, content, name, checked, onChange }: RadioProps) => {
  return (
    <label className={cn(styles.radio, className)}>
      <input
        className={styles.input}
        type="radio"
        name={name}
        onChange={onChange}
        checked={checked}
      />
      <span className={styles.inner}>
        <span className={styles.tick}></span>
        <span
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: content }}
        ></span>
      </span>
    </label>
  );
};

export default Radio;
