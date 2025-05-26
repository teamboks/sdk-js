module.exports = {
  extends: ['./index.js'],
  env: {
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // React specific rules
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-fragments': ['error', 'syntax'],
    'react/no-unescaped-entities': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
