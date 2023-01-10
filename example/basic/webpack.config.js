module.exports = {
  mode: "production",
  context: __dirname,
  entry: "./entry",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    assetModuleFilename: '[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset/resource',
        loader: '../../index.js',
      }
    ]
  }
}
