//      
'use strict';

module.exports = function getEnvBrowserslist(
  prodBrowserslist                        ,
  devBrowserslist                                ,
  isProduction         
)                         {
  if (devBrowserslist === false || isProduction) {
    return prodBrowserslist;
  }
  return devBrowserslist;
};
