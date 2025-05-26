module.exports = {
  extends: ['./index.js'],
  parserOptions: {
    extraFileExtensions: ['.svelte'],
  },
  plugins: ['svelte3'],
  rules: {
    // Svelte specific rules
    'import/first': 'off',
    'import/no-duplicates': 'off',
    'import/no-mutable-exports': 'off',
    'import/no-unresolved': 'off',
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 1, maxEOF: 0 }],
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  settings: {
    'svelte3/typescript': true,
    'svelte3/ignore-styles': () => true,
  },
};
