const {
  composePlugins,
  withNx,
  configurationGenerator,
} = require('@nx/webpack');
const { WebpackPnpExternals } = require('webpack-pnp-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const webpack = require('webpack');

// Set true if you don't want type checking
const skipTypeChecking = false;

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx({ skipTypeChecking }),
  (config, { options, context }) => {
    config.entry = [
      '../../node_modules/webpack/hot/poll?100',
      ...config.entry.main,
    ];
    config.externals = [
      ...config.externals,
      WebpackPnpExternals({
        exclude: ['../../node_modules/webpack/hot/poll?100'],
      }),
    ];

    config.devtool = 'source-map';
    config.target = 'node';
    config.watch = true;
    config.module.rules = [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ];

    config.plugins = [
      ...config.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({
        name: options.outputFileName,
        autoRestart: false,
        nodeArgs: ['--inspect=0.0.0.0:9229'],
      }),
    ];
    return config;
  }
);
