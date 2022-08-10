//      
'use strict';

const fasterror = require('fasterror');

const errorTypes = Object.freeze({
  ConfigFatalError: (fasterror('ConfigFatalError')                     ),
  ConfigValidationError: (fasterror(
    'ConfigValidationErrors'
  )                              ),
  WebpackFatalError: (fasterror('WebpackFatalError')                     ),
  WebpackCompilationError: (fasterror(
    'WebpackCompilationError'
  )                                ),
  WebpackNodeParseError: (fasterror(
    'WebpackNodeParseError'
  )                     ),
  WebpackNodeExecutionError: (fasterror(
    'WebpackNodeExecutionError'
  )                     ),
  CssCompilationError: (fasterror('CssCompilationError')                     ),
  FrontMatterError: (fasterror('FrontMatterError')                     )
});

module.exports = errorTypes;
