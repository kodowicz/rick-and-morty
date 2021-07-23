import { gql } from '@apollo/client/core';

export const favCharactersQuery = gql`
  query favCharactersQuery {
    favCharacters @client {
      image
      id
      name
      gender
      status
      species
      favorite
      lastEpisode
    }
  }
`;

export const charactersQuery = gql`
  query charactersQuery($page: Int!, $name: String!) {
    characters(page: $page, filter: { name: $name }) {
      info {
        pages
        next
        prev
      }
      results {
        image
        id
        name
        gender
        status
        species
        episode {
          episode
        }
        lastEpisode @client
        favorite @client
      }
    }
  }
`;

export const episodeQuery = gql`
  query episodeQuery($episode: ID!) {
    episode(id: $episode) {
      characters {
        image
        id
        name
        gender
        status
        species
        episode {
          episode
        }
        favorite @client
        lastEpisode @client
      }
    }
  }
`;

export const identifierQuery = gql`
  query identifierQuery($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      image
      id
      name
      gender
      status
      species
      episode {
        episode
      }
      favorite @client
      lastEpisode @client
    }
  }
`;
