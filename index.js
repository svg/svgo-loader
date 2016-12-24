var Svgo = require('svgo');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
  this.cacheable(true);
  var callback = this.async();

  var interpolateQuery = loaderUtils.interpolateName(this, this.query, { content: source });
  var config = loaderUtils.parseQuery(interpolateQuery);

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
