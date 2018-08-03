const path = require('path');

const libraryName = 'library';
const config = {
	entry: './index.js',
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
};

module.exports = (env, argv) => {
	if (argv.mode === 'production') {
		config.output.filename = 'index.min.js';
	}

	return config;
};
