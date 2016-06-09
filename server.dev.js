var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var devport = 6001;

var compiler = webpack(require('./webpack.dev.config.js'));
new WebpackDevServer(compiler, {
    contentBase: 'demos',
    hot: true,
    noInfo: true
}).listen(devport);
