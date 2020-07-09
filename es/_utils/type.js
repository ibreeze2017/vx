'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.tuple = void 0; // https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead

exports.tuple = function() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args;
};
