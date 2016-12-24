# [svgo](https://github.com/svg/svgo) loader for [webpack](https://github.com/webpack/webpack)

## Install

```
$ npm install svgo-loader --save-dev
```

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Svgo-loader just passes config
to the [svgo](https://github.com/svg/svgo) library.

There is two ways of loading svgo configuration.
You can pass it as a JSON string after loader name, like this:

``` javascript
// webpack.config.js

var svgoConfig = JSON.stringify({
  plugins: [
    {removeTitle: true},
    {convertColors: {shorthex: false}},
    {convertPathData: false}
  ]
});

module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /.*\.svg$/,
        loaders: [
          'file-loader',
          'svgo-loader?' + svgoConfig
        ]
      }
    ]
  }
}
```

Or you can save svgo config in your main webpack config object,
and then specify name of the property in the loader query string:

``` javascript
// webpack.config.js

module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /.*\.svg$/,
        loaders: [
          'file-loader',
          'svgo-loader?useConfig=svgoConfig1'
        ]
      }
    ]
  },
  svgoConfig1: {
    plugins: [
      {removeTitle: true},
      {convertColors: {shorthex: false}},
      {convertPathData: false}
    ]
  }
}
```

### Interpolation

Interpolation is allowed in the svgo configuration.  This is useful when using the [cleanupIDs](https://github.com/svg/svgo/blob/master/plugins/cleanupIDs.js) plugin, allowing a prefix to be added to id's to make them unique.

See [loader-utils](https://github.com/webpack/loader-utils#interpolatename) for interpolation options.

``` javascript
// webpack.config.js

var svgoConfig = JSON.stringify({
  plugins: [
    {
        cleanupIDs: {
            prefix: '[name]-'
        }
    }
  ]
});

module.exports = {
  ...
  module: {
    loaders: [
      {
        test: /.*\.svg$/,
        loaders: [
          'file-loader',
          'svgo-loader?' + svgoConfig
        ]
      }
    ]
  }
}
```
