var Svgo = require('svgo');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
  this.cacheable(true);
  var callback = this.async();

  var config = loaderUtils.parseQuery(this.query);
  var svgo = new Svgo(config);
  svgo.optimize(source, function(result) {
    callback(null, result.data);
  });
};
