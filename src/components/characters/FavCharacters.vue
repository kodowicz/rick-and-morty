<template>
  <characters-table
    :loading="loading"
    :characters="characters"
    :error="error"
  >
    <template #error>
      <div>Couldn't find any Rick's and Morty's friends</div>
    </template>
    <template #empty>
      <div>You don't have any favorite characters. Let's change that!</div>
    </template>
  </characters-table>
</template>

<script>
import { provide } from 'vue';
import useFavCharactersQuery from '@/composable/useFavCharactersQuery';
import useIdentifierQuery from '@/composable/useIdentifierQuery';
import CharactersTable from '@/components/CharactersTable.vue';

export default {
  components: {
    CharactersTable,
  },
  setup() {
    const { characters, loading, error } = useFavCharactersQuery();

    const { createFavorite, deleteFavorite } = useIdentifierQuery();
    provide('createFavorite', createFavorite);
    provide('deleteFavorite', deleteFavorite);

    return {
      characters,
      loading,
      error,
    };
  },
};
</script>

<style lang="scss" scoped></style>
