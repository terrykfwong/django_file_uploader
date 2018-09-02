var path = require('path');
var webpack = require('webpack');

var proxy = 'http://localhost:8000';

module.exports = {
    entry: {
        app: './js/app.jsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {app: './js/app.jsx'},
        modules: ['node_modules']
    },

    module: {
        noParse: [
            /node_modules\/ajv\/dist\/ajv\.bundle\.js/, // for ajv from NPM, don't use the compiled bundle
        ],
        rules: [
            {
                test: /\.js|\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    plugins:[ 'transform-object-rest-spread' ]
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',

    devServer: {
        contentBase: 'dist',
        historyApiFallback: true,
        proxy: {
            '/api/v1' : proxy,
            '/api/v1/*' : proxy,
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ]
};

