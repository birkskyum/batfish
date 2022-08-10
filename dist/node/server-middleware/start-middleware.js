//      
'use strict';

const historyApiFallback = require('connect-history-api-fallback');
const stripSiteBasePath = require('./strip-site-base-path');

function startMiddleware(
  batfishConfig                      
)                      {
  const stripAssets = (req                 , res        , next          ) => {
    if (req.url.startsWith(batfishConfig.publicAssetsPath)) {
      req.url = req.url.replace(batfishConfig.publicAssetsPath, '') || '/';
    }
    next();
  };

  return [
    historyApiFallback(),
    stripSiteBasePath(batfishConfig.siteBasePath),
    stripAssets
  ];
}

module.exports = startMiddleware;
