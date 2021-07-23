import { createApp, h, provide } from 'vue';
import { ApolloClients } from '@vue/apollo-composable';

import apolloClient from './server/apolloClient';
import { clickOutside } from './directives/clickOutside';
import App from './App.vue';
import router from './router';

createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient,
    });
  },
  render: () => h(App),
})
  .directive('click-outside', clickOutside)
  .use(router)
  .mount('#app');
