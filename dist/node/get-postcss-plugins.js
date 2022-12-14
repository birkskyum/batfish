//      
'use strict';

const postcssUrl = require('postcss-url');
const postcssCsso = require('postcss-csso');
const url = require('url');
const joinUrlParts = require('./join-url-parts');

function getPostcssPlugins(
  batfishConfig                      
)                  {
  let list = [
    // Copy all url-referenced assets to the outputDirectory.
    postcssUrl({
      url: 'copy',
      assetsPath: './',
      useHash: true,
      hashOptions: {
        append: true
      }
    }),
    // Rewrite urls so they are root-relative. This way they'll work both from
    // inlined CSS (in the static build) and the stylesheet itself.
    postcssUrl({
      url: (asset) => {
        const parsedUrl = url.parse(decodeURIComponent(asset.url));
        // skip absolute paths and hashes
        if (parsedUrl.protocol || parsedUrl.hash === parsedUrl.href) {
          return asset.url;
        }
        return joinUrlParts(
          batfishConfig.siteBasePath,
          batfishConfig.publicAssetsPath,
          asset.url
        );
      }
    })
  ];

  if (batfishConfig.postcssPlugins) {
    list = batfishConfig.postcssPlugins.concat(list);
  }

  if (batfishConfig.production) {
    list.push(postcssCsso());
  }

  return list;
}

module.exports = getPostcssPlugins;
