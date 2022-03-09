import Link from "next/link";
import React, { useState } from "react";
import Auth from "../../../layout/Auth";
import RequestForm from "../../../components/organisms/RequestForm";

const Request = () => {
  return (
    <>
      <Auth
        content="Forgot your email too?"
        linkText="Contact Us"
        linkUrl="/contact"
      >
        <RequestForm />
      </Auth>
    </>
  );
};

export default Request;
