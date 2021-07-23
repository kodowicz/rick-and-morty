import { InMemoryCache } from 'apollo-cache-inmemory';
import {
  favCharactersQuery,
  charactersQuery,
  identifierQuery,
  episodeQuery,
} from '@/graphql/query';

export const cache = new InMemoryCache();

function updateCharactersCache(characters, favCharacters) {
  return characters.map((character) => {
    const favorite = favCharacters.some(
      (favCharacter) => favCharacter.id === character.id && favCharacter.favorite,
    );

    const lastEpisode = character.episode[character.episode.length - 1].episode;

    return {
      ...character,
      favorite,
      lastEpisode,
    };
  });
}

export const resolvers = {
  Query: {
    favCharacters: () => {
      cache.writeQuery({
        query: favCharactersQuery,
        data: {
          favCharacters: [],
        },
      });
    },
    characters: ({ characters }, params, { cache }) => {
      const { favCharacters } = cache.readQuery({
        query: favCharactersQuery,
      });

      const updatedCharacters = updateCharactersCache(
        characters.results,
        favCharacters,
      );

      cache.writeQuery({
        query: charactersQuery,
        data: {
          characters: {
            ...characters,
            results: updatedCharacters,
          },
        },
      });
    },
    episode: ({ episode }, params, { cache }) => {
      const { favCharacters } = cache.readQuery({
        query: favCharactersQuery,
      });

      const updatedCharacters = updateCharactersCache(
        episode.characters,
        favCharacters,
      );

      cache.writeQuery({
        query: episodeQuery,
        data: {
          episode: {
            ...episode,
            characters: updatedCharacters,
          },
        },
      });
    },
    charactersByIds: ({ charactersByIds }) => {
      const { favCharacters } = cache.readQuery({
        query: favCharactersQuery,
      });

      const updatedCharacters = updateCharactersCache(
        charactersByIds,
        favCharacters,
      );

      cache.writeQuery({
        query: identifierQuery,
        data: {
          charactersByIds: updatedCharacters,
        },
      });
    },
  },

  Mutation: {
    createFavorite: (_, { data }, { cache }) => {
      const { favCharacters } = cache.readQuery({ query: favCharactersQuery });

      const exists = favCharacters.some((char) => char.id === data.id);
      if (exists) return;

      const createCharacter = {
        ...data,
        favorite: true,
        __typename: 'FavCharacter',
      };

      cache.writeQuery({
        query: favCharactersQuery,
        data: {
          favCharacters: [...favCharacters, createCharacter],
        },
      });

      return createCharacter;
    },

    deleteFavorite: (_, { id }, { cache }) => {
      const { favCharacters } = cache.readQuery({ query: favCharactersQuery });

      const filtredCharacters = favCharacters.filter((item) => item.id !== id);

      cache.writeQuery({
        query: favCharactersQuery,
        data: {
          favCharacters: filtredCharacters,
        },
      });

      return {
        id,
      };
    },
  },
};
