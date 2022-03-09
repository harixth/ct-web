import React from "react";
import Auth from "../../../layout/Auth";
import ResetForm from "../../../components/organisms/ResetForm";

const Reset = () => {
  return (
    <>
      <Auth content="Having Trouble?" linkText="Contact Us" linkUrl="/contact">
        <ResetForm />
      </Auth>
    </>
  );
};

export default Reset;
