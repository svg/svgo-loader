const { extendDefaultPlugins } = require('svgo');
module.exports = {
  plugins: extendDefaultPlugins([
    {
      name: 'removeTitle',
      active: false
    },
    {
      name: 'convertPathData',
      active: false
    },
    {
      name: 'convertColors',
      params: {
        shorthex: false
      }
    }
  ])
};
