const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : './src/index.js',

    resolve: {
        fallback: {
            path: require.resolve('path-browserify'),
            os: require.resolve('os-browserify/browser'),
            fs: false,
        }
    },

    output : {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },

    plugins : [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],

    devServer: {
        proxy: {
          '/': 'http://localhost:3505'
        }
      },

    module : {
        rules : [
            {
                test : /.css$/,
                exclude : /node_modules/,
                use : ['style-loader', 'css-loader']
            },
            {
                test : /.js$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader',
                    options : {
                        presets : ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
}