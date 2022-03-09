import React from "react";
import Profile from "../../../layout/Profile";
import ResetForm from "../../../components/organisms/ResetForm";

const Change = () => {
  const breadcrumbs = [
    {
      title: "Overview",
      url: "/dashboard/overview",
    },
    {
      title: "Change Password",
      url: "/dashboard/change-password",
    },
  ];

  return (
    <Profile title="Change Password" breadcrumbs={breadcrumbs}>
      <ResetForm authenticated />
    </Profile>
  );
};

export default Change;
