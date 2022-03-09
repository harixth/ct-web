import React, { useState } from "react";
import { Formik } from "formik";
import cn from "classnames";
import Router from "next/router";
import { useMutation } from "@apollo/client";
import styles from "./SignUpForm.module.sass";
import Dropdown from "../../../components/atoms/Dropdown";
import TextInput from "../../../components/atoms/TextInput";
import Checkbox from "../../atoms/Checkbox";
import SocialAuth from "../../molecules/SocialAuth";
import { navigation, optionsPhone } from "../../../utils/constants/auth";
import { CREATE_IDENTITY } from "../../../graphql/mutations/indentity";
import Modal, { ModalContent } from "../../atoms/Modal";

type SignupDTO = {
  email?: string;
  phone?: string;
  password: string;
};

const SignUpForm = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>({});
  const [countryCode, setCountryCode] = useState(optionsPhone[0]);
  const [policy, setPolicy] = useState(false);

  const [createIdentity] = useMutation(CREATE_IDENTITY, {
    onCompleted: ({ createIdentity: data }) => {
      Router.push(`/auth/verify?token=${data.authToken}`);
    },
    onError: (err) => {
      setModalVisible(true);
      setModalContent({
        title: "Something When Wrong",
        children: <p style={{ color: "red" }}>{err.message}</p>,
      });
    },
  });

  const handleRegister = (values: SignupDTO) => {
    createIdentity({ variables: values });
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
      <SocialAuth info="Use Your OpenID to Sign up" />
      <Formik
        initialValues={{
          email: "",
          phone: "",
          password: "",
          confirmPassword: undefined,
        }}
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
          if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Your password did not match";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            const pNum = values.phone
              ? "+" + countryCode.split("+")[1] + values.phone
              : undefined;
            delete values["confirmPassword"];
            handleRegister({ ...values, phone: pNum });
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
          /* and other goodies */
        }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.info}>Or continue with email or mobile</div>
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
                  <div className={styles.country}>
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
            <TextInput
              className={styles.field}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
              view
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword ?? ""}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className={styles.errorText}>{errors.confirmPassword}</p>
            )}
            <div className={styles.foot}>
              <Checkbox
                className={styles.checkbox}
                checked={policy}
                onChange={() => setPolicy(!policy)}
                content="<span>By signing up I agree that I’m 18 years of age or older</span>"
              />
            </div>

            <button
              disabled={isSubmitting || !policy}
              type="submit"
              className={cn("button", styles.button)}
            >
              Sign up
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
