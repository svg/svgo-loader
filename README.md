# [svgo](https://github.com/svg/svgo) loader for [webpack](https://github.com/webpack/webpack)

## Install

```
$ npm install svgo svgo-loader --save-dev
```

... or with Yarn

```
$ yarn add svgo svgo-loader -D
```

DON'T FORGET TO INSTALL / UPDATE THE `svgo` PACKAGE after you update `svg-loader` (see [#20](https://github.com/rpominov/svgo-loader/issues/20))

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Svgo-loader just passes config to the [svgo](https://github.com/svg/svgo) library.

### Put the SVGO config into loader's `options`

``` javascript
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {loader: 'file-loader'},
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {removeTitle: true},
                {convertColors: {shorthex: false}},
                {convertPathData: false}
              ]
            }
          }
        ]
      }
    ]
  }
}
```

### Or use an external config like you would with SVGO CLI

``` javascript
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {loader: 'file-loader'},
          {
            loader: 'svgo-loader',
            options: {
              externalConfig: "svgo-config.yml"
            }
          }
        ]
      }
    ]
  }
}
```

In `svgo-config.yml`:

```yml
plugins:
  - removeTitle: true
  - convertPathData: false
  - convertColors:
      shorthex: false
```

You can use `YML` or `JSON` files as external configs.