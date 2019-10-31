const webpack = require('webpack');
const path = require('path');



// eslint-disable-next-line no-unused-vars
module.exports = function (env) {
    return [{
        target: "node",
        entry: {
            mdne: [
                path.resolve(__dirname, 'lib/main.mjs')
            ]
        },
        output: {
            library: 'mdne',

            libraryTarget: 'commonjs2',
            filename: '[name].js',
            path: path.resolve(__dirname, 'bin'),
            devtoolModuleFilenameTemplate: '../[resource-path]',
            // devtoolModuleFilenameTemplate: void 0
        },
        resolve: {
            // TODO:
            // ERROR in ./node_modules/red-agate-react-host/modules/react-host.mjs 11:15-50
            //       Can't import the named export 'renderToStaticMarkup' from non EcmaScript module (only default export is available)
            // ERROR in ./node_modules/red-agate-util/modules/runtime/require-dynamic.mjs 7:56-74
            //       Can't import the namespace object from non EcmaScript module (only default export is available)
            //
            // TODO:
            // The priority of '.js' must be higher than '.mjs'.
            // If '.mjs' is higher, some errors will occur.
            //    * 'renderToStaticMarkup' (red-agate-react-host/modules/react-host.mjs)
            //    * CSS files are not bundled.
            //
            // extensions: ['.tsx', '.ts', '.jsx', '.mjs', '.cjs', '.js']
            extensions: ['.js', '.mjs']
        },
        module: {
            rules: [{
                test: /\.m?js$/,
                use: [
                    'babel-loader',
                    require.resolve('@open-wc/webpack-import-meta-loader'),
                ],
                // eslint-disable-next-line no-useless-escape
                exclude: /node_modules[\/\\](?!(menneu|liyad|red-agate)).*$/
            }, {
                enforce: 'pre',
                test: /\.m?js$/,
                use: {
                    loader: 'source-map-loader',
                    options: {
                    }
                },
                // eslint-disable-next-line no-useless-escape
                exclude: /node_modules[\/\\](?!(menneu|liyad|red-agate)).*$/
            }, {
                test: /\.css$/,
                use: [
                    'raw-loader'
                ]
            }]
        },
        plugins: [
            new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })
        ],
        devtool: 'source-map'
    },
]}
