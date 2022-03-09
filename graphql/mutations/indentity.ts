import { gql } from "@apollo/client";

export const CREATE_IDENTITY = gql`
  mutation CreateIdentity($email: String, $phone: String, $password: String!) {
    createIdentity(
      createIdentityInput: { email: $email, phone: $phone, password: $password }
    ) {
      _id
      email
      authToken
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($token: String!, $code: Float!) {
    verifyEmail(verifyEmailInput: { token: $token, code: $code }) {
      accessToken
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(resetPasswordInput: { token: $token, password: $password }) {
      _id
      email
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $id: String!
    $oldPassword: String!
    $password: String!
  ) {
    changePassword(
      changePasswordInput: {
        id: $id
        oldPassword: $oldPassword
        password: $password
      }
    ) {
      _id
      email
    }
  }
`;
