import { ref, watch } from 'vue';
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';
import useSearch from '@/composable/useSearch';
import { identifierQuery } from '@/graphql/query';
import {
  createFavoriteMutation,
  deleteFavoriteMutation,
} from '@/graphql/mutation';

const variables = ref(['1']);

const { state } = useSearch();

function convertInput(input) {
  return input.split(/,|\.|\W/).filter((num) => num);
}

export default function useEpisodeQuery() {
  watch(
    () => state.variables.value,
    () => {
      const { input } = state.variables.value;

      if (state.searchBy.value === 'identifier') {
        const ids = convertInput(input);

        variables.value = ids;
      }
    },
  );

  const { result, loading, error } = useQuery(identifierQuery, {
    ids: variables,
  });
  const characters = useResult(result);

  const { mutate: createMutation } = useMutation(createFavoriteMutation);
  const { mutate: deleteMutation } = useMutation(deleteFavoriteMutation);

  function createFavorite(character) {
    createMutation(
      { ...character },
      {
        update: (cache, { data: { createFavorite } }) => {
          const { charactersByIds } = cache.readQuery({
            query: identifierQuery,
          });

          const updatedCharacters = charactersByIds.map((char) => {
            const favorite = char.id === createFavorite.id ? true : char.favorite;
            return {
              ...char,
              favorite,
            };
          });

          cache.writeQuery({
            query: identifierQuery,
            data: {
              charactersByIds: updatedCharacters,
            },
          });
        },
      },
    );
  }

  function deleteFavorite(id) {
    deleteMutation(
      { id },
      {
        update: (cache, { data: { deleteFavorite } }) => {
          const { charactersByIds } = cache.readQuery({
            query: identifierQuery,
          });

          const updatedCharacters = charactersByIds.map((char) => {
            const favorite = char.id === deleteFavorite.id ? false : char.favorite;
            return {
              ...char,
              favorite,
            };
          });

          cache.writeQuery({
            query: identifierQuery,
            data: {
              charactersByIds: updatedCharacters,
            },
          });
        },
      },
    );
  }
  return {
    characters,
    loading,
    error,
    createFavorite,
    deleteFavorite,
  };
}
