const path = require('path');

const merge = require('lodash/merge');
const config = require('./base.config');

module.exports = merge(config, {
  webpack: {
    configure: (config) => {
      config.output.path = path.resolve(__dirname, '../dist');
      return config;
    }
  }
});
