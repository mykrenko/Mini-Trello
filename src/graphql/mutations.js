import { gql } from "@apollo/client";

export const ADD_CARD = gql`
  mutation AddCard($title: String!, $description: String, $column: String!) {
    addCard(title: $title, description: $description, column: $column) {
      id
      title
      description
      column
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCard(
    $id: ID!
    $title: String
    $description: String
    $column: String
  ) {
    updateCard(
      id: $id
      title: $title
      description: $description
      column: $column
    ) {
      id
      title
      description
      column
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(id: $id)
  }
`;
