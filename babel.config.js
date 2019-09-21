/** @format */

const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: 3,
    },
  ],
  '@babel/preset-typescript',
  '@babel/preset-react',
];

const plugins = [
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-transform-arrow-functions',
  '@babel/plugin-syntax-dynamic-import',
  [
    '@babel/plugin-transform-runtime',
    {
      corejs: 3,
    },
  ],
  'babel-plugin-styled-components',
];

module.exports = api => {
  api.cache(true);

  return {
    presets,
    plugins,
    exclude: ['src/**/*.spec.(ts|js)x?', 'src/**/*.test.(ts|js)x?'],
    comments: false,
  };
};
