import path from 'path';
import webpack from 'webpack';
import fs from 'fs';

const PROD = process.env.NODE_ENV === 'production';

const definePlugin = new webpack.DefinePlugin({
  __PROD__: PROD
});

const nodeModules = {};
fs.readdirSync('node_modules')
    .filter(module => {
      return ['.bin'].indexOf(module) === -1;
    })
    .forEach(mod => {
      nodeModules[mod] = 'commonjs ' + mod;
    });

export default {
  entry: './server/server.js',
  target: 'node',
  module: {
    loaders: [
      {test: /\.js$/,
       exclude: /node_modules/,
       loaders: ['babel'] }
    ]
  },
  node: {
    __filename: true,
    __dirname: false
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'backend.js'
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  plugins: (PROD) ? [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false }),
    new webpack.optimize.UglifyJsPlugin(),
    definePlugin
  ] : [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false }),
    definePlugin
  ],
  devtool: '#source-map',
  externals: nodeModules
};
