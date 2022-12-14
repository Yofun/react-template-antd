const devConfig = require('./dev.config');
const prodConfig = require('./prod.config');

module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
