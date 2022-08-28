// https://stylelint.io/user-guide/ignore-code
module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss', 'stylelint-config-idiomatic-order'],
  plugins: ['stylelint-prettier'],
  ignoreFiles: ['src/styles/**/*.scss'],
  rules: {
    'prettier/prettier': true,
    'font-family-no-missing-generic-family-keyword': null,
    'at-rule-empty-line-before': null,
    'at-rule-no-unknown': null,
    'selector-pseudo-element-colon-notation': 'single',
    'scss/at-rule-no-unknown': true,
    'no-descending-specificity': null,
    'unicode-bom': 'never',
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
  },
};
