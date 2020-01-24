const { resolve } = require('path')

const DISABLE_TRANSPILE = false

const DEV_MODE = process.env.NODE_ENV !== 'production'

const CFG = {
    mode: 'development',
    entry: {
        haunted: './haunted-component.js',
        litElement: './lit-element-component.ts'
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'lib'),
        libraryTarget: 'umd',
        library: 'userhub'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            /* GLOBAL (s)Css */
            {
                test: /global\.(sa|sc|c)ss$/,
                use: [
                    DEV_MODE ? 'style-loader' : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: DEV_MODE
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: DEV_MODE
                        }
                    }
                ]
            },
            /* (s)Css */
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /global\.(sa|sc|c)ss$/,
                use: [
                    DEV_MODE ? 'style-loader' : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: DEV_MODE,
                            localsConvention: 'camelCaseOnly',
                            modules: {
                                localIdentName: DEV_MODE
                                    ? '[path][name]__[local]'
                                    : '[hash:base64]'
                            }
                        }
                    },
                    // ...(DEV_MODE ? [] : 'postcss-loader'),
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: DEV_MODE
                        }
                    }
                ]
            },
            /* Assets */
            {
                test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.])?$/,
                use: 'base64-inline-loader?limit=1000&name=[name].[ext]'
            },
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
