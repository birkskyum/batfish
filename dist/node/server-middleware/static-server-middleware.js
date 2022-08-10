//      
'use strict';

const url = require('url');
const path = require('path');
const nocache = require('nocache');
const historyApiFallback = require('connect-history-api-fallback');
const serveStatic = require('serve-static');
const stripSiteBasePath = require('./strip-site-base-path');

function getPagesWithInternalRouting(pagesData   
                           
 )                         {
  return Object.keys(pagesData).reduce((memo, pagePath) => {
    const data                  = pagesData[pagePath];
    if (data.frontMatter.internalRouting) {
      memo.push(data);
    }
    return memo;
  }, []);
}

function createInternalRoutingMiddleware(
  batfishConfig                      ,
  pagesData                               
)                       {
  const pagesWithInternalRouting = getPagesWithInternalRouting(pagesData);

  if (batfishConfig.spa) {
    return [historyApiFallback()];
  }

  if (pagesWithInternalRouting.length !== 0) {
    return pagesWithInternalRouting.map((pageData) => {
      return (req                 , res        , next          ) => {
        const parsedUrl = url.parse(req.url);
        if (
          parsedUrl.pathname &&
          parsedUrl.pathname.startsWith(pageData.path) &&
          !path.extname(req.url)
        ) {
          req.url = pageData.path;
        }
        next();
      };
    });
  }
}

function serverStaticMiddleware(
  batfishConfig                      ,
  pagesData                               
)                      {
  let middleware = [stripSiteBasePath(batfishConfig.siteBasePath), nocache()];

  const internalRoutingMiddleware = createInternalRoutingMiddleware(
    batfishConfig,
    pagesData
  );

  if (internalRoutingMiddleware) {
    middleware = middleware.concat(internalRoutingMiddleware);
  }

  middleware.push(serveStatic(batfishConfig.outputDirectory));

  return middleware;
}

module.exports = serverStaticMiddleware;
