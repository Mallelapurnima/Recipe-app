import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($username: String!, $password: String!, $email: String!) {
    register(username: $username, password: $password, email: $email) {
      id
      username
      email
    }
  }
`;
