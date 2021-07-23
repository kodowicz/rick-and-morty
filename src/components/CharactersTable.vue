<template>
  <div
    v-if="error"
    class="table-info"
  >
    <slot name="error" />
  </div>
  <div
    v-else-if="empty"
    class="table-info"
  >
    <slot name="empty" />
  </div>
  <slot v-else>
    <div class="table_wrapper">
      <table class="table">
        <thead class="table__head">
          <tr class="table__head__row">
            <th
              v-for="tableHead in tableHeads"
              :key="tableHead"
              class="table__head__column"
            >
              {{ tableHead }}
            </th>
          </tr>
        </thead>
        <tbody v-if="loading">
          <tr
            v-for="(n, i) in loadingRows"
            :key="i"
            class="table__body__row--loading"
          >
            <td
              v-for="tableHead in tableHeads"
              :key="tableHead"
              class="table__column table__column--loading"
            >
              <div class="table__column__element--loading" />
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            v-for="character in characters"
            :key="character.id"
          >
            <td class="table__column">
              <span>{{ character.type }}</span>
              <div class="table__column__picture">
                <img
                  class="table__column__picture__img"
                  :class="{
                    'table__column__picture__img--dead':
                      character.status === 'Dead'
                  }"
                  :src="character.image"
                  :alt="character.name"
                  loading="lazy"
                >
                <img
                  v-if="character.status === 'Dead'"
                  class="table__column__picture__status"
                  src="@/assets/icons/dead.svg"
                >
              </div>
            </td>
            <td class="table__column">
              {{ character.id }}
            </td>
            <td class="table__column">
              {{ character.name }}
            </td>
            <td class="table__column table__column--gender">
              <img
                class="table__column__gender"
                :src="
                  require(`@/assets/icons/gender-${character.gender.toLowerCase()}.svg`)
                "
              >
              <span>{{ character.gender }}</span>
            </td>
            <td class="table__column">
              {{ character.species }}
            </td>
            <td class="table__column">
              {{ character.lastEpisode }}
            </td>
            <td class="table__column">
              <favorite-button :character="character" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </slot>
</template>

<script>
import { ref, toRef, computed } from 'vue';
import FavoriteButton from '@/components/FavoriteButton.vue';

export default {
  components: {
    FavoriteButton,
  },
  props: ['characters', 'loading', 'error'],
  setup(props) {
    const characters = toRef(props, 'characters');
    const tableHeads = ref([
      'Photo',
      'Character ID',
      'Name',
      'Gender',
      'Species',
      'Last Episode',
      'Add To Favorite',
    ]);

    return {
      tableHeads,
      loadingRows: computed(() => Array(10)),
      empty: computed(() => !props.loading && !characters.value?.length),
    };
  },
};
</script>

<style lang="scss" scoped>
.table-info {
  font-size: 20px;
  margin: 20px auto;
  text-align: center;

  @media (min-width: 1000px) {
    margin: 40px auto;
  }
}

.table_wrapper {
  width: 100%;
  overflow: auto;
}

.table {
  border-collapse: collapse;
}

.table__head__row {
  background: var(--light-gray)-trans;
}

.table__head__column {
  padding: 16px var(--padding);
  font-weight: 500;
}

.table__column {
  border: none;
  border-bottom: 1px solid var(--light-gray);
  padding: 8px var(--padding);
}

.table__head__column,
.table__column {
  text-align: left;
  white-space: nowrap;

  &:first-of-type {
    padding-left: var(--padding-left);
  }
  &:last-of-type {
    padding-right: var(--padding-left);
  }
}

.table__column--loading {
  padding: 30px 0;
}
.table__column__element--loading {
  height: 20px;
  background: var(--light-gray)-trans;
}

.table__column__picture {
  width: 43px;
  height: 68px;
  position: relative;
  background: var(--gray);
}

.table__column__picture__img {
  width: 43px;
  height: 100%;
  object-fit: cover;

  &.table__column__picture__img--dead {
    filter: grayscale(1);
  }
}

.table__column__picture__status {
  width: 15px;
  position: absolute;
  top: -3px;
  right: -8px;
}

.table__column__gender {
  margin-right: 4px;
  height: 100%;
}
</style>
