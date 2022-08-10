//      
'use strict';

const del = require('del');
const pTry = require('p-try');

function maybeClearOutputDirectory(
  batfishConfig                      
)                                {
  return pTry(() => {
    if (!batfishConfig.clearOutputDirectory) return;
    return del(batfishConfig.outputDirectory, { force: true });
  });
}

module.exports = maybeClearOutputDirectory;
