// Rollup plugins.
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'

export default {
  input: './index.js',
  output: {
    file: 'lib/index.js',
    format: 'es'
  },
  external: [],
  plugins: [
    external(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ [ 'env', { modules: false } ], 'stage-0' ],
      plugins: [ 'external-helpers' ]
    }),
    cjs({
      exclude: 'node_modules/process-es6/**',
      include: [
        'node_modules/create-react-class/**',
        'node_modules/fbjs/**',
        'node_modules/object-assign/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
        'node_modules/prop-types/**',
      ]
    }),
    globals(),

    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    resolve({
      browser: true,
      main: true,
      extensions: [ '.js'],
    }),

  ]
}
