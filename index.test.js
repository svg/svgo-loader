const fs = require('node:fs/promises');
const path = require('node:path');
const { test } = require('node:test');

const webpack = require('webpack');

const basic = require('./example/basic/webpack.config.js');
const externalConfig = require('./example/external-config/webpack.config.js');
const svgoError = require('./example/svgo-error/webpack.config.js');

function buildWebpack(config) {
  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

// Override default serializer to avoid SVG snapshot file being stringified
const identitySerializer = (value) => value;

test('basic', async (t) => {
  const result = await buildWebpack(basic);
  t.assert.equal(result.hasErrors(), false);
  const output = await fs.readFile(
    path.join(__dirname, 'example', 'basic', 'dist', 'SVG_logo.svg'),
    'utf8',
  );
  t.assert.fileSnapshot(output, 'snapshots/basic.svg', {
    serializers: [identitySerializer],
  });
});

test('external-config', async (t) => {
  const result = await buildWebpack(externalConfig);
  t.assert.equal(result.hasErrors(), false);
  const output = await fs.readFile(
    path.join(__dirname, 'example', 'external-config', 'dist', 'SVG_logo.svg'),
    'utf8',
  );
  t.assert.fileSnapshot(output, 'snapshots/external-config.svg', {
    serializers: [identitySerializer],
  });
});

test('svgo-error', async (t) => {
  const result = await buildWebpack(svgoError);
  t.assert.equal(result.hasErrors(), true);
});
