import { useQuery, useResult } from '@vue/apollo-composable';
import { favCharactersQuery } from '@/graphql/query';

export default function useFavCharacters() {
  const { result, loading, error } = useQuery(favCharactersQuery);
  const characters = useResult(result);

  return {
    characters,
    loading,
    error,
  };
}
