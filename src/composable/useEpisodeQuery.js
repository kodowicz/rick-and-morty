import { ref, watch } from 'vue';
import { useQuery, useResult, useMutation } from '@vue/apollo-composable';
import useSearch from '@/composable/useSearch';
import { episodeQuery } from '@/graphql/query';
import {
  createFavoriteMutation,
  deleteFavoriteMutation,
} from '@/graphql/mutation';

const variables = ref({
  episode: '1',
});

const { state } = useSearch();

export default function useEpisodeQuery() {
  watch(
    () => state.variables.value,
    () => {
      const { input } = state.variables.value;

      if (state.searchBy.value === 'episode') {
        variables.value = {
          episode: input,
        };
      }
    },
  );

  const { result, loading, error } = useQuery(episodeQuery, variables);
  const characters = useResult(result, [], (data) => data.episode.characters);

  const { mutate: createMutation } = useMutation(createFavoriteMutation);
  const { mutate: deleteMutation } = useMutation(deleteFavoriteMutation);

  function createFavorite(character) {
    createMutation(
      { ...character },
      {
        update: (cache, { data: { createFavorite } }) => {
          const { episode } = cache.readQuery({ query: episodeQuery });

          const updatedCharacters = episode.characters.map((char) => {
            const favorite = char.id === createFavorite.id ? true : char.favorite;
            return {
              ...char,
              favorite,
            };
          });

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
      },
    );
  }

  function deleteFavorite(id) {
    deleteMutation(
      { id },
      {
        update: (cache, { data: { deleteFavorite } }) => {
          const { episode } = cache.readQuery({ query: episodeQuery });

          const updatedCharacters = episode.characters.map((char) => {
            const favorite = char.id === deleteFavorite.id ? false : char.favorite;
            return {
              ...char,
              favorite,
            };
          });

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
