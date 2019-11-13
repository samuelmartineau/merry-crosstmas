module.exports = {
  extends: 'airbnb',
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
    jasmine: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'arrow-parens': 'off',
    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',
  },
};
