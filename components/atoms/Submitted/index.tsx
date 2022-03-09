import React from "react";
import parse from "html-react-parser";
import styles from "./Submitted.module.sass"

const Submitted = ({ msg, title }: { msg: string, title: string }) => {
  return (
    <div>
      {/* {parse(
        `<lottie-player src="/images/lottie/sms-sent.json"  background="transparent"  speed="1"  style="width: 400px; height: 300px;" autoplay></lottie-player>`
      )} */}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.msg}>{msg}</p>
    </div>
  );
};

export default Submitted;