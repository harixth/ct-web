import React from "react";
import cn from "classnames";
import styles from "./Checkbox.module.sass";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  content: string;
  note?: string;
}

const Checkbox = ({
  className,
  content,
  note,
  checked,
  onChange,
}: CheckboxProps) => {
  return (
    <label className={cn(styles.checkbox, className)}>
      <input
        className={styles.input}
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <span className={styles.inner}>
        <span className={styles.tick}></span>
        <span
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: content }}
        ></span>
        {note && <span className={styles.note}>{note}</span>}
      </span>
    </label>
  );
};

export default Checkbox;
