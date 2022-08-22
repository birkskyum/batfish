"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withLocation = withLocation;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function withLocation(Component) {
  function WithLocation(props, context) {
    return /*#__PURE__*/_react["default"].createElement(Component, _extends({
      location: context.location
    }, props));
  }

  WithLocation.contextTypes = {
    location: _propTypes["default"].shape({
      pathname: _propTypes["default"].string.isRequired,
      hash: _propTypes["default"].string,
      search: _propTypes["default"].string
    }).isRequired
  };
  WithLocation.WrappedComponent = Component;
  return WithLocation;
}