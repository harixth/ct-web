import React from "react";
import cn from "classnames";
import styles from "./SignUp.module.sass";
import Auth from "../../../layout/Auth";
import SignUpForm from "../../../components/organisms/SignUpForm";

const SignUp = () => {
  return (
    <>
      <Auth
        content="Already have an account?"
        linkText="Login"
        linkUrl="/auth/login"
      >
        <h3 className={cn("h3", styles.title)}>Create an Account</h3>
        <SignUpForm />
      </Auth>
    </>
  );
};

export default SignUp;
