<template>
  <header class="header">
    <div
      class="header__logo"
      @click="resetVariables"
    >
      <img src="@/assets/images/logo.png">
    </div>
      <search-bar />
  </header>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import useSearch from '@/composable/useSearch';

export default {
  components: {
    SearchBar,
  },
  setup() {
    const { resetVariables } = useSearch();

    return {
      resetVariables,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1.6rem auto;

  @media (min-width: 1000px) {
    height: 10rem;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 140px;
    margin: 2rem auto;
  }
}

.header__logo {
  width: 17rem;
  height: 6rem;
  margin: 1.6rem auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (min-width: 1000px) {
    margin: 0;
    width: 15rem;
    margin-right: 8rem;
  }
}
</style>
