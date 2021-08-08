<template>
  <router-view />
</template>

<style lang="scss">
html {
  font-size: 10px;
}

body {
  margin: 0;
}

#app {
  font-family: Poppins, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1.4rem;
  color: var(--gray);
}

* {
  box-sizing: border-box;
}

button {
  background: none;
  border: none;
  font-family: Poppins, sans-serif;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--gray);
}
</style>
