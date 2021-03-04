# [svgo](https://github.com/svg/svgo) loader for [webpack](https://github.com/webpack/webpack)

## Install

```
$ npm install svgo-loader --save-dev
```

... or with Yarn

```
$ yarn add svgo-loader -D
```

## Usage

[Documentation: Using loaders](https://webpack.js.org/concepts/loaders/#using-loaders)

```js
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader'
          },
          {
            loader: 'svgo-loader',
          }
        ]
      }
    ]
  }
}
```

By default svgo-loader uses config from `svgo.config.js` similar to svgo cli.
See [how to configure svgo](https://github.com/svg/svgo#configuration).

Specify configFile option to load custom config module:

```js
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader'
          },
          {
            loader: 'svgo-loader',
            options: {
              configFile: './scripts/svgo.config.js'
            }
          }
        ]
      }
    ]
  }
}
```

or to disable loading config:

```js
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader'
          },
          {
            loader: 'svgo-loader',
            options: {
              configFile: false
            }
          }
        ]
      }
    ]
  }
}
```

You can also specify options which override loaded from config

```js
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader'
          },
          {
            loader: 'svgo-loader',
            options: {
              multipass: true,
              js2svg: {
                indent: 2,
                pretty: true,
              }
            }
          }
        ]
      }
    ]
  }
}
```

## License and Copyright

This software is released under the terms of the [MIT license](https://github.com/svg/svgo-loader/blob/master/LICENSE).
