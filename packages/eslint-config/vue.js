module.exports = {
  extends: ['./index.js'],
  env: {
    'vue/setup-compiler-macros': true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
  },
  plugins: ['vue'],
  rules: {
    // Vue specific rules
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'error',
    'vue/no-mutating-props': 'error',
    'vue/no-v-html': 'warn',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'error',
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
    },
  ],
};
