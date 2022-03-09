import React, { useEffect, useState } from "react";
import cn from "classnames";
import Router, { useRouter } from "next/router";
import styles from "./CodeForm.module.sass";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import { VERIFY_EMAIL } from "../../../graphql/mutations/indentity";
import Modal, { ModalContent } from "../../atoms/Modal";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { authState } from "../../../store/auth";

type CodeFormInput = {
  first?: number;
  second?: number;
  third?: number;
  fourth?: number;
};

const CodeForm = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>({});

  const [_accessToken, setAccessToken] = useRecoilState(authState);

  useEffect(() => {
    if (router.isReady) {
      const { token: authToken } = router.query;
      setToken(authToken?.toString());
    }
  }, [router.query, router.isReady]);

  const [verifyEmail] = useMutation(VERIFY_EMAIL, {
    onCompleted: ({ verifyEmail: data }) => {
      setAccessToken(data.accessToken);
      Router.push(`/dashboard/overview`);
    },
    onError: (err) => {
      setModalVisible(true);
      setModalContent({
        title: "Something When Wrong",
        children: <p style={{ color: "red" }}>{err.message}</p>,
      });
    },
  });

  const handleVerify = (values: CodeFormInput) => {
    const { first, second, third, fourth } = values;
    const code = Number(`${first}${second}${third}${fourth}`);
    verifyEmail({ variables: { token, code } });
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
      <Formik
        initialValues={{}}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleVerify(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={cn("h4", styles.title)}>Enter your security code</h3>
            <div className={styles.info}></div>
            <div className={styles.code}>
              {/* TODO: make the next auto focus after user key in the number */}
              <div className={styles.number}>
                <input
                  type="text"
                  pattern="\d*"
                  maxLength={1}
                  name="first"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className={styles.number}>
                <input
                  type="text"
                  pattern="\d*"
                  maxLength={1}
                  name="second"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className={styles.number}>
                <input
                  type="text"
                  pattern="\d*"
                  maxLength={1}
                  name="third"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className={styles.number}>
                <input
                  type="text"
                  pattern="\d*"
                  maxLength={1}
                  name="fourth"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
            </div>
            <div className={styles.btns}>
              {/* <button
                type="button"
                className={cn("button-stroke button-small", styles.button)}
              >
                Resend code
              </button> */}
              <button
                disabled={isSubmitting}
                type="submit"
                className={cn("button-small", styles.button)}
              >
                Continue
              </button>
            </div>
            <div className={styles.foot}>
              <Link href="/auth/register">
                <a className={styles.link}>Back to Register</a>
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CodeForm;
