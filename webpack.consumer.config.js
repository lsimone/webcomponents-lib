const { resolve } = require('path')

const DISABLE_TRANSPILE = false

const DEV_MODE = process.env.NODE_ENV !== 'production'

const CFG = {
    mode: 'development',
    entry: {
        consumer: './consumer.js',
    },
    output: {
        filename: 'consumer.js',
        path: resolve(__dirname, 'dist'),
        // libraryTarget: 'umd',
        // library: 'userhub'
    },
    // resolve: {
    //     // Add `.ts` and `.tsx` as a resolvable extension.
    //     extensions: ['.ts', '.tsx', '.js', '.css', '.scss']
    // },
    module: {
        rules: []
    }
}

module.exports = CFG
