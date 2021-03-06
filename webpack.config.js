const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',   // set source mapping to enhance the debugging process
    entry:  __dirname + "/index.js",
    output: {
      path: __dirname + "/build", //打包后的文件存放的地方
      filename: "bundle.js" //打包后输出文件的文件名
    },
    devServer: {
      contentBase: "./public", //本地服务器所加载的页面所在的目录
      historyApiFallback: true, //不跳转
      inline: true, //实时刷新
      hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // launch css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // set class name format
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.mp4$/,
                loader: 'url-loader?limit=10000&name=/videos/[name]&mimetype=video/mp4'
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('Author: Smallsun<br/> Year: 2018'),
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.tmpl.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            { 
                from: './assets' , 
                to: 'static',
                force: true
            }
        ])
    ] 
}
