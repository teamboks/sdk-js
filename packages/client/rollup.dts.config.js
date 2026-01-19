import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

export default defineConfig({
  input: 'dist/index.d.ts',
  output: {
    file: pkg.types,
    format: 'es',
  },
  plugins: [dts()],
});
