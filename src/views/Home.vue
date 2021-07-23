<template>
  <app-header />
  <tab-list />
  <div v-show="toggle">
    <name-characters v-if="searchBy === 'name'" />
    <episode-characters v-else-if="searchBy === 'episode'" />
    <identifier-characters v-else />
  </div>
  <div v-show="!toggle">
    <fav-characters />
  </div>
</template>

<script>
import useSearch from '@/composable/useSearch';
import useTabList from '@/composable/useTabList';

import AppHeader from '@/components/AppHeader.vue';
import TabList from '@/components/TabList.vue';

import FavCharacters from '@/components/characters/FavCharacters.vue';
import NameCharacters from '@/components/characters/NameCharacters.vue';
import EpisodeCharacters from '@/components/characters/EpisodeCharacters.vue';
import IdentifierCharacters from '@/components/characters/IdentifierCharacters.vue';

export default {
  components: {
    AppHeader,
    TabList,
    FavCharacters,
    NameCharacters,
    EpisodeCharacters,
    IdentifierCharacters,
  },
  setup() {
    const { state: tablistState } = useTabList();
    const { state: searchState } = useSearch();

    return {
      ...tablistState,
      ...searchState,
    };
  },
};
</script>
