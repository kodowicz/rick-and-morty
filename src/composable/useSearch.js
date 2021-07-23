import { reactive, toRefs } from 'vue';

const state = reactive({
  variables: {
    page: 1,
    input: '',
  },
  searchBy: 'name',
});

export default function useSearch() {
  function setVariables(values, searchBy) {
    state.variables = {
      ...state.variables,
      ...values,
    };
    state.searchBy = searchBy;
  }

  function resetVariables() {
    state.variables = {
      page: 1,
      input: '',
    };
    state.searchBy = 'name';
  }

  return {
    state: toRefs(state),
    setVariables,
    resetVariables,
  };
}
