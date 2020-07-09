'use strict';

import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _typeof from '@babel/runtime/helpers/typeof';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.put = exports.remove = exports.request = exports.SimpleXHR = void 0;

var util_1 = require('./util');

function getParsedHeaders(headerString) {
  return headerString.split('\r\n').filter(function(item) {
    return !!item;
  }).reduce(function(prev, cur) {
    var _cur$split = cur.split(':', 2),
      _cur$split2 = _slicedToArray(_cur$split, 2),
      key = _cur$split2[0],
      value = _cur$split2[1];

    prev[key] = value.trim();
    return prev;
  }, {});
}

var contentTypeObj = {
  'form': 'application/x-www-form-urlencoded;charset=utf-8',
  'xml': 'application/xml;charset-utf-8',
  'plain-text': 'application/text;charset-utf-8',
  'form-data': 'application/text;charset-utf-8',
  'json': 'application/json;charset=utf-8',
  'upload': 'multipart/form-data',
  'none': 'NONE',
};

function getDefaultOptions() {
  return {
    method: 'GET',
    dataType: 'json',
    withCredentials: false,
    timeout: 0,
    aysnc: true,
    headers: {},
    listener: {},
    contentType: contentTypeObj.form,
    uploadListener: {},
    auth: {},
    error: null,
    prevInterceptors: [],
    nextInterceptors: [],
  };
}

