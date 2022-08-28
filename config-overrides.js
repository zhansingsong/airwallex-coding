const { override, addWebpackAlias } = require('customize-cra');
const { resolve } = require('path');

const addSvgSpriteLoader = () => (config, env) => {
  // bug: https://github.com/facebook/create-react-app/issues/9007
  if (env !== 'development') {
    config.module.rules[config.module.rules.length - 1].oneOf[3].options.plugins.push([
      'transform-remove-console',
      { exclude: ['error', 'warn'] },
    ]);
  }

  const oneOfLen = config.module.rules[config.module.rules.length - 1].oneOf.length;
  config.module.rules[config.module.rules.length - 1].oneOf[oneOfLen - 2].use[4].options.additionalData =
    '@use "~@/styles/sass/index" as *;';
  config.module.rules[config.module.rules.length - 1].oneOf[oneOfLen - 3].use[4].options.additionalData =
    '@use "~@/styles/sass/index" as *;';
  return config;
};

module.exports = override(
  addSvgSpriteLoader(),
  addWebpackAlias({
    '@': resolve(__dirname, 'src'),
  })
);
