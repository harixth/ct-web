import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./SignIn.module.sass";
import Auth from "../../../layout/Auth";
import Icon from "../../../components/atoms/Icon";
import SignInForm from "../../../components/organisms/SignInForm";

const SignIn = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.origin.split("//")[1] + window.location.pathname);
  }, []);

  return (
    <Auth
      content="Don’t have an account?"
      linkText="Register for free"
      linkUrl="/auth/register"
    >
      <div className={styles.top}>
        <h3 className={cn("h3", styles.title)}>Account Login</h3>
        <div className={styles.info}>
          Please ensure you are visiting the correct url.
        </div>
        <div className={styles.correct}>
          <Icon name="lock" size="24" />
          <div className={styles.url}>
            https://<span>{url}</span>
          </div>
        </div>
      </div>
      <SignInForm />
    </Auth>
  );
};

export default SignIn;
