import cn from "classnames";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import styles from "./ResetForm.module.sass";
import TextInput from "../../atoms/TextInput";
import Router, { useRouter } from "next/router";
import Modal, { ModalContent } from "../../atoms/Modal";
import { useMutation, useQuery } from "@apollo/client";
import {
  CHANGE_PASSWORD,
  RESET_PASSWORD,
} from "../../../graphql/mutations/indentity";
import { useRecoilValue } from "recoil";
import { GET_USER } from "../../../graphql/queries/identity";
import { isAuthorized } from "../../../store/auth";
import Link from "next/link";

const ResetForm = ({ authenticated }: { authenticated?: boolean }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>({});

  const isAuthenticated = useRecoilValue(isAuthorized);

  useEffect(() => {
    if (router.isReady) {
      const { token: authToken } = router.query;
      setToken(authToken?.toString());
    }
  }, [router.query, router.isReady]);

  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      setModalVisible(true);
      setModalContent({
        title: "Password Successfuly Updated",
        children: (
          <>
            <p>
              You can login now. <Link href="/auth/login">CLICK HERE</Link>
            </p>
          </>
        ),
      });
    },
    onError: (err) => {
      setModalVisible(true);
      setModalContent({
        title: "Something When Wrong",
        children: <p style={{ color: "red" }}>{err.message}</p>,
      });
    },
  });

  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted: () => {
      setModalVisible(true);
      setModalContent({
        title: "Password Successfuly Updated",
        children: <p>you should now login with your new password</p>,
      });
    },
    onError: (err) => {
      setModalVisible(true);
      setModalContent({
        title: "Something When Wrong",
        children: <p style={{ color: "red" }}>{err.message}</p>,
      });
    },
  });

  const { data } = useQuery(GET_USER, {
    context: {
      headers: {
        Authorization: `Bearer ${isAuthenticated}`,
        "Content-Type": "application/json",
      },
    },
  });

  const handleReset = (password: string) => {
    resetPassword({ variables: { token, password } });
  };

  const handleChangePassword = (
    id: string,
    oldPassword: string,
    password: string
  ) => {
    changePassword({ variables: { id, oldPassword, password } });
  };

  if (data && data.getCurrentUser.userId.split("+")[0] !== "local") {
    return <p>You are using social Auth</p>;
  }

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
        initialValues={{ oldPassword: "", password: "", confirmPassword: "" }}
        validate={(values) => {
          const errors: { [key: string]: string } = {};
          if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Your password did not match";
          }
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            const { oldPassword, password } = values;
            if (authenticated) {
              handleChangePassword(
                data.getCurrentUser.userId.split("+")[1],
                oldPassword,
                password
              );
            } else {
              handleReset(password);
            }
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          values,
          errors,
          touched,
        }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={cn("h3", styles.title)}>New password</h3>
            <div className={styles.fieldset}>
              {authenticated && (
                <TextInput
                  className={styles.field}
                  label="current password"
                  name="oldPassword"
                  type="password"
                  placeholder="current Password"
                  required
                  view
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.oldPassword}
                />
              )}
              <TextInput
                className={styles.field}
                label="new password"
                name="password"
                type="password"
                placeholder="New Password"
                required
                view
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
              />
              <TextInput
                className={styles.field}
                label="confirm password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
                view
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
              />
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <p className={styles.errorText}>{errors.confirmPassword}</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn("button", styles.button)}
            >
              Continue
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ResetForm;
