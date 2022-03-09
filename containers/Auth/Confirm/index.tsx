import Link from "next/link";
import React, { useState } from "react";
import cn from "classnames";
import styles from "./Confirm.module.sass";
import Submitted from "../../../components/atoms/Submitted";
import Auth from "../../../layout/Auth";
import CodeForm from "../../../components/organisms/CodeForm";

const Confirm = () => {
  const [isSuccess, setIsSuccess] = useState(true);
  return (
    <>
      <Auth
        content="Having issue with verification?"
        linkText="Contact Us"
        linkUrl="/contact"
      >
        {isSuccess ? (
          <>
            <Submitted
              title="Registration Succeeded"
              msg="Please check your email/mobile for verification code"
            />
            <CodeForm />
          </>
        ) : (
          <>
            <Submitted
              title="Registration Failed"
              msg="Something when wrong during account creation"
            />
            <Link href="auth/register">
              <a className={cn("button", styles.button)}>Try Again</a>
            </Link>
          </>
        )}
      </Auth>
    </>
  );
};

export default Confirm;
