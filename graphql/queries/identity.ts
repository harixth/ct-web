import { gql } from "@apollo/client";

export const FORGOT_PASSWORD = gql`
  query ForgotPassword($username: String!) {
    forgotPassword(username: $username) {
      _id
      email
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    getCurrentUser {
      userId
      name
      email
    }
  }
`;
