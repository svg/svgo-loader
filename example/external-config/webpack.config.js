module.exports = {
  mode: "production",
  context: __dirname,
  entry: "./entry",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: "file-loader"
          },
          {
            loader: "../../index.js",
            options: {
              configFile: './svgo.config.js'
            }
          }
        ]
      }
    ]
  }
}
