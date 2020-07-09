'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.User = void 0;

var User = /*#__PURE__*/function() {
  function User(name, age) {
    (0, _classCallCheck2.default)(this, User);
    this.name = name;
    this.age = age;
  }

  (0, _createClass2.default)(User, [{
    key: 'say',
    value: function say() {
      return this.name;
    },
  }], [{
    key: 'go',
    value: function go() {
    },
  }]);
  return User;
}();

exports.User = User;
