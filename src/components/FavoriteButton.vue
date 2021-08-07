<template>
  <div class="character__wrapper">
    <input
      v-model="isFavorite"
      class="character__button"
      type="checkbox"
    >
    <div
      class="character__label"
      :class="{ 'character__label--favorite': isFavorite }"
    >
      <svg
        width="24"
        height="23"
        viewBox="0 0 24 23"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 18.4847L19.416 23L17.448 14.49L24 8.76421L15.372 8.02579L12 0L8.628 8.02579L0
             8.76421L6.552 14.49L4.584 23L12 18.4847Z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { ref, watch, toRefs, inject } from 'vue';

export default {
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { character } = toRefs(props);
    const isFavorite = ref(character.value.favorite);

    const createFavorite = inject('createFavorite');
    const deleteFavorite = inject('deleteFavorite');

    watch(
      () => character.value,
      (currentValue) => {
        isFavorite.value = currentValue.favorite;
      },
    );

    watch(
      () => isFavorite.value,
      (currentValue) => {
        if (currentValue) {
          createFavorite(character.value);
        } else {
          deleteFavorite(character.value.id);
        }
      },
    );

    return { isFavorite };
  },
};
</script>

<style lang="scss" scoped>
.character__wrapper {
  position: relative;
  width: 4rem;
  height: 4rem;
  margin: 0 auto;

  @media (min-width: 1000px) {
    width: 3.6rem;
    height: 3.6rem;
  }
}

.character__label {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: var(--cyan);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid currentColor;
  background: var(--white);
  z-index: -1;

  &.character__label--favorite {
    background: var(--cyan);
    color: var(--white);
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
}

.character__button {
  appearance: none;
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
