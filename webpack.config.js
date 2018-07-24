const path = require('path');

let config = {
	entry: './src/index.js',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
};

module.exports = (env, argv) => {
	if (argv.mode === 'production') {
		config.output.filename = '[name].min.js'
	}

	return config;
};