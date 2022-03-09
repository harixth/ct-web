import cn from "classnames";
import { Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./RequestForm.module.sass";
import TextInput from "../../atoms/TextInput";
import { useLazyQuery } from "@apollo/client";
import { FORGOT_PASSWORD } from "../../../graphql/queries/identity";
import Modal, { ModalContent } from "../../atoms/Modal";
import Submitted from "../../atoms/Submitted";

const RequestForm = () => {
  const [isSuccess, setSuccess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>({});
  const [forgotPassword] = useLazyQuery(FORGOT_PASSWORD, {
    onCompleted: () => setSuccess(true),
    onError: (err) => {
      setModalVisible(true);
      setModalContent({
        title: "Something When Wrong",
        children: <p style={{ color: "red" }}>{err.message}</p>,
      });
    },
  });

  const handleRequest = (username: string) => {
    forgotPassword({ variables: { username } });
  };

  return (
    <>
      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={modalContent.title ?? ""}
      >
        {modalContent.children}
      </Modal>
      {isSuccess ? (
        <>
          <Submitted
            title="Request Succeeded"
            msg="Please check your email for reset link"
          />
          <div className={styles.foot}>
            <Link href="/">
              <a className={styles.link}>Back to Home Page</a>
            </Link>
          </div>
        </>
      ) : (
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              const username = values.email;
              handleRequest(username);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.top}>
                <h3 className={cn("h3", styles.title)}>Forgot password</h3>
                <div className={styles.info}>
                  Please enter your email to receive reset password link
                </div>
              </div>
              <div className={styles.fieldset}>
                <TextInput
                  className={styles.field}
                  label="Enter the account email"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  icon="email"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn("button", styles.button)}
              >
                Continue
              </button>
              <div className={styles.foot}>
                <Link href="/auth/login">
                  <a className={styles.link}>Nevermind, I got it</a>
                </Link>
              </div>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

export default RequestForm;
