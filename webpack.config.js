//webpack loaders
var webpack = require("webpack");
var path = require("path");
var glob = require('glob');

//var bootstrap = require('bootstrap-loader');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var PurifyCSSPlugin = require('purifycss-webpack');

//webpack condiation for live or dev mode
var isLive = process.env.NODE_ENV ==='production';//true or false

var cssDev = ['style-loader','css-loader', 'sass-loader','postcss-loader']
//var cssLive = {};
//var cssConfig = isLive ? cssLive : cssDev;

//webpack all work start here plubgins and loader
module.exports={

	mode: 'development',

	entry:[
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8081',
    path.resolve(__dirname, './main.js')
  ],

	output:{
		path: __dirname + '/public',
		filename:'bundle.js'
	},

	module: {
    rules: [
		//js loader
		{
			test: /\.(js|jsx)$/,exclude: /node_modules/,use: ['cache-loader','babel-loader']
		},
      {
		// css loader
	   test: /\.scss$/,
		use:[
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
		//test: /\.css$/
		//		  use: ExtractTextPlugin.extract({
		//		  fallback: 'style-loader',
		//		  use: ['css-loader', 'sass-loader'],
		//			publicPath:'./src'
		//		})
	   //use: ExtractTextPlugin.extract([{ loader: "style-loader" },{ loader: "css-loader" },{ loader: "sass-loader" }])
	  },
		{// font-awesome
        test: /font-awesome\.config\.js/,
        use: [
          { loader: 'style-loader' },
          { loader: 'font-awesome-loader' },
        ],
      },
		// fonts loader
		{
			test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader"'
		},
    	{
		test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, loader: 'file-loader'
		},
		// images loader
		{
		  test: /\.(gif|png|jpe?g|svg)$/i,
		  use: [
			'file-loader',
			{
		loader: 'image-webpack-loader',
		options: {mozjpeg: {progressive: true,quality: 65},
        // optipng.enabled: false will disable optipng
        optipng: {enabled: false,},
        pngquant: {quality: '65-90',speed: 4},
        gifsicle: {interlaced: false,},
        // the webp option will enable WEBP
        webp: {quality: 75},
		bypassOnDebug: true, // webpack@1.x
		disable: true, // webpack@2.x and newer
			  },
			},
		  ],
		},
		// bootstrap loader
//		{
//			test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports-loader?jQuery=jquery'
//		},
    ]
  },
	// server plugin
	devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8080,
	//stats:'error-only',
	hot:true,
	disableHostCheck: true,
	open:true
  },
	// all plugin start here
  plugins: [
	  	// html plugin
		new HtmlWebpackPlugin({ // this code use for custom html file esp file is auto matic genrate html in folader
		title: 'Custom template',
		// Load a custom template (lodash by default see the FAQ for details)
		//minify:{collapseWhitespace:true},
		hash:true,
		template: './src/index.html'
		}),
		new HtmlWebpackPlugin({ // this code use for custom html file esp file is auto matic genrate html in folader
		title: 'test template',
		// Load a custom template (lodash by default see the FAQ for details)
		//minify:{collapseWhitespace:true},
		hash:true,
		filename:'test.html',
		template: './src/test.html'
		}),
		/******************/
		//    new HtmlWebpackPlugin({  // Also generate a test.html
		//      filename: 'test.html',
		//      template: '/public/test.html',
		//
		//    })
		// new HtmlWebpackPlugin(), // Generates default index.html

	  // css plugin
	  new ExtractTextPlugin({
		  filename: 'bundle.css',
		  allChunks: true,
    }),
	  new ExtractTextPlugin({
		  filename:'style.css',
		  //disabled:false,
		  allChunks:true

	  }),
	  new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),

	  // css PurifyCSSPlugin
	  new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, 'src/*.html')),
    }),
	  new webpack.HotModuleReplacementPlugin(),
	  //enable hmr globally
	  new webpack.NamedModulesPlugin(),
	  //print more readable module name in the bowsere console log
	],

	 resolve: {
        modules: [
            path.join(__dirname, 'node_modules')
        ]
    }


}
