//      
'use strict';

const _ = require('lodash');
const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appendTaskTime = require('./append-task-time');
const errorTypes = require('./error-types');
const wrapError = require('./wrap-error');
const constants = require('./constants');
const createWebpackConfigClient = require('./create-webpack-config-client');
const createWebpackStatsError = require('./create-webpack-stats-error');
const watchContext = require('./watch-context');

function watchWebpack(
  batfishConfig                      ,
  options   
                             
                                     
                              
   
)       {
  const { onError, onNotification, onFirstCompile } = options;

  const htmlWebpackPluginOptions = {
    template: path.join(__dirname, '../webpack/html-webpack-template.ejs'),
    cssBasename: _.isEmpty(batfishConfig.stylesheets)
      ? ''
      : constants.BATFISH_CSS_BASENAME
  };
  let lastHash;
  let hasCompiled = false;

  createWebpackConfigClient(batfishConfig, { devServer: true })
    .then((clientConfig) => {
      // Create an HTML file to load the assets in the browser.
      const config = webpackMerge(clientConfig, {
        plugins: [new HtmlWebpackPlugin(htmlWebpackPluginOptions)]
      });

      let compiler;
      try {
        compiler = webpack(config);
      } catch (compilerInitializationError) {
        onError(
          wrapError(compilerInitializationError, errorTypes.WebpackFatalError)
        );
        return;
      }

      const onCompilation = (compilationError, stats) => {
        // Don't do anything if the compilation is just repetition.
        // There's often a series of many compilations with the same output.
        if (stats.hash === lastHash) return;
        lastHash = stats.hash;

        if (!hasCompiled) {
          hasCompiled = true;
          onNotification(chalk.green.bold('Go!'));
          if (onFirstCompile) {
            onFirstCompile();
          }
        }

        if (compilationError) {
          onError(
            wrapError(compilationError, errorTypes.WebpackCompilationError)
          );
          return;
        }

        if (stats.hasErrors()) {
          onError(createWebpackStatsError(stats));
        }

        if (batfishConfig.verbose) {
          onNotification(
            stats.toString({
              chunks: false,
              colors: true
            })
          );
        }
        onNotification(
          appendTaskTime('Webpack compiled', stats.startTime, stats.endTime)
        );
      };

      compiler.watch({ ignored: [/node_modules/] }, onCompilation);

      // Watch pages separately, so we can rewrite the context module, which
      // will capture changes to front matter, page additions and deletions.
      watchContext(batfishConfig, { onError });
    })
    .catch(onError);
}

module.exports = watchWebpack;
