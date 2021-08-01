module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'no-shadow': 'off',
    'import/no-unresolved': 'off',
    'object-curly-newline': 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
  },
};
