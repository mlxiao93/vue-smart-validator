import rollupPluginTypescript from 'rollup-plugin-typescript';
import typescript from 'typescript'
import path from 'path'

export default {
    input: path.resolve(__dirname, '../src/index.ts'),
    plugins: [
        rollupPluginTypescript({
            typescript
        })
    ],
    output: [
        {
            file: path.resolve(__dirname, '../dist/validator.js'),
            format: 'umd',
            name: 'Validator'
        },
        {
            file: path.resolve(__dirname, '../dist/validator.common.js'),
            format: 'cjs'
        },
        {
            file: path.resolve(__dirname, '../dist/validator.esm.js'),
            format: 'es'
        }
    ]
}