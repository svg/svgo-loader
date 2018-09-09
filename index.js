var Svgo = require('svgo');
var loaderUtils = require('loader-utils');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');

module.exports = function(source) {
  this.cacheable(true);
  var callback = this.async();

  var config = loaderUtils.getOptions(this) || {};

  // This piece of code exists in order to support webpack 1.x.x top level configurations.
  // In webpack 2 this options does not exists anymore.
  // Please use the `options` field of the loader to pass your configuration
  if (config.useConfig) {
    var configName = config.useConfig;
    var config = this.options[configName];
    if (config === undefined) {
      callback(new Error(
        'You specified "useConfig=' + configName +
        '" for svgo-loader, but there is no property named "' + configName +
        '" in your main webpack configuration.'
      ));
      return;
    }
  }

  // Ported from:
  // https://github.com/svg/svgo/blob/174c37208017e5909d5f7db2e8faba49663a945a/lib/svgo/coa.js#L175-L192
  if (typeof config.externalConfig === 'string') {
    var configPath = config.externalConfig;
    var configText;
    try {
      configText = fs.readFileSync(path.resolve(configPath), 'utf8');
      config = JSON.parse(configText);
    } catch (err) {
      if (err.code === 'ENOENT') {
        callback(new Error("Couldn't find file with external svgo config '" + configPath + "'."));
        return;
      } else if (err.code === 'EISDIR') {
        callback(new Error("Directory '" + configPath + "' is not a config file."));
        return;
      }
      config = yaml.safeLoad(configText);
      if (!config || Array.isArray(config)) {
        callback(new Error("Invalid external svgo config file '" + configPath + "'."));
        return;
      }
    }
  }

  var svgo = new Svgo(config);
  svgo.optimize(source, { path: this.resourcePath })
  .then(function(result) {
    callback(null, result.data);
    return;
  }, function(error) {
    if (error instanceof Error) {
      callback(error);
      return;
    }
    callback(new Error(error));
    return;
  });
};
