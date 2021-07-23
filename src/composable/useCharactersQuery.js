import { ref, watch } from 'vue';
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';
import useSearch from '@/composable/useSearch';
import { charactersQuery } from '@/graphql/query';
import {
  createFavoriteMutation,
  deleteFavoriteMutation,
} from '@/graphql/mutation';

const { state } = useSearch();

const variables = ref({
  page: 1,
  name: '',
});

export default function useCharactersQuery() {
  watch(
    () => state.variables.value,
    () => {
      const { page, input } = state.variables.value;
      if (state.searchBy.value === 'name') {
        variables.value = {
          page,
          name: input,
        };
      }
    },
  );

  const { result, loading, error } = useQuery(charactersQuery, variables);
  const characters = useResult(result, null, (data) => data.characters.results);
  const info = useResult(result, null, (data) => data.characters.info);

  const { mutate: createMutation } = useMutation(createFavoriteMutation);
  const { mutate: deleteMutation } = useMutation(deleteFavoriteMutation);

  function createFavorite(character) {
    createMutation(
      { ...character },
      {
        update: (cache, { data: { createFavorite } }) => {
          const { characters } = cache.readQuery({ query: charactersQuery });

          const updatedCharacters = characters.results.map((char) => {
            const favorite = char.id === createFavorite.id ? true : char.favorite;
            return {
              ...char,
              favorite,
            };
          });

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
      },
    );
  }

  function deleteFavorite(id) {
    deleteMutation(
      { id },
      {
        update: (cache, { data: { deleteFavorite } }) => {
          const { characters } = cache.readQuery({ query: charactersQuery });

          const updatedCharacters = characters.results.map((char) => {
            const favorite = char.id === deleteFavorite.id ? false : char.favorite;
            return {
              ...char,
              favorite,
            };
          });

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
      },
    );
  }

  return {
    characters,
    info,
    loading,
    error,
    createFavorite,
    deleteFavorite,
  };
}
