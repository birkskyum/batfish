//      
'use strict';

const fs = require('fs');
const path = require('path');
const pify = require('pify');
const pTry = require('p-try');

// Create a JS module for a page, which will be written to the file system.
// It requires the page's component and includes the page's injected data.
// This is the module that will by built into an async bundle by Webpack,
// loaded when the page is requested by Router.
//
// Return Promise resolves with the absolute path to the written module.
function writePageModule(
  batfishConfig                      ,
  pageData                 
)                  {
  return pTry(() => {
    const pageFileName =
      pageData.path === '/'
        ? '_.js'
        : pageData.path.slice(0, -1).replace(/\//g, '_') + '.js';
    const filePath = path.join(batfishConfig.temporaryDirectory, pageFileName);

    const pageFrontMatter = pageData.frontMatter;
    const props = {
      frontMatter: pageFrontMatter
    };

    const content = `
      let Page = require('${pageData.filePath}');
      Page = Page.default || Page;
      module.exports = {
        component: Page,
        props: ${JSON.stringify(props, null, 2)}
      };
    `;

    return pify(fs.writeFile)(filePath, content).then(() => filePath);
  });
}

module.exports = writePageModule;
