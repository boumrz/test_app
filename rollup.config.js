import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

const format = process.env.FORMAT === 'cjs' ? 'cjs' : 'iife';
const env = process.env.NODE_ENV;

export default {
    input: 'src/index.jsx',
    output: [
        {
            format,
        }
    ],
    plugins: [
        resolve({
            extensions: ['.jsx', '.js'],
        }),
        commonjs(),
        babel({
            exclude: './node_modules/**',
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(env || 'development'),
        }),
        (env === 'production' && uglify.uglify()),
    ],
}