const { optimize, loadConfig } = require('svgo');

async function loader(source) {
  const { configFile, ...options } = this.getOptions();
  let config;
  if (typeof configFile === 'string') {
    config = await loadConfig(configFile, this.context);
  } else if (configFile !== false) {
    config = await loadConfig(null, this.context);
  }
  const result = optimize(source, { path: this.resourcePath, ...config, ...options });
  return result.data;
}

module.exports = function (source) {
  const callback = this.async();
  loader.call(this, source)
    .then(result => callback(null, result))
    .catch(error => callback(error));
};
