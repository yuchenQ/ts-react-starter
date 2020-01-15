/** @format */

const presets = ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'];

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  [
    '@babel/plugin-transform-runtime',
    {
      corejs: 3,
    },
  ],
  '@babel/plugin-syntax-dynamic-import',
  'babel-plugin-styled-components',
];

module.exports = api => {
  api.cache(true);

  return {
    presets,
    plugins,
    exclude: ['src/**/*.(spec|test).(ts)x?'],
    comments: false,
  };
};
