import React from "react";
import cn from "classnames";
import styles from "./TextInput.module.sass";
import Icon from "../Icon";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  empty?: boolean;
  view?: boolean;
  icon?: string;
  note?: string;
}

const TextInput = ({
  className,
  label,
  empty,
  view,
  icon,
  note,
  ...props
}: TextInputProps) => {
  return (
    <div
      className={cn(
        styles.field,
        { [styles.empty]: empty },
        { [styles.view]: view },
        { [styles.icon]: icon },
        className
      )}
    >
      {label && <div className={cn(styles.label)}>{label}</div>}
      <div className={styles.wrap}>
        <input className={cn(styles.input)} {...props} />
        {view && (
          <button type="button" className={styles.toggle}>
            <Icon name="eye" size="24" />
          </button>
        )}
        {icon && (
          <div className={styles.preview}>
            <Icon name={icon} size="24" />
          </div>
        )}
        {note && <div className={styles.note}>{note}</div>}
      </div>
    </div>
  );
};

export default TextInput;
