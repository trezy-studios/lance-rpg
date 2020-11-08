// const ClosurePlugin = require('closure-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')





// Local constants
const {
	npm_lifecycle_event,
	PORT,
} = process.env
const isProduction = npm_lifecycle_event === 'build'





module.exports = {
	devServer: {
		contentBase: './dist',
		hot: true,
		overlay: true,
		port: PORT || 3000,
		stats: 'minimal',
	},

	devtool: !isProduction && 'source-map',

	entry: './lib/client/clientEntryPoint.js',

	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},

	module: {
		rules: [
			{
				test: /\.(?:c|m)?js$/,
				exclude: /node_modules/,
				use: [
					{ loader: 'babel-loader' }
				],
			},

			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCSSExtractPlugin.loader,
						options: {
							hmr: !isProduction,
						},
					},
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' },
				],
			},

			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							disable: true,
						},
					},
				],
			},
		],
	},

	optimization: {
		minimize: isProduction,
		minimizer: [
			new TerserPlugin({
				// terserOptions: {
				// 	compress: {
				// 		booleans_as_integers: true,
				// 		drop_console: false,
				// 		ecma: 6,
				// 		passes: 5,
				// 		unsafe: true,
				// 	},
				// },
			}),
			// new ClosurePlugin({
			// 	mode: 'STANDARD',
			// }, {
			// 	languageOut: 'ECMASCRIPT_2020',
			// }),
		],
	},

	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'lib/images/',
					to: 'images',
				},
			],
		}),
		new HTMLWebpackPlugin({
			inlineSource: isProduction && '\.(js|css)$',
			minify: isProduction && {
				collapseWhitespace: true
			},
			template: 'lib/client/index.html',
		}),
		new OptimizeCSSAssetsPlugin,
		new MiniCSSExtractPlugin({
			filename: '[name].css',
		}),
	],

	resolve: {
		fallback: {
			http: false,
		},
	},
}
