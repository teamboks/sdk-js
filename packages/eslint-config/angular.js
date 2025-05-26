module.exports = {
  extends: ['./index.js'],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@angular-eslint'],
  rules: {
    // Angular specific rules
    '@angular-eslint/component-class-suffix': 'error',
    '@angular-eslint/component-selector': [
      'error',
      {
        type: 'element',
        prefix: 'app',
        style: 'kebab-case',
      },
    ],
    '@angular-eslint/directive-class-suffix': 'error',
    '@angular-eslint/directive-selector': [
      'error',
      {
        type: 'attribute',
        prefix: 'app',
        style: 'camelCase',
      },
    ],
    '@angular-eslint/no-host-metadata-property': 'error',
    '@angular-eslint/no-input-rename': 'error',
    '@angular-eslint/no-inputs-metadata-property': 'error',
    '@angular-eslint/no-output-native': 'error',
    '@angular-eslint/no-output-on-prefix': 'error',
    '@angular-eslint/no-output-rename': 'error',
    '@angular-eslint/no-outputs-metadata-property': 'error',
    '@angular-eslint/use-lifecycle-interface': 'error',
    '@angular-eslint/use-pipe-transform-interface': 'error',
  },
  overrides: [
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        '@angular-eslint/template/banana-in-box': 'error',
        '@angular-eslint/template/no-negated-async': 'error',
      },
    },
  ],
};
