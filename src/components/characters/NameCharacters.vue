<template>
  <characters-table
    :loading="loading"
    :characters="characters"
    :error="error"
  >
    <template #error>
      <p class="table-info_text">
        Couldn't find any Rick's and Morty's friends
      </p>
    </template>
    <template #empty>
      <p class="table-info_text">
        Couldn't find any Rick's and Morty's friends
      </p>
    </template>
  </characters-table>
</template>

<script>
import { provide } from 'vue';
import useCharactersQuery from '@/composable/useCharactersQuery';
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
    } = useCharactersQuery();

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
