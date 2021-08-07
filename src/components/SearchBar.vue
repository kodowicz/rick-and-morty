<template>
  <form
    class="form"
    @submit.prevent="submitSearch"
  >
    <label
      for="search-by"
      class="form__label"
    >Search by</label>
    <div
      v-click-outside="closeSelect"
      class="form__select"
      tab-index="0"
      @click="visible = !visible"
    >
      <div class="form__select__label">
        <p
          id="listbox-label"
          class="form__select__label__text"
          role="label"
        >
          {{ options[active] }}
        </p>
        <img
          class="form__select__label__icon"
          src="@/assets/icons/select.svg"
          alt=""
          :class="{ expanded: visible }"
        >
      </div>
      <ul
        v-show="visible"
        id="listbox"
        aria-labelledby="listbox-label"
        role="listbox"
        class="form__select__listbox"
      >
        <li
          v-for="(option, index) in options"
          :id="`listbox-${index}`"
          :key="index"
          class="form__select__option"
          role="option"
          :aria-selected="active === index"
          :class="{ selected: active === index }"
          @click="active = index"
        >
          {{ option }}
        </li>
      </ul>
    </div>
    <div class="form__search">
      <input
        v-model="input"
        class="form__search__input"
        type="search"
        :placeholder="placeholder[active]"
        maxlength="20"
      >
      <button
        class="form__search__button"
        @click.prevent="submitSearch()"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3
               3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14
               14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5
               9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
            fill="#11b0c8"
          />
        </svg>
      </button>
    </div>
  </form>
</template>

<script>
import { reactive, toRefs } from 'vue';
import useSearch from '@/composable/useSearch';
import useTabList from '@/composable/useTabList';

export default {
  setup() {
    const { setVariables } = useSearch();
    const { toggleTabList } = useTabList();

    const state = reactive({
      options: ['name', 'identifier', 'episode'],
      placeholder: ['e.g. Rick', 'e.g. 1, 2', 'e.g. 10'],
      active: 0,
      input: '',
      visible: false,
    });

    function closeSelect() {
      state.visible = false;
    }

    function submitSearch() {
      if (!state.input) return;

      toggleTabList(true);
      setVariables(
        {
          input: state.input,
          page: 1,
        },
        state.options[state.active],
      );
      state.visible = false;
      state.input = '';
    }

    return {
      submitSearch,
      closeSelect,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 30rem;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--gray);
  border: 1px solid var(--gray);
  border-radius: 1.7rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  background: var(--white);
  margin: 1.6rem auto;
  position: relative;

  @media (min-width: 768px) {
    width: max-content;
    grid-template-columns: max-content 13rem 20rem;
    grid-template-rows: auto;
  }

  @media (min-width: 1000px) {
    margin: 0;
    font-size: 1.4rem;
  }
}

.form__label {
  padding: 1.2rem 1.6rem;

  @media (min-width: 768px) {
    padding: 1.4rem 2rem;
  }
}

.form__select {
  position: relative;
  cursor: default;
  border-left: 1px solid var(--gray);
}

.form__select__label {
  padding: 1.2rem 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    padding: 1.4rem 1.6rem;
  }
}

.form__select__label__text {
  margin: 0;
  text-transform: capitalize;
}

.form__select__label__icon {
  height: 1rem;
  width: 1rem;
  transition: transform 0.2s ease-in;

  &.expanded {
    transform: rotate(180deg);
  }
}

.form__select__listbox {
  position: absolute;
  left: 0;
  width: 15rem;
  margin: 0 -1px;
  padding: 0;
  border: 1px solid var(--gray);
  background: var(--white);
  z-index: 1;
  border-bottom-left-radius: 1.7rem;
  border-bottom-right-radius: 1.7rem;

  @media (min-width: 768px) {
    width: calc(100% + 2px);
    margin: -1px;
    margin-top: 0px;
  }
}

.form__select__option {
  padding: 1.2rem 1.6rem;
  list-style: none;
  border-top: 1px solid var(--gray);
  text-transform: capitalize;

  &:first-of-type {
    border: none;
  }

  &:last-of-type {
    border-bottom-left-radius: 1.7rem;
    border-bottom-right-radius: 1.7rem;
  }

  &:hover {
    background: var(--cyan);
    color: var(--white);
  }

  @media (min-width: 768px) {
    padding: 1.4rem 1.6rem;
  }
}

.form__search {
  grid-column: 1 / 3;
  background: none;
  border: none;
  font: inherit;
  color: var(--gray);
  position: relative;
  border-top: 1px solid var(--gray);

  @media (min-width: 768px) {
    border: none;
    border-left: 1px solid var(--gray);
    grid-column: auto;
  }
}

.form__search__button {
  position: absolute;
  top: 0;
  right: 0;
  width: 5.5rem;
  height: 100%;
  padding: 1rem;

  svg {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 768px) {
    padding: 1.4rem 1.6rem;
  }
}

.form__search__input {
  font: inherit;
  color: var(--cyan);
  padding: 1.2rem 1.6rem;
  width: calc(100% - 5.5rem);
  height: 100%;
  border: none;
  background: none;
  appearance: none;
  outline-color: var(--cyan);

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }

  &::placeholder {
    color: var(--gray);
  }

  @media (min-width: 768px) {
    padding: 1.4rem 1.6rem;
  }
}
</style>
