//      
'use strict';

const path = require('path');

// Get the absolute path to an asset referenced by a relative path in
// assets.json, which Webpack generates.
function getWebpackAssetAbsolutePath(
  batfishConfig                      ,
  assetPath        
)         {
  let pathWithoutBase = assetPath;
  if (batfishConfig.siteBasePath) {
    pathWithoutBase = assetPath.replace(
      new RegExp(`^${batfishConfig.siteBasePath}`),
      ''
    );
  }
  return path.join(batfishConfig.outputDirectory, pathWithoutBase);
}

module.exports = getWebpackAssetAbsolutePath;
