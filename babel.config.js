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
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
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
