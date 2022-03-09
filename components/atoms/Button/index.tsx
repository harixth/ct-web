import classNames from "classnames";

type ButtonProps = {
  text: string;
};

const Button = ({ text }: ButtonProps): JSX.Element => {
  return <button className={classNames("button")}>{text}</button>;
};

export default Button;
