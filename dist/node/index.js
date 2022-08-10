//      
'use strict';

const webpack = require('webpack');

// This file will be copied into dist/, so these types will serve as the type
// definition of the public API for Flow-using users.
                     
                     
                           
                         
                     
                     
                           
                         
                           
                     
                           
                         
                            
                     
             
                              
                             
                               
   
            

module.exports = {
  start: (require('./start')              ),
  build: (require('./build')              ),
  serveStatic: (require('./serve-static')                    ),
  writeBabelrc: (require('./write-babelrc')                     ),
  webpack
};
