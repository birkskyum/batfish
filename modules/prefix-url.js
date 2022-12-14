"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefixUrl = prefixUrl;
exports.prefixUrlAbsolute = prefixUrlAbsolute;
exports.isUrlPrefixed = isUrlPrefixed;
// This weirdness, combined with the _configure function below, exists because
// we don't want a public module to import 'batfish-internal/context' directly.
// That will make any files that use it incapable of executing outside of
// Batfish (e.g. they won't work in unit tests).
var siteBasePath = '';
var siteOrigin; // Crude heuristic but probably ok.

function isAbsoluteUrl(url) {
  return /^https?:/.test(url);
}

function prefixUrl(url) {
  if (isAbsoluteUrl(url)) {
    return url;
  }

  if (siteBasePath && url.indexOf(siteBasePath) === 0) {
    return url;
  }

  if (!/^\//.test(url)) url = '/' + url;
  return siteBasePath + url;
}

function prefixUrlAbsolute(url) {
  if (isAbsoluteUrl(url)) {
    return url;
  }

  if (!siteOrigin) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('The siteOrigin property is not specified in your Batfish configuration. Unable to prefix with absolute path.');
    }

    return url;
  }

  if (!/^\//.test(url)) url = '/' + url;
  return siteOrigin + siteBasePath + url;
}

function isUrlPrefixed(url) {
  return url.indexOf(siteBasePath) === 0;
}

prefixUrl._configure = function (a, b) {
  siteBasePath = a || '';
  siteOrigin = b;
};