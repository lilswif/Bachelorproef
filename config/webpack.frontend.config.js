import webpack from 'webpack';
import path from 'path';

const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  context: path.join(__dirname, '..'),
  entry: {
    index: (PROD ) ? ['./client/index.js'] : ['./client/index.js', 'webpack-dev-server/client?http://localhost:8080']
  },
  output: {
    path: PROD ? path.join(__dirname, '..', '/assets/') : '/',
    publicPath: PROD ? '/assets/' : 'http://localhost:8080/assets/',
    filename: '[name].bundle.js' 
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: ['node_modules'] },
      { test: /\.html$/, loader: 'html'},
      {
        test: /\.less$/,
        loader: 'style!css!less' 
      },
      // inline base64 URLs for <=8k images, direct URLs for the rest
      { test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: ( PROD ) ? ['url-loader?limit=8192', 'img?minimize&optimizationLevel=5&progressive=true'] : ['url-loader?limit=8192']  },
      // the url-loader uses DataUrls.
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
      // the file-loader emits files.
      { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' }
    ],
  plugins: PROD ? [new webpack.optimize.DedupePlugin(), new webpack.NoErrorsPlugin(), new webpack.optimize.UglifyJsPlugin()] : [],
  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['', '.js', '.json']
  },
  stats: {
    colors: true
  },
  noInfo: true,
  devtool: (PROD) ? '#source-map' : '#eval' // #inline-source-map
  }
}
