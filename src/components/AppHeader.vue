<template>
  <header class="header">
    <div
      class="logo"
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
  border-bottom: 1px solid var(--gray);
  margin: 16px auto;

  @media (min-width: 1000px) {
    height: 134px;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0 140px;
  }
}
.logo {
  width: 240px;
  height: 70px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (min-width: 1000px) {
    margin: 0;
    width: 240px;
    margin-right: 80px;
  }
}
</style>
