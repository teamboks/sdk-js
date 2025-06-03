import dts from 'rollup-plugin-dts';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'dist/index.d.ts',
  output: [{ file: 'dist/index.d.ts', format: 'esm' }],
  plugins: [dts()],
});
