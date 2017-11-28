import path from 'path'
import OpenBrowserPlugin from 'open-browser-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
    entry: {
        basic: path.resolve(__dirname, './basic/index')
    },
    output: {
        filename: '[name].js'
    },
    // devtool: 'eval-source-map',
    devServer: {
        port: 8001,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './basic/index.html'),
            filename: 'basic.html'
        }),
        new OpenBrowserPlugin({ url: `http://localhost:8001` })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff.*|svg|eot|ttf|)$/i,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    hash: 'sha512',
                    publicPath: '/',
                    name: 'assets/[hash].[ext]'
                }
            },
            {
                test: /\.scss|css$/,
                use: [
                    { loader: 'style-loader', options: { sourceMap: true } },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    // { loader: 'postcss-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.vue'],
        alias: {
            vue: 'vue/dist/vue'
        }
    }
}