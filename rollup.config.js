import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  preserveSymlinks: true,
  input: [ 'simple-carousel.js' ],
  output: {
    file: 'build/simple-carousel.min.js',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve(),
    babel(),
    terser()
  ]
};