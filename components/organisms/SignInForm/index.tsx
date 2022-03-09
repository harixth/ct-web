import React, { useState } from "react";
import { Formik } from "formik";
import Link from "next/link";
import cn from "classnames";
import Router from "next/router";
import { useMutation } from "@apollo/client";
import styles from "./SignInForm.module.sass";
import Dropdown from "../../../components/atoms/Dropdown";
import TextInput from "../../../components/atoms/TextInput";
import SocialAuth from "../../molecules/SocialAuth";
import { navigation, optionsPhone } from "../../../utils/constants/auth";
import Modal, { ModalContent } from "../../atoms/Modal";
import { LOGIN } from "../../../graphql/mutations/indentity";
import { useRecoilState } from "recoil";
import { authState } from "../../../store/auth";

type LoginDTO = {
  username: string;
  password: string;
};

const SignInForm = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [countryCode, setCountryCode] = useState(optionsPhone[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>({});

  const [_accessToken, setAccessToken] = useRecoilState(authState);

  const [login] = useMutation(LOGIN, {
    onCompleted: ({ login: data }) => {
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

  const handleLogin = (values: LoginDTO) => {
    login({ variables: values });
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
      <SocialAuth info="Use Your OpenID to Sign in" />
      <Formik
        initialValues={{ email: "", phone: "", password: "" }}
        validate={(values) => {
          const errors: { [key: string]: string } = {};
          if (!values.email && activeIndex === 0) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) &&
            activeIndex === 0
          ) {
            errors.email = "Invalid email address";
          } else if (!values.phone && activeIndex === 1) {
            errors.email = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            const pNum = values.phone
              ? "+" + countryCode.split("+")[1] + values.phone
              : undefined;
            handleLogin({
              username: pNum ?? values.email,
              password: values.password,
            });
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.info}>Or continue with email</div>
            <div className={styles.nav}>
              {navigation.map((x, index) => (
                <button
                  className={cn(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  onClick={() => setActiveIndex(index)}
                  key={index}
                  type="button"
                >
                  {x}
                </button>
              ))}
            </div>
            <div className={styles.container}>
              {activeIndex === 0 && (
                <TextInput
                  className={styles.field}
                  label="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              )}
              {activeIndex === 1 && (
                <div className={styles.line}>
                  <div className={styles.field}>
                    <Dropdown
                      className={styles.dropdown}
                      label="mobile"
                      value={countryCode}
                      setValue={setCountryCode}
                      options={optionsPhone}
                    />
                  </div>
                  <TextInput
                    className={styles.field}
                    name="phone"
                    type="tel"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                </div>
              )}
              {errors.email && (touched.email || touched.phone) && (
                <p className={styles.errorText}>{errors.email}</p>
              )}
            </div>
            <TextInput
              className={styles.field}
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              required
              view
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && (
              <p className={styles.errorText}>{errors.password}</p>
            )}
            <div className={styles.foot}>
              <Link href="/auth/forgot">
                <a className={styles.link}>Forgot password?</a>
              </Link>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className={cn("button", styles.button)}
            >
              Login
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignInForm;
