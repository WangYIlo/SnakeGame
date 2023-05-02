//引入一个包
const path = require('path')
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 引入clean插件
const { CleanWepackPlugin } = require('clean-webpack-plugin')

// webpack中所有的配置信息都应该写在module.exports中
module.exports = {
    //指定入口文件
    entry: "./src/index.ts",

    //指定打包文件所在目录--输出
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后文件的名字
        filename: 'bundle.js',
        clean: true // 在生成文件之前清空 output 目录
    },

    //指定webpack 打包要使用的模块
    module: {
        //指定要loader规则
        rules: [
            {
                //test指定的规则生效的文件
                test: /\.ts$/,
                //使用的loader
                use: [
                    //配置babel
                    {
                        //指定加载器
                        loader: 'babel-loader',
                        //设置babel
                        options: {
                            //设置预定义的环境
                            presets: [
                                [
                                    //指定环境的插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome": "88"
                                        },
                                        // 指定corejs版本
                                        "corejs": "3",
                                        // 使用corejs方式 --usage按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                //需要排除的文件
                exclude: /node-modules/
            },
            //设置less文件处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // 引入postcss
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browser:'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },

    //配置webpack插件
    plugins: [
        // new CleanWepackPlugin(),
        new HTMLWebpackPlugin({
            // title:'这是一个自定义的title'
            template: './src/index.html'
        }),
    ],

    // 用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']

    }
}
