/**
 *
 * @date 2016-01-07 21:45:16
 * @author vfasky <vfasky@gmail.com>
 */

module.exports = {
    entry: {
        mcore: './src/index',
        mcoreApp: './app/index',
        mcoreTest: './app-test/index'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    plugins: [
    ],
    resolve: {
        extensions: ['', '.coffee', '.js'],
        alias: {
            mcore: __dirname + '/dist/mcore.js',
        }
    },
    module: {
        loaders: [{
            test: /\.coffee$/,
            loader: "coffee-loader"
        }, ]
    },
    externals: ['jquery']
};
