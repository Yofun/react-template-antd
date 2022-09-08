const path = require('path');

// plugin
const WebpackBar = require('webpackbar');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@public': path.resolve(__dirname, '../public')
    },
    plugins: { add: [new WebpackBar()] },
    configure: (config) => {
      // Remove the ModuleScopePlugin which throws when we try to import something outside of src/.
      config.resolve.plugins = config.resolve.plugins.filter((plugin) => !(plugin instanceof ModuleScopePlugin));
      return config;
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
