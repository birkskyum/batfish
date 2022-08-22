"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invokeCallbacks = invokeCallbacks;
exports.addRouteChangeStartListener = addRouteChangeStartListener;
exports.removeRouteChangeStartListener = removeRouteChangeStartListener;
exports.addRouteChangeEndListener = addRouteChangeEndListener;
exports.removeRouteChangeEndListener = removeRouteChangeEndListener;
exports._invokeRouteChangeStartCallbacks = _invokeRouteChangeStartCallbacks;
exports._invokeRouteChangeEndCallbacks = _invokeRouteChangeEndCallbacks;

var _prefixUrl = require("./prefix-url");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ALL_PATHS = '*';

var startListeners = _defineProperty({}, ALL_PATHS, []);

var endListeners = _defineProperty({}, ALL_PATHS, []);

function normalizePathname(pathname) {
  if (pathname !== ALL_PATHS && !(0, _prefixUrl.isUrlPrefixed)(pathname)) {
    pathname = (0, _prefixUrl.prefixUrl)(pathname);
  }

  return pathname.replace(/\/$/, '');
}

function addListener(pathnameOrListener, maybeListener, registry, remover) {
  var listener;
  var pathname;

  if (typeof pathnameOrListener === 'function') {
    listener = pathnameOrListener;
    pathname = ALL_PATHS;
  } else {
    listener = maybeListener;
    pathname = pathnameOrListener;
  }

  pathname = normalizePathname(pathname);

  if (!registry[pathname]) {
    registry[pathname] = [];
  }

  registry[pathname].push(listener || noop);
  return function () {
    return remover(pathname, listener);
  };
}

function removeListener(pathnameOrListener, maybeListener, registry) {
  var listener;
  var pathname;

  if (typeof pathnameOrListener === 'function' || !pathnameOrListener) {
    listener = pathnameOrListener;
    pathname = ALL_PATHS;
  } else {
    listener = maybeListener;
    pathname = pathnameOrListener;
  }

  pathname = normalizePathname(pathname);

  if (!listener) {
    registry[pathname] = [];
    return;
  }

  var listeners = registry[pathname];

  for (var i = 0, l = listeners.length; i < l; i++) {
    if (listeners[i] === listener) {
      listeners.splice(i, 1);
      return;
    }
  }
}

function invokeCallbacks(nextPathname, registery) {
  nextPathname = normalizePathname(nextPathname);
  var promisesToKeep = [Promise.resolve()];

  if (registery[nextPathname]) {
    registery[nextPathname].forEach(function (callback) {
      promisesToKeep.push(Promise.resolve(callback(nextPathname)));
    });
  }

  registery[ALL_PATHS].forEach(function (callback) {
    promisesToKeep.push(Promise.resolve(callback(nextPathname)));
  });
  return Promise.all(promisesToKeep);
}

function addRouteChangeStartListener(pathnameOrListener, maybeListener) {
  return addListener(pathnameOrListener, maybeListener, startListeners, removeRouteChangeStartListener);
}

function removeRouteChangeStartListener(pathnameOrListener, maybeListener) {
  removeListener(pathnameOrListener, maybeListener, startListeners);
}

function addRouteChangeEndListener(pathnameOrListener, maybeListener) {
  return addListener(pathnameOrListener, maybeListener, endListeners, removeRouteChangeEndListener);
}

function removeRouteChangeEndListener(pathnameOrListener, maybeListener) {
  removeListener(pathnameOrListener, maybeListener, endListeners);
}

function _invokeRouteChangeStartCallbacks(nextPathname) {
  return invokeCallbacks(nextPathname, startListeners);
}

function _invokeRouteChangeEndCallbacks(nextPathname) {
  return invokeCallbacks(nextPathname, endListeners);
}

function noop() {}