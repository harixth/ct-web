import { useQuery } from "@apollo/client";
import React from "react";
import { useRecoilValue } from "recoil";
import { GET_USER } from "../../../graphql/queries/identity";
import Profile from "../../../layout/Profile";
import { isAuthorized } from "../../../store/auth";

const UserInfo = () => {
  const isAuthenticated = useRecoilValue(isAuthorized);

  const { data } = useQuery(GET_USER, {
    context: {
      headers: {
        Authorization: `Bearer ${isAuthenticated}`,
        "Content-Type": "application/json",
      },
    },
  });
  const breadcrumbs = [
    {
      title: "Overview",
      url: "/dashboard/overview",
    },
    {
      title: "User Info",
      url: "/dashboard/profile",
    },
  ];

  return (
    <>
      <Profile title="User Info" breadcrumbs={breadcrumbs}>
        {data ? (
          <>
            <p>
              Name: <b>{data.getCurrentUser.name}</b>
            </p>
            <p>
              Email Address: <b>{data.getCurrentUser.email}</b>
            </p>
          </>
        ) : (
          <p>Data not available yet</p>
        )}
      </Profile>
    </>
  );
};

export default UserInfo;
