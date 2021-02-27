const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {HotModuleReplacementPlugin, DefinePlugin} = require('webpack')

// NOTE: config duplication
const LOCAL_PORT = 3000
const LOCAL_SERVER_PORT = 8080
const OUT_DIR = 'build'
const OUT_FILE = 'bundle.js'
const APP_ICON_PATH = 'assets/favicon.ico'

const {NODE_ENV} = process.env
const PROD = NODE_ENV === 'production'

module.exports = {
	entry: ['@babel/polyfill', './src/client/index.js'],
	output: {
		path: path.join(__dirname, OUT_DIR),
		filename: OUT_FILE,
		// publicPath allows you to specify the base path for all the assets within your application
		// publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},

			// CSS, and Sass
			{
				test: /\.(css)$/,
				use: ['style-loader', 'css-loader'],
			},

			// Images
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},

			// Fonts and SVG
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline',
			},
		],
	},
	mode: NODE_ENV || 'development',
	devtool: PROD && 'source-map',
	devServer: {
		port: LOCAL_PORT,
		proxy: {
			'/api': `http://localhost:${LOCAL_SERVER_PORT}`,
		},
		// historyAPIFallback will redirect 404s to /index.html => fix a problem (works only for local dev-server) with "cannot GET /URL" error on refresh with React Router https://tylermcginnis.com/react-router-cannot-get-url-refresh/, ALTERNATIVE method (hack): HashRouter
		historyApiFallback: true,
		compress: true,
		hot: true,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html',
			favicon: `./${APP_ICON_PATH}`,
		}),
		new HotModuleReplacementPlugin(),
		// Access to process.env variables at front-end (e.g.: ApolloClient url requires this)
		new DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				DEBUG: JSON.stringify(process.env.DEBUG),
			},
		}),
	],
	resolve: {
		// aliases - compilation paths
		alias: {
			src: path.resolve(__dirname, './src/'),
			config: path.resolve(__dirname, './config/'),
			plugins: path.resolve(__dirname, './plugins/'),
			data: path.resolve(__dirname, './data/'),
			assets: path.resolve(__dirname, './assets/'),
			// eslint-disable-next-line camelcase
			node_modules: path.resolve(__dirname, './node_modules/'),
			Components: path.resolve(__dirname, './src/client/Components/'),
			Styles: path.resolve(__dirname, './src/client/styles/'),
		},
		// aliases - ignore lack of file extentions in import paths
		extensions: ['.mjs', '.js', '.jsx', '.css', '.scss'],
	},
}
