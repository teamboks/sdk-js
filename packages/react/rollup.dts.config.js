import dts from 'rollup-plugin-dts';
import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'src/index.ts',
  output: [{ file: 'dist/index.d.ts', format: 'esm' }],
  plugins: [dts()],
});
