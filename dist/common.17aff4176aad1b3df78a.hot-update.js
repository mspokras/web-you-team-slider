self["webpackHotUpdatefls_start"]("common",{

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ (function(module) {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ (function(module) {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ (function(module) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var named_references_1 = __webpack_require__(/*! ./named-references */ "./node_modules/html-entities/lib/named-references.js");
var numeric_unicode_map_1 = __webpack_require__(/*! ./numeric-unicode-map */ "./node_modules/html-entities/lib/numeric-unicode-map.js");
var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });
var encodeRegExps = {
    specialChars: /[<>'"&]/g,
    nonAscii: /[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
    nonAsciiPrintable: /[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
    nonAsciiPrintableOnly: /[\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g,
    extensive: /[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g
};
var defaultEncodeOptions = {
    mode: 'specialChars',
    level: 'all',
    numeric: 'decimal'
};
/** Encodes all the necessary (specified by `level`) characters in the text */
function encode(text, _a) {
    var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? 'specialChars' : _c, _d = _b.numeric, numeric = _d === void 0 ? 'decimal' : _d, _e = _b.level, level = _e === void 0 ? 'all' : _e;
    if (!text) {
        return '';
    }
    var encodeRegExp = encodeRegExps[mode];
    var references = allNamedReferences[level].characters;
    var isHex = numeric === 'hexadecimal';
    encodeRegExp.lastIndex = 0;
    var _b = encodeRegExp.exec(text);
    var _c;
    if (_b) {
        _c = '';
        var _d = 0;
        do {
            if (_d !== _b.index) {
                _c += text.substring(_d, _b.index);
            }
            var _e = _b[0];
            var result_1 = references[_e];
            if (!result_1) {
                var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);
                result_1 = (isHex ? '&#x' + code_1.toString(16) : '&#' + code_1) + ';';
            }
            _c += result_1;
            _d = _b.index + _e.length;
        } while ((_b = encodeRegExp.exec(text)));
        if (_d !== text.length) {
            _c += text.substring(_d);
        }
    }
    else {
        _c =
            text;
    }
    return _c;
}
exports.encode = encode;
var defaultDecodeOptions = {
    scope: 'body',
    level: 'all'
};
var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
var baseDecodeRegExps = {
    xml: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.xml
    },
    html4: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html4
    },
    html5: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html5
    }
};
var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });
var fromCharCode = String.fromCharCode;
var outOfBoundsChar = fromCharCode(65533);
var defaultDecodeEntityOptions = {
    level: 'all'
};
/** Decodes a single entity */
function decodeEntity(entity, _a) {
    var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? 'all' : _b;
    if (!entity) {
        return '';
    }
    var _b = entity;
    var decodeEntityLastChar_1 = entity[entity.length - 1];
    if (false) {}
    else if (false) {}
    else {
        var decodeResultByReference_1 = allNamedReferences[level].entities[entity];
        if (decodeResultByReference_1) {
            _b = decodeResultByReference_1;
        }
        else if (entity[0] === '&' && entity[1] === '#') {
            var decodeSecondChar_1 = entity[2];
            var decodeCode_1 = decodeSecondChar_1 == 'x' || decodeSecondChar_1 == 'X'
                ? parseInt(entity.substr(3), 16)
                : parseInt(entity.substr(2));
            _b =
                decodeCode_1 >= 0x10ffff
                    ? outOfBoundsChar
                    : decodeCode_1 > 65535
                        ? surrogate_pairs_1.fromCodePoint(decodeCode_1)
                        : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);
        }
    }
    return _b;
}
exports.decodeEntity = decodeEntity;
/** Decodes all entities in the text */
function decode(text, _a) {
    var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? 'all' : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === 'xml' ? 'strict' : 'body' : _b;
    if (!text) {
        return '';
    }
    var decodeRegExp = decodeRegExps[level][scope];
    var references = allNamedReferences[level].entities;
    var isAttribute = scope === 'attribute';
    var isStrict = scope === 'strict';
    decodeRegExp.lastIndex = 0;
    var replaceMatch_1 = decodeRegExp.exec(text);
    var replaceResult_1;
    if (replaceMatch_1) {
        replaceResult_1 = '';
        var replaceLastIndex_1 = 0;
        do {
            if (replaceLastIndex_1 !== replaceMatch_1.index) {
                replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);
            }
            var replaceInput_1 = replaceMatch_1[0];
            var decodeResult_1 = replaceInput_1;
            var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];
            if (isAttribute
                && decodeEntityLastChar_2 === '=') {
                decodeResult_1 = replaceInput_1;
            }
            else if (isStrict
                && decodeEntityLastChar_2 !== ';') {
                decodeResult_1 = replaceInput_1;
            }
            else {
                var decodeResultByReference_2 = references[replaceInput_1];
                if (decodeResultByReference_2) {
                    decodeResult_1 = decodeResultByReference_2;
                }
                else if (replaceInput_1[0] === '&' && replaceInput_1[1] === '#') {
                    var decodeSecondChar_2 = replaceInput_1[2];
                    var decodeCode_2 = decodeSecondChar_2 == 'x' || decodeSecondChar_2 == 'X'
                        ? parseInt(replaceInput_1.substr(3), 16)
                        : parseInt(replaceInput_1.substr(2));
                    decodeResult_1 =
                        decodeCode_2 >= 0x10ffff
                            ? outOfBoundsChar
                            : decodeCode_2 > 65535
                                ? surrogate_pairs_1.fromCodePoint(decodeCode_2)
                                : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);
                }
            }
            replaceResult_1 += decodeResult_1;
            replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;
        } while ((replaceMatch_1 = decodeRegExp.exec(text)));
        if (replaceLastIndex_1 !== text.length) {
            replaceResult_1 += text.substring(replaceLastIndex_1);
        }
    }
    else {
        replaceResult_1 =
            text;
    }
    return replaceResult_1;
}
exports.decode = decode;


/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.bodyRegExps={xml:/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{"&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'","&amp;":"&"},characters:{"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","&":"&amp;"}},html4:{entities:{"&apos;":"'","&nbsp":" ","&nbsp;":" ","&iexcl":"¡","&iexcl;":"¡","&cent":"¢","&cent;":"¢","&pound":"£","&pound;":"£","&curren":"¤","&curren;":"¤","&yen":"¥","&yen;":"¥","&brvbar":"¦","&brvbar;":"¦","&sect":"§","&sect;":"§","&uml":"¨","&uml;":"¨","&copy":"©","&copy;":"©","&ordf":"ª","&ordf;":"ª","&laquo":"«","&laquo;":"«","&not":"¬","&not;":"¬","&shy":"­","&shy;":"­","&reg":"®","&reg;":"®","&macr":"¯","&macr;":"¯","&deg":"°","&deg;":"°","&plusmn":"±","&plusmn;":"±","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&acute":"´","&acute;":"´","&micro":"µ","&micro;":"µ","&para":"¶","&para;":"¶","&middot":"·","&middot;":"·","&cedil":"¸","&cedil;":"¸","&sup1":"¹","&sup1;":"¹","&ordm":"º","&ordm;":"º","&raquo":"»","&raquo;":"»","&frac14":"¼","&frac14;":"¼","&frac12":"½","&frac12;":"½","&frac34":"¾","&frac34;":"¾","&iquest":"¿","&iquest;":"¿","&Agrave":"À","&Agrave;":"À","&Aacute":"Á","&Aacute;":"Á","&Acirc":"Â","&Acirc;":"Â","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Aring":"Å","&Aring;":"Å","&AElig":"Æ","&AElig;":"Æ","&Ccedil":"Ç","&Ccedil;":"Ç","&Egrave":"È","&Egrave;":"È","&Eacute":"É","&Eacute;":"É","&Ecirc":"Ê","&Ecirc;":"Ê","&Euml":"Ë","&Euml;":"Ë","&Igrave":"Ì","&Igrave;":"Ì","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Iuml":"Ï","&Iuml;":"Ï","&ETH":"Ð","&ETH;":"Ð","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Ograve":"Ò","&Ograve;":"Ò","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Otilde":"Õ","&Otilde;":"Õ","&Ouml":"Ö","&Ouml;":"Ö","&times":"×","&times;":"×","&Oslash":"Ø","&Oslash;":"Ø","&Ugrave":"Ù","&Ugrave;":"Ù","&Uacute":"Ú","&Uacute;":"Ú","&Ucirc":"Û","&Ucirc;":"Û","&Uuml":"Ü","&Uuml;":"Ü","&Yacute":"Ý","&Yacute;":"Ý","&THORN":"Þ","&THORN;":"Þ","&szlig":"ß","&szlig;":"ß","&agrave":"à","&agrave;":"à","&aacute":"á","&aacute;":"á","&acirc":"â","&acirc;":"â","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&aring":"å","&aring;":"å","&aelig":"æ","&aelig;":"æ","&ccedil":"ç","&ccedil;":"ç","&egrave":"è","&egrave;":"è","&eacute":"é","&eacute;":"é","&ecirc":"ê","&ecirc;":"ê","&euml":"ë","&euml;":"ë","&igrave":"ì","&igrave;":"ì","&iacute":"í","&iacute;":"í","&icirc":"î","&icirc;":"î","&iuml":"ï","&iuml;":"ï","&eth":"ð","&eth;":"ð","&ntilde":"ñ","&ntilde;":"ñ","&ograve":"ò","&ograve;":"ò","&oacute":"ó","&oacute;":"ó","&ocirc":"ô","&ocirc;":"ô","&otilde":"õ","&otilde;":"õ","&ouml":"ö","&ouml;":"ö","&divide":"÷","&divide;":"÷","&oslash":"ø","&oslash;":"ø","&ugrave":"ù","&ugrave;":"ù","&uacute":"ú","&uacute;":"ú","&ucirc":"û","&ucirc;":"û","&uuml":"ü","&uuml;":"ü","&yacute":"ý","&yacute;":"ý","&thorn":"þ","&thorn;":"þ","&yuml":"ÿ","&yuml;":"ÿ","&quot":'"',"&quot;":'"',"&amp":"&","&amp;":"&","&lt":"<","&lt;":"<","&gt":">","&gt;":">","&OElig;":"Œ","&oelig;":"œ","&Scaron;":"Š","&scaron;":"š","&Yuml;":"Ÿ","&circ;":"ˆ","&tilde;":"˜","&ensp;":" ","&emsp;":" ","&thinsp;":" ","&zwnj;":"‌","&zwj;":"‍","&lrm;":"‎","&rlm;":"‏","&ndash;":"–","&mdash;":"—","&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚","&ldquo;":"“","&rdquo;":"”","&bdquo;":"„","&dagger;":"†","&Dagger;":"‡","&permil;":"‰","&lsaquo;":"‹","&rsaquo;":"›","&euro;":"€","&fnof;":"ƒ","&Alpha;":"Α","&Beta;":"Β","&Gamma;":"Γ","&Delta;":"Δ","&Epsilon;":"Ε","&Zeta;":"Ζ","&Eta;":"Η","&Theta;":"Θ","&Iota;":"Ι","&Kappa;":"Κ","&Lambda;":"Λ","&Mu;":"Μ","&Nu;":"Ν","&Xi;":"Ξ","&Omicron;":"Ο","&Pi;":"Π","&Rho;":"Ρ","&Sigma;":"Σ","&Tau;":"Τ","&Upsilon;":"Υ","&Phi;":"Φ","&Chi;":"Χ","&Psi;":"Ψ","&Omega;":"Ω","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&zeta;":"ζ","&eta;":"η","&theta;":"θ","&iota;":"ι","&kappa;":"κ","&lambda;":"λ","&mu;":"μ","&nu;":"ν","&xi;":"ξ","&omicron;":"ο","&pi;":"π","&rho;":"ρ","&sigmaf;":"ς","&sigma;":"σ","&tau;":"τ","&upsilon;":"υ","&phi;":"φ","&chi;":"χ","&psi;":"ψ","&omega;":"ω","&thetasym;":"ϑ","&upsih;":"ϒ","&piv;":"ϖ","&bull;":"•","&hellip;":"…","&prime;":"′","&Prime;":"″","&oline;":"‾","&frasl;":"⁄","&weierp;":"℘","&image;":"ℑ","&real;":"ℜ","&trade;":"™","&alefsym;":"ℵ","&larr;":"←","&uarr;":"↑","&rarr;":"→","&darr;":"↓","&harr;":"↔","&crarr;":"↵","&lArr;":"⇐","&uArr;":"⇑","&rArr;":"⇒","&dArr;":"⇓","&hArr;":"⇔","&forall;":"∀","&part;":"∂","&exist;":"∃","&empty;":"∅","&nabla;":"∇","&isin;":"∈","&notin;":"∉","&ni;":"∋","&prod;":"∏","&sum;":"∑","&minus;":"−","&lowast;":"∗","&radic;":"√","&prop;":"∝","&infin;":"∞","&ang;":"∠","&and;":"∧","&or;":"∨","&cap;":"∩","&cup;":"∪","&int;":"∫","&there4;":"∴","&sim;":"∼","&cong;":"≅","&asymp;":"≈","&ne;":"≠","&equiv;":"≡","&le;":"≤","&ge;":"≥","&sub;":"⊂","&sup;":"⊃","&nsub;":"⊄","&sube;":"⊆","&supe;":"⊇","&oplus;":"⊕","&otimes;":"⊗","&perp;":"⊥","&sdot;":"⋅","&lceil;":"⌈","&rceil;":"⌉","&lfloor;":"⌊","&rfloor;":"⌋","&lang;":"〈","&rang;":"〉","&loz;":"◊","&spades;":"♠","&clubs;":"♣","&hearts;":"♥","&diams;":"♦"},characters:{"'":"&apos;"," ":"&nbsp;","¡":"&iexcl;","¢":"&cent;","£":"&pound;","¤":"&curren;","¥":"&yen;","¦":"&brvbar;","§":"&sect;","¨":"&uml;","©":"&copy;","ª":"&ordf;","«":"&laquo;","¬":"&not;","­":"&shy;","®":"&reg;","¯":"&macr;","°":"&deg;","±":"&plusmn;","²":"&sup2;","³":"&sup3;","´":"&acute;","µ":"&micro;","¶":"&para;","·":"&middot;","¸":"&cedil;","¹":"&sup1;","º":"&ordm;","»":"&raquo;","¼":"&frac14;","½":"&frac12;","¾":"&frac34;","¿":"&iquest;","À":"&Agrave;","Á":"&Aacute;","Â":"&Acirc;","Ã":"&Atilde;","Ä":"&Auml;","Å":"&Aring;","Æ":"&AElig;","Ç":"&Ccedil;","È":"&Egrave;","É":"&Eacute;","Ê":"&Ecirc;","Ë":"&Euml;","Ì":"&Igrave;","Í":"&Iacute;","Î":"&Icirc;","Ï":"&Iuml;","Ð":"&ETH;","Ñ":"&Ntilde;","Ò":"&Ograve;","Ó":"&Oacute;","Ô":"&Ocirc;","Õ":"&Otilde;","Ö":"&Ouml;","×":"&times;","Ø":"&Oslash;","Ù":"&Ugrave;","Ú":"&Uacute;","Û":"&Ucirc;","Ü":"&Uuml;","Ý":"&Yacute;","Þ":"&THORN;","ß":"&szlig;","à":"&agrave;","á":"&aacute;","â":"&acirc;","ã":"&atilde;","ä":"&auml;","å":"&aring;","æ":"&aelig;","ç":"&ccedil;","è":"&egrave;","é":"&eacute;","ê":"&ecirc;","ë":"&euml;","ì":"&igrave;","í":"&iacute;","î":"&icirc;","ï":"&iuml;","ð":"&eth;","ñ":"&ntilde;","ò":"&ograve;","ó":"&oacute;","ô":"&ocirc;","õ":"&otilde;","ö":"&ouml;","÷":"&divide;","ø":"&oslash;","ù":"&ugrave;","ú":"&uacute;","û":"&ucirc;","ü":"&uuml;","ý":"&yacute;","þ":"&thorn;","ÿ":"&yuml;",'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;","Œ":"&OElig;","œ":"&oelig;","Š":"&Scaron;","š":"&scaron;","Ÿ":"&Yuml;","ˆ":"&circ;","˜":"&tilde;"," ":"&ensp;"," ":"&emsp;"," ":"&thinsp;","‌":"&zwnj;","‍":"&zwj;","‎":"&lrm;","‏":"&rlm;","–":"&ndash;","—":"&mdash;","‘":"&lsquo;","’":"&rsquo;","‚":"&sbquo;","“":"&ldquo;","”":"&rdquo;","„":"&bdquo;","†":"&dagger;","‡":"&Dagger;","‰":"&permil;","‹":"&lsaquo;","›":"&rsaquo;","€":"&euro;","ƒ":"&fnof;","Α":"&Alpha;","Β":"&Beta;","Γ":"&Gamma;","Δ":"&Delta;","Ε":"&Epsilon;","Ζ":"&Zeta;","Η":"&Eta;","Θ":"&Theta;","Ι":"&Iota;","Κ":"&Kappa;","Λ":"&Lambda;","Μ":"&Mu;","Ν":"&Nu;","Ξ":"&Xi;","Ο":"&Omicron;","Π":"&Pi;","Ρ":"&Rho;","Σ":"&Sigma;","Τ":"&Tau;","Υ":"&Upsilon;","Φ":"&Phi;","Χ":"&Chi;","Ψ":"&Psi;","Ω":"&Omega;","α":"&alpha;","β":"&beta;","γ":"&gamma;","δ":"&delta;","ε":"&epsilon;","ζ":"&zeta;","η":"&eta;","θ":"&theta;","ι":"&iota;","κ":"&kappa;","λ":"&lambda;","μ":"&mu;","ν":"&nu;","ξ":"&xi;","ο":"&omicron;","π":"&pi;","ρ":"&rho;","ς":"&sigmaf;","σ":"&sigma;","τ":"&tau;","υ":"&upsilon;","φ":"&phi;","χ":"&chi;","ψ":"&psi;","ω":"&omega;","ϑ":"&thetasym;","ϒ":"&upsih;","ϖ":"&piv;","•":"&bull;","…":"&hellip;","′":"&prime;","″":"&Prime;","‾":"&oline;","⁄":"&frasl;","℘":"&weierp;","ℑ":"&image;","ℜ":"&real;","™":"&trade;","ℵ":"&alefsym;","←":"&larr;","↑":"&uarr;","→":"&rarr;","↓":"&darr;","↔":"&harr;","↵":"&crarr;","⇐":"&lArr;","⇑":"&uArr;","⇒":"&rArr;","⇓":"&dArr;","⇔":"&hArr;","∀":"&forall;","∂":"&part;","∃":"&exist;","∅":"&empty;","∇":"&nabla;","∈":"&isin;","∉":"&notin;","∋":"&ni;","∏":"&prod;","∑":"&sum;","−":"&minus;","∗":"&lowast;","√":"&radic;","∝":"&prop;","∞":"&infin;","∠":"&ang;","∧":"&and;","∨":"&or;","∩":"&cap;","∪":"&cup;","∫":"&int;","∴":"&there4;","∼":"&sim;","≅":"&cong;","≈":"&asymp;","≠":"&ne;","≡":"&equiv;","≤":"&le;","≥":"&ge;","⊂":"&sub;","⊃":"&sup;","⊄":"&nsub;","⊆":"&sube;","⊇":"&supe;","⊕":"&oplus;","⊗":"&otimes;","⊥":"&perp;","⋅":"&sdot;","⌈":"&lceil;","⌉":"&rceil;","⌊":"&lfloor;","⌋":"&rfloor;","〈":"&lang;","〉":"&rang;","◊":"&loz;","♠":"&spades;","♣":"&clubs;","♥":"&hearts;","♦":"&diams;"}},html5:{entities:{"&AElig":"Æ","&AElig;":"Æ","&AMP":"&","&AMP;":"&","&Aacute":"Á","&Aacute;":"Á","&Abreve;":"Ă","&Acirc":"Â","&Acirc;":"Â","&Acy;":"А","&Afr;":"𝔄","&Agrave":"À","&Agrave;":"À","&Alpha;":"Α","&Amacr;":"Ā","&And;":"⩓","&Aogon;":"Ą","&Aopf;":"𝔸","&ApplyFunction;":"⁡","&Aring":"Å","&Aring;":"Å","&Ascr;":"𝒜","&Assign;":"≔","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Backslash;":"∖","&Barv;":"⫧","&Barwed;":"⌆","&Bcy;":"Б","&Because;":"∵","&Bernoullis;":"ℬ","&Beta;":"Β","&Bfr;":"𝔅","&Bopf;":"𝔹","&Breve;":"˘","&Bscr;":"ℬ","&Bumpeq;":"≎","&CHcy;":"Ч","&COPY":"©","&COPY;":"©","&Cacute;":"Ć","&Cap;":"⋒","&CapitalDifferentialD;":"ⅅ","&Cayleys;":"ℭ","&Ccaron;":"Č","&Ccedil":"Ç","&Ccedil;":"Ç","&Ccirc;":"Ĉ","&Cconint;":"∰","&Cdot;":"Ċ","&Cedilla;":"¸","&CenterDot;":"·","&Cfr;":"ℭ","&Chi;":"Χ","&CircleDot;":"⊙","&CircleMinus;":"⊖","&CirclePlus;":"⊕","&CircleTimes;":"⊗","&ClockwiseContourIntegral;":"∲","&CloseCurlyDoubleQuote;":"”","&CloseCurlyQuote;":"’","&Colon;":"∷","&Colone;":"⩴","&Congruent;":"≡","&Conint;":"∯","&ContourIntegral;":"∮","&Copf;":"ℂ","&Coproduct;":"∐","&CounterClockwiseContourIntegral;":"∳","&Cross;":"⨯","&Cscr;":"𝒞","&Cup;":"⋓","&CupCap;":"≍","&DD;":"ⅅ","&DDotrahd;":"⤑","&DJcy;":"Ђ","&DScy;":"Ѕ","&DZcy;":"Џ","&Dagger;":"‡","&Darr;":"↡","&Dashv;":"⫤","&Dcaron;":"Ď","&Dcy;":"Д","&Del;":"∇","&Delta;":"Δ","&Dfr;":"𝔇","&DiacriticalAcute;":"´","&DiacriticalDot;":"˙","&DiacriticalDoubleAcute;":"˝","&DiacriticalGrave;":"`","&DiacriticalTilde;":"˜","&Diamond;":"⋄","&DifferentialD;":"ⅆ","&Dopf;":"𝔻","&Dot;":"¨","&DotDot;":"⃜","&DotEqual;":"≐","&DoubleContourIntegral;":"∯","&DoubleDot;":"¨","&DoubleDownArrow;":"⇓","&DoubleLeftArrow;":"⇐","&DoubleLeftRightArrow;":"⇔","&DoubleLeftTee;":"⫤","&DoubleLongLeftArrow;":"⟸","&DoubleLongLeftRightArrow;":"⟺","&DoubleLongRightArrow;":"⟹","&DoubleRightArrow;":"⇒","&DoubleRightTee;":"⊨","&DoubleUpArrow;":"⇑","&DoubleUpDownArrow;":"⇕","&DoubleVerticalBar;":"∥","&DownArrow;":"↓","&DownArrowBar;":"⤓","&DownArrowUpArrow;":"⇵","&DownBreve;":"̑","&DownLeftRightVector;":"⥐","&DownLeftTeeVector;":"⥞","&DownLeftVector;":"↽","&DownLeftVectorBar;":"⥖","&DownRightTeeVector;":"⥟","&DownRightVector;":"⇁","&DownRightVectorBar;":"⥗","&DownTee;":"⊤","&DownTeeArrow;":"↧","&Downarrow;":"⇓","&Dscr;":"𝒟","&Dstrok;":"Đ","&ENG;":"Ŋ","&ETH":"Ð","&ETH;":"Ð","&Eacute":"É","&Eacute;":"É","&Ecaron;":"Ě","&Ecirc":"Ê","&Ecirc;":"Ê","&Ecy;":"Э","&Edot;":"Ė","&Efr;":"𝔈","&Egrave":"È","&Egrave;":"È","&Element;":"∈","&Emacr;":"Ē","&EmptySmallSquare;":"◻","&EmptyVerySmallSquare;":"▫","&Eogon;":"Ę","&Eopf;":"𝔼","&Epsilon;":"Ε","&Equal;":"⩵","&EqualTilde;":"≂","&Equilibrium;":"⇌","&Escr;":"ℰ","&Esim;":"⩳","&Eta;":"Η","&Euml":"Ë","&Euml;":"Ë","&Exists;":"∃","&ExponentialE;":"ⅇ","&Fcy;":"Ф","&Ffr;":"𝔉","&FilledSmallSquare;":"◼","&FilledVerySmallSquare;":"▪","&Fopf;":"𝔽","&ForAll;":"∀","&Fouriertrf;":"ℱ","&Fscr;":"ℱ","&GJcy;":"Ѓ","&GT":">","&GT;":">","&Gamma;":"Γ","&Gammad;":"Ϝ","&Gbreve;":"Ğ","&Gcedil;":"Ģ","&Gcirc;":"Ĝ","&Gcy;":"Г","&Gdot;":"Ġ","&Gfr;":"𝔊","&Gg;":"⋙","&Gopf;":"𝔾","&GreaterEqual;":"≥","&GreaterEqualLess;":"⋛","&GreaterFullEqual;":"≧","&GreaterGreater;":"⪢","&GreaterLess;":"≷","&GreaterSlantEqual;":"⩾","&GreaterTilde;":"≳","&Gscr;":"𝒢","&Gt;":"≫","&HARDcy;":"Ъ","&Hacek;":"ˇ","&Hat;":"^","&Hcirc;":"Ĥ","&Hfr;":"ℌ","&HilbertSpace;":"ℋ","&Hopf;":"ℍ","&HorizontalLine;":"─","&Hscr;":"ℋ","&Hstrok;":"Ħ","&HumpDownHump;":"≎","&HumpEqual;":"≏","&IEcy;":"Е","&IJlig;":"Ĳ","&IOcy;":"Ё","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Icy;":"И","&Idot;":"İ","&Ifr;":"ℑ","&Igrave":"Ì","&Igrave;":"Ì","&Im;":"ℑ","&Imacr;":"Ī","&ImaginaryI;":"ⅈ","&Implies;":"⇒","&Int;":"∬","&Integral;":"∫","&Intersection;":"⋂","&InvisibleComma;":"⁣","&InvisibleTimes;":"⁢","&Iogon;":"Į","&Iopf;":"𝕀","&Iota;":"Ι","&Iscr;":"ℐ","&Itilde;":"Ĩ","&Iukcy;":"І","&Iuml":"Ï","&Iuml;":"Ï","&Jcirc;":"Ĵ","&Jcy;":"Й","&Jfr;":"𝔍","&Jopf;":"𝕁","&Jscr;":"𝒥","&Jsercy;":"Ј","&Jukcy;":"Є","&KHcy;":"Х","&KJcy;":"Ќ","&Kappa;":"Κ","&Kcedil;":"Ķ","&Kcy;":"К","&Kfr;":"𝔎","&Kopf;":"𝕂","&Kscr;":"𝒦","&LJcy;":"Љ","&LT":"<","&LT;":"<","&Lacute;":"Ĺ","&Lambda;":"Λ","&Lang;":"⟪","&Laplacetrf;":"ℒ","&Larr;":"↞","&Lcaron;":"Ľ","&Lcedil;":"Ļ","&Lcy;":"Л","&LeftAngleBracket;":"⟨","&LeftArrow;":"←","&LeftArrowBar;":"⇤","&LeftArrowRightArrow;":"⇆","&LeftCeiling;":"⌈","&LeftDoubleBracket;":"⟦","&LeftDownTeeVector;":"⥡","&LeftDownVector;":"⇃","&LeftDownVectorBar;":"⥙","&LeftFloor;":"⌊","&LeftRightArrow;":"↔","&LeftRightVector;":"⥎","&LeftTee;":"⊣","&LeftTeeArrow;":"↤","&LeftTeeVector;":"⥚","&LeftTriangle;":"⊲","&LeftTriangleBar;":"⧏","&LeftTriangleEqual;":"⊴","&LeftUpDownVector;":"⥑","&LeftUpTeeVector;":"⥠","&LeftUpVector;":"↿","&LeftUpVectorBar;":"⥘","&LeftVector;":"↼","&LeftVectorBar;":"⥒","&Leftarrow;":"⇐","&Leftrightarrow;":"⇔","&LessEqualGreater;":"⋚","&LessFullEqual;":"≦","&LessGreater;":"≶","&LessLess;":"⪡","&LessSlantEqual;":"⩽","&LessTilde;":"≲","&Lfr;":"𝔏","&Ll;":"⋘","&Lleftarrow;":"⇚","&Lmidot;":"Ŀ","&LongLeftArrow;":"⟵","&LongLeftRightArrow;":"⟷","&LongRightArrow;":"⟶","&Longleftarrow;":"⟸","&Longleftrightarrow;":"⟺","&Longrightarrow;":"⟹","&Lopf;":"𝕃","&LowerLeftArrow;":"↙","&LowerRightArrow;":"↘","&Lscr;":"ℒ","&Lsh;":"↰","&Lstrok;":"Ł","&Lt;":"≪","&Map;":"⤅","&Mcy;":"М","&MediumSpace;":" ","&Mellintrf;":"ℳ","&Mfr;":"𝔐","&MinusPlus;":"∓","&Mopf;":"𝕄","&Mscr;":"ℳ","&Mu;":"Μ","&NJcy;":"Њ","&Nacute;":"Ń","&Ncaron;":"Ň","&Ncedil;":"Ņ","&Ncy;":"Н","&NegativeMediumSpace;":"​","&NegativeThickSpace;":"​","&NegativeThinSpace;":"​","&NegativeVeryThinSpace;":"​","&NestedGreaterGreater;":"≫","&NestedLessLess;":"≪","&NewLine;":"\n","&Nfr;":"𝔑","&NoBreak;":"⁠","&NonBreakingSpace;":" ","&Nopf;":"ℕ","&Not;":"⫬","&NotCongruent;":"≢","&NotCupCap;":"≭","&NotDoubleVerticalBar;":"∦","&NotElement;":"∉","&NotEqual;":"≠","&NotEqualTilde;":"≂̸","&NotExists;":"∄","&NotGreater;":"≯","&NotGreaterEqual;":"≱","&NotGreaterFullEqual;":"≧̸","&NotGreaterGreater;":"≫̸","&NotGreaterLess;":"≹","&NotGreaterSlantEqual;":"⩾̸","&NotGreaterTilde;":"≵","&NotHumpDownHump;":"≎̸","&NotHumpEqual;":"≏̸","&NotLeftTriangle;":"⋪","&NotLeftTriangleBar;":"⧏̸","&NotLeftTriangleEqual;":"⋬","&NotLess;":"≮","&NotLessEqual;":"≰","&NotLessGreater;":"≸","&NotLessLess;":"≪̸","&NotLessSlantEqual;":"⩽̸","&NotLessTilde;":"≴","&NotNestedGreaterGreater;":"⪢̸","&NotNestedLessLess;":"⪡̸","&NotPrecedes;":"⊀","&NotPrecedesEqual;":"⪯̸","&NotPrecedesSlantEqual;":"⋠","&NotReverseElement;":"∌","&NotRightTriangle;":"⋫","&NotRightTriangleBar;":"⧐̸","&NotRightTriangleEqual;":"⋭","&NotSquareSubset;":"⊏̸","&NotSquareSubsetEqual;":"⋢","&NotSquareSuperset;":"⊐̸","&NotSquareSupersetEqual;":"⋣","&NotSubset;":"⊂⃒","&NotSubsetEqual;":"⊈","&NotSucceeds;":"⊁","&NotSucceedsEqual;":"⪰̸","&NotSucceedsSlantEqual;":"⋡","&NotSucceedsTilde;":"≿̸","&NotSuperset;":"⊃⃒","&NotSupersetEqual;":"⊉","&NotTilde;":"≁","&NotTildeEqual;":"≄","&NotTildeFullEqual;":"≇","&NotTildeTilde;":"≉","&NotVerticalBar;":"∤","&Nscr;":"𝒩","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Nu;":"Ν","&OElig;":"Œ","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Ocy;":"О","&Odblac;":"Ő","&Ofr;":"𝔒","&Ograve":"Ò","&Ograve;":"Ò","&Omacr;":"Ō","&Omega;":"Ω","&Omicron;":"Ο","&Oopf;":"𝕆","&OpenCurlyDoubleQuote;":"“","&OpenCurlyQuote;":"‘","&Or;":"⩔","&Oscr;":"𝒪","&Oslash":"Ø","&Oslash;":"Ø","&Otilde":"Õ","&Otilde;":"Õ","&Otimes;":"⨷","&Ouml":"Ö","&Ouml;":"Ö","&OverBar;":"‾","&OverBrace;":"⏞","&OverBracket;":"⎴","&OverParenthesis;":"⏜","&PartialD;":"∂","&Pcy;":"П","&Pfr;":"𝔓","&Phi;":"Φ","&Pi;":"Π","&PlusMinus;":"±","&Poincareplane;":"ℌ","&Popf;":"ℙ","&Pr;":"⪻","&Precedes;":"≺","&PrecedesEqual;":"⪯","&PrecedesSlantEqual;":"≼","&PrecedesTilde;":"≾","&Prime;":"″","&Product;":"∏","&Proportion;":"∷","&Proportional;":"∝","&Pscr;":"𝒫","&Psi;":"Ψ","&QUOT":'"',"&QUOT;":'"',"&Qfr;":"𝔔","&Qopf;":"ℚ","&Qscr;":"𝒬","&RBarr;":"⤐","&REG":"®","&REG;":"®","&Racute;":"Ŕ","&Rang;":"⟫","&Rarr;":"↠","&Rarrtl;":"⤖","&Rcaron;":"Ř","&Rcedil;":"Ŗ","&Rcy;":"Р","&Re;":"ℜ","&ReverseElement;":"∋","&ReverseEquilibrium;":"⇋","&ReverseUpEquilibrium;":"⥯","&Rfr;":"ℜ","&Rho;":"Ρ","&RightAngleBracket;":"⟩","&RightArrow;":"→","&RightArrowBar;":"⇥","&RightArrowLeftArrow;":"⇄","&RightCeiling;":"⌉","&RightDoubleBracket;":"⟧","&RightDownTeeVector;":"⥝","&RightDownVector;":"⇂","&RightDownVectorBar;":"⥕","&RightFloor;":"⌋","&RightTee;":"⊢","&RightTeeArrow;":"↦","&RightTeeVector;":"⥛","&RightTriangle;":"⊳","&RightTriangleBar;":"⧐","&RightTriangleEqual;":"⊵","&RightUpDownVector;":"⥏","&RightUpTeeVector;":"⥜","&RightUpVector;":"↾","&RightUpVectorBar;":"⥔","&RightVector;":"⇀","&RightVectorBar;":"⥓","&Rightarrow;":"⇒","&Ropf;":"ℝ","&RoundImplies;":"⥰","&Rrightarrow;":"⇛","&Rscr;":"ℛ","&Rsh;":"↱","&RuleDelayed;":"⧴","&SHCHcy;":"Щ","&SHcy;":"Ш","&SOFTcy;":"Ь","&Sacute;":"Ś","&Sc;":"⪼","&Scaron;":"Š","&Scedil;":"Ş","&Scirc;":"Ŝ","&Scy;":"С","&Sfr;":"𝔖","&ShortDownArrow;":"↓","&ShortLeftArrow;":"←","&ShortRightArrow;":"→","&ShortUpArrow;":"↑","&Sigma;":"Σ","&SmallCircle;":"∘","&Sopf;":"𝕊","&Sqrt;":"√","&Square;":"□","&SquareIntersection;":"⊓","&SquareSubset;":"⊏","&SquareSubsetEqual;":"⊑","&SquareSuperset;":"⊐","&SquareSupersetEqual;":"⊒","&SquareUnion;":"⊔","&Sscr;":"𝒮","&Star;":"⋆","&Sub;":"⋐","&Subset;":"⋐","&SubsetEqual;":"⊆","&Succeeds;":"≻","&SucceedsEqual;":"⪰","&SucceedsSlantEqual;":"≽","&SucceedsTilde;":"≿","&SuchThat;":"∋","&Sum;":"∑","&Sup;":"⋑","&Superset;":"⊃","&SupersetEqual;":"⊇","&Supset;":"⋑","&THORN":"Þ","&THORN;":"Þ","&TRADE;":"™","&TSHcy;":"Ћ","&TScy;":"Ц","&Tab;":"\t","&Tau;":"Τ","&Tcaron;":"Ť","&Tcedil;":"Ţ","&Tcy;":"Т","&Tfr;":"𝔗","&Therefore;":"∴","&Theta;":"Θ","&ThickSpace;":"  ","&ThinSpace;":" ","&Tilde;":"∼","&TildeEqual;":"≃","&TildeFullEqual;":"≅","&TildeTilde;":"≈","&Topf;":"𝕋","&TripleDot;":"⃛","&Tscr;":"𝒯","&Tstrok;":"Ŧ","&Uacute":"Ú","&Uacute;":"Ú","&Uarr;":"↟","&Uarrocir;":"⥉","&Ubrcy;":"Ў","&Ubreve;":"Ŭ","&Ucirc":"Û","&Ucirc;":"Û","&Ucy;":"У","&Udblac;":"Ű","&Ufr;":"𝔘","&Ugrave":"Ù","&Ugrave;":"Ù","&Umacr;":"Ū","&UnderBar;":"_","&UnderBrace;":"⏟","&UnderBracket;":"⎵","&UnderParenthesis;":"⏝","&Union;":"⋃","&UnionPlus;":"⊎","&Uogon;":"Ų","&Uopf;":"𝕌","&UpArrow;":"↑","&UpArrowBar;":"⤒","&UpArrowDownArrow;":"⇅","&UpDownArrow;":"↕","&UpEquilibrium;":"⥮","&UpTee;":"⊥","&UpTeeArrow;":"↥","&Uparrow;":"⇑","&Updownarrow;":"⇕","&UpperLeftArrow;":"↖","&UpperRightArrow;":"↗","&Upsi;":"ϒ","&Upsilon;":"Υ","&Uring;":"Ů","&Uscr;":"𝒰","&Utilde;":"Ũ","&Uuml":"Ü","&Uuml;":"Ü","&VDash;":"⊫","&Vbar;":"⫫","&Vcy;":"В","&Vdash;":"⊩","&Vdashl;":"⫦","&Vee;":"⋁","&Verbar;":"‖","&Vert;":"‖","&VerticalBar;":"∣","&VerticalLine;":"|","&VerticalSeparator;":"❘","&VerticalTilde;":"≀","&VeryThinSpace;":" ","&Vfr;":"𝔙","&Vopf;":"𝕍","&Vscr;":"𝒱","&Vvdash;":"⊪","&Wcirc;":"Ŵ","&Wedge;":"⋀","&Wfr;":"𝔚","&Wopf;":"𝕎","&Wscr;":"𝒲","&Xfr;":"𝔛","&Xi;":"Ξ","&Xopf;":"𝕏","&Xscr;":"𝒳","&YAcy;":"Я","&YIcy;":"Ї","&YUcy;":"Ю","&Yacute":"Ý","&Yacute;":"Ý","&Ycirc;":"Ŷ","&Ycy;":"Ы","&Yfr;":"𝔜","&Yopf;":"𝕐","&Yscr;":"𝒴","&Yuml;":"Ÿ","&ZHcy;":"Ж","&Zacute;":"Ź","&Zcaron;":"Ž","&Zcy;":"З","&Zdot;":"Ż","&ZeroWidthSpace;":"​","&Zeta;":"Ζ","&Zfr;":"ℨ","&Zopf;":"ℤ","&Zscr;":"𝒵","&aacute":"á","&aacute;":"á","&abreve;":"ă","&ac;":"∾","&acE;":"∾̳","&acd;":"∿","&acirc":"â","&acirc;":"â","&acute":"´","&acute;":"´","&acy;":"а","&aelig":"æ","&aelig;":"æ","&af;":"⁡","&afr;":"𝔞","&agrave":"à","&agrave;":"à","&alefsym;":"ℵ","&aleph;":"ℵ","&alpha;":"α","&amacr;":"ā","&amalg;":"⨿","&amp":"&","&amp;":"&","&and;":"∧","&andand;":"⩕","&andd;":"⩜","&andslope;":"⩘","&andv;":"⩚","&ang;":"∠","&ange;":"⦤","&angle;":"∠","&angmsd;":"∡","&angmsdaa;":"⦨","&angmsdab;":"⦩","&angmsdac;":"⦪","&angmsdad;":"⦫","&angmsdae;":"⦬","&angmsdaf;":"⦭","&angmsdag;":"⦮","&angmsdah;":"⦯","&angrt;":"∟","&angrtvb;":"⊾","&angrtvbd;":"⦝","&angsph;":"∢","&angst;":"Å","&angzarr;":"⍼","&aogon;":"ą","&aopf;":"𝕒","&ap;":"≈","&apE;":"⩰","&apacir;":"⩯","&ape;":"≊","&apid;":"≋","&apos;":"'","&approx;":"≈","&approxeq;":"≊","&aring":"å","&aring;":"å","&ascr;":"𝒶","&ast;":"*","&asymp;":"≈","&asympeq;":"≍","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&awconint;":"∳","&awint;":"⨑","&bNot;":"⫭","&backcong;":"≌","&backepsilon;":"϶","&backprime;":"‵","&backsim;":"∽","&backsimeq;":"⋍","&barvee;":"⊽","&barwed;":"⌅","&barwedge;":"⌅","&bbrk;":"⎵","&bbrktbrk;":"⎶","&bcong;":"≌","&bcy;":"б","&bdquo;":"„","&becaus;":"∵","&because;":"∵","&bemptyv;":"⦰","&bepsi;":"϶","&bernou;":"ℬ","&beta;":"β","&beth;":"ℶ","&between;":"≬","&bfr;":"𝔟","&bigcap;":"⋂","&bigcirc;":"◯","&bigcup;":"⋃","&bigodot;":"⨀","&bigoplus;":"⨁","&bigotimes;":"⨂","&bigsqcup;":"⨆","&bigstar;":"★","&bigtriangledown;":"▽","&bigtriangleup;":"△","&biguplus;":"⨄","&bigvee;":"⋁","&bigwedge;":"⋀","&bkarow;":"⤍","&blacklozenge;":"⧫","&blacksquare;":"▪","&blacktriangle;":"▴","&blacktriangledown;":"▾","&blacktriangleleft;":"◂","&blacktriangleright;":"▸","&blank;":"␣","&blk12;":"▒","&blk14;":"░","&blk34;":"▓","&block;":"█","&bne;":"=⃥","&bnequiv;":"≡⃥","&bnot;":"⌐","&bopf;":"𝕓","&bot;":"⊥","&bottom;":"⊥","&bowtie;":"⋈","&boxDL;":"╗","&boxDR;":"╔","&boxDl;":"╖","&boxDr;":"╓","&boxH;":"═","&boxHD;":"╦","&boxHU;":"╩","&boxHd;":"╤","&boxHu;":"╧","&boxUL;":"╝","&boxUR;":"╚","&boxUl;":"╜","&boxUr;":"╙","&boxV;":"║","&boxVH;":"╬","&boxVL;":"╣","&boxVR;":"╠","&boxVh;":"╫","&boxVl;":"╢","&boxVr;":"╟","&boxbox;":"⧉","&boxdL;":"╕","&boxdR;":"╒","&boxdl;":"┐","&boxdr;":"┌","&boxh;":"─","&boxhD;":"╥","&boxhU;":"╨","&boxhd;":"┬","&boxhu;":"┴","&boxminus;":"⊟","&boxplus;":"⊞","&boxtimes;":"⊠","&boxuL;":"╛","&boxuR;":"╘","&boxul;":"┘","&boxur;":"└","&boxv;":"│","&boxvH;":"╪","&boxvL;":"╡","&boxvR;":"╞","&boxvh;":"┼","&boxvl;":"┤","&boxvr;":"├","&bprime;":"‵","&breve;":"˘","&brvbar":"¦","&brvbar;":"¦","&bscr;":"𝒷","&bsemi;":"⁏","&bsim;":"∽","&bsime;":"⋍","&bsol;":"\\","&bsolb;":"⧅","&bsolhsub;":"⟈","&bull;":"•","&bullet;":"•","&bump;":"≎","&bumpE;":"⪮","&bumpe;":"≏","&bumpeq;":"≏","&cacute;":"ć","&cap;":"∩","&capand;":"⩄","&capbrcup;":"⩉","&capcap;":"⩋","&capcup;":"⩇","&capdot;":"⩀","&caps;":"∩︀","&caret;":"⁁","&caron;":"ˇ","&ccaps;":"⩍","&ccaron;":"č","&ccedil":"ç","&ccedil;":"ç","&ccirc;":"ĉ","&ccups;":"⩌","&ccupssm;":"⩐","&cdot;":"ċ","&cedil":"¸","&cedil;":"¸","&cemptyv;":"⦲","&cent":"¢","&cent;":"¢","&centerdot;":"·","&cfr;":"𝔠","&chcy;":"ч","&check;":"✓","&checkmark;":"✓","&chi;":"χ","&cir;":"○","&cirE;":"⧃","&circ;":"ˆ","&circeq;":"≗","&circlearrowleft;":"↺","&circlearrowright;":"↻","&circledR;":"®","&circledS;":"Ⓢ","&circledast;":"⊛","&circledcirc;":"⊚","&circleddash;":"⊝","&cire;":"≗","&cirfnint;":"⨐","&cirmid;":"⫯","&cirscir;":"⧂","&clubs;":"♣","&clubsuit;":"♣","&colon;":":","&colone;":"≔","&coloneq;":"≔","&comma;":",","&commat;":"@","&comp;":"∁","&compfn;":"∘","&complement;":"∁","&complexes;":"ℂ","&cong;":"≅","&congdot;":"⩭","&conint;":"∮","&copf;":"𝕔","&coprod;":"∐","&copy":"©","&copy;":"©","&copysr;":"℗","&crarr;":"↵","&cross;":"✗","&cscr;":"𝒸","&csub;":"⫏","&csube;":"⫑","&csup;":"⫐","&csupe;":"⫒","&ctdot;":"⋯","&cudarrl;":"⤸","&cudarrr;":"⤵","&cuepr;":"⋞","&cuesc;":"⋟","&cularr;":"↶","&cularrp;":"⤽","&cup;":"∪","&cupbrcap;":"⩈","&cupcap;":"⩆","&cupcup;":"⩊","&cupdot;":"⊍","&cupor;":"⩅","&cups;":"∪︀","&curarr;":"↷","&curarrm;":"⤼","&curlyeqprec;":"⋞","&curlyeqsucc;":"⋟","&curlyvee;":"⋎","&curlywedge;":"⋏","&curren":"¤","&curren;":"¤","&curvearrowleft;":"↶","&curvearrowright;":"↷","&cuvee;":"⋎","&cuwed;":"⋏","&cwconint;":"∲","&cwint;":"∱","&cylcty;":"⌭","&dArr;":"⇓","&dHar;":"⥥","&dagger;":"†","&daleth;":"ℸ","&darr;":"↓","&dash;":"‐","&dashv;":"⊣","&dbkarow;":"⤏","&dblac;":"˝","&dcaron;":"ď","&dcy;":"д","&dd;":"ⅆ","&ddagger;":"‡","&ddarr;":"⇊","&ddotseq;":"⩷","&deg":"°","&deg;":"°","&delta;":"δ","&demptyv;":"⦱","&dfisht;":"⥿","&dfr;":"𝔡","&dharl;":"⇃","&dharr;":"⇂","&diam;":"⋄","&diamond;":"⋄","&diamondsuit;":"♦","&diams;":"♦","&die;":"¨","&digamma;":"ϝ","&disin;":"⋲","&div;":"÷","&divide":"÷","&divide;":"÷","&divideontimes;":"⋇","&divonx;":"⋇","&djcy;":"ђ","&dlcorn;":"⌞","&dlcrop;":"⌍","&dollar;":"$","&dopf;":"𝕕","&dot;":"˙","&doteq;":"≐","&doteqdot;":"≑","&dotminus;":"∸","&dotplus;":"∔","&dotsquare;":"⊡","&doublebarwedge;":"⌆","&downarrow;":"↓","&downdownarrows;":"⇊","&downharpoonleft;":"⇃","&downharpoonright;":"⇂","&drbkarow;":"⤐","&drcorn;":"⌟","&drcrop;":"⌌","&dscr;":"𝒹","&dscy;":"ѕ","&dsol;":"⧶","&dstrok;":"đ","&dtdot;":"⋱","&dtri;":"▿","&dtrif;":"▾","&duarr;":"⇵","&duhar;":"⥯","&dwangle;":"⦦","&dzcy;":"џ","&dzigrarr;":"⟿","&eDDot;":"⩷","&eDot;":"≑","&eacute":"é","&eacute;":"é","&easter;":"⩮","&ecaron;":"ě","&ecir;":"≖","&ecirc":"ê","&ecirc;":"ê","&ecolon;":"≕","&ecy;":"э","&edot;":"ė","&ee;":"ⅇ","&efDot;":"≒","&efr;":"𝔢","&eg;":"⪚","&egrave":"è","&egrave;":"è","&egs;":"⪖","&egsdot;":"⪘","&el;":"⪙","&elinters;":"⏧","&ell;":"ℓ","&els;":"⪕","&elsdot;":"⪗","&emacr;":"ē","&empty;":"∅","&emptyset;":"∅","&emptyv;":"∅","&emsp13;":" ","&emsp14;":" ","&emsp;":" ","&eng;":"ŋ","&ensp;":" ","&eogon;":"ę","&eopf;":"𝕖","&epar;":"⋕","&eparsl;":"⧣","&eplus;":"⩱","&epsi;":"ε","&epsilon;":"ε","&epsiv;":"ϵ","&eqcirc;":"≖","&eqcolon;":"≕","&eqsim;":"≂","&eqslantgtr;":"⪖","&eqslantless;":"⪕","&equals;":"=","&equest;":"≟","&equiv;":"≡","&equivDD;":"⩸","&eqvparsl;":"⧥","&erDot;":"≓","&erarr;":"⥱","&escr;":"ℯ","&esdot;":"≐","&esim;":"≂","&eta;":"η","&eth":"ð","&eth;":"ð","&euml":"ë","&euml;":"ë","&euro;":"€","&excl;":"!","&exist;":"∃","&expectation;":"ℰ","&exponentiale;":"ⅇ","&fallingdotseq;":"≒","&fcy;":"ф","&female;":"♀","&ffilig;":"ﬃ","&fflig;":"ﬀ","&ffllig;":"ﬄ","&ffr;":"𝔣","&filig;":"ﬁ","&fjlig;":"fj","&flat;":"♭","&fllig;":"ﬂ","&fltns;":"▱","&fnof;":"ƒ","&fopf;":"𝕗","&forall;":"∀","&fork;":"⋔","&forkv;":"⫙","&fpartint;":"⨍","&frac12":"½","&frac12;":"½","&frac13;":"⅓","&frac14":"¼","&frac14;":"¼","&frac15;":"⅕","&frac16;":"⅙","&frac18;":"⅛","&frac23;":"⅔","&frac25;":"⅖","&frac34":"¾","&frac34;":"¾","&frac35;":"⅗","&frac38;":"⅜","&frac45;":"⅘","&frac56;":"⅚","&frac58;":"⅝","&frac78;":"⅞","&frasl;":"⁄","&frown;":"⌢","&fscr;":"𝒻","&gE;":"≧","&gEl;":"⪌","&gacute;":"ǵ","&gamma;":"γ","&gammad;":"ϝ","&gap;":"⪆","&gbreve;":"ğ","&gcirc;":"ĝ","&gcy;":"г","&gdot;":"ġ","&ge;":"≥","&gel;":"⋛","&geq;":"≥","&geqq;":"≧","&geqslant;":"⩾","&ges;":"⩾","&gescc;":"⪩","&gesdot;":"⪀","&gesdoto;":"⪂","&gesdotol;":"⪄","&gesl;":"⋛︀","&gesles;":"⪔","&gfr;":"𝔤","&gg;":"≫","&ggg;":"⋙","&gimel;":"ℷ","&gjcy;":"ѓ","&gl;":"≷","&glE;":"⪒","&gla;":"⪥","&glj;":"⪤","&gnE;":"≩","&gnap;":"⪊","&gnapprox;":"⪊","&gne;":"⪈","&gneq;":"⪈","&gneqq;":"≩","&gnsim;":"⋧","&gopf;":"𝕘","&grave;":"`","&gscr;":"ℊ","&gsim;":"≳","&gsime;":"⪎","&gsiml;":"⪐","&gt":">","&gt;":">","&gtcc;":"⪧","&gtcir;":"⩺","&gtdot;":"⋗","&gtlPar;":"⦕","&gtquest;":"⩼","&gtrapprox;":"⪆","&gtrarr;":"⥸","&gtrdot;":"⋗","&gtreqless;":"⋛","&gtreqqless;":"⪌","&gtrless;":"≷","&gtrsim;":"≳","&gvertneqq;":"≩︀","&gvnE;":"≩︀","&hArr;":"⇔","&hairsp;":" ","&half;":"½","&hamilt;":"ℋ","&hardcy;":"ъ","&harr;":"↔","&harrcir;":"⥈","&harrw;":"↭","&hbar;":"ℏ","&hcirc;":"ĥ","&hearts;":"♥","&heartsuit;":"♥","&hellip;":"…","&hercon;":"⊹","&hfr;":"𝔥","&hksearow;":"⤥","&hkswarow;":"⤦","&hoarr;":"⇿","&homtht;":"∻","&hookleftarrow;":"↩","&hookrightarrow;":"↪","&hopf;":"𝕙","&horbar;":"―","&hscr;":"𝒽","&hslash;":"ℏ","&hstrok;":"ħ","&hybull;":"⁃","&hyphen;":"‐","&iacute":"í","&iacute;":"í","&ic;":"⁣","&icirc":"î","&icirc;":"î","&icy;":"и","&iecy;":"е","&iexcl":"¡","&iexcl;":"¡","&iff;":"⇔","&ifr;":"𝔦","&igrave":"ì","&igrave;":"ì","&ii;":"ⅈ","&iiiint;":"⨌","&iiint;":"∭","&iinfin;":"⧜","&iiota;":"℩","&ijlig;":"ĳ","&imacr;":"ī","&image;":"ℑ","&imagline;":"ℐ","&imagpart;":"ℑ","&imath;":"ı","&imof;":"⊷","&imped;":"Ƶ","&in;":"∈","&incare;":"℅","&infin;":"∞","&infintie;":"⧝","&inodot;":"ı","&int;":"∫","&intcal;":"⊺","&integers;":"ℤ","&intercal;":"⊺","&intlarhk;":"⨗","&intprod;":"⨼","&iocy;":"ё","&iogon;":"į","&iopf;":"𝕚","&iota;":"ι","&iprod;":"⨼","&iquest":"¿","&iquest;":"¿","&iscr;":"𝒾","&isin;":"∈","&isinE;":"⋹","&isindot;":"⋵","&isins;":"⋴","&isinsv;":"⋳","&isinv;":"∈","&it;":"⁢","&itilde;":"ĩ","&iukcy;":"і","&iuml":"ï","&iuml;":"ï","&jcirc;":"ĵ","&jcy;":"й","&jfr;":"𝔧","&jmath;":"ȷ","&jopf;":"𝕛","&jscr;":"𝒿","&jsercy;":"ј","&jukcy;":"є","&kappa;":"κ","&kappav;":"ϰ","&kcedil;":"ķ","&kcy;":"к","&kfr;":"𝔨","&kgreen;":"ĸ","&khcy;":"х","&kjcy;":"ќ","&kopf;":"𝕜","&kscr;":"𝓀","&lAarr;":"⇚","&lArr;":"⇐","&lAtail;":"⤛","&lBarr;":"⤎","&lE;":"≦","&lEg;":"⪋","&lHar;":"⥢","&lacute;":"ĺ","&laemptyv;":"⦴","&lagran;":"ℒ","&lambda;":"λ","&lang;":"⟨","&langd;":"⦑","&langle;":"⟨","&lap;":"⪅","&laquo":"«","&laquo;":"«","&larr;":"←","&larrb;":"⇤","&larrbfs;":"⤟","&larrfs;":"⤝","&larrhk;":"↩","&larrlp;":"↫","&larrpl;":"⤹","&larrsim;":"⥳","&larrtl;":"↢","&lat;":"⪫","&latail;":"⤙","&late;":"⪭","&lates;":"⪭︀","&lbarr;":"⤌","&lbbrk;":"❲","&lbrace;":"{","&lbrack;":"[","&lbrke;":"⦋","&lbrksld;":"⦏","&lbrkslu;":"⦍","&lcaron;":"ľ","&lcedil;":"ļ","&lceil;":"⌈","&lcub;":"{","&lcy;":"л","&ldca;":"⤶","&ldquo;":"“","&ldquor;":"„","&ldrdhar;":"⥧","&ldrushar;":"⥋","&ldsh;":"↲","&le;":"≤","&leftarrow;":"←","&leftarrowtail;":"↢","&leftharpoondown;":"↽","&leftharpoonup;":"↼","&leftleftarrows;":"⇇","&leftrightarrow;":"↔","&leftrightarrows;":"⇆","&leftrightharpoons;":"⇋","&leftrightsquigarrow;":"↭","&leftthreetimes;":"⋋","&leg;":"⋚","&leq;":"≤","&leqq;":"≦","&leqslant;":"⩽","&les;":"⩽","&lescc;":"⪨","&lesdot;":"⩿","&lesdoto;":"⪁","&lesdotor;":"⪃","&lesg;":"⋚︀","&lesges;":"⪓","&lessapprox;":"⪅","&lessdot;":"⋖","&lesseqgtr;":"⋚","&lesseqqgtr;":"⪋","&lessgtr;":"≶","&lesssim;":"≲","&lfisht;":"⥼","&lfloor;":"⌊","&lfr;":"𝔩","&lg;":"≶","&lgE;":"⪑","&lhard;":"↽","&lharu;":"↼","&lharul;":"⥪","&lhblk;":"▄","&ljcy;":"љ","&ll;":"≪","&llarr;":"⇇","&llcorner;":"⌞","&llhard;":"⥫","&lltri;":"◺","&lmidot;":"ŀ","&lmoust;":"⎰","&lmoustache;":"⎰","&lnE;":"≨","&lnap;":"⪉","&lnapprox;":"⪉","&lne;":"⪇","&lneq;":"⪇","&lneqq;":"≨","&lnsim;":"⋦","&loang;":"⟬","&loarr;":"⇽","&lobrk;":"⟦","&longleftarrow;":"⟵","&longleftrightarrow;":"⟷","&longmapsto;":"⟼","&longrightarrow;":"⟶","&looparrowleft;":"↫","&looparrowright;":"↬","&lopar;":"⦅","&lopf;":"𝕝","&loplus;":"⨭","&lotimes;":"⨴","&lowast;":"∗","&lowbar;":"_","&loz;":"◊","&lozenge;":"◊","&lozf;":"⧫","&lpar;":"(","&lparlt;":"⦓","&lrarr;":"⇆","&lrcorner;":"⌟","&lrhar;":"⇋","&lrhard;":"⥭","&lrm;":"‎","&lrtri;":"⊿","&lsaquo;":"‹","&lscr;":"𝓁","&lsh;":"↰","&lsim;":"≲","&lsime;":"⪍","&lsimg;":"⪏","&lsqb;":"[","&lsquo;":"‘","&lsquor;":"‚","&lstrok;":"ł","&lt":"<","&lt;":"<","&ltcc;":"⪦","&ltcir;":"⩹","&ltdot;":"⋖","&lthree;":"⋋","&ltimes;":"⋉","&ltlarr;":"⥶","&ltquest;":"⩻","&ltrPar;":"⦖","&ltri;":"◃","&ltrie;":"⊴","&ltrif;":"◂","&lurdshar;":"⥊","&luruhar;":"⥦","&lvertneqq;":"≨︀","&lvnE;":"≨︀","&mDDot;":"∺","&macr":"¯","&macr;":"¯","&male;":"♂","&malt;":"✠","&maltese;":"✠","&map;":"↦","&mapsto;":"↦","&mapstodown;":"↧","&mapstoleft;":"↤","&mapstoup;":"↥","&marker;":"▮","&mcomma;":"⨩","&mcy;":"м","&mdash;":"—","&measuredangle;":"∡","&mfr;":"𝔪","&mho;":"℧","&micro":"µ","&micro;":"µ","&mid;":"∣","&midast;":"*","&midcir;":"⫰","&middot":"·","&middot;":"·","&minus;":"−","&minusb;":"⊟","&minusd;":"∸","&minusdu;":"⨪","&mlcp;":"⫛","&mldr;":"…","&mnplus;":"∓","&models;":"⊧","&mopf;":"𝕞","&mp;":"∓","&mscr;":"𝓂","&mstpos;":"∾","&mu;":"μ","&multimap;":"⊸","&mumap;":"⊸","&nGg;":"⋙̸","&nGt;":"≫⃒","&nGtv;":"≫̸","&nLeftarrow;":"⇍","&nLeftrightarrow;":"⇎","&nLl;":"⋘̸","&nLt;":"≪⃒","&nLtv;":"≪̸","&nRightarrow;":"⇏","&nVDash;":"⊯","&nVdash;":"⊮","&nabla;":"∇","&nacute;":"ń","&nang;":"∠⃒","&nap;":"≉","&napE;":"⩰̸","&napid;":"≋̸","&napos;":"ŉ","&napprox;":"≉","&natur;":"♮","&natural;":"♮","&naturals;":"ℕ","&nbsp":" ","&nbsp;":" ","&nbump;":"≎̸","&nbumpe;":"≏̸","&ncap;":"⩃","&ncaron;":"ň","&ncedil;":"ņ","&ncong;":"≇","&ncongdot;":"⩭̸","&ncup;":"⩂","&ncy;":"н","&ndash;":"–","&ne;":"≠","&neArr;":"⇗","&nearhk;":"⤤","&nearr;":"↗","&nearrow;":"↗","&nedot;":"≐̸","&nequiv;":"≢","&nesear;":"⤨","&nesim;":"≂̸","&nexist;":"∄","&nexists;":"∄","&nfr;":"𝔫","&ngE;":"≧̸","&nge;":"≱","&ngeq;":"≱","&ngeqq;":"≧̸","&ngeqslant;":"⩾̸","&nges;":"⩾̸","&ngsim;":"≵","&ngt;":"≯","&ngtr;":"≯","&nhArr;":"⇎","&nharr;":"↮","&nhpar;":"⫲","&ni;":"∋","&nis;":"⋼","&nisd;":"⋺","&niv;":"∋","&njcy;":"њ","&nlArr;":"⇍","&nlE;":"≦̸","&nlarr;":"↚","&nldr;":"‥","&nle;":"≰","&nleftarrow;":"↚","&nleftrightarrow;":"↮","&nleq;":"≰","&nleqq;":"≦̸","&nleqslant;":"⩽̸","&nles;":"⩽̸","&nless;":"≮","&nlsim;":"≴","&nlt;":"≮","&nltri;":"⋪","&nltrie;":"⋬","&nmid;":"∤","&nopf;":"𝕟","&not":"¬","&not;":"¬","&notin;":"∉","&notinE;":"⋹̸","&notindot;":"⋵̸","&notinva;":"∉","&notinvb;":"⋷","&notinvc;":"⋶","&notni;":"∌","&notniva;":"∌","&notnivb;":"⋾","&notnivc;":"⋽","&npar;":"∦","&nparallel;":"∦","&nparsl;":"⫽⃥","&npart;":"∂̸","&npolint;":"⨔","&npr;":"⊀","&nprcue;":"⋠","&npre;":"⪯̸","&nprec;":"⊀","&npreceq;":"⪯̸","&nrArr;":"⇏","&nrarr;":"↛","&nrarrc;":"⤳̸","&nrarrw;":"↝̸","&nrightarrow;":"↛","&nrtri;":"⋫","&nrtrie;":"⋭","&nsc;":"⊁","&nsccue;":"⋡","&nsce;":"⪰̸","&nscr;":"𝓃","&nshortmid;":"∤","&nshortparallel;":"∦","&nsim;":"≁","&nsime;":"≄","&nsimeq;":"≄","&nsmid;":"∤","&nspar;":"∦","&nsqsube;":"⋢","&nsqsupe;":"⋣","&nsub;":"⊄","&nsubE;":"⫅̸","&nsube;":"⊈","&nsubset;":"⊂⃒","&nsubseteq;":"⊈","&nsubseteqq;":"⫅̸","&nsucc;":"⊁","&nsucceq;":"⪰̸","&nsup;":"⊅","&nsupE;":"⫆̸","&nsupe;":"⊉","&nsupset;":"⊃⃒","&nsupseteq;":"⊉","&nsupseteqq;":"⫆̸","&ntgl;":"≹","&ntilde":"ñ","&ntilde;":"ñ","&ntlg;":"≸","&ntriangleleft;":"⋪","&ntrianglelefteq;":"⋬","&ntriangleright;":"⋫","&ntrianglerighteq;":"⋭","&nu;":"ν","&num;":"#","&numero;":"№","&numsp;":" ","&nvDash;":"⊭","&nvHarr;":"⤄","&nvap;":"≍⃒","&nvdash;":"⊬","&nvge;":"≥⃒","&nvgt;":">⃒","&nvinfin;":"⧞","&nvlArr;":"⤂","&nvle;":"≤⃒","&nvlt;":"<⃒","&nvltrie;":"⊴⃒","&nvrArr;":"⤃","&nvrtrie;":"⊵⃒","&nvsim;":"∼⃒","&nwArr;":"⇖","&nwarhk;":"⤣","&nwarr;":"↖","&nwarrow;":"↖","&nwnear;":"⤧","&oS;":"Ⓢ","&oacute":"ó","&oacute;":"ó","&oast;":"⊛","&ocir;":"⊚","&ocirc":"ô","&ocirc;":"ô","&ocy;":"о","&odash;":"⊝","&odblac;":"ő","&odiv;":"⨸","&odot;":"⊙","&odsold;":"⦼","&oelig;":"œ","&ofcir;":"⦿","&ofr;":"𝔬","&ogon;":"˛","&ograve":"ò","&ograve;":"ò","&ogt;":"⧁","&ohbar;":"⦵","&ohm;":"Ω","&oint;":"∮","&olarr;":"↺","&olcir;":"⦾","&olcross;":"⦻","&oline;":"‾","&olt;":"⧀","&omacr;":"ō","&omega;":"ω","&omicron;":"ο","&omid;":"⦶","&ominus;":"⊖","&oopf;":"𝕠","&opar;":"⦷","&operp;":"⦹","&oplus;":"⊕","&or;":"∨","&orarr;":"↻","&ord;":"⩝","&order;":"ℴ","&orderof;":"ℴ","&ordf":"ª","&ordf;":"ª","&ordm":"º","&ordm;":"º","&origof;":"⊶","&oror;":"⩖","&orslope;":"⩗","&orv;":"⩛","&oscr;":"ℴ","&oslash":"ø","&oslash;":"ø","&osol;":"⊘","&otilde":"õ","&otilde;":"õ","&otimes;":"⊗","&otimesas;":"⨶","&ouml":"ö","&ouml;":"ö","&ovbar;":"⌽","&par;":"∥","&para":"¶","&para;":"¶","&parallel;":"∥","&parsim;":"⫳","&parsl;":"⫽","&part;":"∂","&pcy;":"п","&percnt;":"%","&period;":".","&permil;":"‰","&perp;":"⊥","&pertenk;":"‱","&pfr;":"𝔭","&phi;":"φ","&phiv;":"ϕ","&phmmat;":"ℳ","&phone;":"☎","&pi;":"π","&pitchfork;":"⋔","&piv;":"ϖ","&planck;":"ℏ","&planckh;":"ℎ","&plankv;":"ℏ","&plus;":"+","&plusacir;":"⨣","&plusb;":"⊞","&pluscir;":"⨢","&plusdo;":"∔","&plusdu;":"⨥","&pluse;":"⩲","&plusmn":"±","&plusmn;":"±","&plussim;":"⨦","&plustwo;":"⨧","&pm;":"±","&pointint;":"⨕","&popf;":"𝕡","&pound":"£","&pound;":"£","&pr;":"≺","&prE;":"⪳","&prap;":"⪷","&prcue;":"≼","&pre;":"⪯","&prec;":"≺","&precapprox;":"⪷","&preccurlyeq;":"≼","&preceq;":"⪯","&precnapprox;":"⪹","&precneqq;":"⪵","&precnsim;":"⋨","&precsim;":"≾","&prime;":"′","&primes;":"ℙ","&prnE;":"⪵","&prnap;":"⪹","&prnsim;":"⋨","&prod;":"∏","&profalar;":"⌮","&profline;":"⌒","&profsurf;":"⌓","&prop;":"∝","&propto;":"∝","&prsim;":"≾","&prurel;":"⊰","&pscr;":"𝓅","&psi;":"ψ","&puncsp;":" ","&qfr;":"𝔮","&qint;":"⨌","&qopf;":"𝕢","&qprime;":"⁗","&qscr;":"𝓆","&quaternions;":"ℍ","&quatint;":"⨖","&quest;":"?","&questeq;":"≟","&quot":'"',"&quot;":'"',"&rAarr;":"⇛","&rArr;":"⇒","&rAtail;":"⤜","&rBarr;":"⤏","&rHar;":"⥤","&race;":"∽̱","&racute;":"ŕ","&radic;":"√","&raemptyv;":"⦳","&rang;":"⟩","&rangd;":"⦒","&range;":"⦥","&rangle;":"⟩","&raquo":"»","&raquo;":"»","&rarr;":"→","&rarrap;":"⥵","&rarrb;":"⇥","&rarrbfs;":"⤠","&rarrc;":"⤳","&rarrfs;":"⤞","&rarrhk;":"↪","&rarrlp;":"↬","&rarrpl;":"⥅","&rarrsim;":"⥴","&rarrtl;":"↣","&rarrw;":"↝","&ratail;":"⤚","&ratio;":"∶","&rationals;":"ℚ","&rbarr;":"⤍","&rbbrk;":"❳","&rbrace;":"}","&rbrack;":"]","&rbrke;":"⦌","&rbrksld;":"⦎","&rbrkslu;":"⦐","&rcaron;":"ř","&rcedil;":"ŗ","&rceil;":"⌉","&rcub;":"}","&rcy;":"р","&rdca;":"⤷","&rdldhar;":"⥩","&rdquo;":"”","&rdquor;":"”","&rdsh;":"↳","&real;":"ℜ","&realine;":"ℛ","&realpart;":"ℜ","&reals;":"ℝ","&rect;":"▭","&reg":"®","&reg;":"®","&rfisht;":"⥽","&rfloor;":"⌋","&rfr;":"𝔯","&rhard;":"⇁","&rharu;":"⇀","&rharul;":"⥬","&rho;":"ρ","&rhov;":"ϱ","&rightarrow;":"→","&rightarrowtail;":"↣","&rightharpoondown;":"⇁","&rightharpoonup;":"⇀","&rightleftarrows;":"⇄","&rightleftharpoons;":"⇌","&rightrightarrows;":"⇉","&rightsquigarrow;":"↝","&rightthreetimes;":"⋌","&ring;":"˚","&risingdotseq;":"≓","&rlarr;":"⇄","&rlhar;":"⇌","&rlm;":"‏","&rmoust;":"⎱","&rmoustache;":"⎱","&rnmid;":"⫮","&roang;":"⟭","&roarr;":"⇾","&robrk;":"⟧","&ropar;":"⦆","&ropf;":"𝕣","&roplus;":"⨮","&rotimes;":"⨵","&rpar;":")","&rpargt;":"⦔","&rppolint;":"⨒","&rrarr;":"⇉","&rsaquo;":"›","&rscr;":"𝓇","&rsh;":"↱","&rsqb;":"]","&rsquo;":"’","&rsquor;":"’","&rthree;":"⋌","&rtimes;":"⋊","&rtri;":"▹","&rtrie;":"⊵","&rtrif;":"▸","&rtriltri;":"⧎","&ruluhar;":"⥨","&rx;":"℞","&sacute;":"ś","&sbquo;":"‚","&sc;":"≻","&scE;":"⪴","&scap;":"⪸","&scaron;":"š","&sccue;":"≽","&sce;":"⪰","&scedil;":"ş","&scirc;":"ŝ","&scnE;":"⪶","&scnap;":"⪺","&scnsim;":"⋩","&scpolint;":"⨓","&scsim;":"≿","&scy;":"с","&sdot;":"⋅","&sdotb;":"⊡","&sdote;":"⩦","&seArr;":"⇘","&searhk;":"⤥","&searr;":"↘","&searrow;":"↘","&sect":"§","&sect;":"§","&semi;":";","&seswar;":"⤩","&setminus;":"∖","&setmn;":"∖","&sext;":"✶","&sfr;":"𝔰","&sfrown;":"⌢","&sharp;":"♯","&shchcy;":"щ","&shcy;":"ш","&shortmid;":"∣","&shortparallel;":"∥","&shy":"­","&shy;":"­","&sigma;":"σ","&sigmaf;":"ς","&sigmav;":"ς","&sim;":"∼","&simdot;":"⩪","&sime;":"≃","&simeq;":"≃","&simg;":"⪞","&simgE;":"⪠","&siml;":"⪝","&simlE;":"⪟","&simne;":"≆","&simplus;":"⨤","&simrarr;":"⥲","&slarr;":"←","&smallsetminus;":"∖","&smashp;":"⨳","&smeparsl;":"⧤","&smid;":"∣","&smile;":"⌣","&smt;":"⪪","&smte;":"⪬","&smtes;":"⪬︀","&softcy;":"ь","&sol;":"/","&solb;":"⧄","&solbar;":"⌿","&sopf;":"𝕤","&spades;":"♠","&spadesuit;":"♠","&spar;":"∥","&sqcap;":"⊓","&sqcaps;":"⊓︀","&sqcup;":"⊔","&sqcups;":"⊔︀","&sqsub;":"⊏","&sqsube;":"⊑","&sqsubset;":"⊏","&sqsubseteq;":"⊑","&sqsup;":"⊐","&sqsupe;":"⊒","&sqsupset;":"⊐","&sqsupseteq;":"⊒","&squ;":"□","&square;":"□","&squarf;":"▪","&squf;":"▪","&srarr;":"→","&sscr;":"𝓈","&ssetmn;":"∖","&ssmile;":"⌣","&sstarf;":"⋆","&star;":"☆","&starf;":"★","&straightepsilon;":"ϵ","&straightphi;":"ϕ","&strns;":"¯","&sub;":"⊂","&subE;":"⫅","&subdot;":"⪽","&sube;":"⊆","&subedot;":"⫃","&submult;":"⫁","&subnE;":"⫋","&subne;":"⊊","&subplus;":"⪿","&subrarr;":"⥹","&subset;":"⊂","&subseteq;":"⊆","&subseteqq;":"⫅","&subsetneq;":"⊊","&subsetneqq;":"⫋","&subsim;":"⫇","&subsub;":"⫕","&subsup;":"⫓","&succ;":"≻","&succapprox;":"⪸","&succcurlyeq;":"≽","&succeq;":"⪰","&succnapprox;":"⪺","&succneqq;":"⪶","&succnsim;":"⋩","&succsim;":"≿","&sum;":"∑","&sung;":"♪","&sup1":"¹","&sup1;":"¹","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&sup;":"⊃","&supE;":"⫆","&supdot;":"⪾","&supdsub;":"⫘","&supe;":"⊇","&supedot;":"⫄","&suphsol;":"⟉","&suphsub;":"⫗","&suplarr;":"⥻","&supmult;":"⫂","&supnE;":"⫌","&supne;":"⊋","&supplus;":"⫀","&supset;":"⊃","&supseteq;":"⊇","&supseteqq;":"⫆","&supsetneq;":"⊋","&supsetneqq;":"⫌","&supsim;":"⫈","&supsub;":"⫔","&supsup;":"⫖","&swArr;":"⇙","&swarhk;":"⤦","&swarr;":"↙","&swarrow;":"↙","&swnwar;":"⤪","&szlig":"ß","&szlig;":"ß","&target;":"⌖","&tau;":"τ","&tbrk;":"⎴","&tcaron;":"ť","&tcedil;":"ţ","&tcy;":"т","&tdot;":"⃛","&telrec;":"⌕","&tfr;":"𝔱","&there4;":"∴","&therefore;":"∴","&theta;":"θ","&thetasym;":"ϑ","&thetav;":"ϑ","&thickapprox;":"≈","&thicksim;":"∼","&thinsp;":" ","&thkap;":"≈","&thksim;":"∼","&thorn":"þ","&thorn;":"þ","&tilde;":"˜","&times":"×","&times;":"×","&timesb;":"⊠","&timesbar;":"⨱","&timesd;":"⨰","&tint;":"∭","&toea;":"⤨","&top;":"⊤","&topbot;":"⌶","&topcir;":"⫱","&topf;":"𝕥","&topfork;":"⫚","&tosa;":"⤩","&tprime;":"‴","&trade;":"™","&triangle;":"▵","&triangledown;":"▿","&triangleleft;":"◃","&trianglelefteq;":"⊴","&triangleq;":"≜","&triangleright;":"▹","&trianglerighteq;":"⊵","&tridot;":"◬","&trie;":"≜","&triminus;":"⨺","&triplus;":"⨹","&trisb;":"⧍","&tritime;":"⨻","&trpezium;":"⏢","&tscr;":"𝓉","&tscy;":"ц","&tshcy;":"ћ","&tstrok;":"ŧ","&twixt;":"≬","&twoheadleftarrow;":"↞","&twoheadrightarrow;":"↠","&uArr;":"⇑","&uHar;":"⥣","&uacute":"ú","&uacute;":"ú","&uarr;":"↑","&ubrcy;":"ў","&ubreve;":"ŭ","&ucirc":"û","&ucirc;":"û","&ucy;":"у","&udarr;":"⇅","&udblac;":"ű","&udhar;":"⥮","&ufisht;":"⥾","&ufr;":"𝔲","&ugrave":"ù","&ugrave;":"ù","&uharl;":"↿","&uharr;":"↾","&uhblk;":"▀","&ulcorn;":"⌜","&ulcorner;":"⌜","&ulcrop;":"⌏","&ultri;":"◸","&umacr;":"ū","&uml":"¨","&uml;":"¨","&uogon;":"ų","&uopf;":"𝕦","&uparrow;":"↑","&updownarrow;":"↕","&upharpoonleft;":"↿","&upharpoonright;":"↾","&uplus;":"⊎","&upsi;":"υ","&upsih;":"ϒ","&upsilon;":"υ","&upuparrows;":"⇈","&urcorn;":"⌝","&urcorner;":"⌝","&urcrop;":"⌎","&uring;":"ů","&urtri;":"◹","&uscr;":"𝓊","&utdot;":"⋰","&utilde;":"ũ","&utri;":"▵","&utrif;":"▴","&uuarr;":"⇈","&uuml":"ü","&uuml;":"ü","&uwangle;":"⦧","&vArr;":"⇕","&vBar;":"⫨","&vBarv;":"⫩","&vDash;":"⊨","&vangrt;":"⦜","&varepsilon;":"ϵ","&varkappa;":"ϰ","&varnothing;":"∅","&varphi;":"ϕ","&varpi;":"ϖ","&varpropto;":"∝","&varr;":"↕","&varrho;":"ϱ","&varsigma;":"ς","&varsubsetneq;":"⊊︀","&varsubsetneqq;":"⫋︀","&varsupsetneq;":"⊋︀","&varsupsetneqq;":"⫌︀","&vartheta;":"ϑ","&vartriangleleft;":"⊲","&vartriangleright;":"⊳","&vcy;":"в","&vdash;":"⊢","&vee;":"∨","&veebar;":"⊻","&veeeq;":"≚","&vellip;":"⋮","&verbar;":"|","&vert;":"|","&vfr;":"𝔳","&vltri;":"⊲","&vnsub;":"⊂⃒","&vnsup;":"⊃⃒","&vopf;":"𝕧","&vprop;":"∝","&vrtri;":"⊳","&vscr;":"𝓋","&vsubnE;":"⫋︀","&vsubne;":"⊊︀","&vsupnE;":"⫌︀","&vsupne;":"⊋︀","&vzigzag;":"⦚","&wcirc;":"ŵ","&wedbar;":"⩟","&wedge;":"∧","&wedgeq;":"≙","&weierp;":"℘","&wfr;":"𝔴","&wopf;":"𝕨","&wp;":"℘","&wr;":"≀","&wreath;":"≀","&wscr;":"𝓌","&xcap;":"⋂","&xcirc;":"◯","&xcup;":"⋃","&xdtri;":"▽","&xfr;":"𝔵","&xhArr;":"⟺","&xharr;":"⟷","&xi;":"ξ","&xlArr;":"⟸","&xlarr;":"⟵","&xmap;":"⟼","&xnis;":"⋻","&xodot;":"⨀","&xopf;":"𝕩","&xoplus;":"⨁","&xotime;":"⨂","&xrArr;":"⟹","&xrarr;":"⟶","&xscr;":"𝓍","&xsqcup;":"⨆","&xuplus;":"⨄","&xutri;":"△","&xvee;":"⋁","&xwedge;":"⋀","&yacute":"ý","&yacute;":"ý","&yacy;":"я","&ycirc;":"ŷ","&ycy;":"ы","&yen":"¥","&yen;":"¥","&yfr;":"𝔶","&yicy;":"ї","&yopf;":"𝕪","&yscr;":"𝓎","&yucy;":"ю","&yuml":"ÿ","&yuml;":"ÿ","&zacute;":"ź","&zcaron;":"ž","&zcy;":"з","&zdot;":"ż","&zeetrf;":"ℨ","&zeta;":"ζ","&zfr;":"𝔷","&zhcy;":"ж","&zigrarr;":"⇝","&zopf;":"𝕫","&zscr;":"𝓏","&zwj;":"‍","&zwnj;":"‌"},characters:{"Æ":"&AElig;","&":"&amp;","Á":"&Aacute;","Ă":"&Abreve;","Â":"&Acirc;","А":"&Acy;","𝔄":"&Afr;","À":"&Agrave;","Α":"&Alpha;","Ā":"&Amacr;","⩓":"&And;","Ą":"&Aogon;","𝔸":"&Aopf;","⁡":"&af;","Å":"&angst;","𝒜":"&Ascr;","≔":"&coloneq;","Ã":"&Atilde;","Ä":"&Auml;","∖":"&ssetmn;","⫧":"&Barv;","⌆":"&doublebarwedge;","Б":"&Bcy;","∵":"&because;","ℬ":"&bernou;","Β":"&Beta;","𝔅":"&Bfr;","𝔹":"&Bopf;","˘":"&breve;","≎":"&bump;","Ч":"&CHcy;","©":"&copy;","Ć":"&Cacute;","⋒":"&Cap;","ⅅ":"&DD;","ℭ":"&Cfr;","Č":"&Ccaron;","Ç":"&Ccedil;","Ĉ":"&Ccirc;","∰":"&Cconint;","Ċ":"&Cdot;","¸":"&cedil;","·":"&middot;","Χ":"&Chi;","⊙":"&odot;","⊖":"&ominus;","⊕":"&oplus;","⊗":"&otimes;","∲":"&cwconint;","”":"&rdquor;","’":"&rsquor;","∷":"&Proportion;","⩴":"&Colone;","≡":"&equiv;","∯":"&DoubleContourIntegral;","∮":"&oint;","ℂ":"&complexes;","∐":"&coprod;","∳":"&awconint;","⨯":"&Cross;","𝒞":"&Cscr;","⋓":"&Cup;","≍":"&asympeq;","⤑":"&DDotrahd;","Ђ":"&DJcy;","Ѕ":"&DScy;","Џ":"&DZcy;","‡":"&ddagger;","↡":"&Darr;","⫤":"&DoubleLeftTee;","Ď":"&Dcaron;","Д":"&Dcy;","∇":"&nabla;","Δ":"&Delta;","𝔇":"&Dfr;","´":"&acute;","˙":"&dot;","˝":"&dblac;","`":"&grave;","˜":"&tilde;","⋄":"&diamond;","ⅆ":"&dd;","𝔻":"&Dopf;","¨":"&uml;","⃜":"&DotDot;","≐":"&esdot;","⇓":"&dArr;","⇐":"&lArr;","⇔":"&iff;","⟸":"&xlArr;","⟺":"&xhArr;","⟹":"&xrArr;","⇒":"&rArr;","⊨":"&vDash;","⇑":"&uArr;","⇕":"&vArr;","∥":"&spar;","↓":"&downarrow;","⤓":"&DownArrowBar;","⇵":"&duarr;","̑":"&DownBreve;","⥐":"&DownLeftRightVector;","⥞":"&DownLeftTeeVector;","↽":"&lhard;","⥖":"&DownLeftVectorBar;","⥟":"&DownRightTeeVector;","⇁":"&rightharpoondown;","⥗":"&DownRightVectorBar;","⊤":"&top;","↧":"&mapstodown;","𝒟":"&Dscr;","Đ":"&Dstrok;","Ŋ":"&ENG;","Ð":"&ETH;","É":"&Eacute;","Ě":"&Ecaron;","Ê":"&Ecirc;","Э":"&Ecy;","Ė":"&Edot;","𝔈":"&Efr;","È":"&Egrave;","∈":"&isinv;","Ē":"&Emacr;","◻":"&EmptySmallSquare;","▫":"&EmptyVerySmallSquare;","Ę":"&Eogon;","𝔼":"&Eopf;","Ε":"&Epsilon;","⩵":"&Equal;","≂":"&esim;","⇌":"&rlhar;","ℰ":"&expectation;","⩳":"&Esim;","Η":"&Eta;","Ë":"&Euml;","∃":"&exist;","ⅇ":"&exponentiale;","Ф":"&Fcy;","𝔉":"&Ffr;","◼":"&FilledSmallSquare;","▪":"&squf;","𝔽":"&Fopf;","∀":"&forall;","ℱ":"&Fscr;","Ѓ":"&GJcy;",">":"&gt;","Γ":"&Gamma;","Ϝ":"&Gammad;","Ğ":"&Gbreve;","Ģ":"&Gcedil;","Ĝ":"&Gcirc;","Г":"&Gcy;","Ġ":"&Gdot;","𝔊":"&Gfr;","⋙":"&ggg;","𝔾":"&Gopf;","≥":"&geq;","⋛":"&gtreqless;","≧":"&geqq;","⪢":"&GreaterGreater;","≷":"&gtrless;","⩾":"&ges;","≳":"&gtrsim;","𝒢":"&Gscr;","≫":"&gg;","Ъ":"&HARDcy;","ˇ":"&caron;","^":"&Hat;","Ĥ":"&Hcirc;","ℌ":"&Poincareplane;","ℋ":"&hamilt;","ℍ":"&quaternions;","─":"&boxh;","Ħ":"&Hstrok;","≏":"&bumpeq;","Е":"&IEcy;","Ĳ":"&IJlig;","Ё":"&IOcy;","Í":"&Iacute;","Î":"&Icirc;","И":"&Icy;","İ":"&Idot;","ℑ":"&imagpart;","Ì":"&Igrave;","Ī":"&Imacr;","ⅈ":"&ii;","∬":"&Int;","∫":"&int;","⋂":"&xcap;","⁣":"&ic;","⁢":"&it;","Į":"&Iogon;","𝕀":"&Iopf;","Ι":"&Iota;","ℐ":"&imagline;","Ĩ":"&Itilde;","І":"&Iukcy;","Ï":"&Iuml;","Ĵ":"&Jcirc;","Й":"&Jcy;","𝔍":"&Jfr;","𝕁":"&Jopf;","𝒥":"&Jscr;","Ј":"&Jsercy;","Є":"&Jukcy;","Х":"&KHcy;","Ќ":"&KJcy;","Κ":"&Kappa;","Ķ":"&Kcedil;","К":"&Kcy;","𝔎":"&Kfr;","𝕂":"&Kopf;","𝒦":"&Kscr;","Љ":"&LJcy;","<":"&lt;","Ĺ":"&Lacute;","Λ":"&Lambda;","⟪":"&Lang;","ℒ":"&lagran;","↞":"&twoheadleftarrow;","Ľ":"&Lcaron;","Ļ":"&Lcedil;","Л":"&Lcy;","⟨":"&langle;","←":"&slarr;","⇤":"&larrb;","⇆":"&lrarr;","⌈":"&lceil;","⟦":"&lobrk;","⥡":"&LeftDownTeeVector;","⇃":"&downharpoonleft;","⥙":"&LeftDownVectorBar;","⌊":"&lfloor;","↔":"&leftrightarrow;","⥎":"&LeftRightVector;","⊣":"&dashv;","↤":"&mapstoleft;","⥚":"&LeftTeeVector;","⊲":"&vltri;","⧏":"&LeftTriangleBar;","⊴":"&trianglelefteq;","⥑":"&LeftUpDownVector;","⥠":"&LeftUpTeeVector;","↿":"&upharpoonleft;","⥘":"&LeftUpVectorBar;","↼":"&lharu;","⥒":"&LeftVectorBar;","⋚":"&lesseqgtr;","≦":"&leqq;","≶":"&lg;","⪡":"&LessLess;","⩽":"&les;","≲":"&lsim;","𝔏":"&Lfr;","⋘":"&Ll;","⇚":"&lAarr;","Ŀ":"&Lmidot;","⟵":"&xlarr;","⟷":"&xharr;","⟶":"&xrarr;","𝕃":"&Lopf;","↙":"&swarrow;","↘":"&searrow;","↰":"&lsh;","Ł":"&Lstrok;","≪":"&ll;","⤅":"&Map;","М":"&Mcy;"," ":"&MediumSpace;","ℳ":"&phmmat;","𝔐":"&Mfr;","∓":"&mp;","𝕄":"&Mopf;","Μ":"&Mu;","Њ":"&NJcy;","Ń":"&Nacute;","Ň":"&Ncaron;","Ņ":"&Ncedil;","Н":"&Ncy;","​":"&ZeroWidthSpace;","\n":"&NewLine;","𝔑":"&Nfr;","⁠":"&NoBreak;"," ":"&nbsp;","ℕ":"&naturals;","⫬":"&Not;","≢":"&nequiv;","≭":"&NotCupCap;","∦":"&nspar;","∉":"&notinva;","≠":"&ne;","≂̸":"&nesim;","∄":"&nexists;","≯":"&ngtr;","≱":"&ngeq;","≧̸":"&ngeqq;","≫̸":"&nGtv;","≹":"&ntgl;","⩾̸":"&nges;","≵":"&ngsim;","≎̸":"&nbump;","≏̸":"&nbumpe;","⋪":"&ntriangleleft;","⧏̸":"&NotLeftTriangleBar;","⋬":"&ntrianglelefteq;","≮":"&nlt;","≰":"&nleq;","≸":"&ntlg;","≪̸":"&nLtv;","⩽̸":"&nles;","≴":"&nlsim;","⪢̸":"&NotNestedGreaterGreater;","⪡̸":"&NotNestedLessLess;","⊀":"&nprec;","⪯̸":"&npreceq;","⋠":"&nprcue;","∌":"&notniva;","⋫":"&ntriangleright;","⧐̸":"&NotRightTriangleBar;","⋭":"&ntrianglerighteq;","⊏̸":"&NotSquareSubset;","⋢":"&nsqsube;","⊐̸":"&NotSquareSuperset;","⋣":"&nsqsupe;","⊂⃒":"&vnsub;","⊈":"&nsubseteq;","⊁":"&nsucc;","⪰̸":"&nsucceq;","⋡":"&nsccue;","≿̸":"&NotSucceedsTilde;","⊃⃒":"&vnsup;","⊉":"&nsupseteq;","≁":"&nsim;","≄":"&nsimeq;","≇":"&ncong;","≉":"&napprox;","∤":"&nsmid;","𝒩":"&Nscr;","Ñ":"&Ntilde;","Ν":"&Nu;","Œ":"&OElig;","Ó":"&Oacute;","Ô":"&Ocirc;","О":"&Ocy;","Ő":"&Odblac;","𝔒":"&Ofr;","Ò":"&Ograve;","Ō":"&Omacr;","Ω":"&ohm;","Ο":"&Omicron;","𝕆":"&Oopf;","“":"&ldquo;","‘":"&lsquo;","⩔":"&Or;","𝒪":"&Oscr;","Ø":"&Oslash;","Õ":"&Otilde;","⨷":"&Otimes;","Ö":"&Ouml;","‾":"&oline;","⏞":"&OverBrace;","⎴":"&tbrk;","⏜":"&OverParenthesis;","∂":"&part;","П":"&Pcy;","𝔓":"&Pfr;","Φ":"&Phi;","Π":"&Pi;","±":"&pm;","ℙ":"&primes;","⪻":"&Pr;","≺":"&prec;","⪯":"&preceq;","≼":"&preccurlyeq;","≾":"&prsim;","″":"&Prime;","∏":"&prod;","∝":"&vprop;","𝒫":"&Pscr;","Ψ":"&Psi;",'"':"&quot;","𝔔":"&Qfr;","ℚ":"&rationals;","𝒬":"&Qscr;","⤐":"&drbkarow;","®":"&reg;","Ŕ":"&Racute;","⟫":"&Rang;","↠":"&twoheadrightarrow;","⤖":"&Rarrtl;","Ř":"&Rcaron;","Ŗ":"&Rcedil;","Р":"&Rcy;","ℜ":"&realpart;","∋":"&niv;","⇋":"&lrhar;","⥯":"&duhar;","Ρ":"&Rho;","⟩":"&rangle;","→":"&srarr;","⇥":"&rarrb;","⇄":"&rlarr;","⌉":"&rceil;","⟧":"&robrk;","⥝":"&RightDownTeeVector;","⇂":"&downharpoonright;","⥕":"&RightDownVectorBar;","⌋":"&rfloor;","⊢":"&vdash;","↦":"&mapsto;","⥛":"&RightTeeVector;","⊳":"&vrtri;","⧐":"&RightTriangleBar;","⊵":"&trianglerighteq;","⥏":"&RightUpDownVector;","⥜":"&RightUpTeeVector;","↾":"&upharpoonright;","⥔":"&RightUpVectorBar;","⇀":"&rightharpoonup;","⥓":"&RightVectorBar;","ℝ":"&reals;","⥰":"&RoundImplies;","⇛":"&rAarr;","ℛ":"&realine;","↱":"&rsh;","⧴":"&RuleDelayed;","Щ":"&SHCHcy;","Ш":"&SHcy;","Ь":"&SOFTcy;","Ś":"&Sacute;","⪼":"&Sc;","Š":"&Scaron;","Ş":"&Scedil;","Ŝ":"&Scirc;","С":"&Scy;","𝔖":"&Sfr;","↑":"&uparrow;","Σ":"&Sigma;","∘":"&compfn;","𝕊":"&Sopf;","√":"&radic;","□":"&square;","⊓":"&sqcap;","⊏":"&sqsubset;","⊑":"&sqsubseteq;","⊐":"&sqsupset;","⊒":"&sqsupseteq;","⊔":"&sqcup;","𝒮":"&Sscr;","⋆":"&sstarf;","⋐":"&Subset;","⊆":"&subseteq;","≻":"&succ;","⪰":"&succeq;","≽":"&succcurlyeq;","≿":"&succsim;","∑":"&sum;","⋑":"&Supset;","⊃":"&supset;","⊇":"&supseteq;","Þ":"&THORN;","™":"&trade;","Ћ":"&TSHcy;","Ц":"&TScy;","\t":"&Tab;","Τ":"&Tau;","Ť":"&Tcaron;","Ţ":"&Tcedil;","Т":"&Tcy;","𝔗":"&Tfr;","∴":"&therefore;","Θ":"&Theta;","  ":"&ThickSpace;"," ":"&thinsp;","∼":"&thksim;","≃":"&simeq;","≅":"&cong;","≈":"&thkap;","𝕋":"&Topf;","⃛":"&tdot;","𝒯":"&Tscr;","Ŧ":"&Tstrok;","Ú":"&Uacute;","↟":"&Uarr;","⥉":"&Uarrocir;","Ў":"&Ubrcy;","Ŭ":"&Ubreve;","Û":"&Ucirc;","У":"&Ucy;","Ű":"&Udblac;","𝔘":"&Ufr;","Ù":"&Ugrave;","Ū":"&Umacr;",_:"&lowbar;","⏟":"&UnderBrace;","⎵":"&bbrk;","⏝":"&UnderParenthesis;","⋃":"&xcup;","⊎":"&uplus;","Ų":"&Uogon;","𝕌":"&Uopf;","⤒":"&UpArrowBar;","⇅":"&udarr;","↕":"&varr;","⥮":"&udhar;","⊥":"&perp;","↥":"&mapstoup;","↖":"&nwarrow;","↗":"&nearrow;","ϒ":"&upsih;","Υ":"&Upsilon;","Ů":"&Uring;","𝒰":"&Uscr;","Ũ":"&Utilde;","Ü":"&Uuml;","⊫":"&VDash;","⫫":"&Vbar;","В":"&Vcy;","⊩":"&Vdash;","⫦":"&Vdashl;","⋁":"&xvee;","‖":"&Vert;","∣":"&smid;","|":"&vert;","❘":"&VerticalSeparator;","≀":"&wreath;"," ":"&hairsp;","𝔙":"&Vfr;","𝕍":"&Vopf;","𝒱":"&Vscr;","⊪":"&Vvdash;","Ŵ":"&Wcirc;","⋀":"&xwedge;","𝔚":"&Wfr;","𝕎":"&Wopf;","𝒲":"&Wscr;","𝔛":"&Xfr;","Ξ":"&Xi;","𝕏":"&Xopf;","𝒳":"&Xscr;","Я":"&YAcy;","Ї":"&YIcy;","Ю":"&YUcy;","Ý":"&Yacute;","Ŷ":"&Ycirc;","Ы":"&Ycy;","𝔜":"&Yfr;","𝕐":"&Yopf;","𝒴":"&Yscr;","Ÿ":"&Yuml;","Ж":"&ZHcy;","Ź":"&Zacute;","Ž":"&Zcaron;","З":"&Zcy;","Ż":"&Zdot;","Ζ":"&Zeta;","ℨ":"&zeetrf;","ℤ":"&integers;","𝒵":"&Zscr;","á":"&aacute;","ă":"&abreve;","∾":"&mstpos;","∾̳":"&acE;","∿":"&acd;","â":"&acirc;","а":"&acy;","æ":"&aelig;","𝔞":"&afr;","à":"&agrave;","ℵ":"&aleph;","α":"&alpha;","ā":"&amacr;","⨿":"&amalg;","∧":"&wedge;","⩕":"&andand;","⩜":"&andd;","⩘":"&andslope;","⩚":"&andv;","∠":"&angle;","⦤":"&ange;","∡":"&measuredangle;","⦨":"&angmsdaa;","⦩":"&angmsdab;","⦪":"&angmsdac;","⦫":"&angmsdad;","⦬":"&angmsdae;","⦭":"&angmsdaf;","⦮":"&angmsdag;","⦯":"&angmsdah;","∟":"&angrt;","⊾":"&angrtvb;","⦝":"&angrtvbd;","∢":"&angsph;","⍼":"&angzarr;","ą":"&aogon;","𝕒":"&aopf;","⩰":"&apE;","⩯":"&apacir;","≊":"&approxeq;","≋":"&apid;","'":"&apos;","å":"&aring;","𝒶":"&ascr;","*":"&midast;","ã":"&atilde;","ä":"&auml;","⨑":"&awint;","⫭":"&bNot;","≌":"&bcong;","϶":"&bepsi;","‵":"&bprime;","∽":"&bsim;","⋍":"&bsime;","⊽":"&barvee;","⌅":"&barwedge;","⎶":"&bbrktbrk;","б":"&bcy;","„":"&ldquor;","⦰":"&bemptyv;","β":"&beta;","ℶ":"&beth;","≬":"&twixt;","𝔟":"&bfr;","◯":"&xcirc;","⨀":"&xodot;","⨁":"&xoplus;","⨂":"&xotime;","⨆":"&xsqcup;","★":"&starf;","▽":"&xdtri;","△":"&xutri;","⨄":"&xuplus;","⤍":"&rbarr;","⧫":"&lozf;","▴":"&utrif;","▾":"&dtrif;","◂":"&ltrif;","▸":"&rtrif;","␣":"&blank;","▒":"&blk12;","░":"&blk14;","▓":"&blk34;","█":"&block;","=⃥":"&bne;","≡⃥":"&bnequiv;","⌐":"&bnot;","𝕓":"&bopf;","⋈":"&bowtie;","╗":"&boxDL;","╔":"&boxDR;","╖":"&boxDl;","╓":"&boxDr;","═":"&boxH;","╦":"&boxHD;","╩":"&boxHU;","╤":"&boxHd;","╧":"&boxHu;","╝":"&boxUL;","╚":"&boxUR;","╜":"&boxUl;","╙":"&boxUr;","║":"&boxV;","╬":"&boxVH;","╣":"&boxVL;","╠":"&boxVR;","╫":"&boxVh;","╢":"&boxVl;","╟":"&boxVr;","⧉":"&boxbox;","╕":"&boxdL;","╒":"&boxdR;","┐":"&boxdl;","┌":"&boxdr;","╥":"&boxhD;","╨":"&boxhU;","┬":"&boxhd;","┴":"&boxhu;","⊟":"&minusb;","⊞":"&plusb;","⊠":"&timesb;","╛":"&boxuL;","╘":"&boxuR;","┘":"&boxul;","└":"&boxur;","│":"&boxv;","╪":"&boxvH;","╡":"&boxvL;","╞":"&boxvR;","┼":"&boxvh;","┤":"&boxvl;","├":"&boxvr;","¦":"&brvbar;","𝒷":"&bscr;","⁏":"&bsemi;","\\":"&bsol;","⧅":"&bsolb;","⟈":"&bsolhsub;","•":"&bullet;","⪮":"&bumpE;","ć":"&cacute;","∩":"&cap;","⩄":"&capand;","⩉":"&capbrcup;","⩋":"&capcap;","⩇":"&capcup;","⩀":"&capdot;","∩︀":"&caps;","⁁":"&caret;","⩍":"&ccaps;","č":"&ccaron;","ç":"&ccedil;","ĉ":"&ccirc;","⩌":"&ccups;","⩐":"&ccupssm;","ċ":"&cdot;","⦲":"&cemptyv;","¢":"&cent;","𝔠":"&cfr;","ч":"&chcy;","✓":"&checkmark;","χ":"&chi;","○":"&cir;","⧃":"&cirE;","ˆ":"&circ;","≗":"&cire;","↺":"&olarr;","↻":"&orarr;","Ⓢ":"&oS;","⊛":"&oast;","⊚":"&ocir;","⊝":"&odash;","⨐":"&cirfnint;","⫯":"&cirmid;","⧂":"&cirscir;","♣":"&clubsuit;",":":"&colon;",",":"&comma;","@":"&commat;","∁":"&complement;","⩭":"&congdot;","𝕔":"&copf;","℗":"&copysr;","↵":"&crarr;","✗":"&cross;","𝒸":"&cscr;","⫏":"&csub;","⫑":"&csube;","⫐":"&csup;","⫒":"&csupe;","⋯":"&ctdot;","⤸":"&cudarrl;","⤵":"&cudarrr;","⋞":"&curlyeqprec;","⋟":"&curlyeqsucc;","↶":"&curvearrowleft;","⤽":"&cularrp;","∪":"&cup;","⩈":"&cupbrcap;","⩆":"&cupcap;","⩊":"&cupcup;","⊍":"&cupdot;","⩅":"&cupor;","∪︀":"&cups;","↷":"&curvearrowright;","⤼":"&curarrm;","⋎":"&cuvee;","⋏":"&cuwed;","¤":"&curren;","∱":"&cwint;","⌭":"&cylcty;","⥥":"&dHar;","†":"&dagger;","ℸ":"&daleth;","‐":"&hyphen;","⤏":"&rBarr;","ď":"&dcaron;","д":"&dcy;","⇊":"&downdownarrows;","⩷":"&eDDot;","°":"&deg;","δ":"&delta;","⦱":"&demptyv;","⥿":"&dfisht;","𝔡":"&dfr;","♦":"&diams;","ϝ":"&gammad;","⋲":"&disin;","÷":"&divide;","⋇":"&divonx;","ђ":"&djcy;","⌞":"&llcorner;","⌍":"&dlcrop;",$:"&dollar;","𝕕":"&dopf;","≑":"&eDot;","∸":"&minusd;","∔":"&plusdo;","⊡":"&sdotb;","⌟":"&lrcorner;","⌌":"&drcrop;","𝒹":"&dscr;","ѕ":"&dscy;","⧶":"&dsol;","đ":"&dstrok;","⋱":"&dtdot;","▿":"&triangledown;","⦦":"&dwangle;","џ":"&dzcy;","⟿":"&dzigrarr;","é":"&eacute;","⩮":"&easter;","ě":"&ecaron;","≖":"&eqcirc;","ê":"&ecirc;","≕":"&eqcolon;","э":"&ecy;","ė":"&edot;","≒":"&fallingdotseq;","𝔢":"&efr;","⪚":"&eg;","è":"&egrave;","⪖":"&eqslantgtr;","⪘":"&egsdot;","⪙":"&el;","⏧":"&elinters;","ℓ":"&ell;","⪕":"&eqslantless;","⪗":"&elsdot;","ē":"&emacr;","∅":"&varnothing;"," ":"&emsp13;"," ":"&emsp14;"," ":"&emsp;","ŋ":"&eng;"," ":"&ensp;","ę":"&eogon;","𝕖":"&eopf;","⋕":"&epar;","⧣":"&eparsl;","⩱":"&eplus;","ε":"&epsilon;","ϵ":"&varepsilon;","=":"&equals;","≟":"&questeq;","⩸":"&equivDD;","⧥":"&eqvparsl;","≓":"&risingdotseq;","⥱":"&erarr;","ℯ":"&escr;","η":"&eta;","ð":"&eth;","ë":"&euml;","€":"&euro;","!":"&excl;","ф":"&fcy;","♀":"&female;","ﬃ":"&ffilig;","ﬀ":"&fflig;","ﬄ":"&ffllig;","𝔣":"&ffr;","ﬁ":"&filig;",fj:"&fjlig;","♭":"&flat;","ﬂ":"&fllig;","▱":"&fltns;","ƒ":"&fnof;","𝕗":"&fopf;","⋔":"&pitchfork;","⫙":"&forkv;","⨍":"&fpartint;","½":"&half;","⅓":"&frac13;","¼":"&frac14;","⅕":"&frac15;","⅙":"&frac16;","⅛":"&frac18;","⅔":"&frac23;","⅖":"&frac25;","¾":"&frac34;","⅗":"&frac35;","⅜":"&frac38;","⅘":"&frac45;","⅚":"&frac56;","⅝":"&frac58;","⅞":"&frac78;","⁄":"&frasl;","⌢":"&sfrown;","𝒻":"&fscr;","⪌":"&gtreqqless;","ǵ":"&gacute;","γ":"&gamma;","⪆":"&gtrapprox;","ğ":"&gbreve;","ĝ":"&gcirc;","г":"&gcy;","ġ":"&gdot;","⪩":"&gescc;","⪀":"&gesdot;","⪂":"&gesdoto;","⪄":"&gesdotol;","⋛︀":"&gesl;","⪔":"&gesles;","𝔤":"&gfr;","ℷ":"&gimel;","ѓ":"&gjcy;","⪒":"&glE;","⪥":"&gla;","⪤":"&glj;","≩":"&gneqq;","⪊":"&gnapprox;","⪈":"&gneq;","⋧":"&gnsim;","𝕘":"&gopf;","ℊ":"&gscr;","⪎":"&gsime;","⪐":"&gsiml;","⪧":"&gtcc;","⩺":"&gtcir;","⋗":"&gtrdot;","⦕":"&gtlPar;","⩼":"&gtquest;","⥸":"&gtrarr;","≩︀":"&gvnE;","ъ":"&hardcy;","⥈":"&harrcir;","↭":"&leftrightsquigarrow;","ℏ":"&plankv;","ĥ":"&hcirc;","♥":"&heartsuit;","…":"&mldr;","⊹":"&hercon;","𝔥":"&hfr;","⤥":"&searhk;","⤦":"&swarhk;","⇿":"&hoarr;","∻":"&homtht;","↩":"&larrhk;","↪":"&rarrhk;","𝕙":"&hopf;","―":"&horbar;","𝒽":"&hscr;","ħ":"&hstrok;","⁃":"&hybull;","í":"&iacute;","î":"&icirc;","и":"&icy;","е":"&iecy;","¡":"&iexcl;","𝔦":"&ifr;","ì":"&igrave;","⨌":"&qint;","∭":"&tint;","⧜":"&iinfin;","℩":"&iiota;","ĳ":"&ijlig;","ī":"&imacr;","ı":"&inodot;","⊷":"&imof;","Ƶ":"&imped;","℅":"&incare;","∞":"&infin;","⧝":"&infintie;","⊺":"&intercal;","⨗":"&intlarhk;","⨼":"&iprod;","ё":"&iocy;","į":"&iogon;","𝕚":"&iopf;","ι":"&iota;","¿":"&iquest;","𝒾":"&iscr;","⋹":"&isinE;","⋵":"&isindot;","⋴":"&isins;","⋳":"&isinsv;","ĩ":"&itilde;","і":"&iukcy;","ï":"&iuml;","ĵ":"&jcirc;","й":"&jcy;","𝔧":"&jfr;","ȷ":"&jmath;","𝕛":"&jopf;","𝒿":"&jscr;","ј":"&jsercy;","є":"&jukcy;","κ":"&kappa;","ϰ":"&varkappa;","ķ":"&kcedil;","к":"&kcy;","𝔨":"&kfr;","ĸ":"&kgreen;","х":"&khcy;","ќ":"&kjcy;","𝕜":"&kopf;","𝓀":"&kscr;","⤛":"&lAtail;","⤎":"&lBarr;","⪋":"&lesseqqgtr;","⥢":"&lHar;","ĺ":"&lacute;","⦴":"&laemptyv;","λ":"&lambda;","⦑":"&langd;","⪅":"&lessapprox;","«":"&laquo;","⤟":"&larrbfs;","⤝":"&larrfs;","↫":"&looparrowleft;","⤹":"&larrpl;","⥳":"&larrsim;","↢":"&leftarrowtail;","⪫":"&lat;","⤙":"&latail;","⪭":"&late;","⪭︀":"&lates;","⤌":"&lbarr;","❲":"&lbbrk;","{":"&lcub;","[":"&lsqb;","⦋":"&lbrke;","⦏":"&lbrksld;","⦍":"&lbrkslu;","ľ":"&lcaron;","ļ":"&lcedil;","л":"&lcy;","⤶":"&ldca;","⥧":"&ldrdhar;","⥋":"&ldrushar;","↲":"&ldsh;","≤":"&leq;","⇇":"&llarr;","⋋":"&lthree;","⪨":"&lescc;","⩿":"&lesdot;","⪁":"&lesdoto;","⪃":"&lesdotor;","⋚︀":"&lesg;","⪓":"&lesges;","⋖":"&ltdot;","⥼":"&lfisht;","𝔩":"&lfr;","⪑":"&lgE;","⥪":"&lharul;","▄":"&lhblk;","љ":"&ljcy;","⥫":"&llhard;","◺":"&lltri;","ŀ":"&lmidot;","⎰":"&lmoustache;","≨":"&lneqq;","⪉":"&lnapprox;","⪇":"&lneq;","⋦":"&lnsim;","⟬":"&loang;","⇽":"&loarr;","⟼":"&xmap;","↬":"&rarrlp;","⦅":"&lopar;","𝕝":"&lopf;","⨭":"&loplus;","⨴":"&lotimes;","∗":"&lowast;","◊":"&lozenge;","(":"&lpar;","⦓":"&lparlt;","⥭":"&lrhard;","‎":"&lrm;","⊿":"&lrtri;","‹":"&lsaquo;","𝓁":"&lscr;","⪍":"&lsime;","⪏":"&lsimg;","‚":"&sbquo;","ł":"&lstrok;","⪦":"&ltcc;","⩹":"&ltcir;","⋉":"&ltimes;","⥶":"&ltlarr;","⩻":"&ltquest;","⦖":"&ltrPar;","◃":"&triangleleft;","⥊":"&lurdshar;","⥦":"&luruhar;","≨︀":"&lvnE;","∺":"&mDDot;","¯":"&strns;","♂":"&male;","✠":"&maltese;","▮":"&marker;","⨩":"&mcomma;","м":"&mcy;","—":"&mdash;","𝔪":"&mfr;","℧":"&mho;","µ":"&micro;","⫰":"&midcir;","−":"&minus;","⨪":"&minusdu;","⫛":"&mlcp;","⊧":"&models;","𝕞":"&mopf;","𝓂":"&mscr;","μ":"&mu;","⊸":"&mumap;","⋙̸":"&nGg;","≫⃒":"&nGt;","⇍":"&nlArr;","⇎":"&nhArr;","⋘̸":"&nLl;","≪⃒":"&nLt;","⇏":"&nrArr;","⊯":"&nVDash;","⊮":"&nVdash;","ń":"&nacute;","∠⃒":"&nang;","⩰̸":"&napE;","≋̸":"&napid;","ŉ":"&napos;","♮":"&natural;","⩃":"&ncap;","ň":"&ncaron;","ņ":"&ncedil;","⩭̸":"&ncongdot;","⩂":"&ncup;","н":"&ncy;","–":"&ndash;","⇗":"&neArr;","⤤":"&nearhk;","≐̸":"&nedot;","⤨":"&toea;","𝔫":"&nfr;","↮":"&nleftrightarrow;","⫲":"&nhpar;","⋼":"&nis;","⋺":"&nisd;","њ":"&njcy;","≦̸":"&nleqq;","↚":"&nleftarrow;","‥":"&nldr;","𝕟":"&nopf;","¬":"&not;","⋹̸":"&notinE;","⋵̸":"&notindot;","⋷":"&notinvb;","⋶":"&notinvc;","⋾":"&notnivb;","⋽":"&notnivc;","⫽⃥":"&nparsl;","∂̸":"&npart;","⨔":"&npolint;","↛":"&nrightarrow;","⤳̸":"&nrarrc;","↝̸":"&nrarrw;","𝓃":"&nscr;","⊄":"&nsub;","⫅̸":"&nsubseteqq;","⊅":"&nsup;","⫆̸":"&nsupseteqq;","ñ":"&ntilde;","ν":"&nu;","#":"&num;","№":"&numero;"," ":"&numsp;","⊭":"&nvDash;","⤄":"&nvHarr;","≍⃒":"&nvap;","⊬":"&nvdash;","≥⃒":"&nvge;",">⃒":"&nvgt;","⧞":"&nvinfin;","⤂":"&nvlArr;","≤⃒":"&nvle;","<⃒":"&nvlt;","⊴⃒":"&nvltrie;","⤃":"&nvrArr;","⊵⃒":"&nvrtrie;","∼⃒":"&nvsim;","⇖":"&nwArr;","⤣":"&nwarhk;","⤧":"&nwnear;","ó":"&oacute;","ô":"&ocirc;","о":"&ocy;","ő":"&odblac;","⨸":"&odiv;","⦼":"&odsold;","œ":"&oelig;","⦿":"&ofcir;","𝔬":"&ofr;","˛":"&ogon;","ò":"&ograve;","⧁":"&ogt;","⦵":"&ohbar;","⦾":"&olcir;","⦻":"&olcross;","⧀":"&olt;","ō":"&omacr;","ω":"&omega;","ο":"&omicron;","⦶":"&omid;","𝕠":"&oopf;","⦷":"&opar;","⦹":"&operp;","∨":"&vee;","⩝":"&ord;","ℴ":"&oscr;","ª":"&ordf;","º":"&ordm;","⊶":"&origof;","⩖":"&oror;","⩗":"&orslope;","⩛":"&orv;","ø":"&oslash;","⊘":"&osol;","õ":"&otilde;","⨶":"&otimesas;","ö":"&ouml;","⌽":"&ovbar;","¶":"&para;","⫳":"&parsim;","⫽":"&parsl;","п":"&pcy;","%":"&percnt;",".":"&period;","‰":"&permil;","‱":"&pertenk;","𝔭":"&pfr;","φ":"&phi;","ϕ":"&varphi;","☎":"&phone;","π":"&pi;","ϖ":"&varpi;","ℎ":"&planckh;","+":"&plus;","⨣":"&plusacir;","⨢":"&pluscir;","⨥":"&plusdu;","⩲":"&pluse;","⨦":"&plussim;","⨧":"&plustwo;","⨕":"&pointint;","𝕡":"&popf;","£":"&pound;","⪳":"&prE;","⪷":"&precapprox;","⪹":"&prnap;","⪵":"&prnE;","⋨":"&prnsim;","′":"&prime;","⌮":"&profalar;","⌒":"&profline;","⌓":"&profsurf;","⊰":"&prurel;","𝓅":"&pscr;","ψ":"&psi;"," ":"&puncsp;","𝔮":"&qfr;","𝕢":"&qopf;","⁗":"&qprime;","𝓆":"&qscr;","⨖":"&quatint;","?":"&quest;","⤜":"&rAtail;","⥤":"&rHar;","∽̱":"&race;","ŕ":"&racute;","⦳":"&raemptyv;","⦒":"&rangd;","⦥":"&range;","»":"&raquo;","⥵":"&rarrap;","⤠":"&rarrbfs;","⤳":"&rarrc;","⤞":"&rarrfs;","⥅":"&rarrpl;","⥴":"&rarrsim;","↣":"&rightarrowtail;","↝":"&rightsquigarrow;","⤚":"&ratail;","∶":"&ratio;","❳":"&rbbrk;","}":"&rcub;","]":"&rsqb;","⦌":"&rbrke;","⦎":"&rbrksld;","⦐":"&rbrkslu;","ř":"&rcaron;","ŗ":"&rcedil;","р":"&rcy;","⤷":"&rdca;","⥩":"&rdldhar;","↳":"&rdsh;","▭":"&rect;","⥽":"&rfisht;","𝔯":"&rfr;","⥬":"&rharul;","ρ":"&rho;","ϱ":"&varrho;","⇉":"&rrarr;","⋌":"&rthree;","˚":"&ring;","‏":"&rlm;","⎱":"&rmoustache;","⫮":"&rnmid;","⟭":"&roang;","⇾":"&roarr;","⦆":"&ropar;","𝕣":"&ropf;","⨮":"&roplus;","⨵":"&rotimes;",")":"&rpar;","⦔":"&rpargt;","⨒":"&rppolint;","›":"&rsaquo;","𝓇":"&rscr;","⋊":"&rtimes;","▹":"&triangleright;","⧎":"&rtriltri;","⥨":"&ruluhar;","℞":"&rx;","ś":"&sacute;","⪴":"&scE;","⪸":"&succapprox;","š":"&scaron;","ş":"&scedil;","ŝ":"&scirc;","⪶":"&succneqq;","⪺":"&succnapprox;","⋩":"&succnsim;","⨓":"&scpolint;","с":"&scy;","⋅":"&sdot;","⩦":"&sdote;","⇘":"&seArr;","§":"&sect;",";":"&semi;","⤩":"&tosa;","✶":"&sext;","𝔰":"&sfr;","♯":"&sharp;","щ":"&shchcy;","ш":"&shcy;","­":"&shy;","σ":"&sigma;","ς":"&varsigma;","⩪":"&simdot;","⪞":"&simg;","⪠":"&simgE;","⪝":"&siml;","⪟":"&simlE;","≆":"&simne;","⨤":"&simplus;","⥲":"&simrarr;","⨳":"&smashp;","⧤":"&smeparsl;","⌣":"&ssmile;","⪪":"&smt;","⪬":"&smte;","⪬︀":"&smtes;","ь":"&softcy;","/":"&sol;","⧄":"&solb;","⌿":"&solbar;","𝕤":"&sopf;","♠":"&spadesuit;","⊓︀":"&sqcaps;","⊔︀":"&sqcups;","𝓈":"&sscr;","☆":"&star;","⊂":"&subset;","⫅":"&subseteqq;","⪽":"&subdot;","⫃":"&subedot;","⫁":"&submult;","⫋":"&subsetneqq;","⊊":"&subsetneq;","⪿":"&subplus;","⥹":"&subrarr;","⫇":"&subsim;","⫕":"&subsub;","⫓":"&subsup;","♪":"&sung;","¹":"&sup1;","²":"&sup2;","³":"&sup3;","⫆":"&supseteqq;","⪾":"&supdot;","⫘":"&supdsub;","⫄":"&supedot;","⟉":"&suphsol;","⫗":"&suphsub;","⥻":"&suplarr;","⫂":"&supmult;","⫌":"&supsetneqq;","⊋":"&supsetneq;","⫀":"&supplus;","⫈":"&supsim;","⫔":"&supsub;","⫖":"&supsup;","⇙":"&swArr;","⤪":"&swnwar;","ß":"&szlig;","⌖":"&target;","τ":"&tau;","ť":"&tcaron;","ţ":"&tcedil;","т":"&tcy;","⌕":"&telrec;","𝔱":"&tfr;","θ":"&theta;","ϑ":"&vartheta;","þ":"&thorn;","×":"&times;","⨱":"&timesbar;","⨰":"&timesd;","⌶":"&topbot;","⫱":"&topcir;","𝕥":"&topf;","⫚":"&topfork;","‴":"&tprime;","▵":"&utri;","≜":"&trie;","◬":"&tridot;","⨺":"&triminus;","⨹":"&triplus;","⧍":"&trisb;","⨻":"&tritime;","⏢":"&trpezium;","𝓉":"&tscr;","ц":"&tscy;","ћ":"&tshcy;","ŧ":"&tstrok;","⥣":"&uHar;","ú":"&uacute;","ў":"&ubrcy;","ŭ":"&ubreve;","û":"&ucirc;","у":"&ucy;","ű":"&udblac;","⥾":"&ufisht;","𝔲":"&ufr;","ù":"&ugrave;","▀":"&uhblk;","⌜":"&ulcorner;","⌏":"&ulcrop;","◸":"&ultri;","ū":"&umacr;","ų":"&uogon;","𝕦":"&uopf;","υ":"&upsilon;","⇈":"&uuarr;","⌝":"&urcorner;","⌎":"&urcrop;","ů":"&uring;","◹":"&urtri;","𝓊":"&uscr;","⋰":"&utdot;","ũ":"&utilde;","ü":"&uuml;","⦧":"&uwangle;","⫨":"&vBar;","⫩":"&vBarv;","⦜":"&vangrt;","⊊︀":"&vsubne;","⫋︀":"&vsubnE;","⊋︀":"&vsupne;","⫌︀":"&vsupnE;","в":"&vcy;","⊻":"&veebar;","≚":"&veeeq;","⋮":"&vellip;","𝔳":"&vfr;","𝕧":"&vopf;","𝓋":"&vscr;","⦚":"&vzigzag;","ŵ":"&wcirc;","⩟":"&wedbar;","≙":"&wedgeq;","℘":"&wp;","𝔴":"&wfr;","𝕨":"&wopf;","𝓌":"&wscr;","𝔵":"&xfr;","ξ":"&xi;","⋻":"&xnis;","𝕩":"&xopf;","𝓍":"&xscr;","ý":"&yacute;","я":"&yacy;","ŷ":"&ycirc;","ы":"&ycy;","¥":"&yen;","𝔶":"&yfr;","ї":"&yicy;","𝕪":"&yopf;","𝓎":"&yscr;","ю":"&yucy;","ÿ":"&yuml;","ź":"&zacute;","ž":"&zcaron;","з":"&zcy;","ż":"&zdot;","ζ":"&zeta;","𝔷":"&zfr;","ж":"&zhcy;","⇝":"&zigrarr;","𝕫":"&zopf;","𝓏":"&zscr;","‍":"&zwj;","‌":"&zwnj;"}}};

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;

/***/ }),

/***/ "./node_modules/string-replace-loader/index.js??ruleSet[1].rules[1].use[1]!./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scss/common/index.scss":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/string-replace-loader/index.js??ruleSet[1].rules[1].use[1]!./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scss/common/index.scss ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n* {\n  padding: 0px;\n  margin: 0px;\n  border: 0px;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: border-box;\n}\n\nhtml {\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n}\n\nbody {\n  flex: 1 1 auto;\n  display: flex;\n  flex-direction: column;\n  min-width: 280px;\n  color: #212121;\n  line-height: 1;\n  font-family: \"Montserrat\";\n  font-size: inherit;\n  -ms-text-size-adjust: 100%;\n  -moz-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\ninput,\nbutton,\ntextarea {\n  font-family: \"Montserrat\";\n  font-size: inherit;\n}\n\nbutton {\n  cursor: pointer;\n  color: inherit;\n  background-color: inherit;\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\nul li {\n  list-style: none;\n}\n\nimg {\n  vertical-align: top;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-weight: inherit;\n  font-size: inherit;\n}\n\n:root {\n  --main-white-color: #EFEFEF;\n  --white-color: white;\n  --black-color: #28282C;\n  --deep-black-color: #1E1E1E;\n  --sand-color: #FBD691;\n}\n\n@font-face {\n  font-family: \"Thunder\";\n  src: local(\"☺\"), url(\"../fonts/Thunder-BoldLC.woff\") format(\"woff\"), url(\"../fonts/Thunder-BoldLC.woff2\") format(\"woff2\");\n  font-weight: 700;\n  font-style: normal;\n  font-display: swap;\n}\n@font-face {\n  font-family: \"Thunder\";\n  src: local(\"☺\"), url(\"../fonts/Thunder-BoldLCItalic.woff\") format(\"woff\"), url(\"../fonts/Thunder-BoldLCItalic.woff2\") format(\"woff2\");\n  font-weight: 700;\n  font-style: italic;\n  font-display: swap;\n}\n@font-face {\n  font-family: \"Thunder\";\n  src: local(\"☺\"), url(\"../fonts/Thunder-SemiBoldLCItalic.woff\") format(\"woff\"), url(\"../fonts/Thunder-SemiBoldLCItalic.woff2\") format(\"woff2\");\n  font-weight: 600;\n  font-style: italic;\n  font-display: swap;\n}\n@font-face {\n  font-family: \"Thunder-Extra\";\n  src: local(\"☺\"), url(\"../fonts/Thunder-ExtraBoldLC.woff\") format(\"woff\"), url(\"../fonts/Thunder-ExtraBoldLC.woff2\") format(\"woff2\");\n  font-weight: 700;\n  font-style: normal;\n  font-display: swap;\n}\n:root {\n  --container-save-space: 15px;\n}\n@media (max-width: 520px) {\n  :root {\n    --container-save-space: 10px;\n  }\n}\n\n.section-container {\n  max-width: calc(1360px + var(--container-save-space) * 2);\n  padding: 0 var(--container-save-space);\n  margin: auto;\n}\n\nbody {\n  overflow-x: hidden;\n}\n\n.page__main {\n  flex: 1 1 auto;\n  display: flex;\n  flex-direction: column;\n}\n\n@font-face {\n  font-family: \"Thunder\";\n  src: local(\"☺\"), url(\"../fonts/Thunder-BoldLC.woff\") format(\"woff\"), url(\"../fonts/Thunder-BoldLC.woff2\") format(\"woff2\");\n  font-weight: 700;\n  font-style: normal;\n  font-display: swap;\n}\n@font-face {\n  font-family: \"Thunder\";\n  src: local(\"☺\"), url(\"../fonts/Thunder-BoldLCItalic.woff\") format(\"woff\"), url(\"../fonts/Thunder-BoldLCItalic.woff2\") format(\"woff2\");\n  font-weight: 700;\n  font-style: italic;\n  font-display: swap;\n}\n@font-face {\n  font-family: \"Thunder\";\n  src: local(\"☺\"), url(\"../fonts/Thunder-SemiBoldLCItalic.woff\") format(\"woff\"), url(\"../fonts/Thunder-SemiBoldLCItalic.woff2\") format(\"woff2\");\n  font-weight: 600;\n  font-style: italic;\n  font-display: swap;\n}\n@font-face {\n  font-family: \"Thunder-Extra\";\n  src: local(\"☺\"), url(\"../fonts/Thunder-ExtraBoldLC.woff\") format(\"woff\"), url(\"../fonts/Thunder-ExtraBoldLC.woff2\") format(\"woff2\");\n  font-weight: 700;\n  font-style: normal;\n  font-display: swap;\n}\n[data-scrollable] {\n  overflow: auto;\n}\n\n.underline-in, .underline-out {\n  position: relative;\n}\n.underline-in:after, .underline-out:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  bottom: -0.2em;\n  height: 1px;\n  background: var(--color);\n  opacity: 0.7;\n  transition: background-color 0.4s, left 0.4s, width 0.4s;\n}\n.underline-in:hover:after, .underline-in.active:after, .underline-out:hover:after, .underline-out.active:after {\n  background: var(--hover-color);\n}\n\n.underline-in:after {\n  width: 0;\n  left: 50%;\n}\n.underline-in:hover:after, .underline-in.active:after {\n  width: 100%;\n  left: 0;\n}\n\n.underline-out:after {\n  width: 100%;\n  left: 0;\n}\n.underline-out:hover:after, .underline-out.active:after {\n  width: 0;\n  left: 50%;\n}\n\n[data-portal-src][data-portal-active] {\n  display: none;\n}\n\n[data-portal-dest]:not([data-portal-active]) {\n  display: none;\n}\n\n.text-link {\n  color: var(--color, white);\n  font-size: var(--font-size, 18px);\n  transition: color 0.4s;\n}\n.text-link_underline {\n  text-decoration: underline;\n}\n.text-link:hover, .text-link.active {\n  color: var(--hover-color, #9DF850);\n}\n\n.backgroung-img {\n  position: absolute;\n  left: 0;\n  top: 0;\n  height: 100%;\n  width: 100%;\n  z-index: -1;\n}\n.backgroung-img > img {\n  height: 100%;\n  width: 100%;\n  object-fit: cover;\n  object-position: center bottom;\n}\n.backgroung-img_center > img {\n  object-position: center;\n}\n\n.img-wrap {\n  display: block;\n  position: relative;\n  left: 0;\n  top: 0;\n  z-index: 0;\n}\n.img-wrap_zoom-on-hover, .img-wrap_zoom-on-parent-hover {\n  overflow: hidden;\n  cursor: pointer;\n}\n.img-wrap_zoom-on-hover > img, .img-wrap_zoom-on-parent-hover > img {\n  transition: top 0.3s, left 0.3s, width 0.3s, height 0.3s;\n}\n.img-wrap_overlay-on-hover::after, .img-wrap_overlay-on-parent-hover::after {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  transition: background-color 0.3s;\n}\n.img-wrap_bg {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  z-index: -1;\n}\n.img-wrap > img {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: center;\n}\n.img-wrap_contain > img {\n  object-fit: contain;\n}\n.img-wrap_zoom-on-hover:hover > img, *:hover > .img-wrap_zoom-on-parent-hover > img {\n  top: -5%;\n  left: -5%;\n  width: 110%;\n  height: 110%;\n}\n.img-wrap_contain > img {\n  object-fit: contain;\n}\n\n.logo {\n  font-size: 22px;\n}\n.logo > figure {\n  display: flex;\n}\n.logo__img {\n  width: 3.18em;\n  height: 2.27em;\n  margin-right: 0.4em;\n  object-fit: contain;\n}\n.logo__cap {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  align-items: flex-end;\n  font-family: Raleway;\n  color: #FFF;\n  text-transform: uppercase;\n  transition: color 0.4s;\n}\n.logo__cap > *:first-child {\n  font-size: 1em;\n}\n.logo__cap > *:first-child > strong {\n  font-size: 1em;\n  font-weight: 800;\n}\n.logo__cap > *:last-child {\n  font-size: 0.64em;\n}\n.logo:hover .logo__cap {\n  color: #9DF850;\n}\n\n.lang-switch {\n  --color: white;\n  --hover-color: #9DF850;\n  font-size: var(--font-size);\n  font-weight: 400;\n  color: var(--color);\n}\n.lang-switch ul {\n  display: flex;\n}\n.lang-switch ul > li:not(:last-child)::after {\n  content: \"/\";\n  margin: 0.3em;\n}\n\n.social-media > ul {\n  display: flex;\n  justify-content: center;\n  margin-left: -20px;\n  margin-top: -18px;\n  pointer-events: none;\n}\n.social-media > ul > * {\n  display: flex;\n  align-items: center;\n  margin-left: 20px;\n  margin-top: 18px;\n  pointer-events: all;\n}\n\n.social-media-link {\n  flex: 0 0 auto;\n  display: inline-block;\n  width: 24px;\n  height: 24px;\n  fill: #FFFFFF;\n  font-size: 0;\n}\n.social-media-link > .svg-icon {\n  width: 100%;\n  height: 100%;\n  transition: fill 0.4s;\n}\n.social-media-link:hover > .svg-icon {\n  fill: #9DF850;\n}\n\n.swipe-area-pointer {\n  display: inline-block;\n}\n.swipe-area-pointer__icon {\n  position: relative;\n  left: 0;\n  top: 0;\n  width: 32px;\n  height: 32px;\n  fill: #2A004E;\n  stroke: #2A004E;\n  z-index: 0;\n  animation: swipe-area-pointer 1.2s linear infinite;\n}\n\n@keyframes swipe-area-pointer {\n  0% {\n    left: 0;\n  }\n  40% {\n    left: -20px;\n  }\n  100% {\n    left: 0;\n  }\n}\n.btn {\n  display: inline-flex;\n  position: relative;\n  left: 0;\n  top: 0;\n  font-family: Thunder;\n  font-size: 28px;\n  line-height: 0.8;\n  font-weight: 700;\n  letter-spacing: 0.2px;\n  border-radius: 50px;\n}\n.btn .svg-icon {\n  flex: 0 0 auto;\n  width: 24px;\n  transition: fill 0.4s, stroke 0.4s;\n}\n.btn .svg-icon:first-child {\n  margin-right: 10px;\n}\n.btn_bright {\n  color: black;\n  background-color: #FAFF00;\n  transition: box-shadow 0.4s;\n}\n.btn_bright .svg-icon {\n  stroke: #1F1F1F;\n  width: 32px;\n}\n.btn_bright:hover {\n  box-shadow: 0px 0px 40px 0px rgba(117, 255, 0, 0.6);\n}\n.btn_dark {\n  position: relative;\n  left: 0;\n  top: 0;\n  z-index: 0;\n  color: white;\n  background-color: #161616;\n  transition: box-shadow 0.4s;\n}\n.btn_dark::after {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 0;\n  width: 100%;\n  height: 100%;\n  background-color: transparent;\n  transition: background-color 0.4s 0.3s;\n}\n.btn_dark .svg-icon {\n  fill: #9DF850;\n  stroke: #9DF850;\n}\n.btn_dark:hover {\n  color: white;\n  box-shadow: 0px 0px 30px 0px rgba(117, 255, 0, 0.5);\n}\n.btn_dark:hover::after {\n  background-color: rgba(157, 248, 80, 0.0784313725);\n}\n.btn_dark:hover .svg-icon {\n  fill: white;\n  stroke: white;\n}\n.btn__bg {\n  position: absolute;\n}\n.btn_bright .btn__bg {\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  border-radius: inherit;\n  background-color: #75FF00;\n  transition: width 0.4s;\n}\n.btn_bright .btn__bg::before, .btn_bright .btn__bg::after {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  border-radius: inherit;\n}\n.btn_bright .btn__bg::before {\n  z-index: 1;\n  background: #6FF100;\n  transition: width 0.4s;\n}\n.btn_bright .btn__bg::after {\n  z-index: 2;\n  background: #65DD00;\n  opacity: 0;\n  transition: width 0.4s, opacity 0.4s;\n}\n.btn_bright:hover .btn__bg {\n  width: calc(100% - 20px);\n}\n.btn_bright:hover .btn__bg::before {\n  width: calc(100% - 20px);\n}\n.btn_bright:hover .btn__bg::after {\n  width: calc(100% - 40px);\n  opacity: 1;\n}\n.btn_dark .btn__bg {\n  width: calc(100% - 22px);\n  height: 100%;\n  left: 11px;\n  top: 0;\n  border-radius: inherit;\n  background-color: rgba(157, 248, 80, 0.08);\n  transition: opacity 0.4s 0.2s;\n  opacity: 0;\n}\n.btn_dark .btn__bg::before, .btn_dark .btn__bg::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  height: 100%;\n  border-radius: inherit;\n  background-color: inherit;\n  opacity: 0;\n}\n.btn_dark .btn__bg::before {\n  width: calc(100% - 22px);\n  left: 11px;\n  z-index: 1;\n  transition: opacity 0.4s 0.1s;\n}\n.btn_dark .btn__bg::after {\n  width: calc(100% - 44px);\n  left: 22px;\n  z-index: 2;\n  transition: opacity 0.4s;\n}\n.btn_dark:hover .btn__bg {\n  opacity: 1;\n}\n.btn_dark:hover .btn__bg::before {\n  opacity: 1;\n}\n.btn_dark:hover .btn__bg::after {\n  opacity: 1;\n}\n.btn__inner {\n  display: flex;\n  align-items: center;\n  position: relative;\n  left: 0;\n  top: 0;\n  z-index: 3;\n  padding: 11px 30px 10px;\n}\n.btn__cap {\n  flex: 0 0 auto;\n  position: relative;\n  left: 0;\n  top: 0.15em;\n}\n\n.disclosure {\n  display: grid;\n  grid-template-rows: 0fr;\n  overflow: hidden;\n  transition: grid-template-rows 0.4s;\n}\n.disclosure.open {\n  grid-template-rows: 1fr;\n}\n.disclosure__inner {\n  min-height: 0;\n}\n\n.text-btn {\n  display: inline-grid;\n  grid-auto-flow: column;\n  align-items: center;\n  gap: 4px;\n  color: #161616;\n  font-family: Thunder;\n  font-size: 24px;\n  font-weight: 700;\n  letter-spacing: 0.48px;\n  transition: color 0.4s;\n}\n.text-btn:hover {\n  color: #C279FF;\n}\n.text-btn > .svg-icon {\n  position: relative;\n  left: 0;\n  top: -0.1em;\n  z-index: 0;\n  width: 0.66em;\n  fill: #161616;\n  transition: transform 0.4s, fill 0.4s;\n}\n.text-btn:hover > .svg-icon {\n  fill: #C279FF;\n  transform: translateX(0.1em);\n}\n\n.burger-btn {\n  --width: 40px;\n  --height: 40px;\n  --line-height: 3px;\n  --line-width: 32px;\n  --border-radius: 1.5px;\n  --space-between: 7px;\n  --icon-height: calc(var(--line-height) * 3 + var(--space-between) * 2);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: var(--width);\n  min-width: var(--height);\n  transition: color 0.3s;\n  font-size: 0;\n}\n@media (max-width: 768px) {\n  .burger-btn {\n    --width: 30px;\n    --height: 30px;\n    --line-width: 26px;\n    --line-height: 2px;\n    --space-between: 5px;\n  }\n}\n.burger-btn__icon {\n  position: relative;\n  top: 0;\n  left: 0;\n  display: block;\n  width: var(--line-width);\n  height: var(--icon-height);\n  transition: 0.3s all;\n}\n.burger-btn__icon > span {\n  position: absolute;\n  display: block;\n  width: 100%;\n  height: var(--line-height);\n  border-radius: var(--border-radius);\n  background-color: #FFFFFF;\n  transition: transform 0.4s, top 0.2s, background-color 0.4s;\n}\n.burger-btn__icon > span:first-child {\n  top: 0;\n}\n.burger-btn__icon > span:nth-child(2) {\n  top: calc(var(--line-height) + var(--space-between));\n  transition: transform 0.4s, top 0.2s, background-color 0.1s;\n  transition-delay: 0.2s, 0s;\n}\n.burger-btn__icon > span:last-child {\n  top: calc((var(--line-height) + var(--space-between)) * 2);\n  transition: all 0.4s;\n  transition-delay: 0.1s;\n}\n.burger-btn:hover {\n  color: #9DF850;\n}\n.burger-btn:hover > span > span {\n  background-color: #9DF850;\n}\n.burger-btn.active .burger-btn__icon {\n  top: calc(var(--icon-height) * -0.1);\n}\n.burger-btn.active > span > span {\n  background-color: #9DF850;\n}\n.burger-btn.active > span > span:first-child {\n  top: calc(var(--icon-height) / 2);\n  transform: rotate(135deg);\n}\n.burger-btn.active > span > span:nth-child(2) {\n  top: calc(var(--icon-height) / 2);\n  transform: rotate(-135deg);\n}\n.burger-btn.active > span > span:last-child {\n  top: 0;\n  opacity: 0;\n  transform: rotate(180deg);\n}\n\n.header {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  z-index: 10;\n  background-color: transparent;\n  transition: background-color ease-in 0.3s;\n  padding: 15px 0;\n  transition: background-color 0.4s;\n}\nhtml:not(.is-mobile) body.lock .header {\n  width: calc(100% - 17px);\n}\n.scroll-80-plus .header {\n  background-color: rgba(47, 2, 82, 0.6901960784);\n  backdrop-filter: blur(10px);\n}\n@media (max-width: 768px) {\n  .header {\n    padding: 10px 0;\n  }\n}\n.header__container {\n  display: grid;\n  grid-template-columns: minmax(max-content, 1fr) auto minmax(max-content, 1fr);\n  gap: 30px;\n  align-items: center;\n}\n@media (max-width: 1150px) {\n  .header__container {\n    grid-template-columns: minmax(max-content, 1fr) minmax(max-content, 1fr);\n  }\n}\n@media (max-width: 375px) {\n  .header__container {\n    gap: 20px;\n  }\n}\n.header__group {\n  display: inline-flex;\n  justify-content: flex-end;\n  align-items: center;\n  margin-left: -40px;\n}\n@media (max-width: 768px) {\n  .header__group {\n    margin-left: -22px;\n  }\n}\n@media (max-width: 375px) {\n  .header__group {\n    margin-left: -18px;\n  }\n}\n.header__group > * {\n  margin-left: 40px;\n}\n@media (max-width: 768px) {\n  .header__group > * {\n    margin-left: 22px;\n  }\n}\n@media (max-width: 375px) {\n  .header__group > * {\n    margin-left: 18px;\n  }\n}\n.header__logo {\n  justify-self: start;\n}\n@media (max-width: 768px) {\n  .header__logo {\n    font-size: 16px;\n  }\n}\n@media (max-width: 375px) {\n  .header__logo {\n    font-size: 14px;\n  }\n}\n@media (max-width: 1150px) {\n  .header__nav {\n    display: none;\n  }\n}\n.header__lang-switch {\n  --font-size: 20px;\n}\n@media (max-width: 768px) {\n  .header__lang-switch {\n    --font-size: 16px;\n  }\n}\n@media (max-width: 768px) {\n  .header__social-media {\n    display: none;\n  }\n}\n.header__burger-btn {\n  z-index: 1000;\n}\n@media (min-width: 1150.1px) {\n  .header__burger-btn {\n    display: none;\n  }\n}\n.header__burger-menu {\n  margin: 0;\n}\n\n.burger-menu {\n  position: fixed;\n  right: 0;\n  top: 0;\n  width: 100%;\n  height: 100vh;\n  background-color: rgba(0, 0, 0, 0);\n  visibility: hidden;\n  transition: background-color 0.4s, visibility 0.4s;\n}\n.burger-menu.open {\n  visibility: visible;\n}\n.burger-menu.open.upper-overlapping {\n  background-color: rgba(0, 0, 0, 0.3);\n}\n.burger-menu__panel {\n  position: absolute;\n  right: 0;\n  top: 0;\n  height: 100%;\n  width: 100%;\n  max-width: 460px;\n}\n.burger-menu__inner {\n  position: relative;\n  right: -100%;\n  top: 0;\n  height: 100%;\n  width: 100%;\n  transition: transform 0.4s;\n  background: linear-gradient(170deg, #161616 0%, #260046 32.29%, #2A004E 57.29%, #500092 78.65%, #3A006A 100%, #2A004E 100%);\n}\n.burger-menu.open .burger-menu__inner {\n  transform: translateX(-100%);\n}\n.burger-menu__container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 60px;\n  padding-bottom: 60px;\n}\n.burger-menu__logo {\n  margin-bottom: 50px;\n}\n.burger-menu__nav {\n  margin-bottom: 50px;\n}\n.burger-menu__lang-switch {\n  --font-size: 20px;\n  margin-bottom: 60px;\n}\n.main-nav ul {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  margin-left: -32px;\n  margin-top: -18px;\n}\n@media (max-width: 1150px) {\n  .main-nav ul {\n    flex-direction: column;\n    align-items: center;\n    margin-top: -32px;\n  }\n}\n.main-nav ul > * {\n  margin-left: 32px;\n  margin-top: 18px;\n}\n@media (max-width: 1150px) {\n  .main-nav ul > * {\n    margin-top: 32px;\n  }\n}\n.main-nav ul > li {\n  --color: white;\n  --hover-color: #9DF850;\n  display: flex;\n  align-items: center;\n  text-align: center;\n  font-size: 20px;\n  font-weight: 500;\n}\n\n.footer-nav > ul {\n  display: inline-grid;\n  grid-template-columns: repeat(2, auto);\n  gap: 20px 32px;\n  align-items: center;\n}\n.footer-nav > ul > li {\n  font-family: Montserrat;\n  font-size: 18px;\n  max-width: 200px;\n  line-height: 1.3;\n}\n.footer-nav > ul > li > strong {\n  font-size: 20px;\n  font-weight: 500;\n}\n\n.footer {\n  background-color: #C279FF;\n  padding: 40px 20px 30px 20px;\n  clip-path: polygon(0px 40.038px, 0px 40.038px, 0.5588472px 33.3309693514px, 2.1736176px 26.9914936112px, 4.7516544px 21.1077370878px, 8.2003008px 15.7678640896px, 12.4269px 11.060038925px, 17.3387952px 7.0724259024px, 22.8433296px 3.8931893302px, 28.8478464px 1.6104935168px, 35.2596888px 0.3125027706px, 41.9862px 0.0873814px, calc(100% - 64.15px) 66.4018px, calc(100% - 64.15px) 66.4018px, calc(100% - 58.6237px) 67.0616897px, calc(100% - 53.344px) 68.4483216px, calc(100% - 48.3667px) 70.5120199px, calc(100% - 43.7476px) 73.2031088px, calc(100% - 39.5425px) 76.4719125px, calc(100% - 35.8072px) 80.2687552px, calc(100% - 32.5975px) 84.5439611px, calc(100% - 29.9692px) 89.2478544px, calc(100% - 27.9781px) 94.3307593px, calc(100% - 26.68px) 99.743px, calc(100% - 0px) calc(100% - 0px), 0px calc(100% - 0px), 0px 40.038px);\n}\n@media (max-width: 768px) {\n  .footer {\n    clip-path: polygon(0px 40.7197px, 0px 40.7197px, 0.6211191px 33.64152803px, 2.4098208px 26.99400864px, 5.2541217px 20.87511661px, 9.0420384px 15.38282672px, 13.6615875px 10.61511375px, 19.0007856px 6.66995248px, 24.9476493px 3.64531769px, 31.3901952px 1.63918416px, 38.2164399px 0.74952667px, 45.3144px 1.07432px, calc(100% - 36.521px) 40.3725px, calc(100% - 36.521px) 40.3725px, calc(100% - 30.743631px) 41.5828094px, calc(100% - 25.323808px) 43.5779392px, calc(100% - 20.319857px) 46.2915318px, calc(100% - 15.790104px) 49.6572296px, calc(100% - 11.792875px) 53.608675px, calc(100% - 8.386496px) 58.0795104px, calc(100% - 5.629293px) 63.0033782px, calc(100% - 3.579592px) 68.3139208px, calc(100% - 2.295719px) 73.9447806px, calc(100% - 1.836px) 79.8296px, calc(100% - 0px) calc(100% - 0px), 0px calc(100% - 0px), 0px 40.7197px);\n    padding: 20px 10px;\n  }\n}\n.footer__container {\n  position: relative;\n  left: 0;\n  top: 0;\n  z-index: 0;\n  padding-top: 40px;\n  padding-bottom: 15px;\n  --container-save-space: 60px;\n  max-width: 1620px;\n}\n@media (max-width: 768px) {\n  .footer__container {\n    --container-save-space: 10px;\n  }\n}\n.footer__container::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: -1;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(170deg, #161616 0%, #260046 32.29%, #2A004E 57.29%, #500092 78.65%, #3A006A 100%, #2A004E 100%);\n  clip-path: polygon(0.5936px 35.6126px, 0.5936px 35.6126px, 0.23286309px 30.12755794px, 0.84287392px 24.84791832px, 2.34335183px 19.86504098px, 4.65401616px 15.27028576px, 7.69458625px 11.1550125px, 11.38478144px 7.61058104px, 15.64432107px 4.72835122px, 20.39292448px 2.59968288px, 25.55031101px 1.31593586px, 31.0362px 0.96847px, calc(100% - 48.04px) 36.4413px, calc(100% - 48.04px) 36.4413px, calc(100% - 43.89656px) 36.8396239px, calc(100% - 39.92448px) 37.7840912px, calc(100% - 36.16612px) 39.2387853px, calc(100% - 32.66384px) 41.1677896px, calc(100% - 29.46px) 43.5351875px, calc(100% - 26.59696px) 46.3050624px, calc(100% - 24.11708px) 49.4414977px, calc(100% - 22.06272px) 52.9085768px, calc(100% - 20.47624px) 56.6703831px, calc(100% - 19.4px) 60.691px, calc(100% - 0.97px) calc(100% - 35.739px), calc(100% - 0.97px) calc(100% - 35.739px), calc(100% - 0.4076px) calc(100% - 30.237462px), calc(100% - 0.834px) calc(100% - 24.909696px), calc(100% - 2.1706px) calc(100% - 19.851174px), calc(100% - 4.3388px) calc(100% - 15.157368px), calc(100% - 7.26px) calc(100% - 10.92375px), calc(100% - 10.8556px) calc(100% - 7.245792px), calc(100% - 15.047px) calc(100% - 4.218966px), calc(100% - 19.7556px) calc(100% - 1.938744px), calc(100% - 24.9028px) calc(100% - 0.500598px), calc(100% - 30.41px) calc(100% - 0px), 50.6557px calc(100% - 0px), 50.6557px calc(100% - 0px), 46.2983333px calc(100% - 0.315676px), 42.1213464px calc(100% - 1.235048px), 38.1732391px calc(100% - 2.716632px), 34.5025112px calc(100% - 4.718944px), 31.1576625px calc(100% - 7.2005px), 28.1871928px calc(100% - 10.119816px), 25.6396019px calc(100% - 13.435408px), 23.5633896px calc(100% - 17.105792px), 22.0070557px calc(100% - 21.089484px), 21.0191px calc(100% - 25.345px), 0.5936px 35.6126px);\n}\n@media (max-width: 768px) {\n  .footer__container::before {\n    clip-path: polygon(0px 30.2974px, 0px 30.2974px, 0.4492385px 25.086216501px, 1.74448px 20.180904008px, 3.8070135px 15.652379527px, 6.558128px 11.571560064px, 9.9191125px 8.009362625px, 13.811256px 5.036704216px, 18.1558475px 2.724501843px, 22.874176px 1.143672512px, 27.8875305px 0.365133229px, 33.1172px 0.459801px, calc(100% - 26.883px) 31.2789px, calc(100% - 26.883px) 31.2789px, calc(100% - 22.417479px) 32.0874635px, calc(100% - 18.220032px) 33.520228px, calc(100% - 14.338233px) 35.5243845px, calc(100% - 10.819656px) 38.047124px, calc(100% - 7.711875px) 41.0356375px, calc(100% - 5.062464px) 44.437116px, calc(100% - 2.918997px) 48.1987505px, calc(100% - 1.329048px) 52.267732px, calc(100% - 0.340191px) 56.5912515px, calc(100% - 0px) 61.1165px, calc(100% - 0px) calc(100% - 30px), calc(100% - 0px) calc(100% - 30px), calc(100% - 0.392637px) calc(100% - 25.133733px), calc(100% - 1.529376px) calc(100% - 20.517504px), calc(100% - 3.348459px) calc(100% - 16.213071px), calc(100% - 5.788128px) calc(100% - 12.282192px), calc(100% - 8.786625px) calc(100% - 8.786625px), calc(100% - 12.282192px) calc(100% - 5.788128px), calc(100% - 16.213071px) calc(100% - 3.348459px), calc(100% - 20.517504px) calc(100% - 1.529376px), calc(100% - 25.133733px) calc(100% - 0.392637px), calc(100% - 30px) calc(100% - 0px), 30px calc(100% - 0px), 30px calc(100% - 0px), 25.1338545px calc(100% - 0.392637px), 20.517696px calc(100% - 1.529376px), 16.2132915px calc(100% - 3.348459px), 12.282408px calc(100% - 5.788128px), 8.7868125px calc(100% - 8.786625px), 5.788272px calc(100% - 12.282192px), 3.3485535px calc(100% - 16.213071px), 1.529424px calc(100% - 20.517504px), 0.3926505px calc(100% - 25.133733px), 0px calc(100% - 30px), 0px 30.2974px);\n  }\n}\n.footer__body {\n  pointer-events: none;\n  margin-bottom: 30px;\n}\n.footer__body-inner {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: center;\n  margin-left: -90px;\n  margin-top: -30px;\n}\n@media (max-width: 900px) {\n  .footer__body-inner {\n    flex-direction: column;\n    margin-left: 0;\n  }\n}\n.footer__body-inner > * {\n  margin-left: 90px;\n  margin-top: 30px;\n  pointer-events: all;\n}\n@media (max-width: 900px) {\n  .footer__body-inner > * {\n    margin-left: 0;\n  }\n}\n.footer__logo {\n  margin-bottom: 28px;\n}\n.footer__group {\n  display: flex;\n  flex-direction: column;\n}\n.footer__nav {\n  margin-right: auto;\n}\n@media (max-width: 900px) {\n  .footer__nav {\n    margin-right: 0;\n  }\n  .footer__nav > ul {\n    grid-template-columns: repeat(2, 1fr);\n    text-align: center;\n  }\n}\n@media (max-width: 650px) {\n  .footer__nav > ul {\n    grid-template-columns: 1fr;\n  }\n}\n.footer__btn-area {\n  flex: 0 0 auto;\n  display: flex;\n  justify-content: flex-end;\n}\n.footer__copyright {\n  color: var(--white, #FFF);\n  text-align: center;\n  font-family: Montserrat;\n  font-size: 16px;\n  font-style: normal;\n  font-weight: 400;\n  line-height: normal;\n}\n\n.drawer {\n  position: fixed;\n  left: 0;\n  top: 0;\n  transition: opacity ease-out 0.3s, visibility ease-out 0.3s, transform ease-out 0.3s, background-color 0.3s;\n  visibility: hidden;\n}\n.drawer.open {\n  visibility: visible;\n}\n.drawer_overlapping, .drawer_static {\n  height: 100%;\n  width: 100%;\n}\n.drawer_full-width, .drawer_modal {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.drawer_left, .drawer_right {\n  display: flex;\n  height: 100%;\n}\n.drawer_right {\n  justify-content: flex-end;\n}\n.drawer_overlapping.upper-overlapping, .drawer_static.upper-overlapping {\n  background-color: rgba(0, 0, 0, 0);\n}\n.drawer_overlapping.upper-overlapping.open, .drawer_static.upper-overlapping.open {\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.drawer__panel {\n  position: relative;\n  left: 0;\n  top: 0;\n}\n.drawer_modal .drawer__panel {\n  min-height: 43.75rem;\n  width: 100%;\n}\n.drawer_narrow .drawer__panel {\n  max-width: 550px;\n}\n@media (min-width: 1920.1px) {\n  .drawer_narrow .drawer__panel {\n    max-width: 34.375rem;\n  }\n}\n@media (max-width: 580px) {\n  .drawer_narrow .drawer__panel {\n    max-width: 100%;\n  }\n}\n.drawer_full-width .drawer__panel, .drawer_modal .drawer__panel {\n  margin: auto;\n}\n.drawer_left .drawer__panel, .drawer_right .drawer__panel {\n  display: flex;\n  min-height: 100%;\n  width: 445px;\n}\n@media (max-width: 500px) {\n  .drawer_left .drawer__panel, .drawer_right .drawer__panel {\n    width: 100%;\n  }\n}\n.drawer_full-width .drawer__panel {\n  width: 100%;\n  max-width: 100%;\n  overflow-y: hidden;\n}\n.drawer__inner {\n  position: relative;\n  max-width: 100%;\n  transition: left 0.3s, right 0.3s, top 0.3s, transform 0.3s, opacity 0.3s;\n}\n.drawer_right .drawer_title, .drawer_left .drawer_title {\n  text-transform: uppercase;\n}\n.drawer_left .drawer__inner, .drawer_right .drawer__inner {\n  min-height: 100%;\n  width: 100%;\n}\n.drawer_left .drawer__inner > *, .drawer_right .drawer__inner > * {\n  min-height: 100%;\n}\n.drawer_left .drawer__inner {\n  left: -100%;\n  right: auto;\n}\n.drawer_left.open .drawer__inner {\n  left: 0;\n}\n.drawer_right .drawer__inner {\n  right: -100%;\n  left: auto;\n}\n.drawer_right.open .drawer__inner {\n  right: 0;\n}\n.drawer_modal .drawer__inner, .drawer_full-width .drawer__inner, .drawer_top .drawer__inner, .drawer_center .drawer__inner {\n  top: 0;\n  bottom: auto;\n  transform: translateY(-100%);\n  opacity: 0;\n}\n.drawer_modal.open .drawer__inner, .drawer_full-width.open .drawer__inner, .drawer_top.open .drawer__inner, .drawer_center.open .drawer__inner {\n  transform: translateY(0);\n  opacity: 1;\n}\n\n.cv-request-form {\n  padding-left: 25px;\n  padding-right: 25px;\n}\n@media (max-width: 768px) {\n  .cv-request-form {\n    padding-left: 15px;\n    padding-right: 15px;\n  }\n}\n@media (max-width: 520px) {\n  .cv-request-form {\n    padding-left: 10px;\n    padding-right: 10px;\n  }\n}\n.cv-request-form__inner {\n  border-radius: 30px;\n  background: #FFF;\n  box-shadow: 0px 4px 60px 0px rgba(0, 0, 0, 0.7);\n}\n@media (max-width: 768px) {\n  .cv-request-form__inner {\n    border-radius: 20px;\n  }\n}\n.cv-request-form__header {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  padding: 30px 30px 0;\n}\n@media (max-width: 520px) {\n  .cv-request-form__header {\n    padding: 20px 20px 0;\n  }\n}\n.cv-request-form__body {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 40px;\n  padding: 64px 80px 70px;\n}\n@media (max-width: 1920px) {\n  .cv-request-form__body {\n    padding: 50px 60px 50px;\n  }\n}\n@media (max-width: 840px) {\n  .cv-request-form__body {\n    grid-template-columns: 1fr;\n    gap: 30px;\n  }\n}\n@media (max-width: 768px) {\n  .cv-request-form__body {\n    padding: 35px;\n  }\n}\n@media (max-width: 520px) {\n  .cv-request-form__body {\n    padding: 20px;\n  }\n}\n.cv-request-form__title {\n  color: transparent;\n  font-family: Thunder;\n  font-size: 50px;\n  font-style: normal;\n  font-weight: 800;\n  background: linear-gradient(307deg, #161616 0%, #260046 18.82%, #2A004E 36.26%, #500092 56.78%, #3A006A 75.58%, #2A004E 88.57%, #2A004E 100%);\n  background-clip: text;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .cv-request-form__title {\n    font-size: calc(42px + 8 * (100vw - 375.1px) / 1544.9);\n  }\n}\n@media (max-width: 520px) {\n  .cv-request-form__title {\n    font-size: 42px;\n  }\n}\n.cv-request-form__form .contact-form__bottom-inner {\n  flex-direction: column;\n  align-items: center;\n}\n.cv-request-form .cv-request-form__panel {\n  max-width: 1160px;\n}\n@media (max-width: 720px) {\n  .cv-request-form .cv-request-form__panel {\n    max-width: 100%;\n  }\n}\n\n.close-btn {\n  display: inline-block;\n  position: relative;\n  left: 0;\n  top: 0;\n  width: 30px;\n  height: 30px;\n  font-size: 0;\n  cursor: pointer;\n  transition: transform 0.4s;\n}\n.close-btn:hover {\n  transform: rotateZ(90deg);\n}\n.close-btn::before, .close-btn::after {\n  content: \"\";\n  position: absolute;\n  left: 10%;\n  top: calc(50% - 1.25px);\n  width: 80%;\n  height: 2.5px;\n  background-color: #FF1D53;\n  border-radius: 1.25px;\n}\n.close-btn::before {\n  transform: rotateZ(-45deg);\n}\n.close-btn::after {\n  transform: rotateZ(45deg);\n}", "",{"version":3,"sources":["webpack://./src/scss/common/index.scss","webpack://./repo/scss/base/null.scss","webpack://./src/scss/config.scss","webpack://./src/scss/common/theme.scss","webpack://./src/scss/common/fonts.scss","webpack://./src/scss/components/common.scss","webpack://./src/scss/components/burger-btn.scss","webpack://./src/scss/components/header.scss","webpack://./src/scss/components/footer.scss","webpack://./src/scss/components/drawers.scss","webpack://./src/scss/components/cv-request-form.scss"],"names":[],"mappings":"AAAA,gBAAgB;ACAhB;EACC,YAAA;EACA,WAAA;EACA,WAAA;ADED;;ACAA;;;EAGC,sBAAA;ADGD;;ACOA;EACC,aAAA;EACA,sBAAA;EACA,gBAAA;ADJD;;ACMA;EACC,cAAA;EACA,aAAA;EACA,sBAAA;EACA,gBAAA;EACA,cChBW;EDiBX,cAAA;EACA,yBCpBY;EDqBZ,kBAAA;EAEA,0BAAA;EACA,2BAAA;EACA,8BAAA;EACA,mCAAA;EACA,kCAAA;ADJD;;ACMA;;;EAGC,yBChCY;EDiCZ,kBAAA;ADHD;;ACKA;EACC,eAAA;EACA,cAAA;EACA,yBAAA;ADFD;;ACIA;EACC,cAAA;EACA,qBAAA;ADDD;;ACGA;EACC,gBAAA;ADAD;;ACEA;EACC,mBAAA;ADCD;;ACCA;;;;;;EAMC,oBAAA;EACA,kBAAA;ADED;;AGrEA;EACC,2BAAA;EACA,oBAAA;EACA,sBAAA;EACA,2BAAA;EACA,qBAAA;AHwED;;AI7EA;EACC,sBAAA;EACA,yHAAA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;AJgFD;AI9EA;EACC,sBAAA;EACA,qIAAA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;AJgFD;AI9EA;EACC,sBAAA;EACA,6IAAA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;AJgFD;AI9EA;EACC,4BAAA;EACA,mIAAA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;AJgFD;AA/FA;EACC,4BAAA;AAiGD;AAhGC;EAFD;IAGE,4BAAA;EAmGA;AACF;;AAjGA;EACC,yDAAA;EACA,sCAAA;EACA,YAAA;AAoGD;;AAlGA;EACC,kBAAA;AAqGD;;AAlGC;EACC,cAAA;EACA,aAAA;EACA,sBAAA;AAqGF;;AIlIA;EACC,sBAAA;EACA,yHAAA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;AJqID;AInIA;EACC,sBAAA;EACA,qIAAA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;AJqID;AInIA;EACC,sBAAA;EACA,6IAAA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;AJqID;AInIA;EACC,4BAAA;EACA,mIAAA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;AJqID;AK/JA;EACC,cAAA;ALiKD;;AK9JA;EACC,kBAAA;ALiKD;AKhKC;EACC,WAAA;EACA,cAAA;EACA,kBAAA;EACA,cAAA;EACA,WAAA;EACA,wBAAA;EACA,YAAA;EACA,wDAAA;ALkKF;AKhKC;EACC,8BAAA;ALkKF;;AK9JC;EACC,QAAA;EACA,SAAA;ALiKF;AK/JC;EACC,WAAA;EACA,OAAA;ALiKF;;AK7JC;EACC,WAAA;EACA,OAAA;ALgKF;AK9JC;EACC,QAAA;EACA,SAAA;ALgKF;;AK7JA;EACC,aAAA;ALgKD;;AK9JA;EACC,aAAA;ALiKD;;AK7JA;EACC,0BAAA;EACA,iCAAA;EACA,sBAAA;ALgKD;AK/JC;EACC,0BAAA;ALiKF;AK/JC;EACC,kCAAA;ALiKF;;AK9JA;EACC,kBAAA;EACA,OAAA;EACA,MAAA;EACA,YAAA;EACA,WAAA;EACA,WAAA;ALiKD;AKhKC;EACC,YAAA;EACA,WAAA;EACA,iBAAA;EACA,8BAAA;ALkKF;AKhKC;EACC,uBAAA;ALkKF;;AK/JA;EACC,cAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,UAAA;ALkKD;AKjKC;EACC,gBAAA;EACA,eAAA;ALmKF;AKlKE;EACC,wDAAA;ALoKH;AKhKE;EACC,WAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,iCAAA;ALkKH;AK/JC;EACC,kBAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;ALiKF;AK/JC;EACC,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;EACA,uBAAA;ALiKF;AK/JC;EACC,mBAAA;ALiKF;AK9JE;EACC,QAAA;EACA,SAAA;EACA,WAAA;EACA,YAAA;ALgKH;AK5JC;EACC,mBAAA;AL8JF;;AK3JA;EACC,eAAA;AL8JD;AK7JC;EACC,aAAA;AL+JF;AK7JC;EACC,aAAA;EACA,cAAA;EACA,mBAAA;EACA,mBAAA;AL+JF;AK7JC;EACC,aAAA;EACA,sBAAA;EACA,yBAAA;EACA,qBAAA;EACA,oBAAA;EACA,WAAA;EACA,yBAAA;EACA,sBAAA;AL+JF;AK9JE;EACC,cAAA;ALgKH;AK/JG;EACC,cAAA;EACA,gBAAA;ALiKJ;AK9JE;EACC,iBAAA;ALgKH;AK7JC;EACC,cAAA;AL+JF;;AK5JA;EACC,cAAA;EACA,sBAAA;EACA,2BAAA;EACA,gBAAA;EACA,mBAAA;AL+JD;AK9JC;EACC,aAAA;ALgKF;AK7JE;EACC,YAAA;EACA,aAAA;AL+JH;;AK1JC;EACC,aAAA;EACA,uBAAA;EACA,kBAAA;EACA,iBAAA;EACA,oBAAA;AL6JF;AK5JE;EACC,aAAA;EACA,mBAAA;EACA,iBAAA;EACA,gBAAA;EACA,mBAAA;AL8JH;;AK1JA;EACC,cAAA;EACA,qBAAA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,YAAA;AL6JD;AK5JC;EACC,WAAA;EACA,YAAA;EACA,qBAAA;AL8JF;AK5JC;EACC,aAAA;AL8JF;;AK3JA;EACC,qBAAA;AL8JD;AK7JC;EACC,kBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,eAAA;EACA,UAAA;EACA,kDAAA;AL+JF;;AK5JA;EACC;IACC,OAAA;EL+JA;EK7JD;IACC,WAAA;EL+JA;EK7JD;IACC,OAAA;EL+JA;AACF;AK7JA;EACC,oBAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,oBAAA;EACA,eAAA;EACA,gBAAA;EACA,gBAAA;EACA,qBAAA;EACA,mBAAA;AL+JD;AK9JC;EACC,cAAA;EACA,WAAA;EACA,kCAAA;ALgKF;AK/JE;EACC,kBAAA;ALiKH;AK9JC;EACC,YAAA;EACA,yBAAA;EACA,2BAAA;ALgKF;AK/JE;EACC,eAAA;EACA,WAAA;ALiKH;AK9JC;EACC,mDAAA;ALgKF;AK9JC;EACC,kBAAA;EACA,OAAA;EACA,MAAA;EACA,UAAA;EACA,YAAA;EACA,yBAAA;EACA,2BAAA;ALgKF;AK/JE;EACC,WAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,UAAA;EACA,WAAA;EACA,YAAA;EACA,6BAAA;EACA,sCAAA;ALiKH;AK/JE;EACC,aAAA;EACA,eAAA;ALiKH;AK9JC;EACC,YAAA;EACA,mDAAA;ALgKF;AK/JE;EACC,kDAAA;ALiKH;AK/JE;EACC,WAAA;EACA,aAAA;ALiKH;AK9JC;EACC,kBAAA;ALgKF;AK9JC;EACC,WAAA;EACA,YAAA;EACA,OAAA;EACA,MAAA;EACA,sBAAA;EACA,yBAAA;EACA,sBAAA;ALgKF;AK/JE;EACC,WAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,sBAAA;ALiKH;AK/JE;EACC,UAAA;EACA,mBAAA;EACA,sBAAA;ALiKH;AK/JE;EACC,UAAA;EACA,mBAAA;EACA,UAAA;EACA,oCAAA;ALiKH;AK9JC;EACC,wBAAA;ALgKF;AK/JE;EACC,wBAAA;ALiKH;AK/JE;EACC,wBAAA;EACA,UAAA;ALiKH;AK9JC;EACC,wBAAA;EACA,YAAA;EACA,UAAA;EACA,MAAA;EACA,sBAAA;EACA,0CAAA;EACA,6BAAA;EACA,UAAA;ALgKF;AK/JE;EACC,WAAA;EACA,kBAAA;EACA,MAAA;EACA,YAAA;EACA,sBAAA;EACA,yBAAA;EACA,UAAA;ALiKH;AK/JE;EACC,wBAAA;EACA,UAAA;EACA,UAAA;EACA,6BAAA;ALiKH;AK/JE;EACC,wBAAA;EACA,UAAA;EACA,UAAA;EACA,wBAAA;ALiKH;AK9JC;EACC,UAAA;ALgKF;AK/JE;EACC,UAAA;ALiKH;AK/JE;EACC,UAAA;ALiKH;AK9JC;EACC,aAAA;EACA,mBAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,UAAA;EACA,uBAAA;ALgKF;AK9JC;EACC,cAAA;EACA,kBAAA;EACA,OAAA;EACA,WAAA;ALgKF;;AK7JA;EACC,aAAA;EACA,uBAAA;EACA,gBAAA;EACA,mCAAA;ALgKD;AK/JC;EACC,uBAAA;ALiKF;AK/JC;EACC,aAAA;ALiKF;;AK9JA;EACC,oBAAA;EACA,sBAAA;EACA,mBAAA;EACA,QAAA;EACA,cAAA;EACA,oBAAA;EACA,eAAA;EACA,gBAAA;EACA,sBAAA;EACA,sBAAA;ALiKD;AKhKC;EACC,cAAA;ALkKF;AKhKC;EACC,kBAAA;EACA,OAAA;EACA,WAAA;EACA,UAAA;EACA,aAAA;EACA,aAAA;EACA,qCAAA;ALkKF;AKhKC;EACC,aAAA;EACA,4BAAA;ALkKF;;AMvlBA;EACC,aAAA;EACA,cAAA;EACA,kBAAA;EACA,kBAAA;EACA,sBAAA;EACA,oBAAA;EACA,sEAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACC,wBAAA;EACD,wBAAA;EACA,sBAAA;EACA,YAAA;AN0lBD;AMzlBC;EAfD;IAgBE,aAAA;IACA,cAAA;IACA,kBAAA;IACA,kBAAA;IACA,oBAAA;EN4lBA;AACF;AM3lBC;EACC,kBAAA;EACA,MAAA;EACA,OAAA;EACA,cAAA;EACA,wBAAA;EACA,0BAAA;EACA,oBAAA;AN6lBF;AM5lBE;EACC,kBAAA;EACA,cAAA;EACA,WAAA;EACA,0BAAA;EACA,mCAAA;EACA,yBAtCmB;EAuCnB,2DAAA;AN8lBH;AM7lBG;EACC,MAAA;AN+lBJ;AM7lBG;EACC,oDAAA;EACA,2DAAA;EACA,0BAAA;AN+lBJ;AM7lBG;EACC,0DAAA;EACA,oBAAA;EACC,sBAAA;AN+lBL;AM3lBC;EACC,cAzDoB;ANspBtB;AM3lBG;EACC,yBA5DkB;ANypBtB;AMzlBC;EACC,oCAAA;AN2lBF;AMvlBG;EACC,yBAtEkB;AN+pBtB;AMxlBI;EACC,iCAAA;EACA,yBAAA;AN0lBL;AMxlBI;EACC,iCAAA;EACA,0BAAA;AN0lBL;AMxlBI;EACC,MAAA;EACA,UAAA;EACA,yBAAA;AN0lBL;;AO1qBA;EACC,eAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,WAAA;EACA,6BAAA;EACA,yCAAA;EACA,eAAA;EACA,iCAAA;AP6qBD;AO5qBC;EACC,wBAAA;AP8qBF;AO5qBC;EACC,+CAAA;EACA,2BAAA;AP8qBF;AO5qBC;EAjBD;IAkBE,eAAA;EP+qBA;AACF;AO9qBC;EACC,aAAA;EACA,6EAAA;EACA,SAAA;EACA,mBAAA;APgrBF;AO/qBE;EALD;IAME,wEAAA;EPkrBD;AACF;AOjrBE;EARD;IASE,SAAA;EPorBD;AACF;AOlrBC;EACC,oBAAA;EACA,yBAAA;EACA,mBAAA;EACA,kBAAA;APorBF;AOnrBE;EALD;IAME,kBAAA;EPsrBD;AACF;AOrrBE;EARD;IASE,kBAAA;EPwrBD;AACF;AOvrBE;EACC,iBAAA;APyrBH;AOxrBG;EAFD;IAGE,iBAAA;EP2rBF;AACF;AO1rBG;EALD;IAME,iBAAA;EP6rBF;AACF;AOzrBC;EACC,mBAAA;AP2rBF;AO1rBE;EAFD;IAGE,eAAA;EP6rBD;AACF;AO5rBE;EALD;IAME,eAAA;EP+rBD;AACF;AO5rBE;EADD;IAEE,aAAA;EP+rBD;AACF;AO7rBC;EACC,iBAAA;AP+rBF;AO9rBE;EAFD;IAGE,iBAAA;EPisBD;AACF;AO9rBE;EADD;IAEE,aAAA;EPisBD;AACF;AO/rBC;EACC,aAAA;APisBF;AOhsBE;EAFD;IAGE,aAAA;EPmsBD;AACF;AOjsBC;EACC,SAAA;APmsBF;;AO/rBA;EACC,eAAA;EACA,QAAA;EACA,MAAA;EACA,WAAA;EACA,aAAA;EACA,kCAAA;EACA,kBAAA;EACA,kDAAA;APksBD;AOjsBC;EACC,mBAAA;APmsBF;AOlsBE;EACC,oCAAA;APosBH;AOjsBC;EACC,kBAAA;EACA,QAAA;EACA,MAAA;EACA,YAAA;EACA,WAAA;EACA,gBAAA;APmsBF;AOjsBC;EACC,kBAAA;EACA,YAAA;EACA,MAAA;EACA,YAAA;EACA,WAAA;EACA,0BAAA;EACA,2HAAA;APmsBF;AOjsBC;EACC,4BAAA;APmsBF;AOjsBC;EACC,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,iBAAA;EACA,oBAAA;APmsBF;AOjsBC;EACC,mBAAA;APmsBF;AOjsBC;EACC,mBAAA;APmsBF;AOjsBC;EACC,iBAAA;EACA,mBAAA;APmsBF;AO5rBC;EACC,aAAA;EACA,eAAA;EACA,mBAAA;EACA,kBAAA;EACA,iBAAA;AP8rBF;AO7rBE;EAND;IAOE,sBAAA;IACA,mBAAA;IACA,iBAAA;EPgsBD;AACF;AO/rBE;EACC,iBAAA;EACA,gBAAA;APisBH;AOhsBG;EAHD;IAIE,gBAAA;EPmsBF;AACF;AO/rBC;EACC,cAAA;EACA,sBAAA;EACA,aAAA;EACA,mBAAA;EACA,kBAAA;EACA,eAAA;EACA,gBAAA;APisBF;;AQh3BC;EACC,oBAAA;EACA,sCAAA;EACA,cAAA;EACA,mBAAA;ARm3BF;AQ92BC;EACC,uBAAA;EACA,eAAA;EACA,gBAAA;EACA,gBAAA;ARg3BF;AQ/2BE;EACC,eAAA;EACA,gBAAA;ARi3BH;;AQ72BA;EACC,yBAAA;EACA,4BAAA;EACA,yzBAAA;ARg3BD;AQ/2BC;EAJD;IAKE,6zBAAA;IACA,kBAAA;ERk3BA;AACF;AQj3BC;EACC,kBAAA;EACA,OAAA;EACA,MAAA;EACA,UAAA;EACA,iBAAA;EACA,oBAAA;EACA,4BAAA;EACA,iBAAA;ARm3BF;AQl3BE;EATD;IAUE,4BAAA;ERq3BD;AACF;AQp3BE;EACC,WAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,WAAA;EACA,YAAA;EACA,2HAAA;EACA,wuDAAA;ARs3BH;AQr3BG;EAVD;IAWE,ksDAAA;ERw3BF;AACF;AQr3BC;EACC,oBAAA;EACA,mBAAA;ARu3BF;AQr3BC;EACC,aAAA;EACA,eAAA;EACA,mBAAA;EACA,uBAAA;EACA,kBAAA;EACA,iBAAA;ARu3BF;AQt3BE;EAPD;IAQE,sBAAA;IACA,cAAA;ERy3BD;AACF;AQx3BE;EACC,iBAAA;EACA,gBAAA;EACA,mBAAA;AR03BH;AQz3BG;EAJD;IAKE,cAAA;ER43BF;AACF;AQz3BC;EACC,mBAAA;AR23BF;AQz3BC;EACC,aAAA;EACA,sBAAA;AR23BF;AQv3BC;EACC,kBAAA;ARy3BF;AQx3BE;EAFD;IAGE,eAAA;ER23BD;EQ13BC;IACC,qCAAA;IACA,kBAAA;ER43BF;AACF;AQ13BE;EACC;IACC,0BAAA;ER43BF;AACF;AQz3BC;EACC,cAAA;EACA,aAAA;EACA,yBAAA;AR23BF;AQv3BC;EACC,yBAAA;EACA,kBAAA;EACA,uBAAA;EACA,eAAA;EACA,kBAAA;EACA,gBAAA;EACA,mBAAA;ARy3BF;;AS/+BA;EACC,eAAA;EACA,OAAA;EACA,MAAA;EACA,2GAAA;EACA,kBAAA;ATk/BD;ASj/BC;EACC,mBAAA;ATm/BF;ASj/BC;EACC,YAAA;EACA,WAAA;ATm/BF;ASj/BC;EACC,aAAA;EACA,mBAAA;EACA,uBAAA;ATm/BF;ASj/BC;EACC,aAAA;EACA,YAAA;ATm/BF;ASj/BC;EACC,yBAAA;ATm/BF;ASj/BC;EACC,kCAAA;ATm/BF;ASj/BC;EACC,oCAAA;ATm/BF;ASj/BC;EACC,kBAAA;EACA,OAAA;EACA,MAAA;ATm/BF;ASj/BC;EACC,oBAAA;EACA,WAAA;ATm/BF;ASj/BC;EACC,gBAAA;ATm/BF;ASl/BE;EAFD;IAGE,oBAAA;ETq/BD;AACF;ASp/BE;EALD;IAME,eAAA;ETu/BD;AACF;ASr/BC;EACC,YAAA;ATu/BF;ASr/BC;EACC,aAAA;EACA,gBAAA;EACA,YAAA;ATu/BF;ASt/BE;EAJD;IAKE,WAAA;ETy/BD;AACF;ASv/BC;EACC,WAAA;EACA,eAAA;EACA,kBAAA;ATy/BF;ASv/BC;EACC,kBAAA;EACA,eAAA;EACA,yEAAA;ATy/BF;ASv/BC;EACC,yBAAA;ATy/BF;ASv/BC;EACC,gBAAA;EACA,WAAA;ATy/BF;ASx/BE;EACC,gBAAA;AT0/BH;ASv/BC;EACC,WAAA;EACA,WAAA;ATy/BF;ASv/BC;EACC,OAAA;ATy/BF;ASv/BC;EACC,YAAA;EACA,UAAA;ATy/BF;ASv/BC;EACC,QAAA;ATy/BF;ASv/BC;EACC,MAAA;EACA,YAAA;EACA,4BAAA;EACA,UAAA;ATy/BF;ASv/BC;EACC,wBAAA;EACA,UAAA;ATy/BF;;AU/lCA;EACC,kBAAA;EACA,mBAAA;AVkmCD;AUjmCC;EAHD;IAIE,kBAAA;IACA,mBAAA;EVomCA;AACF;AUnmCC;EAPD;IAQE,kBAAA;IACA,mBAAA;EVsmCA;AACF;AUrmCC;EACC,mBAAA;EACA,gBAAA;EACA,+CAAA;AVumCF;AUtmCE;EAJD;IAKE,mBAAA;EVymCD;AACF;AUvmCC;EACC,aAAA;EACA,yBAAA;EACA,mBAAA;EACA,oBAAA;AVymCF;AUxmCE;EALD;IAME,oBAAA;EV2mCD;AACF;AUzmCC;EACC,aAAA;EACA,8BAAA;EACA,SAAA;EACA,uBAAA;AV2mCF;AU1mCE;EALD;IAME,uBAAA;EV6mCD;AACF;AU5mCE;EARD;IASE,0BAAA;IACA,SAAA;EV+mCD;AACF;AU9mCE;EAZD;IAaE,aAAA;EVinCD;AACF;AUhnCE;EAfD;IAgBE,aAAA;EVmnCD;AACF;AUjnCC;EACC,kBAAA;EACA,oBAAA;EACA,eAAA;EACA,kBAAA;EACA,gBAAA;EACA,6IAAA;EACA,qBAAA;EACA,6BAAA;EACA,oCAAA;AVmnCF;AUlnCE;EAVD;IAWE,sDAAA;EVqnCD;AACF;AUpnCE;EAbD;IAcE,eAAA;EVunCD;AACF;AUnnCC;EACC,sBAAA;EACA,mBAAA;AVqnCF;AUnnCC;EACC,iBAAA;AVqnCF;AUpnCE;EAFD;IAGE,eAAA;EVunCD;AACF;;AUpnCA;EACC,qBAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;EACA,eAAA;EACA,0BAAA;AVunCD;AUtnCC;EACC,yBAAA;AVwnCF;AUtnCC;EACC,WAAA;EACA,kBAAA;EACA,SAAA;EACA,uBAAA;EACA,UAAA;EACA,aAAA;EACA,yBAAA;EACA,qBAAA;AVwnCF;AUtnCC;EACC,0BAAA;AVwnCF;AUtnCC;EACC,yBAAA;AVwnCF","sourcesContent":["@use \"sass:math\";\r\n@import \"../config.scss\";\r\n@import \"../../../repo/scss/base/null.scss\";\r\n\r\n// Подключение темы (набор цветов)\r\n@import \"./theme.scss\";\r\n\r\n// Подключить если есть локальные файлы шрифтов\r\n@import \"./fonts.scss\";\r\n\r\n// Базовая разметка страницы\r\n:root {\r\n\t--container-save-space: 15px;\r\n\t@media (max-width: $mbpSMEnd) {\r\n\t\t--container-save-space: 10px;\r\n\t}\r\n}\r\n.section-container {\r\n\tmax-width: calc($containerInnerWidth * 1px + var(--container-save-space) * 2);\r\n\tpadding: 0 var(--container-save-space);\r\n\tmargin: auto;\r\n}\r\nbody {\r\n\toverflow-x: hidden;\r\n}\r\n.page {\r\n\t&__main {\r\n\t\tflex: 1 1 auto;\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t}\r\n}\r\n\r\n@import \"./fonts.scss\";\r\n@import \"./typography.scss\";\r\n@import \"./framework.scss\";\r\n@import \"../components/common.scss\";\r\n@import \"../components/header.scss\";\r\n@import \"../components/footer.scss\";\r\n@import \"../components/drawers.scss\";\r\n@import \"../components/cv-request-form.scss\";","* {\r\n\tpadding: 0px;\r\n\tmargin: 0px;\r\n\tborder: 0px;\r\n}\r\n*,\r\n*:before,\r\n*:after {\r\n\tbox-sizing: border-box;\r\n}\r\n:focus,\r\n:active {\r\n\t// outline: none;\r\n}\r\na:focus,\r\na:active {\r\n\t// outline: none;\r\n}\r\nhtml {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tmin-height: 100%;\r\n}\r\nbody {\r\n\tflex: 1 1 auto;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tmin-width: $minWidth + px;\r\n\tcolor: $mainColor;\r\n\tline-height: 1;\r\n\tfont-family: $fontFamily;\r\n\tfont-size: inherit;\r\n\t//text-rendering: optimizeLegibility;\r\n\t-ms-text-size-adjust: 100%;\r\n\t-moz-text-size-adjust: 100%;\r\n\t-webkit-text-size-adjust: 100%;\r\n\t-webkit-font-smoothing: antialiased;\r\n\t-moz-osx-font-smoothing: grayscale;\r\n}\r\ninput,\r\nbutton,\r\ntextarea {\r\n\tfont-family: $fontFamily;\r\n\tfont-size: inherit;\r\n}\r\nbutton {\r\n\tcursor: pointer;\r\n\tcolor: inherit;\r\n\tbackground-color: inherit;\r\n}\r\na {\r\n\tcolor: inherit;\r\n\ttext-decoration: none;\r\n}\r\nul li {\r\n\tlist-style: none;\r\n}\r\nimg {\r\n\tvertical-align: top;\r\n}\r\nh1,\r\nh2,\r\nh3,\r\nh4,\r\nh5,\r\nh6 {\r\n\tfont-weight: inherit;\r\n\tfont-size: inherit;\r\n}\r\n","@use \"sass:math\";\r\n\r\n// Подключение миксинов ===========================================================================================================================================================================================================================================================================\r\n@import \"../../repo/scss/base/mixins\";\r\n\r\n// ============================================================================================================================================================================================================================================================================================================================================================================================\r\n// Настройки шаблона ============================================================================================================================================================================================================================================================================================================================================================================================\r\n// ============================================================================================================================================================================================================================================================================================================================================================================================\r\n\r\n// Шрифт по умолчанию ==============================================================================================================================================================================================================================================================================\r\n$fontFamily: \"Montserrat\";\r\n$fontSize: 16; // где 14(px) - размер шрифта по умолчанию из макета\r\n$mainColor: #212121; // Цвет шрифта по умолчанию\r\n\r\n// Минимальная ширина страницы\r\n$minWidth: 280;\r\n// Ширина полотна (макета)\r\n$maxWidth: 1920;\r\n// Ширина ограничивающего контейнера (0 = нет ограничения)\r\n$containerInnerWidth: 1360;\r\n\r\n// Брейк-поинты точки преломления без единиц измерения\r\n$mbpPCNu: $maxWidth;  \t// Максимальная ширина по макету\r\n$mbpSPCNu: 1440; \t\t\t\t// Небольшие мониторы ПК, ноутбуки\r\n$mbpTNu: 1024;\t\t\t\t\t// Планшеты, некоторые телефоны в горизонтальном, ноутбуки\r\n$mbpMNu: 768;\t\t\t\t\t\t// Телефоны L\r\n$mbpSMNu: 520;\t\t\t\t\t// Телефоны S\r\n$mbpESMNu: 375;\t\t\t\t\t// Телефоны XS\r\n\r\n$mbpPCEndNu: $maxWidth; \r\n$mbpSPCEndNu: 1440;\r\n$mbpTEndNu: 1024;\r\n$mbpMEndNu: 768;\r\n$mbpSMEndNu: 520;\r\n$mbpESMEndNu: 375;\r\n\r\n// наименьшая ширина промежутка\r\n$mbpPCStartNu: $mbpSPCEndNu + 0.1;\r\n$mbpSPCStartNu: $mbpTEndNu + 0.1;\r\n$mbpTStartNu: $mbpMEndNu + 0.1;\r\n$mbpMStartNu: $mbpSMEndNu + 0.1;\r\n$mbpSMStartNu: $mbpESMEndNu + 0.1;\r\n\r\n\r\n// Брейк-поинты / наибольшая ширина промежутка\r\n$mbpPCEnd: px($mbpPCEndNu); \r\n$mbpSPCEnd: px($mbpSPCEndNu);\r\n$mbpTEnd: px($mbpTEndNu);\r\n$mbpMEnd: px($mbpMEndNu);\r\n$mbpSMEnd: px($mbpSMEndNu);\r\n$mbpESMEnd: px($mbpESMEndNu);\r\n// наименьшая ширина промежутка\r\n$mbpPCStart: px($mbpPCStartNu);\r\n$mbpSPCStart: px($mbpSPCStartNu);\r\n$mbpTStart: px($mbpTStartNu);\r\n$mbpMStart: px($mbpMStartNu);\r\n$mbpSMStart: px($mbpSMStartNu);\r\n\r\n$mbpBurgerTime: 1150px;",":root {\r\n\t--main-white-color: #EFEFEF;\r\n\t--white-color:  white;\r\n\t--black-color: #28282C;\r\n\t--deep-black-color: #1E1E1E;\r\n\t--sand-color: #FBD691;\r\n}","@font-face {\r\n\tfont-family: 'Thunder';\r\n\tsrc: local('☺'), url('../fonts/Thunder-BoldLC.woff') format('woff'),url('../fonts/Thunder-BoldLC.woff2') format('woff2');\r\n\tfont-weight: 700;\r\n\tfont-style: normal;\r\n\tfont-display: swap;\r\n}\r\n@font-face {\r\n\tfont-family: 'Thunder';\r\n\tsrc: local('☺'), url('../fonts/Thunder-BoldLCItalic.woff') format('woff'),url('../fonts/Thunder-BoldLCItalic.woff2') format('woff2');\r\n\tfont-weight: 700;\r\n\tfont-style: italic;\r\n\tfont-display: swap;\r\n}\r\n@font-face {\r\n\tfont-family: 'Thunder';\r\n\tsrc: local('☺'), url('../fonts/Thunder-SemiBoldLCItalic.woff') format('woff'),url('../fonts/Thunder-SemiBoldLCItalic.woff2') format('woff2');\r\n\tfont-weight: 600;\r\n\tfont-style: italic;\r\n\tfont-display: swap;\r\n}\r\n@font-face {\r\n\tfont-family: 'Thunder-Extra';\r\n\tsrc: local('☺'), url('../fonts/Thunder-ExtraBoldLC.woff') format('woff'),url('../fonts/Thunder-ExtraBoldLC.woff2') format('woff2');\r\n\tfont-weight: 700;\r\n\tfont-style: normal;\r\n\tfont-display: swap;\r\n}\r\n","[data-scrollable] {\r\n\toverflow: auto;\r\n}\r\n// Анимирование подчеркивание при наведении\r\n.underline-in, .underline-out {\r\n\tposition: relative;\r\n\t&:after {\r\n\t\tcontent: \"\";\r\n\t\tdisplay: block;\r\n\t\tposition: absolute;\r\n\t\tbottom: -0.2em;\r\n\t\theight: 1px;\r\n\t\tbackground: var(--color);\r\n\t\topacity: 0.7;\r\n\t\ttransition: background-color 0.4s, left 0.4s, width 0.4s;\r\n\t}\r\n\t&:hover:after, &.active:after {\r\n\t\tbackground: var(--hover-color);\r\n\t}\r\n}\r\n.underline-in {\r\n\t&:after {\r\n\t\twidth: 0;\r\n\t\tleft: 50%;\r\n\t}\r\n\t&:hover:after, &.active:after {\r\n\t\twidth: 100%;\r\n\t\tleft: 0;\r\n\t}\r\n}\r\n.underline-out {\r\n\t&:after {\r\n\t\twidth: 100%;\r\n\t\tleft: 0;\r\n\t}\r\n\t&:hover:after, &.active:after {\r\n\t\twidth: 0;\r\n\t\tleft: 50%;\r\n\t}\r\n}\r\n[data-portal-src][data-portal-active] {\r\n\tdisplay: none;\r\n}\r\n[data-portal-dest]:not([data-portal-active]) {\r\n\tdisplay: none;\r\n}\r\n// Small components\r\n// Кнопка или ссылка без контейнера\r\n.text-link {\r\n\tcolor: var(--color, white);\r\n\tfont-size: var(--font-size, 18px);\r\n\ttransition: color 0.4s;\r\n\t&_underline {\r\n\t\ttext-decoration: underline;\r\n\t}\r\n\t&:hover, &.active {\r\n\t\tcolor: var(--hover-color, #9DF850);\r\n\t}\r\n}\r\n.backgroung-img {\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\theight: 100%;\r\n\twidth: 100%;\r\n\tz-index: -1;\r\n\t> img {\r\n\t\theight: 100%;\r\n\t\twidth: 100%;\r\n\t\tobject-fit: cover;\r\n\t\tobject-position: center bottom;\r\n\t}\r\n\t&_center > img {\r\n\t\tobject-position: center;\r\n\t}\r\n}\r\n.img-wrap {\r\n\tdisplay: block;\r\n\tposition: relative;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\tz-index: 0;\r\n\t&_zoom-on-hover, &_zoom-on-parent-hover {\r\n\t\toverflow: hidden;\r\n\t\tcursor: pointer;\r\n\t\t> img {\r\n\t\t\ttransition: top 0.3s, left 0.3s, width 0.3s, height 0.3s;\r\n\t\t}\r\n\t}\r\n\t&_overlay-on-hover, &_overlay-on-parent-hover {\r\n\t\t&::after {\r\n\t\t\tcontent: \"\";\r\n\t\t\tposition: absolute;\r\n\t\t\tleft: 0;\r\n\t\t\ttop: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t\ttransition: background-color 0.3s;\r\n\t\t}\r\n\t}\r\n\t&_bg {\r\n\t\tposition: absolute;\r\n\t\twidth: 100%;\r\n\t\theight: 100%;\r\n\t\tz-index: -1;\r\n\t}\r\n\t> img {\r\n\t\tposition: absolute;\r\n\t\ttop: 0;\r\n\t\tleft: 0;\r\n\t\twidth: 100%;\r\n\t\theight: 100%;\r\n\t\tobject-fit: cover;\r\n\t\tobject-position: center;\r\n\t}\r\n\t&_contain > img {\r\n\t\tobject-fit: contain;\r\n\t}\r\n\t&_zoom-on-hover:hover, *:hover > &_zoom-on-parent-hover {\r\n\t\t> img {\r\n\t\t\ttop: -5%;\r\n\t\t\tleft: -5%;\r\n\t\t\twidth: 110%;\r\n\t\t\theight: 110%;\r\n\t\t}\r\n\t}\r\n\r\n\t&_contain > img {\r\n\t\tobject-fit: contain;\r\n\t}\r\n}\r\n.logo {\r\n\tfont-size: 22px;\r\n\t& > figure {\r\n\t\tdisplay: flex;\r\n\t}\r\n\t&__img {\r\n\t\twidth: 3.18em;\r\n\t\theight: 2.27em;\r\n\t\tmargin-right: 0.4em;\r\n\t\tobject-fit: contain;\r\n\t}\r\n\t&__cap {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t\tjustify-content: flex-end;\r\n\t\talign-items: flex-end;\r\n\t\tfont-family: Raleway;\r\n\t\tcolor: #FFF;\r\n\t\ttext-transform: uppercase;\r\n\t\ttransition: color 0.4s;\r\n\t\t& > *:first-child {\r\n\t\t\tfont-size: 1em;\r\n\t\t\t& > strong {\r\n\t\t\t\tfont-size: 1em;\r\n\t\t\t\tfont-weight: 800;\r\n\t\t\t}\r\n\t\t}\r\n\t\t& > *:last-child {\r\n\t\t\tfont-size: 0.64em;\r\n\t\t}\r\n\t}\r\n\t&:hover &__cap {\r\n\t\tcolor: #9DF850;\r\n\t}\r\n}\r\n.lang-switch {\r\n\t--color: white;\r\n\t--hover-color: #9DF850;\r\n\tfont-size: var(--font-size);\r\n\tfont-weight: 400;\r\n\tcolor: var(--color);\r\n\t& ul {\r\n\t\tdisplay: flex;\r\n\t}\r\n\t& ul > li {\r\n\t\t&:not(:last-child)::after {\r\n\t\t\tcontent: \"/\";\r\n\t\t\tmargin: 0.3em;\r\n\t\t}\r\n\t}\r\n}\r\n.social-media {\r\n\t& > ul {\r\n\t\tdisplay: flex;\r\n\t\tjustify-content: center;\r\n\t\tmargin-left: -20px;\r\n\t\tmargin-top: -18px;\r\n\t\tpointer-events: none;\r\n\t\t& > * {\r\n\t\t\tdisplay: flex;\r\n\t\t\talign-items: center;\r\n\t\t\tmargin-left: 20px;\r\n\t\t\tmargin-top: 18px;\r\n\t\t\tpointer-events: all;\r\n\t\t}\r\n\t}\r\n}\r\n.social-media-link {\r\n\tflex: 0 0 auto;\r\n\tdisplay: inline-block;\r\n\twidth: 24px;\r\n\theight: 24px;\r\n\tfill: #FFFFFF;\r\n\tfont-size: 0;\r\n\t& > .svg-icon {\r\n\t\twidth: 100%;\r\n\t\theight: 100%;\r\n\t\ttransition: fill 0.4s;\r\n\t}\r\n\t&:hover > .svg-icon {\r\n\t\tfill: #9DF850;\r\n\t}\r\n}\r\n.swipe-area-pointer {\r\n\tdisplay: inline-block;\r\n\t&__icon {\r\n\t\tposition: relative;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\twidth: 32px;\r\n\t\theight: 32px;\r\n\t\tfill: #2A004E;\r\n\t\tstroke: #2A004E;\r\n\t\tz-index: 0;\r\n\t\tanimation: swipe-area-pointer 1.2s linear infinite;\r\n\t}\r\n}\r\n@keyframes swipe-area-pointer {\r\n\t0% {\r\n\t\tleft: 0;\r\n\t}\r\n\t40% {\r\n\t\tleft: -20px;\r\n\t}\r\n\t100% {\r\n\t\tleft: 0;\r\n\t}\r\n}\r\n.btn {\r\n\tdisplay: inline-flex;\r\n\tposition: relative;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\tfont-family: Thunder;\r\n\tfont-size: 28px;\r\n\tline-height: 0.8;\r\n\tfont-weight: 700;\r\n\tletter-spacing: 0.2px;\r\n\tborder-radius: 50px;\r\n\t& .svg-icon {\r\n\t\tflex: 0 0 auto;\r\n\t\twidth: 24px;\r\n\t\ttransition: fill 0.4s, stroke 0.4s;\r\n\t\t&:first-child {\r\n\t\t\tmargin-right: 10px;\r\n\t\t}\r\n\t}\r\n\t&_bright {\r\n\t\tcolor: black;\r\n\t\tbackground-color: #FAFF00;\r\n\t\ttransition: box-shadow 0.4s;\r\n\t\t& .svg-icon {\r\n\t\t\tstroke: #1F1F1F;\r\n\t\t\twidth: 32px;\r\n\t\t}\r\n\t}\r\n\t&_bright:hover {\r\n\t\tbox-shadow: 0px 0px 40px 0px rgba(117, 255, 0, 0.60);\r\n\t}\r\n\t&_dark {\r\n\t\tposition: relative;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\tz-index: 0;\r\n\t\tcolor: white;\r\n\t\tbackground-color: #161616;\r\n\t\ttransition: box-shadow 0.4s;\r\n\t\t&::after {\r\n\t\t\tcontent: \"\";\r\n\t\t\tposition: absolute;\r\n\t\t\tleft: 0;\r\n\t\t\ttop: 0;\r\n\t\t\tz-index: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t\tbackground-color: transparent;\r\n\t\t\ttransition: background-color 0.4s 0.3s;\r\n\t\t}\r\n\t\t& .svg-icon {\r\n\t\t\tfill: #9DF850;\r\n\t\t\tstroke: #9DF850;\r\n\t\t}\r\n\t}\r\n\t&_dark:hover {\r\n\t\tcolor: white;\r\n\t\tbox-shadow: 0px 0px 30px 0px rgba(117, 255, 0, 0.50);\r\n\t\t&::after {\r\n\t\t\tbackground-color: #9DF85014;\r\n\t\t}\r\n\t\t& .svg-icon {\r\n\t\t\tfill: white;\r\n\t\t\tstroke: white;\r\n\t\t}\r\n\t}\r\n\t&__bg {\r\n\t\tposition: absolute;\r\n\t}\r\n\t&_bright &__bg {\r\n\t\twidth: 100%;\r\n\t\theight: 100%;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\tborder-radius: inherit;\r\n\t\tbackground-color: #75FF00;\r\n\t\ttransition: width 0.4s;\r\n\t\t&::before, &::after {\r\n\t\t\tcontent: \"\";\r\n\t\t\tposition: absolute;\r\n\t\t\tleft: 0;\r\n\t\t\ttop: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t\tborder-radius: inherit;\r\n\t\t}\r\n\t\t&::before {\r\n\t\t\tz-index: 1;\r\n\t\t\tbackground: #6FF100;\r\n\t\t\ttransition: width 0.4s;\r\n\t\t}\r\n\t\t&::after {\r\n\t\t\tz-index: 2;\r\n\t\t\tbackground: #65DD00;\r\n\t\t\topacity: 0;\r\n\t\t\ttransition: width 0.4s, opacity 0.4s;\r\n\t\t}\r\n\t}\r\n\t&_bright:hover &__bg {\r\n\t\twidth: calc(100% - 20px);\r\n\t\t&::before {\r\n\t\t\twidth: calc(100% - 20px);\r\n\t\t}\r\n\t\t&::after {\r\n\t\t\twidth: calc(100% - 40px);\r\n\t\t\topacity: 1;\r\n\t\t}\r\n\t}\r\n\t&_dark &__bg {\r\n\t\twidth: calc(100% - 22px);\r\n\t\theight: 100%;\r\n\t\tleft: 11px;\r\n\t\ttop: 0;\r\n\t\tborder-radius: inherit;\r\n\t\tbackground-color: rgba(157, 248, 80, 0.08);\r\n\t\ttransition: opacity 0.4s 0.2s;\r\n\t\topacity: 0;\r\n\t\t&::before, &::after {\r\n\t\t\tcontent: \"\";\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 0;\r\n\t\t\theight: 100%;\r\n\t\t\tborder-radius: inherit;\r\n\t\t\tbackground-color: inherit;\r\n\t\t\topacity: 0;\r\n\t\t}\r\n\t\t&::before {\r\n\t\t\twidth: calc(100% - 22px);\r\n\t\t\tleft: 11px;\r\n\t\t\tz-index: 1;\r\n\t\t\ttransition: opacity 0.4s 0.1s;\r\n\t\t}\r\n\t\t&::after {\r\n\t\t\twidth: calc(100% - 44px);\r\n\t\t\tleft: 22px;\r\n\t\t\tz-index: 2;\r\n\t\t\ttransition: opacity 0.4s;\r\n\t\t}\r\n\t}\r\n\t&_dark:hover &__bg {\r\n\t\topacity: 1;\r\n\t\t&::before {\r\n\t\t\topacity: 1;\r\n\t\t}\r\n\t\t&::after {\r\n\t\t\topacity: 1;\r\n\t\t}\r\n\t}\r\n\t&__inner {\r\n\t\tdisplay: flex;\r\n\t\talign-items: center;\r\n\t\tposition: relative;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\tz-index: 3;\r\n\t\tpadding: 11px 30px 10px;\r\n\t}\r\n\t&__cap {\r\n\t\tflex: 0 0 auto;\r\n\t\tposition: relative;\r\n\t\tleft: 0;\r\n\t\ttop: 0.15em;\r\n\t}\r\n}\r\n.disclosure {\r\n\tdisplay: grid;\r\n\tgrid-template-rows: 0fr;\r\n\toverflow: hidden;\r\n\ttransition: grid-template-rows 0.4s;\r\n\t&.open {\r\n\t\tgrid-template-rows: 1fr;\r\n\t}\r\n\t&__inner {\r\n\t\tmin-height: 0;\r\n\t}\r\n}\r\n.text-btn {\r\n\tdisplay: inline-grid;\r\n\tgrid-auto-flow: column;\r\n\talign-items: center;\r\n\tgap: 4px;\r\n\tcolor: #161616;\r\n\tfont-family: Thunder;\r\n\tfont-size: 24px;\r\n\tfont-weight: 700;\r\n\tletter-spacing: 0.48px;\r\n\ttransition: color 0.4s;\r\n\t&:hover {\r\n\t\tcolor: #C279FF;\r\n\t}\r\n\t& > .svg-icon {\r\n\t\tposition: relative;\r\n\t\tleft: 0;\r\n\t\ttop: -0.1em;\r\n\t\tz-index: 0;\r\n\t\twidth: 0.66em;\r\n\t\tfill: #161616;\r\n\t\ttransition: transform 0.4s, fill 0.4s;\r\n\t}\r\n\t&:hover > .svg-icon {\r\n\t\tfill: #C279FF;\r\n\t\ttransform: translateX(0.1em);\r\n\t}\r\n}","$--linesOnHoverColor: #9DF850;\r\n$--linesDefaultColor: #FFFFFF;\r\n\r\n.burger-btn {\r\n\t--width: 40px;\r\n\t--height: 40px;\r\n\t--line-height: 3px;\r\n\t--line-width: 32px;\r\n\t--border-radius: 1.5px;\r\n\t--space-between: 7px;\r\n\t--icon-height: calc(var(--line-height) * 3 + var(--space-between) * 2);\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n  min-height: var(--width);\r\n\tmin-width: var(--height);\r\n\ttransition: color 0.3s;\r\n\tfont-size: 0;\r\n\t@media (max-width: $mbpMEnd) {\r\n\t\t--width: 30px;\r\n\t\t--height: 30px;\r\n\t\t--line-width: 26px;\r\n\t\t--line-height: 2px;\r\n\t\t--space-between: 5px;\r\n\t}\r\n\t&__icon {\r\n\t\tposition: relative;\r\n\t\ttop: 0;\r\n\t\tleft: 0;\r\n\t\tdisplay: block;\r\n\t\twidth: var(--line-width);\r\n\t\theight: var(--icon-height);\r\n\t\ttransition: 0.3s all;\r\n\t\t& > span {\r\n\t\t\tposition: absolute;\r\n\t\t\tdisplay: block;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: var(--line-height);\r\n\t\t\tborder-radius: var(--border-radius);\r\n\t\t\tbackground-color: $--linesDefaultColor;\r\n\t\t\ttransition: transform 0.4s, top 0.2s, background-color 0.4s;\r\n\t\t\t&:first-child {\r\n\t\t\t\ttop: 0;\r\n\t\t\t}\r\n\t\t\t&:nth-child(2) {\r\n\t\t\t\ttop: calc(var(--line-height) + var(--space-between));\r\n\t\t\t\ttransition: transform 0.4s, top 0.2s, background-color 0.1s;\r\n\t\t\t\ttransition-delay: 0.2s, 0s;\r\n\t\t\t}\r\n\t\t\t&:last-child {\r\n\t\t\t\ttop: calc((var(--line-height) + var(--space-between)) * 2);\r\n\t\t\t\ttransition: all 0.4s;\r\n  \t\t\ttransition-delay: 0.1s;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\t&:hover {\r\n\t\tcolor: $--linesOnHoverColor;\r\n\t\t& > span {\r\n\t\t\t& > span {\r\n\t\t\t\tbackground-color: $--linesOnHoverColor;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\t&.active &__icon {\r\n\t\ttop: calc(var(--icon-height) * -0.1);\r\n\t}\r\n\t&.active {\r\n\t\t& > span {\r\n\t\t\t& > span {\r\n\t\t\t\tbackground-color: $--linesOnHoverColor;\r\n\t\t\t\t&:first-child {\r\n\t\t\t\t\ttop: calc(var(--icon-height) / 2);\r\n\t\t\t\t\ttransform: rotate(135deg);\r\n\t\t\t\t}\r\n\t\t\t\t&:nth-child(2) {\r\n\t\t\t\t\ttop: calc(var(--icon-height) / 2);\r\n\t\t\t\t\ttransform: rotate(-135deg);\r\n\t\t\t\t}\r\n\t\t\t\t&:last-child {\r\n\t\t\t\t\ttop: 0;\r\n\t\t\t\t\topacity: 0;\r\n\t\t\t\t\ttransform: rotate(180deg);\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}","@import \"../components/burger-btn.scss\";\r\n\r\n.header {\r\n\tposition: fixed;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\twidth: 100%;\r\n\tz-index: 10;\r\n\tbackground-color: transparent; // Temporary\r\n\ttransition: background-color ease-in 0.3s;\r\n\tpadding: 15px 0;\r\n\ttransition: background-color 0.4s;\r\n\thtml:not(.is-mobile) body.lock & {\r\n\t\twidth: calc(100% - 17px);\r\n\t}\r\n\t.scroll-80-plus & {\r\n\t\tbackground-color: #2f0252b0;\r\n\t\tbackdrop-filter: blur(10px);\r\n\t}\r\n\t@media (max-width: $mbpMEnd) {\r\n\t\tpadding: 10px 0;\r\n\t}\r\n\t&__container {\r\n\t\tdisplay: grid;\r\n\t\tgrid-template-columns: minmax(max-content, 1fr) auto minmax(max-content, 1fr);\r\n\t\tgap: 30px;\r\n\t\talign-items: center;\r\n\t\t@media (max-width: $mbpBurgerTime) {\r\n\t\t\tgrid-template-columns: minmax(max-content, 1fr) minmax(max-content, 1fr);\r\n\t\t}\r\n\t\t@media (max-width: $mbpESMEnd) {\r\n\t\t\tgap: 20px;\r\n\t\t}\r\n\t}\r\n\t&__group {\r\n\t\tdisplay: inline-flex;\r\n\t\tjustify-content: flex-end;\r\n\t\talign-items: center;\r\n\t\tmargin-left: -40px;\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tmargin-left: -22px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpESMEnd) {\r\n\t\t\tmargin-left: -18px;\r\n\t\t}\r\n\t\t& > * {\r\n\t\t\tmargin-left: 40px;\r\n\t\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\t\tmargin-left: 22px;\r\n\t\t\t}\r\n\t\t\t@media (max-width: $mbpESMEnd) {\r\n\t\t\t\tmargin-left: 18px;\r\n\t\t\t}\r\n\t\t}\r\n\t\t\r\n\t}\r\n\t&__logo {\r\n\t\tjustify-self: start;\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tfont-size: 16px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpESMEnd) {\r\n\t\t\tfont-size: 14px;\r\n\t\t}\r\n\t}\r\n\t&__nav {\r\n\t\t@media (max-width: $mbpBurgerTime) {\r\n\t\t\tdisplay: none;\r\n\t\t}\r\n\t}\r\n\t&__lang-switch {\r\n\t\t--font-size: 20px;\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\t--font-size: 16px;\r\n\t\t}\r\n\t}\r\n\t&__social-media {\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tdisplay: none;\r\n\t\t}\r\n\t}\r\n\t&__burger-btn {\r\n\t\tz-index: 1000;\r\n\t\t@media (min-width: ($mbpBurgerTime + 0.1px)) {\r\n\t\t\tdisplay: none;\r\n\t\t}\r\n\t}\r\n\t&__burger-menu {\r\n\t\tmargin: 0;\r\n\t}\r\n}\r\n\r\n.burger-menu {\r\n\tposition: fixed;\r\n\tright: 0;\r\n\ttop: 0;\r\n\twidth: 100%;\r\n\theight: 100vh;\r\n\tbackground-color: rgba($color: #000000, $alpha: 0.0);\r\n\tvisibility: hidden;\r\n\ttransition: background-color 0.4s, visibility 0.4s;\r\n\t&.open {\r\n\t\tvisibility: visible;\r\n\t\t&.upper-overlapping {\r\n\t\t\tbackground-color: rgba($color: #000000, $alpha: 0.3);\r\n\t\t}\r\n\t}\r\n\t&__panel {\r\n\t\tposition: absolute;\r\n\t\tright: 0;\r\n\t\ttop: 0;\r\n\t\theight: 100%;\r\n\t\twidth: 100%;\r\n\t\tmax-width: 460px;\r\n\t}\r\n\t&__inner {\r\n\t\tposition: relative;\r\n\t\tright: -100%;\r\n\t\ttop: 0;\r\n\t\theight: 100%;\r\n\t\twidth: 100%;\r\n\t\ttransition: transform 0.4s;\r\n\t\tbackground: linear-gradient(170deg, #161616 0%, #260046 32.29%, #2A004E 57.29%, #500092 78.65%, #3A006A 100%, #2A004E 100%);\r\n\t}\r\n\t&.open &__inner {\r\n\t\ttransform: translateX(-100%);\r\n\t}\r\n\t&__container {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t\talign-items: center;\r\n\t\tpadding-top: 60px;\r\n\t\tpadding-bottom: 60px;\r\n\t}\r\n\t&__logo {\r\n\t\tmargin-bottom: 50px;\r\n\t}\r\n\t&__nav {\r\n\t\tmargin-bottom: 50px;\r\n\t}\r\n\t&__lang-switch {\r\n\t\t--font-size: 20px;\r\n\t\tmargin-bottom: 60px;\r\n\t}\r\n\t&__social-media {\r\n\r\n\t}\r\n}\r\n.main-nav {\r\n\t& ul {\r\n\t\tdisplay: flex;\r\n\t\tflex-wrap: wrap;\r\n\t\talign-items: center;\r\n\t\tmargin-left: -32px;\r\n\t\tmargin-top: -18px;\r\n\t\t@media (max-width: $mbpBurgerTime) {\r\n\t\t\tflex-direction: column;\r\n\t\t\talign-items: center;\r\n\t\t\tmargin-top: -32px;\r\n\t\t}\r\n\t\t& > * {\r\n\t\t\tmargin-left: 32px;\r\n\t\t\tmargin-top: 18px;\r\n\t\t\t@media (max-width: $mbpBurgerTime) {\r\n\t\t\t\tmargin-top: 32px;\r\n\t\t\t}\r\n\t\t}\r\n\t\t\r\n\t}\r\n\t& ul > li {\r\n\t\t--color: white;\r\n\t\t--hover-color: #9DF850;\r\n\t\tdisplay: flex;\r\n\t\talign-items: center;\r\n\t\ttext-align: center;\r\n\t\tfont-size: 20px;\r\n\t\tfont-weight: 500;\r\n\t}\r\n}",".footer-nav {\r\n\t& > ul {\r\n\t\tdisplay: inline-grid;\r\n\t\tgrid-template-columns: repeat(2, auto);\r\n\t\tgap: 20px 32px;\r\n\t\talign-items: center;\r\n\t\t// @media (max-width: 1150px) {\r\n\t\t// \tgrid-template-columns: auto;\r\n\t\t// }\r\n\t}\r\n\t& > ul > li {\r\n\t\tfont-family: Montserrat;\r\n\t\tfont-size: 18px;\r\n\t\tmax-width: 200px;\r\n\t\tline-height: 1.3;\r\n\t\t& > strong {\r\n\t\t\tfont-size: 20px;\r\n\t\t\tfont-weight: 500;\r\n\t\t}\r\n\t}\r\n}\r\n.footer {\r\n\tbackground-color: #C279FF;\r\n\tpadding: 40px 20px 30px 20px;\r\n\tclip-path: polygon(0px 40.038px, 0px 40.038px, 0.5588472px 33.3309693514px, 2.1736176px 26.9914936112px, 4.7516544px 21.1077370878px, 8.2003008px 15.7678640896px, 12.4269px 11.060038925px, 17.3387952px 7.0724259024px, 22.8433296px 3.8931893302px, 28.8478464px 1.6104935168px, 35.2596888px 0.3125027706px, 41.9862px 0.0873814px, calc(100% - 64.15px) 66.4018px, calc(100% - 64.15px) 66.4018px, calc(100% - 58.6237px) 67.0616897px, calc(100% - 53.344px) 68.4483216px, calc(100% - 48.3667px) 70.5120199px, calc(100% - 43.7476px) 73.2031088px, calc(100% - 39.5425px) 76.4719125px, calc(100% - 35.8072px) 80.2687552px, calc(100% - 32.5975px) 84.5439611px, calc(100% - 29.9692px) 89.2478544px, calc(100% - 27.9781px) 94.3307593px, calc(100% - 26.68px) 99.743px, calc(100% - 0px) calc(100% - 0px), 0px calc(100% - 0px), 0px 40.038px);\r\n\t@media (max-width: $mbpMEnd) {\r\n\t\tclip-path: polygon(0px 40.7197px, 0px 40.7197px, 0.6211191px 33.64152803px, 2.4098208px 26.99400864px, 5.2541217px 20.87511661px, 9.0420384px 15.38282672px, 13.6615875px 10.61511375px, 19.0007856px 6.66995248px, 24.9476493px 3.64531769px, 31.3901952px 1.63918416px, 38.2164399px 0.74952667px, 45.3144px 1.07432px, calc(100% - 36.521px) 40.3725px, calc(100% - 36.521px) 40.3725px, calc(100% - 30.743631px) 41.5828094px, calc(100% - 25.323808px) 43.5779392px, calc(100% - 20.319857px) 46.2915318px, calc(100% - 15.790104px) 49.6572296px, calc(100% - 11.792875px) 53.608675px, calc(100% - 8.386496px) 58.0795104px, calc(100% - 5.6292930000001px) 63.0033782px, calc(100% - 3.579592px) 68.3139208px, calc(100% - 2.295719px) 73.9447806px, calc(100% - 1.8360000000001px) 79.8296px, calc(100% - 0px) calc(100% - 0px), 0px calc(100% - 0px), 0px 40.7197px); \r\n\t\tpadding: 20px 10px;\r\n\t}\r\n\t&__container {\r\n\t\tposition: relative;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\tz-index: 0;\r\n\t\tpadding-top: 40px;\r\n\t\tpadding-bottom: 15px;\r\n\t\t--container-save-space: 60px;\r\n\t\tmax-width: 1620px;\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\t--container-save-space: 10px;\r\n\t\t}\r\n\t\t&::before {\r\n\t\t\tcontent: \"\";\r\n\t\t\tposition: absolute;\r\n\t\t\tleft: 0;\r\n\t\t\ttop: 0;\r\n\t\t\tz-index: -1;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t\tbackground: linear-gradient(170deg, #161616 0%, #260046 32.29%, #2A004E 57.29%, #500092 78.65%, #3A006A 100%, #2A004E 100%);\r\n\t\t\tclip-path: polygon(0.5936px 35.6126px, 0.5936px 35.6126px, 0.23286309px 30.12755794px, 0.84287392px 24.84791832px, 2.34335183px 19.86504098px, 4.65401616px 15.27028576px, 7.69458625px 11.1550125px, 11.38478144px 7.61058104px, 15.64432107px 4.72835122px, 20.39292448px 2.59968288px, 25.55031101px 1.31593586px, 31.0362px 0.96847px, calc(100% - 48.04px) 36.4413px, calc(100% - 48.04px) 36.4413px, calc(100% - 43.89656px) 36.8396239px, calc(100% - 39.92448px) 37.7840912px, calc(100% - 36.16612px) 39.2387853px, calc(100% - 32.66384px) 41.1677896px, calc(100% - 29.46px) 43.5351875px, calc(100% - 26.59696px) 46.3050624px, calc(100% - 24.11708px) 49.4414977px, calc(100% - 22.06272px) 52.9085768px, calc(100% - 20.47624px) 56.6703831px, calc(100% - 19.4px) 60.691px, calc(100% - 0.97000000000003px) calc(100% - 35.739px), calc(100% - 0.97000000000003px) calc(100% - 35.739px), calc(100% - 0.40759999999977px) calc(100% - 30.237462px), calc(100% - 0.83399999999961px) calc(100% - 24.909696px), calc(100% - 2.1706000000001px) calc(100% - 19.851174px), calc(100% - 4.3388px) calc(100% - 15.157368px), calc(100% - 7.26px) calc(100% - 10.92375px), calc(100% - 10.8556px) calc(100% - 7.245792px), calc(100% - 15.047px) calc(100% - 4.218966px), calc(100% - 19.7556px) calc(100% - 1.938744px), calc(100% - 24.9028px) calc(100% - 0.50059800000002px), calc(100% - 30.41px) calc(100% - 2.8421709430404E-14px), 50.6557px calc(100% - 0px), 50.6557px calc(100% - 0px), 46.2983333px calc(100% - 0.315676px), 42.1213464px calc(100% - 1.2350479999999px), 38.1732391px calc(100% - 2.716632px), 34.5025112px calc(100% - 4.718944px), 31.1576625px calc(100% - 7.2005px), 28.1871928px calc(100% - 10.119816px), 25.6396019px calc(100% - 13.435408px), 23.5633896px calc(100% - 17.105792px), 22.0070557px calc(100% - 21.089484px), 21.0191px calc(100% - 25.345px), 0.5936px 35.6126px); \r\n\t\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\t\tclip-path: polygon(0px 30.2974px, 0px 30.2974px, 0.4492385px 25.086216501px, 1.74448px 20.180904008px, 3.8070135px 15.652379527px, 6.558128px 11.571560064px, 9.9191125px 8.009362625px, 13.811256px 5.036704216px, 18.1558475px 2.724501843px, 22.874176px 1.143672512px, 27.8875305px 0.365133229px, 33.1172px 0.459801px, calc(100% - 26.883px) 31.2789px, calc(100% - 26.883px) 31.2789px, calc(100% - 22.417479px) 32.0874635px, calc(100% - 18.220032px) 33.520228px, calc(100% - 14.338233px) 35.5243845px, calc(100% - 10.819656px) 38.047124px, calc(100% - 7.711875px) 41.0356375px, calc(100% - 5.062464px) 44.437116px, calc(100% - 2.918997px) 48.1987505px, calc(100% - 1.3290479999999px) 52.267732px, calc(100% - 0.340191px) 56.5912515px, calc(100% - 5.6843418860808E-14px) 61.1165px, calc(100% - 0px) calc(100% - 30px), calc(100% - 0px) calc(100% - 30px), calc(100% - 0.39263699999998px) calc(100% - 25.133733px), calc(100% - 1.529376px) calc(100% - 20.517504px), calc(100% - 3.348459px) calc(100% - 16.213071px), calc(100% - 5.788128px) calc(100% - 12.282192px), calc(100% - 8.786625px) calc(100% - 8.786625px), calc(100% - 12.282192px) calc(100% - 5.788128px), calc(100% - 16.213071px) calc(100% - 3.348459px), calc(100% - 20.517504px) calc(100% - 1.529376px), calc(100% - 25.133733px) calc(100% - 0.39263700000004px), calc(100% - 30px) calc(100% - 0px), 30px calc(100% - 0px), 30px calc(100% - 0px), 25.1338545px calc(100% - 0.39263699999998px), 20.517696px calc(100% - 1.5293759999998px), 16.2132915px calc(100% - 3.348459px), 12.282408px calc(100% - 5.788128px), 8.7868125px calc(100% - 8.786625px), 5.788272px calc(100% - 12.282192px), 3.3485535px calc(100% - 16.213071px), 1.529424px calc(100% - 20.517504px), 0.3926505px calc(100% - 25.133733px), 4.9666805852231E-31px calc(100% - 30px), 0px 30.2974px); \r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\t&__body {\r\n\t\tpointer-events: none;\r\n\t\tmargin-bottom: 30px;\r\n\t}\r\n\t&__body-inner {\r\n\t\tdisplay: flex;\r\n\t\tflex-wrap: wrap;\r\n\t\talign-items: center;\r\n\t\tjustify-content: center;\r\n\t\tmargin-left: -90px;\r\n\t\tmargin-top: -30px;\r\n\t\t@media (max-width: 900px) {\r\n\t\t\tflex-direction: column;\r\n\t\t\tmargin-left: 0;\r\n\t\t}\r\n\t\t& > * {\r\n\t\t\tmargin-left: 90px;\r\n\t\t\tmargin-top: 30px;\r\n\t\t\tpointer-events: all;\r\n\t\t\t@media (max-width: 900px) {\r\n\t\t\t\tmargin-left: 0;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\t&__logo {\r\n\t\tmargin-bottom: 28px;\r\n\t}\r\n\t&__group {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t}\r\n\t&__social-media {\r\n\t}\r\n\t&__nav {\r\n\t\tmargin-right: auto;\r\n\t\t@media (max-width: 900px) {\r\n\t\t\tmargin-right: 0;\r\n\t\t\t& > ul {\r\n\t\t\t\tgrid-template-columns: repeat(2, 1fr);\r\n\t\t\t\ttext-align: center;\r\n\t\t\t}\r\n\t\t}\r\n\t\t@media (max-width: 650px) {\r\n\t\t\t& > ul {\r\n\t\t\t\tgrid-template-columns: 1fr;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\t&__btn-area {\r\n\t\tflex: 0 0 auto;\r\n\t\tdisplay: flex;\r\n\t\tjustify-content: flex-end;\r\n\t}\r\n\t&__btn {\r\n\t}\r\n\t&__copyright {\r\n\t\tcolor: var(--white, #FFF);\r\n\t\ttext-align: center;\r\n\t\tfont-family: Montserrat;\r\n\t\tfont-size: 16px;\r\n\t\tfont-style: normal;\r\n\t\tfont-weight: 400;\r\n\t\tline-height: normal;\r\n\t}\r\n}",".drawer {\r\n\tposition: fixed;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\ttransition: opacity ease-out 0.3s, visibility ease-out 0.3s, transform ease-out 0.3s, background-color 0.3s;\r\n\tvisibility: hidden;\r\n\t&.open {\r\n\t\tvisibility: visible;\r\n\t}\r\n\t&_overlapping, &_static {\r\n\t\theight: 100%;\r\n\t\twidth: 100%;\r\n\t}\r\n\t&_full-width, &_modal {\r\n\t\tdisplay: flex;\r\n\t\talign-items: center;\r\n\t\tjustify-content: center;\r\n\t}\r\n\t&_left, &_right {\r\n\t\tdisplay: flex;\r\n\t\theight: 100%;\r\n\t}\r\n\t&_right {\r\n\t\tjustify-content: flex-end;\r\n\t}\r\n\t&_overlapping.upper-overlapping, &_static.upper-overlapping {\r\n\t\tbackground-color: rgba(0, 0, 0, 0.0);\r\n\t}\r\n\t&_overlapping.upper-overlapping.open, &_static.upper-overlapping.open {\r\n\t\tbackground-color: rgba(0, 0, 0, 0.5);\r\n\t}\r\n\t&__panel {\r\n\t\tposition: relative;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t}\r\n\t&_modal &__panel {\r\n\t\tmin-height: rem(700);\r\n\t\twidth: 100%;\r\n\t}\r\n\t&_narrow &__panel {\r\n\t\tmax-width: 550px;\r\n\t\t@media (min-width: ($mbpPCEnd + 0.1px)) {\r\n\t\t\tmax-width: rem(550);\r\n\t\t}\r\n\t\t@media (max-width: 580px) {\r\n\t\t\tmax-width: 100%;\r\n\t\t}\r\n\t}\r\n\t&_full-width &__panel, &_modal &__panel {\r\n\t\tmargin: auto;\r\n\t}\r\n\t&_left &__panel, &_right &__panel {\r\n\t\tdisplay: flex;\r\n\t\tmin-height: 100%;\r\n\t\twidth: 445px;\r\n\t\t@media (max-width: 500px) {\r\n\t\t\twidth: 100%;\r\n\t\t}\r\n\t}\r\n\t&_full-width &__panel {\r\n\t\twidth: 100%;\r\n\t\tmax-width: 100%;\r\n\t\toverflow-y: hidden;\r\n\t}\r\n\t&__inner {\r\n\t\tposition: relative;\r\n\t\tmax-width: 100%;\r\n\t\ttransition: left 0.3s, right 0.3s, top 0.3s, transform 0.3s, opacity 0.3s;\r\n\t}\r\n\t&_right &_title, &_left &_title {\r\n\t\ttext-transform: uppercase;\r\n\t}\r\n\t&_left &__inner, &_right &__inner {\r\n\t\tmin-height: 100%;\r\n\t\twidth: 100%;\r\n\t\t> * {\r\n\t\t\tmin-height: 100%;\r\n\t\t}\r\n\t}\r\n\t&_left &__inner {\r\n\t\tleft: -100%;\r\n\t\tright: auto;\r\n\t}\r\n\t&_left.open &__inner {\r\n\t\tleft: 0;\r\n\t}\r\n\t&_right &__inner {\r\n\t\tright: -100%;\r\n\t\tleft: auto;\r\n\t}\r\n\t&_right.open &__inner {\r\n\t\tright: 0;\r\n\t}\r\n\t&_modal &__inner, &_full-width &__inner, &_top &__inner, &_center &__inner {\r\n\t\ttop: 0;\r\n\t\tbottom: auto;\r\n\t\ttransform: translateY(-100%);\r\n\t\topacity: 0;\r\n\t}\r\n\t&_modal.open &__inner, &_full-width.open &__inner, &_top.open &__inner, &_center.open &__inner {\r\n\t\ttransform: translateY(0);\r\n\t\topacity: 1;\r\n\t}\r\n}\r\n",".cv-request-form {\r\n\tpadding-left: 25px;\r\n\tpadding-right: 25px;\r\n\t@media (max-width: $mbpMEnd) {\r\n\t\tpadding-left: 15px;\r\n\t\tpadding-right: 15px;\r\n\t}\r\n\t@media (max-width: $mbpSMEnd) {\r\n\t\tpadding-left: 10px;\r\n\t\tpadding-right: 10px;\r\n\t}\r\n\t&__inner {\r\n\t\tborder-radius: 30px;\r\n\t\tbackground: #FFF;\r\n\t\tbox-shadow: 0px 4px 60px 0px rgba(0, 0, 0, 0.70);\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tborder-radius: 20px;\r\n\t\t}\r\n\t}\r\n\t&__header {\r\n\t\tdisplay: flex;\r\n\t\tjustify-content: flex-end;\r\n\t\talign-items: center;\r\n\t\tpadding: 30px 30px 0;\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\tpadding: 20px 20px 0;\r\n\t\t}\r\n\t}\r\n\t&__body {\r\n\t\tdisplay: grid;\r\n\t\tgrid-template-columns: 1fr 1fr;\r\n\t\tgap: 40px;\r\n\t\tpadding: 64px 80px 70px;\r\n\t\t@media (max-width: $mbpPCEnd) {\r\n\t\t\tpadding: 50px 60px 50px;\r\n\t\t}\r\n\t\t@media (max-width: 840px) {\r\n\t\t\tgrid-template-columns: 1fr;\r\n\t\t\tgap: 30px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tpadding: 35px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\tpadding: 20px;\r\n\t\t}\r\n\t}\r\n\t&__title {\r\n\t\tcolor: transparent;\r\n\t\tfont-family: Thunder;\r\n\t\tfont-size: 50px;\r\n\t\tfont-style: normal;\r\n\t\tfont-weight: 800;\r\n\t\tbackground: linear-gradient(307deg, #161616 0%, #260046 18.82%, #2A004E 36.26%, #500092 56.78%, #3A006A 75.58%, #2A004E 88.57%, #2A004E 100%);\r\n\t\tbackground-clip: text;\r\n\t\t-webkit-background-clip: text;\r\n\t\t-webkit-text-fill-color: transparent;\r\n\t\t@media (min-width: $mbpSMStart) and (max-width: $mbpPCEnd) {\r\n\t\t\tfont-size: aval(42, 50, 0, $mbpSMStartNu, $mbpPCEndNu);\r\n\t\t}\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\tfont-size: 42px;\r\n\t\t}\r\n\t}\r\n\t&__form {\r\n\t}\r\n\t&__form .contact-form__bottom-inner {\r\n\t\tflex-direction: column;\r\n\t\talign-items: center;\r\n\t}\r\n\t& &__panel {\r\n\t\tmax-width: 1160px;\r\n\t\t@media (max-width: 720px) {\r\n\t\t\tmax-width: 100%;\r\n\t\t}\r\n\t}\r\n}\r\n.close-btn {\r\n\tdisplay: inline-block;\r\n\tposition: relative;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\twidth: 30px;\r\n\theight: 30px;\r\n\tfont-size: 0;\r\n\tcursor: pointer;\r\n\ttransition: transform 0.4s;\r\n\t&:hover {\r\n\t\ttransform: rotateZ(90deg);\r\n\t}\r\n\t&::before, &::after {\r\n\t\tcontent: \"\";\r\n\t\tposition: absolute;\r\n\t\tleft: 10%;\r\n\t\ttop: calc(50% - 1.25px);\r\n\t\twidth: 80%;\r\n\t\theight: 2.5px;\r\n\t\tbackground-color: #FF1D53;\r\n\t\tborder-radius: 1.25px;\r\n\t}\r\n\t&::before {\r\n\t\ttransform: rotateZ(-45deg);\r\n\t}\r\n\t&::after {\r\n\t\ttransform: rotateZ(45deg);\r\n\t}\r\n}\r\n\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/scss/common/index.scss":
/*!************************************!*\
  !*** ./src/scss/common/index.scss ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/string-replace-loader/index.js??ruleSet[1].rules[1].use[1]!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./index.scss */ "./node_modules/string-replace-loader/index.js??ruleSet[1].rules[1].use[1]!./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scss/common/index.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);


if (true) {
  if (!_node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }
  var p;
  for (p in a) {
    if (isNamedExport && p === "default") {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (a[p] !== b[p]) {
      return false;
    }
  }
  for (p in b) {
    if (isNamedExport && p === "default") {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (!a[p]) {
      return false;
    }
  }
  return true;
};
    var isNamedExport = !_node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals;
    var oldLocals = isNamedExport ? _node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals;

    module.hot.accept(
      /*! !!../../../node_modules/string-replace-loader/index.js??ruleSet[1].rules[1].use[1]!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./index.scss */ "./node_modules/string-replace-loader/index.js??ruleSet[1].rules[1].use[1]!./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scss/common/index.scss",
      function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/string-replace-loader/index.js??ruleSet[1].rules[1].use[1]!../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./index.scss */ "./node_modules/string-replace-loader/index.js??ruleSet[1].rules[1].use[1]!./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scss/common/index.scss");
(function () {
        if (!isEqualLocals(oldLocals, isNamedExport ? _node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals, isNamedExport)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = isNamedExport ? _node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals;

              update(_node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"]);
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this)
    )
  }

  module.hot.dispose(function() {
    update();
  });
}



       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module) {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ (function(module) {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ WebSocketClient; }
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);
    this.client = new WebSocket(url);
    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }

  /**
   * @param {(...args: any[]) => void} f
   */
  _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }

    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    }

    // call f with the message string as the first argument
    /**
     * @param {(...args: any[]) => void} f
     */
  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);
  return WebSocketClient;
}();


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=192.168.50.88&port=8081&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=192.168.50.88&port=8081&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true ***!
  \*****************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
var __resourceQuery = "?protocol=ws%3A&hostname=192.168.50.88&port=8081&pathname=%2Fws&logging=info&overlay=true&reconnect=10&hot=true&live-reload=true";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/stripAnsi.js */ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js");
/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ "./node_modules/webpack-dev-server/client/utils/parseURL.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");
/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* global __resourceQuery, __webpack_hash__ */
/// <reference types="webpack/module" />










/**
 * @typedef {Object} OverlayOptions
 * @property {boolean | (error: Error) => boolean} [warnings]
 * @property {boolean | (error: Error) => boolean} [errors]
 * @property {boolean | (error: Error) => boolean} [runtimeErrors]
 * @property {string} [trustedTypesPolicyName]
 */

/**
 * @typedef {Object} Options
 * @property {boolean} hot
 * @property {boolean} liveReload
 * @property {boolean} progress
 * @property {boolean | OverlayOptions} overlay
 * @property {string} [logging]
 * @property {number} [reconnect]
 */

/**
 * @typedef {Object} Status
 * @property {boolean} isUnloading
 * @property {string} currentHash
 * @property {string} [previousHash]
 */

/**
 * @param {boolean | { warnings?: boolean | string; errors?: boolean | string; runtimeErrors?: boolean | string; }} overlayOptions
 */
var decodeOverlayOptions = function decodeOverlayOptions(overlayOptions) {
  if (typeof overlayOptions === "object") {
    ["warnings", "errors", "runtimeErrors"].forEach(function (property) {
      if (typeof overlayOptions[property] === "string") {
        var overlayFilterFunctionString = decodeURIComponent(overlayOptions[property]);

        // eslint-disable-next-line no-new-func
        var overlayFilterFunction = new Function("message", "var callback = ".concat(overlayFilterFunctionString, "\n        return callback(message)"));
        overlayOptions[property] = overlayFilterFunction;
      }
    });
  }
};

/**
 * @type {Status}
 */
var status = {
  isUnloading: false,
  // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement
  // eslint-disable-next-line camelcase
  currentHash:  true ? __webpack_require__.h() : 0
};

/** @type {Options} */
var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
var parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])(__resourceQuery);
var enabledFeatures = {
  "Hot Module Replacement": false,
  "Live Reloading": false,
  Progress: false,
  Overlay: false
};
if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  enabledFeatures["Hot Module Replacement"] = true;
}
if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  enabledFeatures["Live Reloading"] = true;
}
if (parsedResourceQuery.progress === "true") {
  options.progress = true;
  enabledFeatures.Progress = true;
}
if (parsedResourceQuery.overlay) {
  try {
    options.overlay = JSON.parse(parsedResourceQuery.overlay);
  } catch (e) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Error parsing overlay options from resource query:", e);
  }

  // Fill in default "true" params for partially-specified objects.
  if (typeof options.overlay === "object") {
    options.overlay = _objectSpread({
      errors: true,
      warnings: true,
      runtimeErrors: true
    }, options.overlay);
    decodeOverlayOptions(options.overlay);
  }
  enabledFeatures.Overlay = true;
}
if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}
if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}

/**
 * @param {string} level
 */
function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);
}
if (options.logging) {
  setAllLogLevel(options.logging);
}
(0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.logEnabledFeatures)(enabledFeatures);
self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var overlay = typeof window !== "undefined" ? (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.createOverlay)(typeof options.overlay === "object" ? {
  trustedTypesPolicyName: options.overlay.trustedTypesPolicyName,
  catchRuntimeError: options.overlay.runtimeErrors
} : {
  trustedTypesPolicyName: false,
  catchRuntimeError: options.overlay
}) : {
  send: function send() {}
};
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }
    options.hot = true;
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }
    options.liveReload = true;
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("App updated. Recompiling...");

    // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Invalid");
  },
  /**
   * @param {string} hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,
  /**
   * @param {boolean} value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }
    options.overlay = value;
    decodeOverlayOptions(options.overlay);
  },
  /**
   * @param {number} value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }
    options.reconnect = value;
  },
  /**
   * @param {boolean} value
   */
  progress: function progress(value) {
    options.progress = value;
  },
  /**
   * @param {{ pluginName?: string, percent: number, msg: string }} data
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Nothing changed.");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Ok");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  // TODO: remove in v5 in favor of 'static-changed'
  /**
   * @param {string} file
   */
  "content-changed": function contentChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  /**
   * @param {string} file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  /**
   * @param {Error[]} warnings
   * @param {any} params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn("Warnings while compiling.");
    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("warning", error),
        header = _formatProblem.header,
        body = _formatProblem.body;
      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Warnings", printableWarnings);
    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);
    }
    var overlayWarningsSetting = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;
    if (overlayWarningsSetting) {
      var warningsToDisplay = typeof overlayWarningsSetting === "function" ? _warnings.filter(overlayWarningsSetting) : _warnings;
      if (warningsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "warning",
          messages: _warnings
        });
      }
    }
    if (params && params.preventReloading) {
      return;
    }
    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  /**
   * @param {Error[]} errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Errors while compiling. Reload prevented.");
    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("error", error),
        header = _formatProblem2.header,
        body = _formatProblem2.body;
      return "".concat(header, "\n").concat((0,_utils_stripAnsi_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body));
    });
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Errors", printableErrors);
    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);
    }
    var overlayErrorsSettings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;
    if (overlayErrorsSettings) {
      var errorsToDisplay = typeof overlayErrorsSettings === "function" ? _errors.filter(overlayErrorsSettings) : _errors;
      if (errorsToDisplay.length) {
        overlay.send({
          type: "BUILD_ERROR",
          level: "error",
          messages: _errors
        });
      }
    }
  },
  /**
   * @param {Error} error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Disconnected!");
    if (options.overlay) {
      overlay.send({
        type: "DISMISS"
      });
    }
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Close");
  }
};
var socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__["default"])(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage, options.reconnect);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/modules/logger/SyncBailHookFake.js":
/*!*******************************************************!*\
  !*** ./client-src/modules/logger/SyncBailHookFake.js ***!
  \*******************************************************/
/***/ (function(module) {



/**
 * Client stub for tapable SyncBailHook
 */
module.exports = function clientTapableSyncBailHook() {
  return {
    call: function call() {}
  };
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/Logger.js":
/*!****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/Logger.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var LogType = Object.freeze({
  error: /** @type {"error"} */"error",
  // message, c style arguments
  warn: /** @type {"warn"} */"warn",
  // message, c style arguments
  info: /** @type {"info"} */"info",
  // message, c style arguments
  log: /** @type {"log"} */"log",
  // message, c style arguments
  debug: /** @type {"debug"} */"debug",
  // message, c style arguments

  trace: /** @type {"trace"} */"trace",
  // no arguments

  group: /** @type {"group"} */"group",
  // [label]
  groupCollapsed: /** @type {"groupCollapsed"} */"groupCollapsed",
  // [label]
  groupEnd: /** @type {"groupEnd"} */"groupEnd",
  // [label]

  profile: /** @type {"profile"} */"profile",
  // [profileName]
  profileEnd: /** @type {"profileEnd"} */"profileEnd",
  // [profileName]

  time: /** @type {"time"} */"time",
  // name, time as [seconds, nanoseconds]

  clear: /** @type {"clear"} */"clear",
  // no arguments
  status: /** @type {"status"} */"status" // message, arguments
});

exports.LogType = LogType;

/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger raw log method");
var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger times");
var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger aggregated times");
var WebpackLogger = /*#__PURE__*/function () {
  /**
   * @param {function(LogTypeEnum, any[]=): void} log log function
   * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
   */
  function WebpackLogger(log, getChildLogger) {
    _classCallCheck(this, WebpackLogger);
    this[LOG_SYMBOL] = log;
    this.getChildLogger = getChildLogger;
  }
  _createClass(WebpackLogger, [{
    key: "error",
    value: function error() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      this[LOG_SYMBOL](LogType.error, args);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      this[LOG_SYMBOL](LogType.warn, args);
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      this[LOG_SYMBOL](LogType.info, args);
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      this[LOG_SYMBOL](LogType.log, args);
    }
  }, {
    key: "debug",
    value: function debug() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      this[LOG_SYMBOL](LogType.debug, args);
    }
  }, {
    key: "assert",
    value: function assert(assertion) {
      if (!assertion) {
        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }
        this[LOG_SYMBOL](LogType.error, args);
      }
    }
  }, {
    key: "trace",
    value: function trace() {
      this[LOG_SYMBOL](LogType.trace, ["Trace"]);
    }
  }, {
    key: "clear",
    value: function clear() {
      this[LOG_SYMBOL](LogType.clear);
    }
  }, {
    key: "status",
    value: function status() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      this[LOG_SYMBOL](LogType.status, args);
    }
  }, {
    key: "group",
    value: function group() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      this[LOG_SYMBOL](LogType.group, args);
    }
  }, {
    key: "groupCollapsed",
    value: function groupCollapsed() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      this[LOG_SYMBOL](LogType.groupCollapsed, args);
    }
  }, {
    key: "groupEnd",
    value: function groupEnd() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }
      this[LOG_SYMBOL](LogType.groupEnd, args);
    }
  }, {
    key: "profile",
    value: function profile(label) {
      this[LOG_SYMBOL](LogType.profile, [label]);
    }
  }, {
    key: "profileEnd",
    value: function profileEnd(label) {
      this[LOG_SYMBOL](LogType.profileEnd, [label]);
    }
  }, {
    key: "time",
    value: function time(label) {
      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
      this[TIMERS_SYMBOL].set(label, process.hrtime());
    }
  }, {
    key: "timeLog",
    value: function timeLog(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
      }
      var time = process.hrtime(prev);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeEnd",
    value: function timeEnd(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
      }
      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeAggregate",
    value: function timeAggregate(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
      }
      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (current !== undefined) {
        if (time[1] + current[1] > 1e9) {
          time[0] += current[0] + 1;
          time[1] = time[1] - 1e9 + current[1];
        } else {
          time[0] += current[0];
          time[1] += current[1];
        }
      }
      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
    }
  }, {
    key: "timeAggregateEnd",
    value: function timeAggregateEnd(label) {
      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (time === undefined) return;
      this[TIMERS_AGGREGATES_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }]);
  return WebpackLogger;
}();
exports.Logger = WebpackLogger;

/***/ }),

/***/ "./node_modules/webpack/lib/logging/createConsoleLogger.js":
/*!*****************************************************************!*\
  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_11285__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
var _require = __nested_webpack_require_11285__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
  LogType = _require.LogType;

/** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */
/** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */
/** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

/** @typedef {function(string): boolean} FilterFunction */

/**
 * @typedef {Object} LoggerConsole
 * @property {function(): void} clear
 * @property {function(): void} trace
 * @property {(...args: any[]) => void} info
 * @property {(...args: any[]) => void} log
 * @property {(...args: any[]) => void} warn
 * @property {(...args: any[]) => void} error
 * @property {(...args: any[]) => void=} debug
 * @property {(...args: any[]) => void=} group
 * @property {(...args: any[]) => void=} groupCollapsed
 * @property {(...args: any[]) => void=} groupEnd
 * @property {(...args: any[]) => void=} status
 * @property {(...args: any[]) => void=} profile
 * @property {(...args: any[]) => void=} profileEnd
 * @property {(...args: any[]) => void=} logTime
 */

/**
 * @typedef {Object} LoggerOptions
 * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
 * @property {FilterTypes|boolean} debug filter for debug logging
 * @property {LoggerConsole} console the console to log to
 */

/**
 * @param {FilterItemTypes} item an input item
 * @returns {FilterFunction} filter function
 */
var filterToFunction = function filterToFunction(item) {
  if (typeof item === "string") {
    var regExp = new RegExp("[\\\\/]".concat(item.replace(
    // eslint-disable-next-line no-useless-escape
    /[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
    return function (ident) {
      return regExp.test(ident);
    };
  }
  if (item && typeof item === "object" && typeof item.test === "function") {
    return function (ident) {
      return item.test(ident);
    };
  }
  if (typeof item === "function") {
    return item;
  }
  if (typeof item === "boolean") {
    return function () {
      return item;
    };
  }
};

/**
 * @enum {number}
 */
var LogLevel = {
  none: 6,
  false: 6,
  error: 5,
  warn: 4,
  info: 3,
  log: 2,
  true: 2,
  verbose: 1
};

/**
 * @param {LoggerOptions} options options object
 * @returns {function(string, LogTypeEnum, any[]): void} logging function
 */
module.exports = function (_ref) {
  var _ref$level = _ref.level,
    level = _ref$level === void 0 ? "info" : _ref$level,
    _ref$debug = _ref.debug,
    debug = _ref$debug === void 0 ? false : _ref$debug,
    console = _ref.console;
  var debugFilters = typeof debug === "boolean" ? [function () {
    return debug;
  }] : /** @type {FilterItemTypes[]} */[].concat(debug).map(filterToFunction);
  /** @type {number} */
  var loglevel = LogLevel["".concat(level)] || 0;

  /**
   * @param {string} name name of the logger
   * @param {LogTypeEnum} type type of the log entry
   * @param {any[]} args arguments of the log entry
   * @returns {void}
   */
  var logger = function logger(name, type, args) {
    var labeledArgs = function labeledArgs() {
      if (Array.isArray(args)) {
        if (args.length > 0 && typeof args[0] === "string") {
          return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
        } else {
          return ["[".concat(name, "]")].concat(_toConsumableArray(args));
        }
      } else {
        return [];
      }
    };
    var debug = debugFilters.some(function (f) {
      return f(name);
    });
    switch (type) {
      case LogType.debug:
        if (!debug) return;
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.debug === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.debug.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.log:
        if (!debug && loglevel > LogLevel.log) return;
        console.log.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.info:
        if (!debug && loglevel > LogLevel.info) return;
        console.info.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.warn:
        if (!debug && loglevel > LogLevel.warn) return;
        console.warn.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.error:
        if (!debug && loglevel > LogLevel.error) return;
        console.error.apply(console, _toConsumableArray(labeledArgs()));
        break;
      case LogType.trace:
        if (!debug) return;
        console.trace();
        break;
      case LogType.groupCollapsed:
        if (!debug && loglevel > LogLevel.log) return;
        if (!debug && loglevel > LogLevel.verbose) {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          if (typeof console.groupCollapsed === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
          } else {
            console.log.apply(console, _toConsumableArray(labeledArgs()));
          }
          break;
        }
      // falls through
      case LogType.group:
        if (!debug && loglevel > LogLevel.log) return;
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.group === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.group.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.groupEnd:
        if (!debug && loglevel > LogLevel.log) return;
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.groupEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.groupEnd();
        }
        break;
      case LogType.time:
        {
          if (!debug && loglevel > LogLevel.log) return;
          var ms = args[1] * 1000 + args[2] / 1000000;
          var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");
          if (typeof console.logTime === "function") {
            console.logTime(msg);
          } else {
            console.log(msg);
          }
          break;
        }
      case LogType.profile:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profile === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profile.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.profileEnd:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profileEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
        }
        break;
      case LogType.clear:
        if (!debug && loglevel > LogLevel.log) return;
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.clear === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.clear();
        }
        break;
      case LogType.status:
        if (!debug && loglevel > LogLevel.info) return;
        if (typeof console.status === "function") {
          if (args.length === 0) {
            console.status();
          } else {
            console.status.apply(console, _toConsumableArray(labeledArgs()));
          }
        } else {
          if (args.length !== 0) {
            console.info.apply(console, _toConsumableArray(labeledArgs()));
          }
        }
        break;
      default:
        throw new Error("Unexpected LogType ".concat(type));
    }
  };
  return logger;
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/runtime.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_21334__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/



function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var SyncBailHook = __nested_webpack_require_21334__(/*! tapable/lib/SyncBailHook */ "./client-src/modules/logger/SyncBailHookFake.js");
var _require = __nested_webpack_require_21334__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
  Logger = _require.Logger;
var createConsoleLogger = __nested_webpack_require_21334__(/*! ./createConsoleLogger */ "./node_modules/webpack/lib/logging/createConsoleLogger.js");

/** @type {createConsoleLogger.LoggerOptions} */
var currentDefaultLoggerOptions = {
  level: "info",
  debug: false,
  console: console
};
var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);

/**
 * @param {string} name name of the logger
 * @returns {Logger} a logger
 */
exports.getLogger = function (name) {
  return new Logger(function (type, args) {
    if (exports.hooks.log.call(name, type, args) === undefined) {
      currentDefaultLogger(name, type, args);
    }
  }, function (childName) {
    return exports.getLogger("".concat(name, "/").concat(childName));
  });
};

/**
 * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
 * @returns {void}
 */
exports.configureDefaultLogger = function (options) {
  _extends(currentDefaultLoggerOptions, options);
  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
};
exports.hooks = {
  log: new SyncBailHook(["origin", "type", "args"])
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_23461__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_23461__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_23461__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_23461__.o(definition, key) && !__nested_webpack_require_23461__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_23461__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_23461__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __nested_webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************************************!*\
  !*** ./client-src/modules/logger/index.js ***!
  \********************************************/
__nested_webpack_require_23461__.r(__nested_webpack_exports__);
/* harmony export */ __nested_webpack_require_23461__.d(__nested_webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }
/* harmony export */ });
/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_23461__(/*! webpack/lib/logging/runtime.js */ "./node_modules/webpack/lib/logging/runtime.js");

}();
var __webpack_export_target__ = exports;
for(var i in __nested_webpack_exports__) __webpack_export_target__[i] = __nested_webpack_exports__[i];
if(__nested_webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createOverlay: function() { return /* binding */ createOverlay; },
/* harmony export */   formatProblem: function() { return /* binding */ formatProblem; }
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js");
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./overlay/runtime-error.js */ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js");
/* harmony import */ var _overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./overlay/state-machine.js */ "./node_modules/webpack-dev-server/client/overlay/state-machine.js");
/* harmony import */ var _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./overlay/styles.js */ "./node_modules/webpack-dev-server/client/overlay/styles.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).






var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

/**
 * @param {string} type
 * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string; stack?: string[] }} item
 * @returns {{ header: string, body: string }}
 */
function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";
  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || "";
    // eslint-disable-next-line no-nested-ternary
    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }
  if (Array.isArray(item.stack)) {
    item.stack.forEach(function (stack) {
      if (typeof stack === "string") {
        body += "\r\n".concat(stack);
      }
    });
  }
  return {
    header: header,
    body: body
  };
}

/**
 * @typedef {Object} CreateOverlayOptions
 * @property {string | null} trustedTypesPolicyName
 * @property {boolean | (error: Error) => void} [catchRuntimeError]
 */

/**
 *
 * @param {CreateOverlayOptions} options
 */
var createOverlay = function createOverlay(options) {
  /** @type {HTMLIFrameElement | null | undefined} */
  var iframeContainerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var containerElement;
  /** @type {HTMLDivElement | null | undefined} */
  var headerElement;
  /** @type {Array<(element: HTMLDivElement) => void>} */
  var onLoadQueue = [];
  /** @type {TrustedTypePolicy | undefined} */
  var overlayTrustedTypesPolicy;

  /**
   *
   * @param {HTMLElement} element
   * @param {CSSStyleDeclaration} style
   */
  function applyStyle(element, style) {
    Object.keys(style).forEach(function (prop) {
      element.style[prop] = style[prop];
    });
  }

  /**
   * @param {string | null} trustedTypesPolicyName
   */
  function createContainer(trustedTypesPolicyName) {
    // Enable Trusted Types if they are available in the current browser.
    if (window.trustedTypes) {
      overlayTrustedTypesPolicy = window.trustedTypes.createPolicy(trustedTypesPolicyName || "webpack-dev-server#overlay", {
        createHTML: function createHTML(value) {
          return value;
        }
      });
    }
    iframeContainerElement = document.createElement("iframe");
    iframeContainerElement.id = "webpack-dev-server-client-overlay";
    iframeContainerElement.src = "about:blank";
    applyStyle(iframeContainerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.iframeStyle);
    iframeContainerElement.onload = function () {
      var contentElement = /** @type {Document} */
      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.createElement("div");
      containerElement = /** @type {Document} */
      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.createElement("div");
      contentElement.id = "webpack-dev-server-client-overlay-div";
      applyStyle(contentElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.containerStyle);
      headerElement = document.createElement("div");
      headerElement.innerText = "Compiled with problems:";
      applyStyle(headerElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.headerStyle);
      var closeButtonElement = document.createElement("button");
      applyStyle(closeButtonElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.dismissButtonStyle);
      closeButtonElement.innerText = "×";
      closeButtonElement.ariaLabel = "Dismiss";
      closeButtonElement.addEventListener("click", function () {
        // eslint-disable-next-line no-use-before-define
        overlayService.send({
          type: "DISMISS"
        });
      });
      contentElement.appendChild(headerElement);
      contentElement.appendChild(closeButtonElement);
      contentElement.appendChild(containerElement);

      /** @type {Document} */
      /** @type {HTMLIFrameElement} */
      iframeContainerElement.contentDocument.body.appendChild(contentElement);
      onLoadQueue.forEach(function (onLoad) {
        onLoad( /** @type {HTMLDivElement} */contentElement);
      });
      onLoadQueue = [];

      /** @type {HTMLIFrameElement} */
      iframeContainerElement.onload = null;
    };
    document.body.appendChild(iframeContainerElement);
  }

  /**
   * @param {(element: HTMLDivElement) => void} callback
   * @param {string | null} trustedTypesPolicyName
   */
  function ensureOverlayExists(callback, trustedTypesPolicyName) {
    if (containerElement) {
      containerElement.innerHTML = "";
      // Everything is ready, call the callback right away.
      callback(containerElement);
      return;
    }
    onLoadQueue.push(callback);
    if (iframeContainerElement) {
      return;
    }
    createContainer(trustedTypesPolicyName);
  }

  // Successful compilation.
  function hide() {
    if (!iframeContainerElement) {
      return;
    }

    // Clean up and reset internal state.
    document.body.removeChild(iframeContainerElement);
    iframeContainerElement = null;
    containerElement = null;
  }

  // Compilation with errors (e.g. syntax error or missing modules).
  /**
   * @param {string} type
   * @param {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
   * @param {string | null} trustedTypesPolicyName
   * @param {'build' | 'runtime'} messageSource
   */
  function show(type, messages, trustedTypesPolicyName, messageSource) {
    ensureOverlayExists(function () {
      headerElement.innerText = messageSource === "runtime" ? "Uncaught runtime errors:" : "Compiled with problems:";
      messages.forEach(function (message) {
        var entryElement = document.createElement("div");
        var msgStyle = type === "warning" ? _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.warning : _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgStyles.error;
        applyStyle(entryElement, _objectSpread(_objectSpread({}, msgStyle), {}, {
          padding: "1rem 1rem 1.5rem 1rem"
        }));
        var typeElement = document.createElement("div");
        var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;
        typeElement.innerText = header;
        applyStyle(typeElement, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTypeStyle);
        if (message.moduleIdentifier) {
          applyStyle(typeElement, {
            cursor: "pointer"
          });
          // element.dataset not supported in IE
          typeElement.setAttribute("data-can-open", true);
          typeElement.addEventListener("click", function () {
            fetch("/webpack-dev-server/open-editor?fileName=".concat(message.moduleIdentifier));
          });
        }

        // Make it look similar to our terminal.
        var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_4__.encode)(body));
        var messageTextNode = document.createElement("div");
        applyStyle(messageTextNode, _overlay_styles_js__WEBPACK_IMPORTED_MODULE_3__.msgTextStyle);
        messageTextNode.innerHTML = overlayTrustedTypesPolicy ? overlayTrustedTypesPolicy.createHTML(text) : text;
        entryElement.appendChild(typeElement);
        entryElement.appendChild(messageTextNode);

        /** @type {HTMLDivElement} */
        containerElement.appendChild(entryElement);
      });
    }, trustedTypesPolicyName);
  }
  var overlayService = (0,_overlay_state_machine_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
    showOverlay: function showOverlay(_ref) {
      var _ref$level = _ref.level,
        level = _ref$level === void 0 ? "error" : _ref$level,
        messages = _ref.messages,
        messageSource = _ref.messageSource;
      return show(level, messages, options.trustedTypesPolicyName, messageSource);
    },
    hideOverlay: hide
  });
  if (options.catchRuntimeError) {
    /**
     * @param {Error | undefined} error
     * @param {string} fallbackMessage
     */
    var handleError = function handleError(error, fallbackMessage) {
      var errorObject = error instanceof Error ? error : new Error(error || fallbackMessage);
      var shouldDisplay = typeof options.catchRuntimeError === "function" ? options.catchRuntimeError(errorObject) : true;
      if (shouldDisplay) {
        overlayService.send({
          type: "RUNTIME_ERROR",
          messages: [{
            message: errorObject.message,
            stack: (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.parseErrorToStacks)(errorObject)
          }]
        });
      }
    };
    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToRuntimeError)(function (errorEvent) {
      // error property may be empty in older browser like IE
      var error = errorEvent.error,
        message = errorEvent.message;
      if (!error && !message) {
        return;
      }
      handleError(error, message);
    });
    (0,_overlay_runtime_error_js__WEBPACK_IMPORTED_MODULE_1__.listenToUnhandledRejection)(function (promiseRejectionEvent) {
      var reason = promiseRejectionEvent.reason;
      handleError(reason, "Unknown promise rejection reason");
    });
  }
  return overlayService;
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/fsm.js":
/*!***************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/fsm.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * @typedef {Object} StateDefinitions
 * @property {{[event: string]: { target: string; actions?: Array<string> }}} [on]
 */

/**
 * @typedef {Object} Options
 * @property {{[state: string]: StateDefinitions}} states
 * @property {object} context;
 * @property {string} initial
 */

/**
 * @typedef {Object} Implementation
 * @property {{[actionName: string]: (ctx: object, event: any) => object}} actions
 */

/**
 * A simplified `createMachine` from `@xstate/fsm` with the following differences:
 *
 *  - the returned machine is technically a "service". No `interpret(machine).start()` is needed.
 *  - the state definition only support `on` and target must be declared with { target: 'nextState', actions: [] } explicitly.
 *  - event passed to `send` must be an object with `type` property.
 *  - actions implementation will be [assign action](https://xstate.js.org/docs/guides/context.html#assign-action) if you return any value.
 *  Do not return anything if you just want to invoke side effect.
 *
 * The goal of this custom function is to avoid installing the entire `'xstate/fsm'` package, while enabling modeling using
 * state machine. You can copy the first parameter into the editor at https://stately.ai/viz to visualize the state machine.
 *
 * @param {Options} options
 * @param {Implementation} implementation
 */
function createMachine(_ref, _ref2) {
  var states = _ref.states,
    context = _ref.context,
    initial = _ref.initial;
  var actions = _ref2.actions;
  var currentState = initial;
  var currentContext = context;
  return {
    send: function send(event) {
      var currentStateOn = states[currentState].on;
      var transitionConfig = currentStateOn && currentStateOn[event.type];
      if (transitionConfig) {
        currentState = transitionConfig.target;
        if (transitionConfig.actions) {
          transitionConfig.actions.forEach(function (actName) {
            var actionImpl = actions[actName];
            var nextContextValue = actionImpl && actionImpl(currentContext, event);
            if (nextContextValue) {
              currentContext = _objectSpread(_objectSpread({}, currentContext), nextContextValue);
            }
          });
        }
      }
    }
  };
}
/* harmony default export */ __webpack_exports__["default"] = (createMachine);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/runtime-error.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/runtime-error.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   listenToRuntimeError: function() { return /* binding */ listenToRuntimeError; },
/* harmony export */   listenToUnhandledRejection: function() { return /* binding */ listenToUnhandledRejection; },
/* harmony export */   parseErrorToStacks: function() { return /* binding */ parseErrorToStacks; }
/* harmony export */ });
/**
 *
 * @param {Error} error
 */
function parseErrorToStacks(error) {
  if (!error || !(error instanceof Error)) {
    throw new Error("parseErrorToStacks expects Error object");
  }
  if (typeof error.stack === "string") {
    return error.stack.split("\n").filter(function (stack) {
      return stack !== "Error: ".concat(error.message);
    });
  }
}

/**
 * @callback ErrorCallback
 * @param {ErrorEvent} error
 * @returns {void}
 */

/**
 * @param {ErrorCallback} callback
 */
function listenToRuntimeError(callback) {
  window.addEventListener("error", callback);
  return function cleanup() {
    window.removeEventListener("error", callback);
  };
}

/**
 * @callback UnhandledRejectionCallback
 * @param {PromiseRejectionEvent} rejectionEvent
 * @returns {void}
 */

/**
 * @param {UnhandledRejectionCallback} callback
 */
function listenToUnhandledRejection(callback) {
  window.addEventListener("unhandledrejection", callback);
  return function cleanup() {
    window.removeEventListener("unhandledrejection", callback);
  };
}


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/state-machine.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/state-machine.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fsm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fsm.js */ "./node_modules/webpack-dev-server/client/overlay/fsm.js");


/**
 * @typedef {Object} ShowOverlayData
 * @property {'warning' | 'error'} level
 * @property {Array<string  | { moduleIdentifier?: string, moduleName?: string, loc?: string, message?: string }>} messages
 * @property {'build' | 'runtime'} messageSource
 */

/**
 * @typedef {Object} CreateOverlayMachineOptions
 * @property {(data: ShowOverlayData) => void} showOverlay
 * @property {() => void} hideOverlay
 */

/**
 * @param {CreateOverlayMachineOptions} options
 */
var createOverlayMachine = function createOverlayMachine(options) {
  var hideOverlay = options.hideOverlay,
    showOverlay = options.showOverlay;
  var overlayMachine = (0,_fsm_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    initial: "hidden",
    context: {
      level: "error",
      messages: [],
      messageSource: "build"
    },
    states: {
      hidden: {
        on: {
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      },
      displayBuildError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["appendMessages", "showOverlay"]
          }
        }
      },
      displayRuntimeError: {
        on: {
          DISMISS: {
            target: "hidden",
            actions: ["dismissMessages", "hideOverlay"]
          },
          RUNTIME_ERROR: {
            target: "displayRuntimeError",
            actions: ["appendMessages", "showOverlay"]
          },
          BUILD_ERROR: {
            target: "displayBuildError",
            actions: ["setMessages", "showOverlay"]
          }
        }
      }
    }
  }, {
    actions: {
      dismissMessages: function dismissMessages() {
        return {
          messages: [],
          level: "error",
          messageSource: "build"
        };
      },
      appendMessages: function appendMessages(context, event) {
        return {
          messages: context.messages.concat(event.messages),
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      setMessages: function setMessages(context, event) {
        return {
          messages: event.messages,
          level: event.level || context.level,
          messageSource: event.type === "RUNTIME_ERROR" ? "runtime" : "build"
        };
      },
      hideOverlay: hideOverlay,
      showOverlay: showOverlay
    }
  });
  return overlayMachine;
};
/* harmony default export */ __webpack_exports__["default"] = (createOverlayMachine);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay/styles.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay/styles.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   containerStyle: function() { return /* binding */ containerStyle; },
/* harmony export */   dismissButtonStyle: function() { return /* binding */ dismissButtonStyle; },
/* harmony export */   headerStyle: function() { return /* binding */ headerStyle; },
/* harmony export */   iframeStyle: function() { return /* binding */ iframeStyle; },
/* harmony export */   msgStyles: function() { return /* binding */ msgStyles; },
/* harmony export */   msgTextStyle: function() { return /* binding */ msgTextStyle; },
/* harmony export */   msgTypeStyle: function() { return /* binding */ msgTypeStyle; }
/* harmony export */ });
// styles are inspired by `react-error-overlay`

var msgStyles = {
  error: {
    backgroundColor: "rgba(206, 17, 38, 0.1)",
    color: "#fccfcf"
  },
  warning: {
    backgroundColor: "rgba(251, 245, 180, 0.1)",
    color: "#fbf5b4"
  }
};
var iframeStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  border: "none",
  "z-index": 9999999999
};
var containerStyle = {
  position: "fixed",
  boxSizing: "border-box",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  width: "100vw",
  height: "100vh",
  fontSize: "large",
  padding: "2rem 2rem 4rem 2rem",
  lineHeight: "1.2",
  whiteSpace: "pre-wrap",
  overflow: "auto",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  color: "white"
};
var headerStyle = {
  color: "#e83b46",
  fontSize: "2em",
  whiteSpace: "pre-wrap",
  fontFamily: "sans-serif",
  margin: "0 2rem 2rem 0",
  flex: "0 0 auto",
  maxHeight: "50%",
  overflow: "auto"
};
var dismissButtonStyle = {
  color: "#ffffff",
  lineHeight: "1rem",
  fontSize: "1.5rem",
  padding: "1rem",
  cursor: "pointer",
  position: "absolute",
  right: 0,
  top: 0,
  backgroundColor: "transparent",
  border: "none"
};
var msgTypeStyle = {
  color: "#e83b46",
  fontSize: "1.2em",
  marginBottom: "1rem",
  fontFamily: "sans-serif"
};
var msgTextStyle = {
  lineHeight: "1.5",
  fontSize: "1rem",
  fontFamily: "Menlo, Consolas, monospace"
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   client: function() { return /* binding */ client; }
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */




// this WebsocketClient is here as a default fallback, in case the client is not injected
/* eslint-disable camelcase */
var Client =
// eslint-disable-next-line no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10;

// Initialized client is exported so external consumers can utilize the same instance
// It is mutable to enforce singleton
// eslint-disable-next-line import/no-mutable-exports
var client = null;

/**
 * @param {string} url
 * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
 * @param {number} [reconnect]
 */
var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    }

    // Try to reconnect.
    client = null;

    // After 10 retries stop trying, to prevent logspam.
    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {any} data
   */
  function (data) {
    var message = JSON.parse(data);
    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
};
/* harmony default export */ __webpack_exports__["default"] = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
 * @returns {string}
 */
function format(objURL) {
  var protocol = objURL.protocol || "";
  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }
  var auth = objURL.auth || "";
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }
  var host = "";
  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));
    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }
  var pathname = objURL.pathname || "";
  if (objURL.slashes) {
    host = "//".concat(host || "");
    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }
  var search = objURL.search || "";
  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }
  var hash = objURL.hash || "";
  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }
  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match
   * @returns {string}
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
}

/**
 * @param {URL & { fromCurrentScript?: boolean }} parsedURL
 * @returns {string}
 */
function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname;

  // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'
  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]";

  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384
  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }
  var socketURLProtocol = parsedURL.protocol || self.location.protocol;

  // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.
  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }
  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = "";

  // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them
  if (parsedURL.username) {
    socketURLAuth = parsedURL.username;

    // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.
    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  }

  // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided
  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;
  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  }

  // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.
  var socketURLPathname = "/ws";
  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }
  return format({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
}
/* harmony default export */ __webpack_exports__["default"] = (createSocketURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @returns {string}
 */
function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  }

  // Fallback to getting all scripts running in the document.
  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });
  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  }

  // Fail as there was no script to use.
  throw new Error("[webpack-dev-server] Failed to get current script source.");
}
/* harmony default export */ __webpack_exports__["default"] = (getCurrentScriptSource);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   log: function() { return /* binding */ log; },
/* harmony export */   logEnabledFeatures: function() { return /* binding */ logEnabledFeatures; },
/* harmony export */   setLogLevel: function() { return /* binding */ setLogLevel; }
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server";
// default level is set on the client side, so it does not need
// to be set by the CLI or API
var defaultLevel = "info";

// options new options, merge with old options
/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */
function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}
setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);
var logEnabledFeatures = function logEnabledFeatures(features) {
  var enabledFeatures = Object.keys(features);
  if (!features || enabledFeatures.length === 0) {
    return;
  }
  var logString = "Server started:";

  // Server started: Hot Module Replacement enabled, Live Reloading enabled, Overlay disabled.
  for (var i = 0; i < enabledFeatures.length; i++) {
    var key = enabledFeatures[i];
    logString += " ".concat(key, " ").concat(features[key] ? "enabled" : "disabled", ",");
  }
  // replace last comma with a period
  logString = logString.slice(0, -1).concat(".");
  log.info(logString);
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");


/**
 * @param {string} resourceQuery
 * @returns {{ [key: string]: string | boolean }}
 */
function parseURL(resourceQuery) {
  /** @type {{ [key: string]: string }} */
  var options = {};
  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.slice(1).split("&");
    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      options[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var scriptSourceURL;
    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (error) {
      // URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }
    if (scriptSourceURL) {
      options = scriptSourceURL;
      options.fromCurrentScript = true;
    }
  }
  return options;
}
/* harmony default export */ __webpack_exports__["default"] = (parseURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");



/** @typedef {import("../index").Options} Options
/** @typedef {import("../index").Status} Status

/**
 * @param {Options} options
 * @param {Status} status
 */
function reloadApp(_ref, status) {
  var hot = _ref.hot,
    liveReload = _ref.liveReload;
  if (status.isUnloading) {
    return;
  }
  var currentHash = status.currentHash,
    previousHash = status.previousHash;
  var isInitial = currentHash.indexOf( /** @type {string} */previousHash) >= 0;
  if (isInitial) {
    return;
  }

  /**
   * @param {Window} rootWindow
   * @param {number} intervalId
   */
  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }
  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;
  if (hot && allowToHot) {
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", status.currentHash);
    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  }
  // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self;

    // use parent window for reload (in case we're in an iframe with no valid src)
    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;
        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
}
/* harmony default export */ __webpack_exports__["default"] = (reloadApp);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* global __resourceQuery WorkerGlobalScope */

// Send messages to the outside, so plugins can consume it.
/**
 * @param {string} type
 * @param {any} [data]
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}
/* harmony default export */ __webpack_exports__["default"] = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/stripAnsi.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/stripAnsi.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ansiRegex = new RegExp(["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|"), "g");

/**
 *
 * Strip [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code) from a string.
 * Adapted from code originally released by Sindre Sorhus
 * Licensed the MIT License
 *
 * @param {string} string
 * @return {string}
 */
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
  }
  return string.replace(ansiRegex, "");
}
/* harmony default export */ __webpack_exports__["default"] = (stripAnsi);

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __webpack_hash__ */
if (true) {
	/** @type {undefined|string} */
	var lastHash;
	var upToDate = function upToDate() {
		return /** @type {string} */ (lastHash).indexOf(__webpack_require__.h()) >= 0;
	};
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
	var check = function check() {
		module.hot
			.check(true)
			.then(function (updatedModules) {
				if (!updatedModules) {
					log(
						"warning",
						"[HMR] Cannot find update. " +
							(typeof window !== "undefined"
								? "Need to do a full reload!"
								: "Please reload manually!")
					);
					log(
						"warning",
						"[HMR] (Probably because of restarting the webpack-dev-server)"
					);
					if (typeof window !== "undefined") {
						window.location.reload();
					}
					return;
				}

				if (!upToDate()) {
					check();
				}

				__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);

				if (upToDate()) {
					log("info", "[HMR] App is up to date.");
				}
			})
			.catch(function (err) {
				var status = module.hot.status();
				if (["abort", "fail"].indexOf(status) >= 0) {
					log(
						"warning",
						"[HMR] Cannot apply update. " +
							(typeof window !== "undefined"
								? "Need to do a full reload!"
								: "Please reload manually!")
					);
					log("warning", "[HMR] " + log.formatError(err));
					if (typeof window !== "undefined") {
						window.location.reload();
					}
				} else {
					log("warning", "[HMR] Update failed: " + log.formatError(err));
				}
			});
	};
	var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
	hotEmitter.on("webpackHotUpdate", function (currentHash) {
		lastHash = currentHash;
		if (!upToDate() && module.hot.status() === "idle") {
			log("info", "[HMR] Checking for updates on the server...");
			check();
		}
	});
	log("info", "[HMR] Waiting for update signal from WDS...");
} else {}


/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();


/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

/**
 * @param {(string | number)[]} updatedModules updated modules
 * @param {(string | number)[] | null} renewedModules renewed modules
 */
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ (function(module) {

/** @typedef {"info" | "warning" | "error"} LogLevel */

/** @type {LogLevel} */
var logLevel = "info";

function dummy() {}

/**
 * @param {LogLevel} level log level
 * @returns {boolean} true, if should log
 */
function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

/**
 * @param {(msg?: string) => void} logFn log function
 * @returns {(level: LogLevel, msg?: string) => void} function that logs when log level is sufficient
 */
function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

/**
 * @param {LogLevel} level log level
 * @param {string|Error} msg message
 */
module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

/**
 * @param {LogLevel} level log level
 */
module.exports.setLogLevel = function (level) {
	logLevel = level;
};

/**
 * @param {Error} err error
 * @returns {string} formatted error
 */
module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),

/***/ "./repo/components/drawers/index.js":
/*!******************************************!*\
  !*** ./repo/components/drawers/index.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_libs_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../js/libs/logger.js */ "./repo/js/libs/logger.js");
/* harmony import */ var _js_libs_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../js/libs/utils.js */ "./repo/js/libs/utils.js");


(0,_js_libs_logger_js__WEBPACK_IMPORTED_MODULE_0__.log)("Started loading drawers api to global scope");
const {
  lock,
  unlock
} = bodyScrollLock;
const isAsync = target => target.constructor.name === "AsyncFunction";
const initialLayerZIndex = 200;
const defaultOptions = {
  overlapping: true,
  static: false,
  closeOnEsc: true,
  closeOnOutsideClick: true,
  closeConfirm: drawer => {
    return true;
  }
};
function addActiveClassToBtn(elem) {
  if (elem instanceof HTMLElement) {
    elem.classList.add("active");
  }
}
function removeActiveClassFromBtn(elem) {
  if (elem instanceof HTMLElement) {
    elem.classList.remove("active");
  }
}
class Drawer {
  static openDrawersList = [];
  static state = {
    upperOverlapping: null
  };
  static get upperOpenDrawer() {
    return Drawer.openDrawersList[Drawer.openDrawersList.length - 1];
  }
  static get upperOverlapping() {
    return Drawer.state.upperOverlapping;
  }
  static set upperOverlapping(drawer) {
    return Drawer.state.upperOverlapping = drawer;
  }
  static resetUpperOverlapping() {
    if (Drawer.upperOverlapping) {
      Drawer.upperOverlapping.upperOverlapping = false;
    }
    const upperOverlapping = Drawer.openDrawersList.find(drawer => drawer.overlapping);
    if (upperOverlapping) {
      upperOverlapping.upperOverlapping = true;
      Drawer.upperOverlapping = upperOverlapping;
    }
  }
  static get upperZIndex() {
    if (Drawer.openDrawersList.length) {
      return Drawer.upperOpenDrawer.zIndex;
    } else {
      return initialLayerZIndex;
    }
  }
  #state = {
    zIndex: null,
    focus: false,
    open: false,
    locked: false,
    upperOverlapping: false
  };
  subscribers = {
    close: [],
    open: []
  };
  components = {
    openBtnElems: [],
    closeBtnElems: [],
    toggleBtnElems: []
  };
  constructor(elem, alias) {
    let userOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const options = {
      __proto__: defaultOptions,
      on: {}
    };
    this.elem = elem;
    this.alias = alias;
    this.params = Object.assign(options, userOptions);
    (0,_js_libs_logger_js__WEBPACK_IMPORTED_MODULE_0__.debug)("Drawer has been initialized: ", alias);
  }
  set zIndex(val) {
    this.#state.zIndex = val;
    this.elem.style.setProperty("z-index", val);
  }
  get zIndex() {
    return this.#state.zIndex;
  }
  set focus(value) {
    this.#state.focus = value;
    if (value) {
      this.elem.classList.add("focus");
    } else {
      this.elem.classList.remove("focus");
    }
  }
  set upperOverlapping(value) {
    this.#state.upperOverlapping = value;
    if (value) {
      this.elem.classList.add("upper-overlapping");
    } else {
      this.elem.classList.remove("upper-overlapping");
    }
  }
  get upperOverlapping() {
    return this.#state.upperOverlapping;
  }
  get focus() {
    return this.#state.focus;
  }
  set locked(value) {
    this.#state.locked = value;
    if (value) bodyLock(this.elem);else bodyUnlock(this.elem);
  }
  get locked() {
    return this.#state.locked;
  }
  on(type, callback) {
    if (type in this.subscribers) {
      this.subscribers[type].push(callback);
    }
  }
  set overlapping(value) {
    this.params.overlapping = value;
    if (value) this.elem.classList.add("drawer_overlapping");else this.elem.classList.remove("drawer_overlapping");
    Drawer.resetUpperOverlapping();
  }
  get overlapping() {
    return this.params.overlapping;
  }
  addOpenBtn(target) {
    const openBtnElem = (0,_js_libs_utils_js__WEBPACK_IMPORTED_MODULE_1__.getTargetElem)(target);
    this.components.openBtnElems.push(openBtnElem);
    openBtnElem.addEventListener("click", event => {
      event.__drawerOpen = true;
      this.open(openBtnElem);
    });
  }
  addCloseBtn(target) {
    const closeBtnElem = (0,_js_libs_utils_js__WEBPACK_IMPORTED_MODULE_1__.getTargetElem)(target);
    this.components.closeBtnElems.push(closeBtnElem);
    closeBtnElem.addEventListener("click", event => {
      event.__drawerClose = true;
      this.close(closeBtnElem);
    });
  }
  addToggleBtn(target) {
    const toggleBtnElem = (0,_js_libs_utils_js__WEBPACK_IMPORTED_MODULE_1__.getTargetElem)(target);
    this.components.toggleBtnElems.push(toggleBtnElem);
    toggleBtnElem.addEventListener("click", event => {
      if (this.#state.open) {
        event.__drawerClose = true;
        this.close(toggleBtnElem);
      } else {
        event.__drawerOpen = true;
        this.open(toggleBtnElem);
      }
    });
  }
  open(initiator) {
    console.log("Open Drawer Native", this, initiator);
    if (this.#state.open) return;
    this.components.openBtnElems.forEach(addActiveClassToBtn);
    this.components.closeBtnElems.forEach(addActiveClassToBtn);
    this.components.toggleBtnElems.forEach(addActiveClassToBtn);
    if (this.params.overlapping || this.params.static) {
      // Add event listeners
      this.locked = true;
      if (Drawer.upperOverlapping) {
        Drawer.upperOverlapping.upperOverlapping = false;
      }
      this.upperOverlapping = true;
      Drawer.upperOverlapping = this;
    }
    // Get upper overlapping
    this.zIndex = Drawer.upperZIndex + 1;
    this.elem.classList.add("open");
    this.initiator = initiator;
    this.#state.open = true;
    Drawer.openDrawersList.push(this);
    this.subscribers.open.forEach(callback => callback(this));
  }
  close() {
    console.log("Close Drawer Native", this);
    if (!this.#state.open) return;
    this.components.openBtnElems.forEach(removeActiveClassFromBtn);
    this.components.closeBtnElems.forEach(removeActiveClassFromBtn);
    this.components.toggleBtnElems.forEach(removeActiveClassFromBtn);
    this.elem.classList.remove("open");
    this.locked = false;
    this.#state.open = false;
    const drawerIdx = Drawer.openDrawersList.findIndex(drawer => drawer.alias === this.alias);
    Drawer.openDrawersList.splice(drawerIdx, 1);
    Drawer.resetUpperOverlapping();
    this.subscribers.close.forEach(callback => callback(this));
  }
  async handleEsc(event) {
    if (this.params.closeOnEsc && !this.params.static) {
      if (await this.params.closeConfirm(this)) this.close();
    }
  }
  async handleOutsideClick(event) {
    if (event.target === this.initiator) return;
    if (this.params.closeOnOutsideClick && !this.params.static) {
      if (await this.params.closeConfirm(this)) this.close();
    }
  }
  async handleUnderlayClick(event) {
    if (this.params.closeOnOutsideClick && !this.params.static) {
      if (await this.params.closeConfirm(this)) this.close();
    }
  }
}
if (!window.drawers) {
  window.drawers = (() => {
    const kitchen = {};
    const drawersMap = {};
    kitchen.init = function (options) {
      (0,_js_libs_logger_js__WEBPACK_IMPORTED_MODULE_0__.debug)("Start drawers initialization");
      const drawerElems = document.querySelectorAll("[data-drawer]");
      const controlElems = document.querySelectorAll("[data-drawer-open], [data-drawer-close], [data-drawer-toggle]");
      drawerElems.forEach(elem => {
        const drawerAlias = elem.getAttribute("data-drawer");
        drawersMap[drawerAlias] = new Drawer(elem, drawerAlias, options);
      });
      controlElems.forEach(elem => {
        if (elem.hasAttribute("data-drawer-open")) {
          const drawerAlias = elem.getAttribute("data-drawer-open");
          if (!drawersMap[drawerAlias]) return;
          drawersMap[drawerAlias].addOpenBtn(elem);
        } else if (elem.hasAttribute("data-drawer-close")) {
          const drawerAlias = elem.getAttribute("data-drawer-close");
          if (!drawersMap[drawerAlias]) return;
          drawersMap[drawerAlias].addCloseBtn(elem);
        } else {
          const drawerAlias = elem.getAttribute("data-drawer-toggle");
          if (!drawersMap[drawerAlias]) return;
          drawersMap[drawerAlias].addToggleBtn(elem);
        }
      });
      document.addEventListener("click", event => {
        if (event.__drawerOpen || event.__drawerClose) return;
        const {
          target
        } = event;
        const drawerPanelElem = target.closest(".drawer__panel, [data-drawer-panel]");
        if (drawerPanelElem) {// Inside click
        } else {
          const drawerElem = target.closest(".drawer");
          if (drawerElem) {
            // Underlay click
            const alias = drawerElem.getAttribute("data-drawer");
            drawersMap[alias]?.handleUnderlayClick(event);
          } else {
            // Outside click
            Drawer.openDrawersList.forEach(drawer => drawer.handleOutsideClick(event));
          }
        }
      });
      document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
          if (!Drawer.openDrawersList.length) return;
          Drawer.upperOpenDrawer.handleEsc(event);
        }
      });
    };
    kitchen.assign = function (target, alias, options) {
      if (alias in drawersMap) throw new Error(`There is drawer already created with given alias: "${alias}"`);
      const drawerElem = target instanceof HTMLElement ? target : document.querySelector(target);
      if (drawerElem) throw new Error(`There is no element has been found by given selector: "${target}"`);
      return drawersMap[alias] = new Drawer(drawerElem, alias, options);
    };
    kitchen.open = function (alias, initiator) {
      console.log("Open Drawer Kitchen", alias, initiator);
      if (!(alias in drawersMap)) throw new Error(`There is no drawer created with given alias: "${alias}"`);
      drawersMap[alias].open(initiator);
    };
    kitchen.close = function (alias) {
      console.log("Close Drawer Kitchen", alias);
      if (!(alias in drawersMap)) throw new Error(`There is no drawer created with given alias: "${alias}"`);
      drawersMap[alias].close();
    };
    kitchen.get = function (alias) {
      return drawersMap[alias];
    };
    kitchen.on = (alias, type, callback) => kitchen.get(alias)?.on(type, callback);
    return kitchen;
  })();
}
function bodyLock(targetElem) {
  lock(targetElem);
  const bodyElem = document.querySelector("body");
  bodyElem.classList.add("lock");
  const scrollableElems = targetElem.querySelectorAll("[data-scrollable]");
  scrollableElems.forEach(elem => lock(elem));
}
function bodyUnlock(targetElem) {
  let removeUnderlay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  let delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
  const bodyElem = document.querySelector("body");
  setTimeout(() => {
    if (removeUnderlay) {
      bodyElem.classList.remove("lock");
    }
    unlock(targetElem);
    const scrollableElems = targetElem.querySelectorAll("[data-scrollable]");
    scrollableElems.forEach(elem => unlock(elem));
  }, delay);
}

/***/ }),

/***/ "./repo/js/libs/blockSizeVars.js":
/*!***************************************!*\
  !*** ./repo/js/libs/blockSizeVars.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initBlockSizeTracking: function() { return /* binding */ initBlockSizeTracking; },
/* harmony export */   trackBlockSize: function() { return /* binding */ trackBlockSize; }
/* harmony export */ });
/* harmony import */ var _throttle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./throttle.js */ "./repo/js/libs/throttle.js");

const isHtmlElem = elem => {
  return elem && typeof elem === "object" && "tagName" in elem || false;
};
const stack = new Map();
const setVars = (elem, prefix, _ref) => {
  let {
    width,
    height
  } = _ref;
  if (width !== undefined) elem.style.setProperty(`--${prefix}width`, width);
  if (height !== undefined) elem.style.setProperty(`--${prefix}height`, height);
};
const handleResize = (0,_throttle_js__WEBPACK_IMPORTED_MODULE_0__.throttleByKey)(target => {
  if (!stack.has(target)) return;
  const {
    elem,
    prefix,
    container,
    include
  } = stack.get(target);
  const holder = isHtmlElem(container) ? container : elem;
  const vars = {
    width: elem.clientWidth,
    height: elem.clientHeight
  };
  if (include !== undefined && include !== null) {
    if (!include.includes("height")) delete vars.height;
    if (!include.includes("width")) delete vars.width;
  }
  setVars(holder, prefix, vars);
}, 100, {
  noLeadingCall: true
});
const observer = new ResizeObserver(entries => {
  entries.forEach(_ref2 => {
    let {
      target
    } = _ref2;
    handleResize(target, target);
  });
});
const registerElem = (elem, _ref3) => {
  let {
    prefix,
    container,
    include
  } = _ref3;
  // prefix, containerElemOrSelector
  const normalizedPrefix = prefix ? `${prefix}-` : "";
  const containerElem = isHtmlElem(container) ? container : elem.closest(container);
  stack.set(elem, {
    elem,
    prefix: normalizedPrefix,
    container: containerElem,
    include
  });
  observer.observe(elem);
};
const trackBlockSize = (target, options) => {
  // { prefix, container, include }
  if (typeof target === "string") {
    const elems = document.querySelectorAll(target);
    elems.forEach(elem => registerElem(elem, options));
  } else {
    registerElem(target, options);
  }
};
const initBlockSizeTracking = () => {
  // { prefix, container, include }
  const elems = document.querySelectorAll("[data-track-size]");
  elems.forEach(elem => {
    registerElem(elem, {
      prefix: elem.getAttribute("data-track-size"),
      container: elem.getAttribute("data-size-vars-container"),
      include: elem.getAttribute("data-include-size-vars")
    });
  });
};

/***/ }),

/***/ "./repo/js/libs/debounce.js":
/*!**********************************!*\
  !*** ./repo/js/libs/debounce.js ***!
  \**********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounce: function() { return /* binding */ debounce; }
/* harmony export */ });
const defaultSettings = {
  leadingCall: true
};
const debounce = (callback, delay, options) => {
  const settings = options ? Object.assign(defaultSettings, options) : defaultSettings;
  let timeOut = null;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (timeOut) {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        timeOut = null;
        callback(...args);
      }, delay);
    } else {
      timeOut = setTimeout(() => timeOut = null, delay);
      if (settings.leadingCall) {
        callback(...args);
      }
    }
  };
};

/***/ }),

/***/ "./repo/js/libs/functions.js":
/*!***********************************!*\
  !*** ./repo/js/libs/functions.js ***!
  \***********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FLS: function() { return /* binding */ FLS; },
/* harmony export */   _slideDown: function() { return /* binding */ _slideDown; },
/* harmony export */   _slideToggle: function() { return /* binding */ _slideToggle; },
/* harmony export */   _slideUp: function() { return /* binding */ _slideUp; },
/* harmony export */   addLoadedClass: function() { return /* binding */ addLoadedClass; },
/* harmony export */   addTouchClass: function() { return /* binding */ addTouchClass; },
/* harmony export */   bodyLock: function() { return /* binding */ bodyLock; },
/* harmony export */   bodyLockStatus: function() { return /* binding */ bodyLockStatus; },
/* harmony export */   bodyLockToggle: function() { return /* binding */ bodyLockToggle; },
/* harmony export */   bodyUnlock: function() { return /* binding */ bodyUnlock; },
/* harmony export */   dataMediaQueries: function() { return /* binding */ dataMediaQueries; },
/* harmony export */   fullVHfix: function() { return /* binding */ fullVHfix; },
/* harmony export */   getDigFormat: function() { return /* binding */ getDigFormat; },
/* harmony export */   getDigFromString: function() { return /* binding */ getDigFromString; },
/* harmony export */   getHash: function() { return /* binding */ getHash; },
/* harmony export */   indexInParent: function() { return /* binding */ indexInParent; },
/* harmony export */   isMobile: function() { return /* binding */ isMobile; },
/* harmony export */   isWebp: function() { return /* binding */ isWebp; },
/* harmony export */   menuClose: function() { return /* binding */ menuClose; },
/* harmony export */   menuInit: function() { return /* binding */ menuInit; },
/* harmony export */   menuOpen: function() { return /* binding */ menuOpen; },
/* harmony export */   removeClasses: function() { return /* binding */ removeClasses; },
/* harmony export */   setHash: function() { return /* binding */ setHash; },
/* harmony export */   showMore: function() { return /* binding */ showMore; },
/* harmony export */   spollers: function() { return /* binding */ spollers; },
/* harmony export */   tabs: function() { return /* binding */ tabs; },
/* harmony export */   uniqArray: function() { return /* binding */ uniqArray; }
/* harmony export */ });
/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
function isWebp() {
  // Проверка поддержки webp 
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}
/* Проверка мобильного браузера */
let isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) document.documentElement.classList.add('touch');
}
// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass() {
  window.addEventListener("load", function () {
    setTimeout(function () {
      document.documentElement.classList.add('loaded');
    }, 0);
  });
}
// Получение хеша в адресе сайта
function getHash() {
  if (location.hash) {
    return location.hash.replace('#', '');
  }
}
// Указание хеша в адресе сайта
function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0];
  history.pushState('', '', hash);
}
// Учет плавающей панели на мобильных устройствах при 100vh
function fullVHfix() {
  const fullScreens = document.querySelectorAll('[data-fullscreen]');
  if (fullScreens.length && isMobile.any()) {
    window.addEventListener('resize', fixHeight);
    function fixHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    fixHeight();
  }
}
// Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
let _slideUp = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let showmore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty('height') : null;
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      !showmore ? target.style.removeProperty('overflow') : null;
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // Создаем событие 
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target: target
        }
      }));
    }, duration);
  }
};
let _slideDown = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  let showmore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty('height') : null;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // Создаем событие 
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target: target
        }
      }));
    }, duration);
  }
};
let _slideToggle = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};
// Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
let bodyLockStatus = true;
let bodyLockToggle = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  if (document.documentElement.classList.contains('lock')) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};
let bodyUnlock = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  let body = document.querySelector("body");
  if (bodyLockStatus) {
    let lock_padding = document.querySelectorAll("[data-lp]");
    setTimeout(() => {
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      document.documentElement.classList.remove("lock");
    }, delay);
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
let bodyLock = function () {
  let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  let body = document.querySelector("body");
  if (bodyLockStatus) {
    let lock_padding = document.querySelectorAll("[data-lp]");
    for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index];
      el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    }
    body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
// Модуль работы со спойлерами =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/modul-spojlery.html
Сниппет (HTML): spollers
*/
function spollers() {
  const spollersArray = document.querySelectorAll('[data-spollers]');
  if (spollersArray.length > 0) {
    // Получение обычных слойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    });
    // Инициализация обычных слойлеров
    if (spollersRegular.length) {
      initSpollers(spollersRegular);
    }
    // Получение слойлеров с медиа запросами
    let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach(mdQueriesItem => {
        // Событие
        mdQueriesItem.matchMedia.addEventListener("change", function () {
          initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
    // Инициализация
    function initSpollers(spollersArray) {
      let matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      spollersArray.forEach(spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add('_spoller-init');
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);
        } else {
          spollersBlock.classList.remove('_spoller-init');
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      });
    }
    // Работа с контентом
    function initSpollerBody(spollersBlock) {
      let hideSpollerBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter(item => item.closest('[data-spollers]') === spollersBlock);
        spollerTitles.forEach(spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute('tabindex');
            if (!spollerTitle.classList.contains('_spoller-active')) {
              spollerTitle.nextElementSibling.hidden = true;
            }
          } else {
            spollerTitle.setAttribute('tabindex', '-1');
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }
    function setSpollerAction(e) {
      const el = e.target;
      if (el.closest('[data-spoller]')) {
        const spollerTitle = el.closest('[data-spoller]');
        const spollersBlock = spollerTitle.closest('[data-spollers]');
        const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
        if (!spollersBlock.querySelectorAll('._slide').length) {
          if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
            hideSpollersBody(spollersBlock);
          }
          spollerTitle.classList.toggle('_spoller-active');
          _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
        }
        e.preventDefault();
      }
    }
    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
      if (spollerActiveTitle && !spollersBlock.querySelectorAll('._slide').length) {
        spollerActiveTitle.classList.remove('_spoller-active');
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
      }
    }
    // Закрытие при клике вне спойлера
    const spollersClose = document.querySelectorAll('[data-spoller-close]');
    if (spollersClose.length) {
      document.addEventListener("click", function (e) {
        const el = e.target;
        if (!el.closest('[data-spollers]')) {
          spollersClose.forEach(spollerClose => {
            const spollersBlock = spollerClose.closest('[data-spollers]');
            if (spollersBlock.classList.contains('_spoller-init')) {
              const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
              spollerClose.classList.remove('_spoller-active');
              _slideUp(spollerClose.nextElementSibling, spollerSpeed);
            }
          });
        }
      });
    }
  }
}
// Модуь работы с табами =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/modul-taby.html
Сниппет (HTML): tabs
*/
function tabs() {
  const tabs = document.querySelectorAll('[data-tabs]');
  let tabsActiveHash = [];
  if (tabs.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith('tab-')) {
      tabsActiveHash = hash.replace('tab-', '').split('-');
    }
    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add('_tab-init');
      tabsBlock.setAttribute('data-tabs-index', index);
      tabsBlock.addEventListener("click", setTabsAction);
      initTabs(tabsBlock);
    });

    // Получение слойлеров с медиа запросами
    let mdQueriesArray = dataMediaQueries(tabs, "tabs");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach(mdQueriesItem => {
        // Событие
        mdQueriesItem.matchMedia.addEventListener("change", function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }
  // Установка позиций заголовков
  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach(tabsMediaItem => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
      let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
      let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
      let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
      tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
      tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add('_tab-spoller');
        } else {
          tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove('_tab-spoller');
        }
      });
    });
  }
  // Работа с контентом
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
      tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
    }
    if (tabsContent.length) {
      tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute('data-tabs-title', '');
        tabsContentItem.setAttribute('data-tabs-item', '');
        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add('_tab-active');
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
      });
    }
  }
  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    function isTabsAnamate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
      }
    }
    const tabsBlockAnimate = isTabsAnamate(tabsBlock);
    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute('data-tabs-hash');
      tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains('_tab-active')) {
          if (tabsBlockAnimate) {
            _slideDown(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = false;
          }
          if (isHash && !tabsContentItem.closest('.popup')) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            _slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }
  function setTabsAction(e) {
    const el = e.target;
    if (el.closest('[data-tabs-title]')) {
      const tabTitle = el.closest('[data-tabs-title]');
      const tabsBlock = tabTitle.closest('[data-tabs]');
      if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
        let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
        tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock) : null;
        tabActiveTitle.length ? tabActiveTitle[0].classList.remove('_tab-active') : null;
        tabTitle.classList.add('_tab-active');
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}
// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/menu-burger.html
Сниппет (HTML): menu
*/
function menuInit() {
  if (document.querySelector(".icon-menu")) {
    document.addEventListener("click", function (e) {
      if (bodyLockStatus && e.target.closest('.icon-menu')) {
        bodyLockToggle();
        document.documentElement.classList.toggle("menu-open");
      }
    });
  }
  ;
}
function menuOpen() {
  bodyLock();
  document.documentElement.classList.add("menu-open");
}
function menuClose() {
  bodyUnlock();
  document.documentElement.classList.remove("menu-open");
}
// Модуль "показать еще" =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/modul-pokazat-eshhjo.html
Сниппет (HTML): showmore
*/
function showMore() {
  window.addEventListener("load", function (e) {
    const showMoreBlocks = document.querySelectorAll('[data-showmore]');
    let showMoreBlocksRegular;
    let mdQueriesArray;
    if (showMoreBlocks.length) {
      // Получение обычных объектов
      showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (item, index, self) {
        return !item.dataset.showmoreMedia;
      });
      // Инициализация обычных объектов
      showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
      document.addEventListener("click", showMoreActions);
      window.addEventListener("resize", showMoreActions);

      // Получение объектов с медиа запросами
      mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
      if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach(mdQueriesItem => {
          // Событие
          mdQueriesItem.matchMedia.addEventListener("change", function () {
            initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
          });
        });
        initItemsMedia(mdQueriesArray);
      }
    }
    function initItemsMedia(mdQueriesArray) {
      mdQueriesArray.forEach(mdQueriesItem => {
        initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
    function initItems(showMoreBlocks, matchMedia) {
      showMoreBlocks.forEach(showMoreBlock => {
        initItem(showMoreBlock, matchMedia);
      });
    }
    function initItem(showMoreBlock) {
      let matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
      let showMoreContent = showMoreBlock.querySelectorAll('[data-showmore-content]');
      let showMoreButton = showMoreBlock.querySelectorAll('[data-showmore-button]');
      showMoreContent = Array.from(showMoreContent).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
      showMoreButton = Array.from(showMoreButton).filter(item => item.closest('[data-showmore]') === showMoreBlock)[0];
      const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
      if (matchMedia.matches || !matchMedia) {
        if (hiddenHeight < getOriginalHeight(showMoreContent)) {
          _slideUp(showMoreContent, 0, hiddenHeight);
          showMoreButton.hidden = false;
        } else {
          _slideDown(showMoreContent, 0, hiddenHeight);
          showMoreButton.hidden = true;
        }
      } else {
        _slideDown(showMoreContent, 0, hiddenHeight);
        showMoreButton.hidden = true;
      }
    }
    function getHeight(showMoreBlock, showMoreContent) {
      let hiddenHeight = 0;
      const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size';
      if (showMoreType === 'items') {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3;
        const showMoreItems = showMoreContent.children;
        for (let index = 1; index < showMoreItems.length; index++) {
          const showMoreItem = showMoreItems[index - 1];
          hiddenHeight += showMoreItem.offsetHeight;
          if (index == showMoreTypeValue) break;
        }
      } else {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150;
        hiddenHeight = showMoreTypeValue;
      }
      return hiddenHeight;
    }
    function getOriginalHeight(showMoreContent) {
      let parentHidden;
      let hiddenHeight = showMoreContent.offsetHeight;
      showMoreContent.style.removeProperty('height');
      if (showMoreContent.closest(`[hidden]`)) {
        parentHidden = showMoreContent.closest(`[hidden]`);
        parentHidden.hidden = false;
      }
      let originalHeight = showMoreContent.offsetHeight;
      parentHidden ? parentHidden.hidden = true : null;
      showMoreContent.style.height = `${hiddenHeight}px`;
      return originalHeight;
    }
    function showMoreActions(e) {
      const targetEvent = e.target;
      const targetType = e.type;
      if (targetType === 'click') {
        if (targetEvent.closest('[data-showmore-button]')) {
          const showMoreButton = targetEvent.closest('[data-showmore-button]');
          const showMoreBlock = showMoreButton.closest('[data-showmore]');
          const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
          const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : '500';
          const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
          if (!showMoreContent.classList.contains('_slide')) {
            showMoreBlock.classList.contains('_showmore-active') ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight) : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
            showMoreBlock.classList.toggle('_showmore-active');
          }
        }
      } else if (targetType === 'resize') {
        showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
        mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
      }
    }
  });
}

//================================================================================================================================================================================================================================================================================================================
// Прочие полезные функции ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================
// FLS (Full Logging System)
function FLS(message) {
  setTimeout(() => {
    if (window.FLS) {
      console.log(message);
    }
  }, 0);
}
// Получить цифры из строки
function getDigFromString(item) {
  return parseInt(item.replace(/[^\d]/g, ''));
}
// Форматирование цифр типа 100 000 000
function getDigFormat(item) {
  return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}
// Убрать класс из всех элементов массива
function removeClasses(array, className) {
  for (var i = 0; i < array.length; i++) {
    array[i].classList.remove(className);
  }
}
// Уникализация массива
function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}
// Функция получения индекса внутри родителя
function indexInParent(parent, element) {
  const array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
}
;
// Обработа медиа запросов из атрибутов 
function dataMediaQueries(array, dataSetValue) {
  // Получение объектов с медиа запросами
  const media = Array.from(array).filter(function (item, index, self) {
    if (item.dataset[dataSetValue]) {
      return item.dataset[dataSetValue].split(",")[0];
    }
  });
  // Инициализация объектов с медиа запросами
  if (media.length) {
    const breakpointsArray = [];
    media.forEach(item => {
      const params = item.dataset[dataSetValue];
      const breakpoint = {};
      const paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });
    // Получаем уникальные брейкпоинты
    let mdQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
    });
    mdQueries = uniqArray(mdQueries);
    const mdQueriesArray = [];
    if (mdQueries.length) {
      // Работаем с каждым брейкпоинтом
      mdQueries.forEach(breakpoint => {
        const paramsArray = breakpoint.split(",");
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);
        // Объекты с нужными условиями
        const itemsArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        mdQueriesArray.push({
          itemsArray,
          matchMedia
        });
      });
      return mdQueriesArray;
    }
  }
}
//================================================================================================================================================================================================================================================================================================================

/***/ }),

/***/ "./repo/js/libs/logger.js":
/*!********************************!*\
  !*** ./repo/js/libs/logger.js ***!
  \********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debug: function() { return /* binding */ debug; },
/* harmony export */   error: function() { return /* binding */ error; },
/* harmony export */   log: function() { return /* binding */ log; }
/* harmony export */ });
const onlyErrorsToConsole = true;
const consoleLogs = true;
const consoleDebug = true;
const alertOnError = false;
const alertOnLog = false;
function log() {
  if (!onlyErrorsToConsole) {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (consoleLogs) console.log(...args);
    if (alertOnLog) alert(args.join(" :: "));
  }
}
function debug() {
  if (!onlyErrorsToConsole && consoleDebug) console.debug(...arguments);
}
function error() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  if (!onlyErrorsToConsole && consoleDebug) console.error(...args);
  if (alertOnError) alert(args.join(" :: "));
}

/***/ }),

/***/ "./repo/js/libs/portals.js":
/*!*********************************!*\
  !*** ./repo/js/libs/portals.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initPortals: function() { return /* binding */ initPortals; }
/* harmony export */ });
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger.js */ "./repo/js/libs/logger.js");
/* harmony import */ var _debounce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debounce.js */ "./repo/js/libs/debounce.js");


const portalsIndexByMedia = {};
const mediaIndex = {};
const onClassIndex = {};
const indexByName = {};
class Portal {
  constructor(name, src, dest) {
    this.name = name;
    this.src = src;
    this.dest = dest;
    this.state = {
      active: false
    };
  }
  send() {
    if (this.state.active) return this;
    this.dest.append(...this.src.childNodes);
    this.src.setAttribute("data-portal-active", "true");
    this.dest.setAttribute("data-portal-active", "true");
    this.state.active = true;
    (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.debug)("Portal has been activated: ", this);
    return this;
  }
  return() {
    if (!this.state.active) return this;
    this.src.append(...this.dest.childNodes);
    this.src.removeAttribute("data-portal-active");
    this.dest.removeAttribute("data-portal-active");
    this.state.active = false;
    (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.debug)("Portal has been de-activated: ", this.name);
    return this;
  }
  swap() {
    return this.state.active ? this.return() : this.send();
  }
}
function initPortals() {
  (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.log)("Start portals initialization");
  const sourceElems = document.querySelectorAll("[data-portal-src]");
  const destElems = document.querySelectorAll("[data-portal-dest]");
  const destMap = [].reduce.call(destElems, (result, elem) => {
    result[elem.getAttribute("data-portal-dest")] = elem;
    return result;
  }, {});

  // Activate portal on user defined class added
  initMutationObserver();
  sourceElems.forEach(elem => {
    const portalName = elem.getAttribute("data-portal-src");
    const portalMedia = elem.getAttribute("data-portal-media");
    const portalOnClass = elem.getAttribute("data-portal-on-class");
    (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.debug)("Initialize portal:: portalName: ", portalName, ", portalMedia: ", portalMedia, ", portalOnClass: ", portalOnClass);
    if (!destMap[portalName]) {
      (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.debug)("No destination for portal:: portalName: ", portalName);
      return;
    }
    indexByName[portalName] = new Portal(portalName, elem, destMap[portalName]);
    if (portalMedia) return addTriggerByMedia(portalName, portalMedia);
    if (portalOnClass) return initPortalDrivenByClass(portalName, portalOnClass);
  });
  (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.debug)("indexByName: ", indexByName, "portalsIndexByMedia: ", portalsIndexByMedia);
  Object.entries(mediaIndex).forEach(_ref => {
    let [media, mediaMatch] = _ref;
    return swapByMedia(mediaMatch);
  });
  window.portals = {
    getByName: name => indexByName[name]
  };
  function addTriggerByMedia(portalName, portalMedia) {
    (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.debug)("addTriggerByMedia: ", portalName, portalMedia);
    if (!mediaIndex[portalMedia]) {
      const mediaMatch = window.matchMedia(portalMedia);
      mediaIndex[portalMedia] = mediaMatch;
      portalsIndexByMedia[mediaMatch.media] = {
        mediaMatch,
        stack: [portalName]
      };
      mediaMatch.addListener(swapByMedia);
    } else {
      const trueMedia = mediaIndex[portalMedia].media;
      portalsIndexByMedia[trueMedia].stack.push(portalName);
    }
  }
  function initMutationObserver() {
    return new MutationObserver((mutationsList, observer) => {
      (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.log)(mutationsList);
    });
  }
  function initPortalDrivenByClass(className) {}
  function swapByMedia(_ref2) {
    let {
      matches,
      media
    } = _ref2;
    (0,_logger_js__WEBPACK_IMPORTED_MODULE_0__.debug)("Manipulate portals by media: ", media, ", matches: ", matches);
    if (matches) {
      portalsIndexByMedia[media].stack.forEach(portalName => indexByName[portalName].send());
    } else {
      portalsIndexByMedia[media].stack.forEach(portalName => indexByName[portalName].return());
    }
  }
}

/***/ }),

/***/ "./repo/js/libs/textareaAutoheight.js":
/*!********************************************!*\
  !*** ./repo/js/libs/textareaAutoheight.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initTextareaAutoheight: function() { return /* binding */ initTextareaAutoheight; }
/* harmony export */ });
/* harmony import */ var _throttle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./throttle.js */ "./repo/js/libs/throttle.js");

const updateMinHeight = (0,_throttle_js__WEBPACK_IMPORTED_MODULE_0__.throttle)(target => {
  target.style.minHeight = "0px";
  target.style.minHeight = `${target.scrollHeight}px`;
}, 50);
const resizeObserver = new ResizeObserver(entries => {
  entries.forEach(_ref => {
    let {
      target
    } = _ref;
    return updateMinHeight(target);
  });
});
function initTextareaAutoheight() {
  const elems = document.querySelectorAll("textarea");
  const changeHandler = event => updateMinHeight(event.target);
  elems.forEach(elem => {
    resizeObserver.observe(elem);
    elem.addEventListener("input", changeHandler);
    elem.addEventListener("change", changeHandler);
  });
}

/***/ }),

/***/ "./repo/js/libs/throttle.js":
/*!**********************************!*\
  !*** ./repo/js/libs/throttle.js ***!
  \**********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   throttle: function() { return /* binding */ throttle; },
/* harmony export */   throttleByKey: function() { return /* binding */ throttleByKey; }
/* harmony export */ });
const throttle = function (callback, delay) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let timeOut = null,
    argsMemo;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (timeOut) {
      argsMemo = args;
    } else {
      if (options.noLeadingCall) {
        argsMemo = args;
      } else {
        callback(...args);
      }
      schedule();
    }
    function schedule() {
      timeOut = setTimeout(() => {
        if (argsMemo) {
          callback(...argsMemo);
          argsMemo = null;
        }
        timeOut = null;
      }, delay);
    }
  };
};
const throttleByKey = function (callback, delay) {
  let {
    noLeadingCall
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const memo = new Map();
  let timeOut = null,
    argsMemo;
  return function (key) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    if (timeOut) {
      memo.set(key, args);
    } else {
      if (noLeadingCall) {
        memo.set(key, args);
      } else {
        callback(...args);
      }
      schedule();
    }
    function schedule() {
      timeOut = setTimeout(() => {
        memo.forEach(args => {
          callback(...args);
        });
        memo.clear();
        timeOut = null;
      }, delay);
    }
  };
};

/***/ }),

/***/ "./repo/js/libs/trackChildInputIsFilled.js":
/*!*************************************************!*\
  !*** ./repo/js/libs/trackChildInputIsFilled.js ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initChildInputIsFilledTracking: function() { return /* binding */ initChildInputIsFilledTracking; }
/* harmony export */ });
function initChildInputIsFilledTracking() {
  const elems = document.querySelectorAll("[data-track-child-is-filled]");
  const inputHandler = event => {
    if (event.target.value.length > 0) {
      event.currentTarget.classList.add("child-input-is-filled");
    } else {
      event.currentTarget.classList.remove("child-input-is-filled");
    }
  };
  elems.forEach(elem => {
    elem.addEventListener("input", inputHandler);
    elem.addEventListener("change", inputHandler);
  });
}

/***/ }),

/***/ "./repo/js/libs/utils.js":
/*!*******************************!*\
  !*** ./repo/js/libs/utils.js ***!
  \*******************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createElem: function() { return /* binding */ createElem; },
/* harmony export */   forEachProp: function() { return /* binding */ forEachProp; },
/* harmony export */   formatPrice: function() { return /* binding */ formatPrice; },
/* harmony export */   getTargetElem: function() { return /* binding */ getTargetElem; },
/* harmony export */   isEmpty: function() { return /* binding */ isEmpty; },
/* harmony export */   isInit: function() { return /* binding */ isInit; },
/* harmony export */   normalizeString: function() { return /* binding */ normalizeString; }
/* harmony export */ });
function isEmpty(value) {
  return value === null || value === undefined || value === "";
}
function isInit(value) {
  return value !== null && value !== undefined;
}
function getTargetElem(target) {
  if (target instanceof HTMLElement) {
    return target;
  } else {
    const elem = document.querySelector(target);
    if (!elem) new Error(`Cannot find the target by selector: ${target}`);
    return elem;
  }
}
function formatPrice(value) {
  const normalizedValue = typeof value === "string" ? value.trim().replace(" ", "") : String(value);
  const result = [];
  const tmp = normalizedValue.split("");
  // return normalizedValue.split(/\B(?=(\d{3})+$)/).join(" ");
  while (tmp.length > 0) {
    result.unshift(tmp.splice(-3).join(""));
  }
  return result.join(" ");
}
function forEachProp(obj, callback) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    callback(keys[i], obj[keys[i]]);
  }
}
;
const createElem = (name, attrs, container) => {
  var el = document.createElement(name);
  if (attrs) forEachProp(attrs, function (key, value) {
    return el.setAttribute(key, value);
  });
  if (container) container.appendChild(el);
  return el;
};
const normalizeString = value => {
  return String(value).toLowerCase().trim();
};

/***/ }),

/***/ "./src/js/common/index.js":
/*!********************************!*\
  !*** ./src/js/common/index.js ***!
  \********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/ModuleManager/index.js */ "./src/js/shared/ModuleManager/index.js");
/* harmony import */ var _store_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store/index.js */ "./src/js/common/store/index.js");
/* harmony import */ var _shared_events_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/events.js */ "./src/js/shared/events.js");
/* harmony import */ var _repo_components_drawers_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../repo/components/drawers/index.js */ "./repo/components/drawers/index.js");
/* harmony import */ var _repo_js_libs_portals_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../repo/js/libs/portals.js */ "./repo/js/libs/portals.js");
/* harmony import */ var _repo_js_libs_trackChildInputIsFilled_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../repo/js/libs/trackChildInputIsFilled.js */ "./repo/js/libs/trackChildInputIsFilled.js");
/* harmony import */ var _repo_js_libs_textareaAutoheight_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../repo/js/libs/textareaAutoheight.js */ "./repo/js/libs/textareaAutoheight.js");
/* harmony import */ var _repo_js_libs_blockSizeVars_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../repo/js/libs/blockSizeVars.js */ "./repo/js/libs/blockSizeVars.js");
/* harmony import */ var _repo_js_libs_functions_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../repo/js/libs/functions.js */ "./repo/js/libs/functions.js");
/* harmony import */ var _shared_logger_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/logger/index.js */ "./src/js/shared/logger/index.js");










(0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_shared_events_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
const entry = (context, module) => {
  if (document.readyState === "interactive") {
    onDomReady();
  } else {
    window.addEventListener("DOMContentLoaded", onDomReady);
  }
  function onDomReady(event) {
    try {
      (0,_repo_js_libs_portals_js__WEBPACK_IMPORTED_MODULE_4__.initPortals)();
      drawers.init();
      initBurgerCloseOnNavClick();
      initCloseDrawersOnResize();
      (0,_repo_js_libs_trackChildInputIsFilled_js__WEBPACK_IMPORTED_MODULE_5__.initChildInputIsFilledTracking)();
      (0,_repo_js_libs_textareaAutoheight_js__WEBPACK_IMPORTED_MODULE_6__.initTextareaAutoheight)();
      (0,_repo_js_libs_blockSizeVars_js__WEBPACK_IMPORTED_MODULE_7__.initBlockSizeTracking)();
      initMarkOnScroll();
      addIsMobileClass();
      initNavBtns();
    } catch (ex) {
      (0,_shared_logger_index_js__WEBPACK_IMPORTED_MODULE_9__.error)(ex);
    }
  }
};
const common = new _shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__.Module({
  name: "common",
  entry: entry,
  required: ["events", "commonStore"]
});
_shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(common);
function initBurgerCloseOnNavClick() {
  $("[data-drawer='burger-menu']").on("click", _ref => {
    let {
      target
    } = _ref;
    if (target.tagName === "A" || target.closest("a")) {
      drawers.close("burger-menu");
    }
  });
}
function addIsMobileClass() {
  if (_repo_js_libs_functions_js__WEBPACK_IMPORTED_MODULE_8__.isMobile.any()) {
    document.documentElement.classList.add("is-mobile");
  }
}
function initCloseDrawersOnResize() {
  const close = _ref2 => {
    let {
      matches
    } = _ref2;
    drawers.get("burger-menu").close();
  };
  const mediaMatch = window.matchMedia("(max-width: 1150px)");
  mediaMatch.addListener(close);
}
function initMarkOnScroll() {
  document.addEventListener("scroll", () => {
    checkAndSet();
  });
  checkAndSet();
  function checkAndSet() {
    if (window.scrollY > 80) {
      document.documentElement.classList.add("scroll-80-plus");
    } else {
      document.documentElement.classList.remove("scroll-80-plus");
    }
  }
}
function isCurrentLocation(href) {
  if (isOnlyHash(href)) return true;
  if (isRelativeToRoot(href)) {
    return window.location.pathname + window.location.search === removeHash(href);
  } else if (isAbsoluteUrl(href)) {
    return removeHash(href) === removeHash(window.location.href);
  } else if (isRelativeUrl(href)) {
    return false;
  } else {
    // Внутри текущей директории
    if (hasNoSubDir(href)) {
      return removeHash(window.location.href).endsWith(removeDot(removeHash(href)));
    } else {
      return false;
    }
  }
  function isOnlyHash(href) {
    return href.startsWith("#");
  }
  function removeDot(href) {
    return href.replcae(/^\./, "");
    ;
  }
  function hasNoSubDir(href) {
    return /^(?:\.\/)?[^\/]*/i.test(href);
  }
  function isAbsoluteUrl(href) {
    return /^(?:http|https).*/i.test(href);
  }
  function isRelativeToRoot(href) {
    return /^\/.*/i.test(href);
  }
  function isRelativeUrl(href) {
    return /^..\.*/i.test(href);
  }
  function removeHash(href) {
    const hashIdx = href.lastIndexOf("#");
    return href.slice(0, hashIdx);
  }
}
function initNavBtns() {
  const elems = document.querySelectorAll("a[href*='#']");
  elems.forEach(elem => {
    elem.addEventListener("click", event => {
      const href = elem.getAttribute("href");
      if (isCurrentLocation(href)) {
        event.preventDefault();
        const hash = extractHash(href);
        if (hash) {
          toSection(hash, {
            offset: Number(elem.getAttribute("data-scroll-offset"))
          });
        }
      }
    });
  });
  function extractHash(href) {
    const hashMatch = href.match(/.*?#([^\?]*)/);
    if (!hashMatch) return hashMatch;
    return hashMatch[1];
  }
}
function toSection(id) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const sectionElem = document.querySelector(`#${id}`);
  if (sectionElem) {
    const headerElem = document.querySelector(`header`);
    const sectionBcr = sectionElem.getBoundingClientRect();
    const offset = "offset" in options ? options.offset : 0;
    const newScrollPos = sectionBcr.top + window.scrollY - headerElem.offsetHeight + offset;
    if (isBodyLocked()) {
      options.timeout = 400;
    }
    if ("timeout" in options) {
      setTimeout(() => {
        window.scrollTo({
          top: newScrollPos,
          behavior: 'smooth'
        });
      }, options.timeout);
    } else {
      window.scrollTo({
        top: newScrollPos,
        behavior: 'smooth'
      });
    }
  }
  function isBodyLocked() {
    return document.querySelector("body").classList.contains("lock");
  }
}

/***/ }),

/***/ "./src/js/common/store/index.js":
/*!**************************************!*\
  !*** ./src/js/common/store/index.js ***!
  \**************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: function() { return /* binding */ init; }
/* harmony export */ });
/* harmony import */ var _shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/ModuleManager/index.js */ "./src/js/shared/ModuleManager/index.js");
/* harmony import */ var _shared_store_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/store/index.js */ "./src/js/shared/store/index.js");


const initialState = {};
const init = () => {
  const module = new _shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__.Module({
    name: "commonStore",
    entry: () => new _shared_store_index_js__WEBPACK_IMPORTED_MODULE_1__.Store(initialState)
  });
  _shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(module);
};
/* harmony default export */ __webpack_exports__["default"] = (init);

/***/ }),

/***/ "./src/js/shared/ModuleManager/errors.js":
/*!***********************************************!*\
  !*** ./src/js/shared/ModuleManager/errors.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MainScopeIsBusyError: function() { return /* binding */ MainScopeIsBusyError; },
/* harmony export */   ModuleIsNotReadyToUseError: function() { return /* binding */ ModuleIsNotReadyToUseError; }
/* harmony export */ });
class MainScopeIsBusyError extends Error {
  constructor() {
    super("Main scope variable is busy");
  }
}
class ModuleIsNotReadyToUseError extends Error {
  constructor(_ref) {
    let {
      name
    } = _ref;
    super(`Module Is Not Ready To Use: ${name}`);
  }
}

/***/ }),

/***/ "./src/js/shared/ModuleManager/index.js":
/*!**********************************************!*\
  !*** ./src/js/shared/ModuleManager/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Module: function() { return /* binding */ Module; },
/* harmony export */   ModuleManager: function() { return /* binding */ ModuleManager; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/js/shared/utils.js");
/* harmony import */ var _logger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logger/index.js */ "./src/js/shared/logger/index.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors.js */ "./src/js/shared/ModuleManager/errors.js");
/* harmony import */ var _patterns_EventEmitter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../patterns/EventEmitter.js */ "./src/js/shared/patterns/EventEmitter.js");




const initialStruct = {
  __app__: true,
  context: {},
  registered: new Map(),
  ready: new Map(),
  dependencies: {}
};
class Module extends _patterns_EventEmitter_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor(props) {
    super();
    (0,_logger_index_js__WEBPACK_IMPORTED_MODULE_1__.debug)(`Construct module > props: ${JSON.stringify(props)}`, ` Module: ${JSON.stringify(this)};`);
    this.state = {
      registered: false,
      ready: false
    };
    Object.assign(this, props);
    const {
      name,
      entry,
      required,
      cleanup
    } = props;
  }
  get ready() {
    return this.state.ready;
  }
  set ready(value) {
    this.state.ready = value;
    this.emit("ready", this);
  }
  get registered() {
    return this.state.registered;
  }
  set registered(value) {
    this.state.registered = value;
  }
  init(context) {
    (0,_logger_index_js__WEBPACK_IMPORTED_MODULE_1__.debug)(`Init module > context: ${context}`, ` Module: ${this};`);
    if (!this.registered) return (0,_logger_index_js__WEBPACK_IMPORTED_MODULE_1__.warn)("Module is unregistered");
    this.context = this.entry(context);
    this.ready = true;
  }
  detouch() {
    (0,_logger_index_js__WEBPACK_IMPORTED_MODULE_1__.debug)(`Detouch module;`, ` Module: ${this};`);
    if (!this.registered) return (0,_logger_index_js__WEBPACK_IMPORTED_MODULE_1__.warn)("Module is unregistered");
    if (this.ready) {
      this.ready = false;
      this.cleanup();
    }
    this.registered = false;
  }
}
class ModuleManager extends _patterns_EventEmitter_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  constructor() {
    super();
    if (window.__app__ === undefined) {
      Object.assign(this, initialStruct);
      window.__app__ = this;
    } else {
      if (window.__app__.__app__) {
        return window.__app__;
      } else {
        throw new _errors_js__WEBPACK_IMPORTED_MODULE_2__.MainScopeIsBusyError();
      }
    }
  }
  isReady(target) {
    return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString)(target) ? this.ready.has(target) : target.every(item => this.ready.has(item));
  }
  isRegistered(target) {
    return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString)(target) ? this.registered.has(target) : target.every(item => this.registered.has(item));
  }
  setAsReady(module) {
    this.context[module.name] = module.context;
    this.ready.set(module.name, module);
    this.emit("ready", module);
  }
  setAsRegistered(module) {
    this.registered.set(module.name, module);
  }
  addDependencies(srcName, target) {
    const add = targetName => {
      if (targetName in this.dependencies) {
        this.dependencies[targetName].add(srcName);
      } else {
        this.dependencies[targetName] = new Set(srcName);
      }
    };
    return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString)(target) ? add(target) : target.forEach(item => add(item));
  }
  removeDependencies(srcName, target) {
    const remove = targetName => {
      if (targetName in this.dependencies) {
        this.dependencies[targetName].remove(srcName);
      }
    };
    return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString)(target) ? remove(target) : target.forEach(item => remove(item));
  }
  hasReferences(name) {
    return this.getReferences(name)?.size;
  }
  getReferences(name) {
    return this.dependencies[name];
  }
  get(name) {
    return this.registered.get(name);
  }
  use(name) {
    if (!this.isReady(name)) throw new _errors_js__WEBPACK_IMPORTED_MODULE_2__.ModuleIsNotReadyToUseError(module);
    return this.context[name];
  }
  add(module) {
    if (this.isRegistered(module.name)) return (0,_logger_index_js__WEBPACK_IMPORTED_MODULE_1__.warn)(`The module is already registered: ${module.name}`);
    module.on("ready", () => this.setAsReady(module));
    if (module.required) this.addDependencies(module.name, module.required);
    module.on("beforeDetouch", () => this.setAsReady(module));
    module.registered = true;
    this.setAsRegistered(module);
    if (!module.required || this.isReady(module.required)) {
      module.init(this.context);
    } else {
      this.on("ready", _ref => {
        let {
          name
        } = _ref;
        if (isReady(module.required)) {
          module.init(this.context);
        }
      });
    }
  }
  detouch(name) {
    let force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (hasReferences(name) && !force) {
      return (0,_logger_index_js__WEBPACK_IMPORTED_MODULE_1__.error)(`Module can't be detouched. There are references to this module: ${Array.from(this.getReferences(name)).join(", ")}`);
    }
    get(name)?.detouch();
  }
}
/* harmony default export */ __webpack_exports__["default"] = (new ModuleManager());

/***/ }),

/***/ "./src/js/shared/events.js":
/*!*********************************!*\
  !*** ./src/js/shared/events.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: function() { return /* binding */ init; }
/* harmony export */ });
/* harmony import */ var _ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModuleManager/index.js */ "./src/js/shared/ModuleManager/index.js");
/* harmony import */ var _patterns_EventEmitter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patterns/EventEmitter.js */ "./src/js/shared/patterns/EventEmitter.js");


const init = () => {
  const module = new _ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__.Module({
    name: "events",
    entry: () => new _patterns_EventEmitter_js__WEBPACK_IMPORTED_MODULE_1__["default"]()
  });
  _ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(module);
};
/* harmony default export */ __webpack_exports__["default"] = (init);

/***/ }),

/***/ "./src/js/shared/logger/index.js":
/*!***************************************!*\
  !*** ./src/js/shared/logger/index.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debug: function() { return /* binding */ debug; },
/* harmony export */   error: function() { return /* binding */ error; },
/* harmony export */   log: function() { return /* binding */ log; },
/* harmony export */   logger: function() { return /* binding */ logger; },
/* harmony export */   warn: function() { return /* binding */ warn; }
/* harmony export */ });
const devMode = false;
const consoleLogs = devMode;
const consoleWarns = devMode;
const consoleDebug = devMode;
const alertOnLog = false; // Alert on log / debug / warn
const alertOnError = devMode;

// Просто логирование какого-то события
function log() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (consoleLogs) console.log(...args);
  if (alertOnLog) alert(args.join(" :: "));
}
// Особые данные для отладки
function debug() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  if (consoleDebug) console.debug(...args);
  if (alertOnLog) alert(args.join(" :: "));
}
// Приложение быстрее всего продолжит работать без сбоев, но эта часть кода не ожидается к выполнению.
function warn() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }
  if (consoleWarns) console.warn(...args);
  if (alertOnLog) alert(args.join(" :: "));
}
// Критическая ошибка в приложении
function error() {
  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }
  console.error(...args);
  if (alertOnError) alert(args.join(" :: "));
}
const logger = {
  log,
  debug,
  warn,
  error
};
/* harmony default export */ __webpack_exports__["default"] = (logger);

/***/ }),

/***/ "./src/js/shared/patterns/EventEmitter.js":
/*!************************************************!*\
  !*** ./src/js/shared/patterns/EventEmitter.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ EventEmitter; }
/* harmony export */ });
class EventEmitter {
  constructor() {
    this.__subscribers = {};
  }
  on(name, callback) {
    if (!(name in this.__subscribers)) this.__subscribers[name] = [];
    this.__subscribers[name].push(callback);
  }
  off(name, callback) {
    if (name in this.__subscribers) {
      this.__subscribers[name] = this.__subscribers[name].filter(registeredCallback => registeredCallback === callback);
    }
  }
  emit(name, payload) {
    if (name in this.__subscribers) {
      this.__subscribers[name].forEach(callback => callback(payload));
    }
  }
}

/***/ }),

/***/ "./src/js/shared/store/index.js":
/*!**************************************!*\
  !*** ./src/js/shared/store/index.js ***!
  \**************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Store: function() { return /* binding */ Store; }
/* harmony export */ });
/* harmony import */ var _patterns_EventEmitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../patterns/EventEmitter.js */ "./src/js/shared/patterns/EventEmitter.js");

class Store extends _patterns_EventEmitter_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    let initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super();
    this.prevState = {};
    this.state = initialState;
  }
  update(reducer) {
    this.prevState = this.state;
    this.state = reducer(this.state);
    this.emit("update", {
      state: this.state,
      prevState: this.prevState
    });
  }
}
;

/***/ }),

/***/ "./src/js/shared/utils.js":
/*!********************************!*\
  !*** ./src/js/shared/utils.js ***!
  \********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNotEmptyString: function() { return /* binding */ isNotEmptyString; },
/* harmony export */   isString: function() { return /* binding */ isString; }
/* harmony export */ });
function isString(value) {
  return typeof value === "string";
}
function isNotEmptyString(value) {
  return isString(value) && value.length > 0;
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/compat get default export */
/******/ !function() {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function() { return module['default']; } :
/******/ 			function() { return module; };
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ }();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ !function() {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = function(exports, definition) {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ }();
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "4cd64863d3c348b4a546"; }
/******/ }();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ !function() {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ }();
/******/ 
/******/ /* webpack/runtime/nonce */
/******/ !function() {
/******/ 	__webpack_require__.nc = undefined;
/******/ }();
/******/ 
/******/ }
);