function SimpleXHR(options) {
  var finalOptions = _objectSpread(_objectSpread({}, getDefaultOptions()), options);

  var url = finalOptions.url,
    _finalOptions$async = finalOptions.async,
    async = _finalOptions$async === void 0 ? true : _finalOptions$async,
    _finalOptions$timeout = finalOptions.timeout,
    timeout = _finalOptions$timeout === void 0 ? 0 : _finalOptions$timeout,
    _finalOptions$withCre = finalOptions.withCredentials,
    withCredentials = _finalOptions$withCre === void 0 ? true : _finalOptions$withCre,
    dataType = finalOptions.dataType,
    contentType = finalOptions.contentType,
    data = finalOptions.data,
    auth = finalOptions.auth,
    method = finalOptions.method,
    listener = finalOptions.listener,
    uploadListener = finalOptions.uploadListener,
    headers = finalOptions.headers,
    success = finalOptions.success,
    beforeSend = finalOptions.beforeSend,
    error = finalOptions.error,
    prevInterceptors = finalOptions.prevInterceptors,
    nextInterceptors = finalOptions.nextInterceptors;
  var xhr = new XMLHttpRequest();

  var _ref = auth || {},
    username = _ref.username,
    password = _ref.password;

  var finalMethod = method || 'GET';
  var finalUrl = url;
  var ct = contentTypeObj[contentType || ''] || contentType;

  if (finalMethod.toUpperCase() === 'GET') {
    finalUrl = getUrl(finalUrl, data, ct);
  }

  var finalPrevInterceptors = prevInterceptors || [];

  while (finalPrevInterceptors.length) {
    var interceptor = finalPrevInterceptors.shift();

    if (interceptor) {
      var res = interceptor.intercept(finalOptions, xhr);

      if (!res) {
        return null;
      }
    }
  }

  if (listener) {
    Object.keys(listener).forEach(function(key) {
      xhr.addEventListener(key, listener[key]);
    });
  }

  if (uploadListener) {
    Object.keys(uploadListener).forEach(function(key) {
      xhr.upload.addEventListener(key, uploadListener[key]);
    });
  }

  if (async && dataType) {
    xhr.responseType = dataType;
  }

  if (error) {
    xhr.onerror = function(e) {
      error(e, xhr);
    };
  }

  var result = {
    status: 0,
    statusText: '',
    data: null,
    headers: {},
  };

  xhr.onreadystatechange = function() {
    var statusText = xhr.statusText,
      status = xhr.status,
      response = xhr.response;
    result.data = response;
    result.status = status;
    result.statusText = statusText;

    if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
      result.headers = getParsedHeaders(xhr.getAllResponseHeaders());
      return;
    }

    if (xhr.readyState === XMLHttpRequest.OPENED) {
      if (!util_1.isCSRFSafeMethod(finalMethod)) {
        xhr.setRequestHeader('X-CSRFTOKEN', util_1.getCookie('CSRF_TOKEN') || '');
      }

      if (ct && ct !== 'NONE') {
        xhr.setRequestHeader('Content-Type', ct);
      }

      if (headers) {
        Object.keys(headers).forEach(function(key) {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      return;
    }

    if (xhr.readyState === XMLHttpRequest.UNSENT) {
      return;
    }

    if (xhr.readyState === XMLHttpRequest.LOADING) {
      return;
    }

    if (xhr.readyState === XMLHttpRequest.DONE) {
      var temp = result;
      var finalNextInterceptors = nextInterceptors || [];

      while (finalNextInterceptors.length) {
        var _interceptor = finalNextInterceptors.shift();

        if (_interceptor) {
          temp = _interceptor.intercept(temp);
        }
      }

      if (xhr.status === 200) {
        if (success) {
          success(temp);
        }
      } else {
        if (error) {
          error(temp, xhr);
        }
      }

      return;
    }
  };

  xhr.open(finalMethod, finalUrl, async, username, password);
  xhr.timeout = timeout;
  xhr.withCredentials = withCredentials;
  var body = buildBodyData(data);
  xhr.send(body);
  return xhr;
}

exports.SimpleXHR = SimpleXHR;

/**
 * 计算GET URL
 * @param url
 * @param params
 * @param contentType
 */

function getUrl(url, params, contentType) {
  if (typeof params === 'undefined') {
    return url;
  }

  var result = url.trim();
  var lastChar = result[result.length - 1];
  var b = contentType === contentTypeObj.json ? buildJSON : buildQuery;

  if (result.indexOf('?') !== -1) {
    return ''.concat(url).concat(lastChar === '&' ? '' : '&').concat(b(params));
  }

  return ''.concat(url, '?').concat(b(params));
}

/**
 * 转换参数
 * @param data
 * @returns {string}
 */


function buildQuery(data) {
  if (data) {
    if (data instanceof FormData) {
      return data;
    }

    if (typeof data === 'string') {
      return data;
    }

    if (Array.isArray(data)) {
      return data.filter(function(_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];

        return typeof value !== 'undefined';
      }).map(function(_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
          key = _ref5[0],
          value = _ref5[1];

        return ''.concat(key, '=').concat(encodeURIComponent(value));
      }).join('&');
    }

    if (_typeof(data) === 'object') {
      return Object.entries(data).filter(function(_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
          key = _ref7[0],
          value = _ref7[1];

        return typeof value !== 'undefined';
      }).map(function(_ref8) {
        var _ref9 = _slicedToArray(_ref8, 2),
          key = _ref9[0],
          value = _ref9[1];

        return ''.concat(key, '=').concat(encodeURIComponent(value));
      }).join('&');
    }
  }

  return '';
}

/**
 * GET JSON参数
 * @param data
 */


function buildJSON(data) {
  return encodeURIComponent(JSON.stringify(data));
}

function buildBodyData(params, contentType) {
  if (!params) {
    return;
  }

  var b = contentType === contentTypeObj.json ? buildJSON : buildQuery;
  return b(params);
}

function request(options) {
  return new Promise(function(resolve, reject) {
    var xhr = SimpleXHR(_objectSpread(_objectSpread({}, options), {}, {
      success: function success(res) {
        resolve(res);
      },
      error: function error(res) {
        reject({
          res: res,
          xhr: xhr,
        });
      },
    }));
  });
}

exports.request = request;

function remove(options) {
  return request(_objectSpread({
    method: 'DELETE',
  }, options));
}

exports.remove = remove;

function _put(options) {
  return request(_objectSpread({
    method: 'PUT',
  }, options));
}

exports.put = _put;

var Http = /*#__PURE__*/function() {
  function Http() {
    _classCallCheck(this, Http);
  }

  _createClass(Http, null, [{
    key: 'get',
    value: function get(options) {
      return request(_objectSpread({
        method: 'GET',
      }, options));
    },
  }, {
    key: 'post',
    value: function post(options) {
      return request(_objectSpread({
        method: 'POST',
      }, options));
    },
  }, {
    key: 'head',
    value: function head(options) {
      return request(_objectSpread({
        method: 'HEAD',
      }, options));
    },
  }, {
    key: 'delete',
    value: function _delete(options) {
      return request(_objectSpread({
        method: 'DELETE',
      }, options));
    },
  }, {
    key: 'put',
    value: function put(options) {
      return _put(options);
    },
  }]);

  return Http;
}();

exports.default = Http;
