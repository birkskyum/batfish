"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routeTo = routeTo;
exports.routeToPrefixed = routeToPrefixed;

var _prefixUrl = require("./prefix-url");

var delayed;
var routeToHandler;

function routeTo(url) {
  if (delayed) {
    return;
  }

  if (!routeToHandler) {
    delayed = url;
    return;
  }

  routeToHandler(url);
}

function routeToPrefixed(url) {
  routeTo((0, _prefixUrl.prefixUrl)(url));
} // Used by the Router to provide the function that actually does the routing.
// This slight awkwardness is just to enable the user to
// `require('@mapbox/batfish/modules/route-to')`.


routeTo._setRouteToHandler = function (handler) {
  routeToHandler = handler;

  if (delayed) {
    routeToHandler(delayed);
    delayed = null;
  }
}; // For tests.


routeTo._clearRouteToHandler = function () {
  routeToHandler = null;
};