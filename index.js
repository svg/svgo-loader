var Svgo = require('svgo');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
  this.cacheable(true);
  var callback = this.async();

  var config = loaderUtils.parseQuery(this.query);

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
    callback(null, result.data);
  });
};
