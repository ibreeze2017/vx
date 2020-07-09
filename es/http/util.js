'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.isCSRFSafeMethod = exports.getCookie = void 0;

/**
 * 获取 cookie
 * @param name
 */

function getCookie(name) {
  var cookieValue = null;

  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();

      if (cookie.substring(0, name.length + 1) == name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
}

exports.getCookie = getCookie;

/**
 * CSRF Safe Method
 * @param method
 */

function isCSRFSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}

exports.isCSRFSafeMethod = isCSRFSafeMethod;
