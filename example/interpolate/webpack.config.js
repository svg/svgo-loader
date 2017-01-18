var svgoConfig = JSON.stringify({
  plugins: [
    {cleanupIDs: {
        prefix: '[name].[hash:6]-'
    }}
  ]
});

module.exports = {
  context: __dirname,
  entry: "./entry",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /.*\.svg$/,
        loaders: ['file-loader', '../../index.js?' + svgoConfig]
      }
    ]
  }
}
