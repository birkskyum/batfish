//      
'use strict';

module.exports = function stripSiteBasePath(
  siteBasePath        
)               {
  return (req                 , res        , next          ) => {
    if (req.url.startsWith(siteBasePath)) {
      req.url = req.url.replace(siteBasePath, '') || '/';
    }
    next();
  };
};
