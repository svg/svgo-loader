var Svgo = require('svgo');
var loaderUtils = require('loader-utils');

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

  var svgo = new Svgo(config);
  svgo.optimize(source, function(result) {
    if (result.error) {
      callback(new Error(result.error));
      return;
    }

    callback(null, result.data);
  });
};
