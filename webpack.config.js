const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const file = (...args) => path.resolve(__dirname,...args)

module.exports = {
    mode: 'development',
    entry: {
        main: [file("sample","index.ts")]
    },
    output: {
        path: file("dist"),
        filename: 'index.js',
        publicPath:"/"
    },
    module: {
        rules: [
            {
                test: [/\.ts$/],
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },


    resolve: {
        extensions: ['.js', '.jsx','.ts','.tsx'],
        modules: ['node_modules'],
        alias: {
            'zenra-spa': file("src")
        }
    },
    devServer: {
        port: 3000,
        historyApiFallback:true,
        open:false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: file("sample",'index.html'),
            filename: 'index.html'
        })
    ]
}
