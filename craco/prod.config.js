const path = require('path');

const merge = require('lodash/merge');
const config = require('./base.config');

module.exports = merge(config, {
  webpack: {
    configure: (config, { env, paths }) => {
      paths.appBuild = 'dist';
      config.output = {
        ...config.output,
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
      };
      return config;
    }
  }
});
