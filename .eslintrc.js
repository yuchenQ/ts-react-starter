/** @format */

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    //prettier settings
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
    es6: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  settings: {
    react: {
      version: 'detect', // depends on eslint-plugin-react
    },
  },
};
