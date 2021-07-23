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
      <div>Couldn't find any Rick's and Morty's friends</div>
    </template>
  </characters-table>
</template>

<script>
import { provide } from 'vue';
import useEpisodeQuery from '@/composable/useEpisodeQuery';
import CharactersTable from '@/components/CharactersTable.vue';

export default {
  components: {
    CharactersTable,
  },
  setup() {
    const {
      characters,
      loading,
      error,
      createFavorite,
      deleteFavorite,
    } = useEpisodeQuery();

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
