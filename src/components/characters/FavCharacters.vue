<template>
  <characters-table
    :loading="loading"
    :characters="characters"
    :error="error"
  >
    <template #error>
      <p class="table-info_text">Couldn't find any Rick's and Morty's friends</p>
    </template>
    <template #empty>
      <p class="table-info_text">You don't have any favorite characters. Let's change that!</p>
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
