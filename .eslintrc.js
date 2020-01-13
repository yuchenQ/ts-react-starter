/** @format */

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
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
  rules: {
    'react/destructuring-assignment': 'off',
    'no-use-before-define': ['error',
      { functions: false, classes: true, variables: true }
    ],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
  },
};
