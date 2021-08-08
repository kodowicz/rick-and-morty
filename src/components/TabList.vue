<template>
  <div
    class="tablist"
    role="tablist"
    aria-label="switch characters"
  >
    <button
      id="characters"
      class="tablist__button"
      :aria-selected="toggle"
      role="tab"
      aria-controls="characters"
      @click="toggleTabList(true)"
      @keydown.left.right="toggleTabList(!toggle)"
    >
      All Characters
    </button>
    <button
      id="favorites"
      class="tablist__button"
      :aria-selected="!toggle"
      role="tab"
      aria-controls="favorites"
      @click="toggleTabList(false)"
      @keydown.left.right="toggleTabList(!toggle)"
    >
      Favorites
    </button>
  </div>
</template>

<script>
import useTabList from '@/composable/useTabList';

export default {
  setup() {
    const { state, toggleTabList } = useTabList();

    return {
      ...state,
      toggleTabList,
    };
  },
};
</script>

<style lang="scss" scoped>
.tablist {
  margin: 5rem auto 3rem;
  width: fit-content;

  @media (min-width: 1000px) {
    margin: 3rem auto;
  }
}

.tablist__button {
  display: inline;
  padding: 0;
  margin: 0 2rem;
  outline: none;
  line-height: 150%;
  font-size: 1.6rem;

  &[aria-selected='true'] {
    border-bottom: 3px solid var(--cyan);
    color: var(--cyan);
  }
}
</style>
