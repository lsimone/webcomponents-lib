const { resolve } = require('path')

const DISABLE_TRANSPILE = false

const CFG = {
    mode: 'development',
    entry: {
        haunted: './haunted-component.js',
        litElement: './lit-element-component.js'
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'lib'),
        libraryTarget: 'umd',
        library: 'userhub'
    },
    module: {
        rules: [
            DISABLE_TRANSPILE
                ? {}
                : {
                      // TRANSPILE LIBRARIES THAT FAIL ON IE11
                      test: /\.js$/,
                      include: absPath => {
                          const NOT_ES5_LIBS = /node_modules\/(lit-element|lit-html|haunted|proxy-polyfill)/
                          const SRC_CODE = /(haunted\-component\.js|lit\-element\-component\.js)/

                          const toBeTranspiled =
                              NOT_ES5_LIBS.test(absPath) ||
                              SRC_CODE.test(absPath)

                          if (toBeTranspiled) {
                              console.warn('transpiling >', absPath)
                          }
                          return toBeTranspiled
                      },
                      use: 'babel-loader'
                  }
        ]
    }
}

module.exports = CFG
