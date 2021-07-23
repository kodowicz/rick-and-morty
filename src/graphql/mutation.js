import { gql } from '@apollo/client/core';

export const createFavoriteMutation = gql`
  mutation createFavoriteMutation(
    $id: ID!
    $name: String!
    $image: String!
    $gender: String!
    $status: String!
    $species: String!
    $lastEpisode: String!
    $favorite: Boolean!
  ) {
    createFavorite(
      data: {
        id: $id
        name: $name
        image: $image
        gender: $gender
        status: $status
        species: $species
        lastEpisode: $lastEpisode
        favorite: $favorite
      }
    ) @client
  }
`;
export const deleteFavoriteMutation = gql`
  mutation deleteFavoriteMutation($id: ID!) {
    deleteFavorite(id: $id) @client
  }
`;
