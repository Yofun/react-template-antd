const merge = require('lodash/merge');
const config = require('./base.config');

module.exports = merge(config, {
  devServer: {
    port: 9000
  }
});
