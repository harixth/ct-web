import React from "react";
import cn from "classnames";
import icons from "../../../utils/constants/icons";

type Icon = {
  className?: string;
  name: any;
  size: string;
};

const Icon = (props: Icon) => {
  const size = props.size ? props.size : 16;
  return (
    <svg
      className={cn(props.className)}
      width={size}
      height={size}
      viewBox="0 0 16 16"
    >
      <path d={icons[props.name]}></path>
    </svg>
  );
};

export default Icon;
