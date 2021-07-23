import { reactive, toRefs } from 'vue';

const state = reactive({
  toggle: true,
});

export default function useTabList() {
  function toggleTabList(value) {
    state.toggle = value;
  }

  return {
    state: toRefs(state),
    toggleTabList,
  };
}
