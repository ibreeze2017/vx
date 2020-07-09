'use strict';

import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.User = void 0;

var User = /*#__PURE__*/function() {
  function User(name, age) {
    _classCallCheck(this, User);

    this.name = name;
    this.age = age;
  }

  _createClass(User, [{
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
