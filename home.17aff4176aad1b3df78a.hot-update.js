self["webpackHotUpdatefls_start"]("home",{

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

/***/ "./node_modules/string-replace-loader/index.js??ruleSet[1].rules[1].use[1]!./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scss/pages/home/index.scss":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/string-replace-loader/index.js??ruleSet[1].rules[1].use[1]!./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scss/pages/home/index.scss ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".teamate-card {\n  display: grid;\n  grid-template-columns: 0.74fr 1fr;\n  grid-template-rows: auto auto 1fr;\n  gap: 0 24px;\n  max-width: 690px;\n  border-radius: 30px;\n  padding: 24px;\n  overflow: hidden;\n  box-shadow: 0px 4px 66px 0px rgba(32, 6, 70, 0.16);\n  background-color: white;\n}\n@media (max-width: 520px) {\n  .teamate-card {\n    grid-template-columns: 0.59fr 1fr;\n    grid-template-rows: auto auto 1fr;\n    gap: 0 16px;\n    padding: 16px;\n  }\n}\n@media (max-width: 1320px) {\n  .teamate-card {\n    max-width: 620px;\n  }\n}\n@media (max-width: 1024px) {\n  .teamate-card {\n    max-width: 540px;\n  }\n}\n@media (max-width: 620px) {\n  .teamate-card {\n    max-width: 480px;\n  }\n}\n.teamate-card__img-wrap {\n  grid-row: auto/span 3;\n  padding-top: 144%;\n  margin: -24px 0 -24px -24px;\n  overflow: hidden;\n}\n@media (max-width: 520px) {\n  .teamate-card__img-wrap {\n    grid-row: auto/span 1;\n    margin: -16px 0 16px -16px;\n    border-radius: 0px 0px 30px 0px;\n  }\n}\n.teamate-card__header {\n  margin-bottom: 16px;\n}\n.teamate-card__title {\n  color: #9935EC;\n  font-family: Montserrat;\n  font-size: 20px;\n  font-weight: 600;\n  margin-bottom: 16px;\n}\n@media (max-width: 1320px) {\n  .teamate-card__title {\n    font-size: 18px;\n  }\n}\n@media (max-width: 520px) {\n  .teamate-card__title {\n    margin-bottom: 20px;\n  }\n}\n.teamate-card__name {\n  color: #161616;\n  font-family: Thunder;\n  font-size: 42px;\n  font-weight: 700;\n  letter-spacing: 0.84px;\n}\n@media (max-width: 1320px) {\n  .teamate-card__name {\n    font-size: 36px;\n  }\n}\n@media (max-width: 1024px) {\n  .teamate-card__name {\n    font-size: 30px;\n  }\n}\n@media (max-width: 520px) {\n  .teamate-card__name {\n    font-size: 42px;\n  }\n}\n@media (max-width: 375px) {\n  .teamate-card__name {\n    font-size: 34px;\n  }\n}\n.teamate-card__skills {\n  display: grid;\n  gap: 20px;\n  margin-bottom: 16px;\n}\n@media (max-width: 1320px) {\n  .teamate-card__skills {\n    gap: 16px;\n  }\n}\n@media (max-width: 1024px) {\n  .teamate-card__skills {\n    gap: 12px;\n  }\n}\n@media (max-width: 520px) {\n  .teamate-card__skills {\n    grid-column: auto/span 2;\n    grid-template-columns: 1fr 1fr;\n    gap: 20px;\n    margin-bottom: 20px;\n  }\n}\n.teamate-card__skill-item {\n  display: flex;\n  align-items: center;\n}\n.teamate-card__skill-icon {\n  width: 44px;\n  height: 44px;\n  margin-right: 16px;\n  filter: drop-shadow(10px 10px 5px rgba(46, 46, 46, 0.2));\n}\n@media (max-width: 1320px) {\n  .teamate-card__skill-icon {\n    width: 40px;\n    height: 40px;\n    font-size: 30px;\n  }\n}\n@media (max-width: 1024px) {\n  .teamate-card__skill-icon {\n    width: 36px;\n    height: 36px;\n  }\n}\n@media (max-width: 520px) {\n  .teamate-card__skill-icon {\n    width: 32px;\n    height: 32px;\n    margin-right: 10px;\n  }\n}\n.teamate-card__skill-name {\n  color: #1F1F1F;\n  font-family: Thunder;\n  font-size: 36px;\n  font-style: italic;\n  font-weight: 600;\n  letter-spacing: 0.72px;\n}\n@media (max-width: 1320px) {\n  .teamate-card__skill-name {\n    font-size: 30px;\n  }\n}\n@media (max-width: 1024px) {\n  .teamate-card__skill-name {\n    font-size: 28px;\n  }\n}\n@media (max-width: 375px) {\n  .teamate-card__skill-name {\n    font-size: 22px;\n  }\n}\n.teamate-card__btn {\n  align-self: end;\n  justify-self: end;\n}\n@media (max-width: 520px) {\n  .teamate-card__btn {\n    grid-column: auto/span 2;\n  }\n}\n\n.teamates-slider {\n  overflow: visible;\n  width: 100%;\n}\n.teamates-slider__wrapper {\n  margin-bottom: 30px;\n}\n.teamates-slider__slide {\n  height: auto;\n  transition-property: transform, opacity;\n}\n.teamates-slider__slide[data-slide-position=\"-1\"] {\n  opacity: 0.9;\n}\n.teamates-slider__slide[data-slide-position=\"1\"] {\n  opacity: 0.9;\n}\n.teamates-slider__slide[data-slide-position=\"-2\"] {\n  opacity: 0.8;\n}\n.teamates-slider__slide[data-slide-position=\"2\"] {\n  opacity: 0.8;\n}\n.teamates-slider__slide[data-slide-position=\"-3\"] {\n  opacity: 0.7;\n}\n.teamates-slider__slide[data-slide-position=\"3\"] {\n  opacity: 0.7;\n}\n.teamates-slider__slide[data-slide-position=\"-4\"] {\n  opacity: 0.6;\n}\n.teamates-slider__slide[data-slide-position=\"4\"] {\n  opacity: 0.6;\n}\n.teamates-slider__bottom {\n  display: flex;\n  justify-content: center;\n  visibility: hidden;\n}\n.teamates-slider__bottom-inner {\n  display: inline-grid;\n  grid-template-columns: repeat(3, auto);\n  gap: 100px;\n  align-items: center;\n}\n@media (max-width: 375px) {\n  .teamates-slider__bottom-inner {\n    grid-template-columns: repeat(2, auto);\n    gap: 9px 60px;\n  }\n}\n.teamates-slider__pagination {\n  flex: 0 1 max-content;\n  display: inline-block;\n  --swiper-pagination-bullet-horizontal-gap: 8px;\n}\n.teamates-slider__pagination .swiper-pagination-bullet {\n  width: 16px;\n  height: 16px;\n  border: 2px solid #67E000;\n  background-color: transparent;\n  transition: background-color 0.4s;\n}\n.teamates-slider__pagination .swiper-pagination-bullet-active {\n  background-color: #67E000;\n}\n.teamates-slider__counter {\n  display: inline-grid;\n  grid-template-columns: repeat(3, auto);\n  gap: 0.3em;\n  color: #C279FF;\n  font-family: Thunder;\n  font-size: 26px;\n  font-style: italic;\n  font-weight: 600;\n  line-height: 24px;\n  letter-spacing: 0.02em;\n}\n@media (max-width: 375px) {\n  .teamates-slider__counter {\n    grid-row: 1/span 1;\n    grid-column: auto/span 2;\n    justify-self: center;\n  }\n}\n.teamates-slider__current {\n  color: #1F1F1F;\n  text-align: right;\n  font-size: 36px;\n  letter-spacing: 0.72px;\n}\n.swiper-btn {\n  flex: 0 0 auto;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  font-size: 0;\n  border: 2px solid #9DF850;\n  border-radius: 50%;\n  background-color: #161616;\n  transition: filter 0.4s;\n}\n.swiper-btn:hover {\n  filter: drop-shadow(0px 0px 30px rgba(117, 255, 0, 0.5));\n}\n.swiper-btn .svg-icon {\n  flex: 0 0 auto;\n  fill: #9DF850;\n  width: 8px;\n  transition: left 0.4s, right 0.4s;\n}\n.swiper-btn_prev .svg-icon, .swiper-btn_next .svg-icon {\n  position: relative;\n  top: 0;\n  z-index: 0;\n}\n.swiper-btn_prev .svg-icon {\n  left: -2%;\n}\n.swiper-btn_next .svg-icon {\n  right: -2%;\n}\n.swiper-btn_prev:hover .svg-icon {\n  left: -8%;\n}\n.swiper-btn_next:hover .svg-icon {\n  right: -8%;\n}\n\n.welcome {\n  position: relative;\n  left: 0;\n  top: 0;\n  z-index: 0;\n}\n.welcome::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: -2;\n  width: 100%;\n  height: 108%;\n  background-color: #C279FF;\n  clip-path: polygon(0% 0%, 100% 0%, 100% 63.427%, 100% 63.427%, 99.958% 64.404%, 99.837% 65.342%, 99.642% 66.232%, 99.377% 67.063%, 99.049% 67.823%, 98.661% 68.504%, 98.22% 69.093%, 97.731% 69.581%, 97.199% 69.958%, 96.628% 70.212%, 4.962% 99.782%, 4.962% 99.782%, 4.198% 99.911%, 3.458% 99.812%, 2.756% 99.504%, 2.104% 99.004%, 1.516% 98.33%, 1.006% 97.502%, 0.586% 96.536%, 0.269% 95.451%, 0.069% 94.265%, 0% 92.997%, 0% 0%);\n}\n@media (max-width: 768px) {\n  .welcome::before {\n    clip-path: polygon(0% 0%, 100% 0%, 100% 69.403%, 100% 69.403%, 99.873% 70.961%, 99.499% 72.47%, 98.893% 73.916%, 98.068% 75.285%, 97.036% 76.561%, 95.81% 77.732%, 94.405% 78.782%, 92.833% 79.698%, 91.107% 80.464%, 89.241% 81.067%, 21.241% 99.257%, 21.241% 99.257%, 18.12% 99.835%, 15.04% 99.926%, 12.069% 99.568%, 9.273% 98.797%, 6.722% 97.65%, 4.483% 96.166%, 2.623% 94.381%, 1.211% 92.332%, 0.314% 90.056%, 0% 87.592%, 0% 0%);\n  }\n}\n.welcome::after {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: -1;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(170deg, #161616 0%, #260046 32.29%, #2A004E 57.29%, #500092 78.65%, #3A006A 100%, #2A004E 100%);\n  clip-path: polygon(0% 0%, 100% 0%, 100% 66.103%, 100% 66.103%, 99.956% 67.19%, 99.829% 68.233%, 99.624% 69.218%, 99.347% 70.135%, 99.003% 70.97%, 98.599% 71.712%, 98.14% 72.35%, 97.632% 72.869%, 97.08% 73.26%, 96.49% 73.509%, 4.824% 99.863%, 4.824% 99.863%, 4.074% 99.957%, 3.35% 99.815%, 2.666% 99.456%, 2.032% 98.899%, 1.463% 98.163%, 0.969% 97.267%, 0.564% 96.229%, 0.259% 95.069%, 0.067% 93.805%, 0% 92.457%, 0% 0%);\n}\n@media (max-width: 768px) {\n  .welcome::after {\n    clip-path: polygon(0% 0%, 100% 0%, 100% 71.66%, 100% 71.66%, 99.857% 73.439%, 99.437% 75.154%, 98.758% 76.79%, 97.836% 78.326%, 96.688% 79.747%, 95.329% 81.034%, 93.777% 82.169%, 92.047% 83.134%, 90.157% 83.913%, 88.123% 84.486%, 20.123% 99.53%, 20.123% 99.53%, 17.091% 99.953%, 14.129% 99.897%, 11.297% 99.399%, 8.651% 98.498%, 6.252% 97.231%, 4.158% 95.634%, 2.427% 93.746%, 1.118% 91.603%, 0.289% 89.243%, 0% 86.704%, 0% 0%);\n  }\n}\n.welcome__underlay {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 0;\n}\n.welcome__container {\n  padding-top: 160px;\n  padding-bottom: 145px;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .welcome__container {\n    padding-top: calc(100px + 60 * (100vw - 375.1px) / 1544.9);\n    padding-bottom: calc(75px + 70 * (100vw - 375.1px) / 1544.9);\n  }\n}\n@media screen and (max-width: 375px) {\n  .welcome__container {\n    padding-top: 100px;\n    padding-bottom: 75px;\n  }\n}\n@media (max-width: 520px) {\n  .welcome__container {\n    display: flex;\n    justify-content: center;\n  }\n}\n.welcome__title {\n  position: sticky;\n  left: 40px;\n  z-index: 1;\n}\n@media (max-width: 520px) {\n  .welcome__title {\n    position: static;\n    left: unset;\n  }\n}\n\n.page-title {\n  display: inline-flex;\n  flex-direction: column;\n  align-items: flex-start;\n  color: #FFF;\n  font-family: Thunder;\n  font-size: 160px;\n  font-weight: 800;\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .page-title {\n    font-size: calc(70px + 90 * (100vw - 375.1px) / 1544.9);\n  }\n}\n@media screen and (max-width: 375px) {\n  .page-title {\n    font-size: 70px;\n  }\n}\n@media screen and (max-width: 360px) {\n  .page-title {\n    font-size: 55px;\n  }\n}\n@media (max-width: 520px) {\n  .page-title {\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n}\n.page-title > strong {\n  display: inline-block;\n  position: relative;\n  left: 0;\n  top: 0;\n  color: #161616;\n  margin-top: 19px;\n  margin-bottom: 19px;\n  z-index: 1;\n}\n@media (max-width: 1440px) {\n  .page-title > strong {\n    margin-top: 21px;\n    margin-bottom: 21px;\n  }\n}\n@media (max-width: 520px) {\n  .page-title > strong {\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n}\n.page-title > strong::before {\n  content: \"\";\n  display: inline-block;\n  position: absolute;\n  top: -8.75%;\n  left: -9%;\n  z-index: -1;\n  height: 112%;\n  width: 118%;\n  background-color: #9DF850;\n  clip-path: polygon(4.182% 8.641%, 4.182% 8.641%, 4.285% 7.171%, 4.431% 5.801%, 4.615% 4.545%, 4.835% 3.416%, 5.087% 2.425%, 5.367% 1.586%, 5.671% 0.911%, 5.995% 0.413%, 6.337% 0.105%, 6.692% 0%, 97.416% 0%, 97.416% 0%, 97.898% 0.192%, 98.347% 0.745%, 98.757% 1.619%, 99.12% 2.778%, 99.429% 4.183%, 99.677% 5.796%, 99.858% 7.581%, 99.965% 9.498%, 99.99% 11.511%, 99.926% 13.581%, 95.818% 91.359%, 95.818% 91.359%, 95.715% 92.829%, 95.569% 94.199%, 95.385% 95.455%, 95.165% 96.584%, 94.913% 97.575%, 94.633% 98.414%, 94.329% 99.089%, 94.005% 99.587%, 93.663% 99.895%, 93.308% 100%, 2.583% 100%, 2.583% 100%, 2.102% 99.808%, 1.653% 99.255%, 1.243% 98.381%, 0.88% 97.222%, 0.571% 95.818%, 0.323% 94.204%, 0.142% 92.42%, 0.035% 90.502%, 0.01% 88.489%, 0.074% 86.419%, 4.182% 8.641%);\n}\n.page-title:first-child {\n  margin-top: 0;\n}\n.page-title:last-child {\n  margin-bottom: 0;\n}\n\n.teams-review {\n  position: relative;\n  left: 0;\n  top: 0;\n  z-index: 1;\n  margin-top: -5%;\n  margin-bottom: 0;\n  overflow: hidden;\n}\n@media (max-width: 768px) {\n  .teams-review {\n    margin-top: -3%;\n  }\n}\n@media (max-width: 520px) {\n  .teams-review {\n    margin-top: 3%;\n  }\n}\n.teams-review__container {\n  display: flex;\n  flex-direction: column;\n}\n.teams-review__container:first-child {\n  margin-bottom: 45px;\n}\n@media (max-width: 768px) {\n  .teams-review__container:first-child {\n    margin-bottom: 35px;\n  }\n}\n.teams-review__container:nth-child(2) {\n  max-width: 1543px;\n  --container-save-space: 5px;\n  margin-bottom: 30px;\n}\n.teams-review__container:nth-child(3) {\n  --container-save-space: 25px;\n}\n.teams-review__call {\n  align-self: flex-end;\n  display: inline-block;\n  max-width: 870px;\n  color: transparent;\n  font-family: Thunder;\n  font-size: 130px;\n  font-weight: 800;\n  background: linear-gradient(127deg, #161616 0%, #260046 10.86%, #2A004E 24.1%, #500092 41.91%, #3A006A 70.64%, #2A004E 88.57%);\n  background-clip: text;\n  -webkit-background-clip: text;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .teams-review__call {\n    font-size: calc(60px + 70 * (100vw - 375.1px) / 1544.9);\n  }\n}\n@media screen and (max-width: 375px) {\n  .teams-review__call {\n    font-size: 60px;\n  }\n}\n@media (min-width: 520.1px) and (max-width: 1920px) {\n  .teams-review__call {\n    max-width: calc(510px + 360 * (100vw - 520.1px) / 1399.9);\n  }\n}\n@media (min-width: 375.1px) and (max-width: 768px) {\n  .teams-review__call {\n    max-width: calc(300px + 130 * (100vw - 375.1px) / 392.9);\n  }\n}\n@media screen and (max-width: 375px) {\n  .teams-review__call {\n    max-width: 270px;\n    font-size: 50px;\n  }\n}\n@media screen and (max-width: 320px) {\n  .teams-review__call {\n    max-width: 250px;\n    font-size: 40px;\n  }\n}\n.teams-review__team-filter {\n  margin-bottom: 60px;\n}\n.teams-review__swipe-area-pointer {\n  position: absolute;\n  right: 30px;\n  bottom: -60px;\n  z-index: 10;\n}\n@media (max-width: 520px) {\n  .teams-review__swipe-area-pointer {\n    bottom: -55px;\n  }\n}\n\n.section-nav {\n  position: relative;\n  left: 0;\n  top: 0;\n}\n.section-nav::before {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: -2;\n  width: 100.5%;\n  height: 235%;\n  background-color: #C279FF;\n  clip-path: polygon(22.3315px 42.9384px, 22.3315px 42.9384px, 23.3069249px 40.6792617px, 24.5318352px 38.5878456px, 25.9848943px 36.6794499px, 27.6447656px 34.9693728px, 29.4901125px 33.4729125px, 31.4995984px 32.2053672px, 33.6518867px 31.1820351px, 35.9256408px 30.4182144px, 38.2995241px 29.9292033px, 40.7522px 29.7303px, calc(100% - 21.21px) 0.57282px, calc(100% - 21.21px) 0.57282px, calc(100% - 17.12625px) 0.901554314px, calc(100% - 13.3536px) 1.993392832px, calc(100% - 9.95595px) 3.758675118px, calc(100% - 6.9972px) 6.107740736px, calc(100% - 4.54125px) 8.95092925px, calc(100% - 2.652px) 12.198580224px, calc(100% - 1.39335px) 15.761033222px, calc(100% - 0.8292px) 19.548627808px, calc(100% - 1.02345px) 23.471703546px, calc(100% - 2.04px) 27.4406px, calc(100% - 17.35px) calc(100% - 57.7228px), calc(100% - 17.35px) calc(100% - 57.7228px), calc(100% - 18.32129px) calc(100% - 55.494854px), calc(100% - 19.53552px) calc(100% - 53.430936px), calc(100% - 20.97223px) calc(100% - 51.545866px), calc(100% - 22.61096px) calc(100% - 49.854464px), calc(100% - 24.43125px) calc(100% - 48.37155px), calc(100% - 26.41264px) calc(100% - 47.111944px), calc(100% - 28.53467px) calc(100% - 46.090466px), calc(100% - 30.77688px) calc(100% - 45.321936px), calc(100% - 33.11881px) calc(100% - 44.821174px), calc(100% - 35.54px) calc(100% - 44.603px), 21.3722px calc(100% - 0.861px), 21.3722px calc(100% - 0.861px), 17.27314874px calc(100% - 1.1521906px), 13.48018352px calc(100% - 2.2136048px), 10.05845318px calc(100% - 3.9553062px), 7.07310656px calc(100% - 6.2873584px), 4.5892925px calc(100% - 9.119825px), 2.67215984px calc(100% - 12.3627696px), 1.38685742px calc(100% - 15.9262558px), 0.79853408px calc(100% - 19.7203472px), 0.97233866px calc(100% - 23.6551074px), 1.97342px calc(100% - 27.6406px), 22.3315px 42.9384px);\n  transform: translate(-50.25%, -42%);\n}\n@media (max-width: 768px) {\n  .section-nav::before {\n    clip-path: polygon(19.0118px 22.8292px, 19.0118px 22.8292px, 20.0382133px 20.7420249px, 21.2816064px 18.8134712px, 22.7235791px 17.0561563px, 24.3457312px 15.4826976px, 26.1296625px 14.1057125px, 28.0569728px 12.9378184px, 30.1092619px 11.9916327px, 32.2681296px 11.2797728px, 34.5151757px 10.8148561px, 36.832px 10.6095px, calc(100% - 20.213px) 0.964999px, calc(100% - 20.213px) 0.964999px, calc(100% - 15.949721px) 1.278584072px, calc(100% - 12.029528px) 2.419490976px, calc(100% - 8.521487px) 4.285204444px, calc(100% - 5.494664px) 6.773209208px, calc(100% - 3.018125px) 9.78099px, calc(100% - 1.160936px) 13.206031552px, calc(100% + 0.007837px) 16.945818596px, calc(100% + 0.419128px) 20.897835864px, calc(100% + 0.003871px) 24.959568088px, calc(100% - 1.307px) 29.0285px, calc(100% - 13.636px) calc(100% - 35.0244px), calc(100% - 13.636px) calc(100% - 35.0244px), calc(100% - 14.636169px) calc(100% - 33.058028px), calc(100% - 15.831032px) calc(100% - 31.235332px), calc(100% - 17.204923px) calc(100% - 29.567322px), calc(100% - 18.742176px) calc(100% - 28.065008px), calc(100% - 20.427125px) calc(100% - 26.7394px), calc(100% - 22.244104px) calc(100% - 25.601508px), calc(100% - 24.177447px) calc(100% - 24.662342px), calc(100% - 26.211488px) calc(100% - 23.932912px), calc(100% - 28.330561px) calc(100% - 23.424228px), calc(100% - 30.519px) calc(100% - 23.1473px), 21.5058px calc(100% - 0.306px), 21.5058px calc(100% - 0.306px), 17.17661333px calc(100% - 0.4543596px), 13.16965504px calc(100% - 1.4635368px), 9.55948971px calc(100% - 3.2293692px), 6.42068192px calc(100% - 5.6476944px), 3.82779625px calc(100% - 8.61435px), 1.85539728px calc(100% - 12.0251736px), 0.57804959px calc(100% - 15.7760028px), 0.07031776px calc(100% - 19.7626752px), 0.40676637px calc(100% - 23.8810284px), 1.66196px calc(100% - 28.0269px), 19.0118px 22.8292px);\n  }\n}\n.section-nav::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: -1;\n  width: 100%;\n  height: 200%;\n  background: linear-gradient(139deg, #161616 0%, #260046 24.18%, #2A004E 39.24%, #45017D 52.24%, #500092 61.79%, #45017D 70.34%, #3A006A 80%, #2A004E 100%);\n  clip-path: polygon(16.172px 42.5529px, 16.172px 42.5529px, 17.1735527px 40.3538988px, 18.4130336px 38.3206104px, 19.8700469px 36.4673376px, 21.5241968px 34.8083832px, 23.3550875px 33.35805px, 25.3423232px 32.1306408px, 27.4655081px 31.1404584px, 29.7042464px 30.4018056px, 32.0381423px 29.9289852px, 34.4468px 29.7363px, calc(100% - 20.74px) 0.58305px, calc(100% - 20.74px) 0.58305px, calc(100% - 16.61802px) 0.918390952px, calc(100% - 12.81536px) 2.029803776px, calc(100% - 9.39694px) 3.824781024px, calc(100% - 6.42768px) 6.210815248px, calc(100% - 3.9725px) 9.095399px, calc(100% - 2.09632px) 12.386024832px, calc(100% - 0.86406px) 15.990185296px, calc(100% - 0.34064px) 19.815372944px, calc(100% - 0.59098px) 23.769080328px, calc(100% - 1.68px) 27.7588px, calc(100% - 16.17px) calc(100% - 42.5529px), calc(100% - 16.17px) calc(100% - 42.5529px), calc(100% - 17.17189px) calc(100% - 40.3538988px), calc(100% - 18.41192px) calc(100% - 38.3206104px), calc(100% - 19.86963px) calc(100% - 36.4673376px), calc(100% - 21.52456px) calc(100% - 34.8083832px), calc(100% - 23.35625px) calc(100% - 33.35805px), calc(100% - 25.34424px) calc(100% - 32.1306408px), calc(100% - 27.46807px) calc(100% - 31.1404584px), calc(100% - 29.70728px) calc(100% - 30.4018056px), calc(100% - 32.04141px) calc(100% - 29.9289852px), calc(100% - 34.45px) calc(100% - 29.7363px), 20.7355px calc(100% - 0.583px), 20.7355px calc(100% - 0.583px), 16.61354445px calc(100% - 0.9184483px), 12.8110328px calc(100% - 2.0299264px), 9.39284455px calc(100% - 3.8249341px), 6.4238592px calc(100% - 6.2109712px), 3.96895625px calc(100% - 9.0955375px), 2.0930152px calc(100% - 12.3861328px), 0.86091555px calc(100% - 15.9902569px), 0.3375368px calc(100% - 19.8154096px), 0.58775845px calc(100% - 23.7690907px), 1.67646px calc(100% - 27.7588px), 16.172px 42.5529px);\n  transform: translate(-50%, -50%);\n}\n@media (max-width: 768px) {\n  .section-nav::after {\n    clip-path: polygon(13.8477px 23.1634px, 13.8477px 23.1634px, 14.9004517px 21.1819173px, 16.1514296px 19.3531544px, 17.5838979px 17.6882491px, 19.1811208px 16.1983392px, 20.9263625px 14.8945625px, 22.8028872px 13.7880568px, 24.7939591px 12.8899599px, 26.8828424px 12.2114096px, 29.0528013px 11.7635437px, 31.2871px 11.5575px, calc(100% - 21.512px) 0.170803px, calc(100% - 21.512px) 0.170803px, calc(100% - 17.194262px) 0.469232109px, calc(100% - 13.227656px) 1.615508672px, calc(100% - 9.682994px) 3.503222443px, calc(100% - 6.631088px) 6.025963176px, calc(100% - 4.14275px) 9.077320625px, calc(100% - 2.288792px) 12.550884544px, calc(100% - 1.140026px) 16.340244687px, calc(100% - 0.767264px) 20.338990808px, calc(100% - 1.241318px) 24.440712661px, calc(100% - 2.633px) 28.539px, calc(100% - 13.848px) calc(100% - 23.1634px), calc(100% - 13.848px) calc(100% - 23.1634px), calc(100% - 14.9007px) calc(100% - 21.1819173px), calc(100% - 16.15164px) calc(100% - 19.3531544px), calc(100% - 17.58408px) calc(100% - 17.6882491px), calc(100% - 19.18128px) calc(100% - 16.1983392px), calc(100% - 20.9265px) calc(100% - 14.8945625px), calc(100% - 22.803px) calc(100% - 13.7880568px), calc(100% - 24.79404px) calc(100% - 12.8899599px), calc(100% - 26.88288px) calc(100% - 12.2114096px), calc(100% - 29.05278px) calc(100% - 11.7635437px), calc(100% - 31.287px) calc(100% - 11.5575px), 21.5123px calc(100% - 0.1708px), 21.5123px calc(100% - 0.1708px), 17.1944036px calc(100% - 0.4692411px), 13.2276668px calc(100% - 1.6155248px), 9.6829052px calc(100% - 3.5032417px), 6.6309344px calc(100% - 6.0259824px), 4.14257px calc(100% - 9.0773375px), 2.2886276px calc(100% - 12.5508976px), 1.1399228px calc(100% - 16.3402533px), 0.7672712px calc(100% - 20.3389952px), 1.2414884px calc(100% - 24.4407139px), 2.63339px calc(100% - 28.539px), 13.8477px 23.1634px);\n  }\n}\n.section-nav__container {\n  max-width: 1340px;\n  padding: 0 35px;\n  margin: auto;\n}\n.section-nav__slider {\n  transform: rotate(-1.3deg);\n}\n@media (max-width: 1024px) {\n  .section-nav__slider {\n    transform: rotate(-1.9deg);\n  }\n}\n@media (max-width: 768px) {\n  .section-nav__slider {\n    transform: rotate(-1.5deg);\n  }\n}\n.section-nav__wrapper {\n  justify-content: space-between;\n}\n.section-nav__wrapper > * {\n  width: auto;\n  margin: 0 32px;\n}\n@media (max-width: 768px) {\n  .section-nav__wrapper > * {\n    margin: 0 16px;\n  }\n}\n.section-nav__wrapper > *:first-child {\n  margin-left: 0;\n}\n.section-nav__wrapper > *:last-child {\n  margin-right: 0;\n}\n.section-nav__btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 50px;\n  font-size: 22px;\n  font-weight: 500;\n  text-align: center;\n  cursor: pointer;\n}\n@media (max-width: 768px) {\n  .section-nav__btn {\n    min-height: 40px;\n    font-size: 18px;\n  }\n}\n@media (max-width: 520px) {\n  .section-nav__btn {\n    font-size: 16px;\n  }\n}\n\n.skill-rate {\n  display: grid;\n  grid-template-columns: 40% minmax(100px, 384px);\n  gap: 8px;\n  justify-content: end;\n}\n.skill-rate__name {\n  position: relative;\n  left: 0;\n  top: 0.1em;\n  color: #1F1F1F;\n  text-align: right;\n  font-family: Thunder;\n  font-size: 38px;\n  font-style: italic;\n  font-weight: 700;\n  letter-spacing: 0.76px;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .skill-rate__name {\n    font-size: calc(24px + 14 * (100vw - 375.1px) / 1544.9);\n  }\n}\n@media (max-width: 520px) {\n  .skill-rate__name {\n    font-size: 24px;\n  }\n}\n@media (max-width: 375px) {\n  .skill-rate__name {\n    font-size: 22px;\n  }\n}\n.skill-rate__rate {\n  display: grid;\n  grid-template-columns: 11.5% auto;\n  gap: 4px;\n  align-self: start;\n}\n@media (max-width: 720px) {\n  .skill-rate__rate {\n    align-self: center;\n  }\n}\n.skill-rate__separator {\n  display: flex;\n  align-items: center;\n  width: 40px;\n}\n.skill-rate__separator::before {\n  content: \"\";\n  flex: 0 0 auto;\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  background: #35CC00;\n  border-radius: 50%;\n}\n.skill-rate__separator::after {\n  content: \"\";\n  flex: 0 0 auto;\n  display: inline-block;\n  width: 30px;\n  height: 2px;\n  background: #35CC00;\n}\n.skill-rate__stars {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  border-radius: 40px;\n  background: linear-gradient(90deg, #F6FF92 0%, #C5FF94 100%);\n  box-shadow: 0px 0px 26px 0px rgba(0, 144, 55, 0.14);\n  padding: 3px 10px;\n}\n.skill-rate__stars > .svg-icon {\n  width: 32px;\n  height: 32px;\n  fill: #35CC00;\n  margin-right: -32px;\n  stroke: #F6FF92;\n  stroke-width: 1.5px;\n  stroke-linejoin: round;\n}\n.skill-rate__stars > .svg-icon:last-child {\n  margin-right: 0;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .skill-rate__stars > .svg-icon {\n    width: calc(20px + 12 * (100vw - 375.1px) / 1544.9);\n    height: calc(20px + 12 * (100vw - 375.1px) / 1544.9);\n  }\n}\n@media (max-width: 520px) {\n  .skill-rate__stars > .svg-icon {\n    width: 20px;\n    height: 20px;\n  }\n}\n\n.skills-rates__title {\n  display: inline-block;\n  color: transparent;\n  -webkit-text-fill-color: transparent;\n  font-family: Thunder;\n  font-size: 70px;\n  font-weight: 700;\n  line-height: 128.571%;\n  letter-spacing: 1.4px;\n  background: var(--purple-grad, linear-gradient(170deg, #161616 0%, #260046 32.29%, #2A004E 57.29%, #500092 78.65%, #3A006A 100%, #2A004E 100%));\n  background-clip: text;\n  -webkit-background-clip: text;\n  margin-bottom: 20px;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .skills-rates__title {\n    font-size: calc(42px + 28 * (100vw - 520px) / 1400);\n  }\n}\n@media (max-width: 520px) {\n  .skills-rates__title {\n    font-size: 42px;\n  }\n}\n.skills-rates__body {\n  display: flex;\n  justify-content: start;\n}\n.skills-rates__body-inner {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 30px 40px;\n}\n@media (max-width: 1024px) {\n  .skills-rates__body-inner {\n    gap: 20px 30px;\n  }\n}\n@media (max-width: 375px) {\n  .skills-rates__body-inner {\n    gap: 15px;\n  }\n}\n@media (max-width: 720px) {\n  .skills-rates__body-inner {\n    grid-template-columns: 1fr;\n    justify-content: center;\n  }\n}\n\n.skills-cloud {\n  --base-distance: 280px;\n  position: relative;\n  left: 0;\n  top: 0;\n}\n.skills-cloud__bg {\n  padding-top: 84%;\n}\n.skills-cloud__body {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n}\n.skills-cloud__msg {\n  color: #FFF;\n  text-align: center;\n  font-family: Thunder;\n  font-size: 60px;\n  font-style: italic;\n  font-weight: 700;\n}\n@media (max-width: 768px) {\n  .skills-cloud__msg {\n    font-size: 50px;\n  }\n}\n@media (max-width: 520px) {\n  .skills-cloud__msg {\n    font-size: 40px;\n  }\n}\n@media (max-width: 375px) {\n  .skills-cloud__msg {\n    font-size: 35px;\n  }\n}\n.skills-cloud__items {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n.skills-cloud__item {\n  position: absolute;\n  left: 0;\n  top: 0;\n  flex: 0 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 136px;\n  height: 136px;\n  background-color: white;\n  clip-path: polygon(4.722% 13.789%, 4.722% 13.789%, 5.046% 11.519%, 5.704% 9.378%, 6.667% 7.392%, 7.908% 5.587%, 9.399% 3.988%, 11.112% 2.621%, 13.018% 1.513%, 15.09% 0.69%, 17.3% 0.177%, 19.619% 0%, 84.859% 0%, 84.859% 0%, 87.383% 0.209%, 89.766% 0.812%, 91.975% 1.775%, 93.976% 3.061%, 95.737% 4.637%, 97.223% 6.466%, 98.402% 8.515%, 99.239% 10.747%, 99.701% 13.129%, 99.755% 15.623%, 95.278% 86.212%, 95.278% 86.212%, 94.954% 88.481%, 94.296% 90.622%, 93.333% 92.608%, 92.091% 94.413%, 90.601% 96.012%, 88.888% 97.379%, 86.982% 98.486%, 84.91% 99.31%, 82.7% 99.823%, 80.381% 100%, 15.141% 100%, 15.141% 100%, 12.617% 99.791%, 10.234% 99.188%, 8.025% 98.225%, 6.024% 96.939%, 4.263% 95.363%, 2.777% 93.533%, 1.598% 91.485%, 0.761% 89.252%, 0.299% 86.871%, 0.245% 84.376%, 4.722% 13.789%);\n  animation: orbite 60s linear infinite;\n}\n@media (max-width: 1440px) {\n  .skills-cloud__item {\n    width: 110px;\n    height: 110px;\n  }\n}\n@media (max-width: 768px) {\n  .skills-cloud__item {\n    width: 90px;\n    height: 90px;\n  }\n}\n@media (max-width: 520px) {\n  .skills-cloud__item {\n    width: 80px;\n    height: 80px;\n  }\n}\n@media (max-width: 420px) {\n  .skills-cloud__item {\n    width: 65px;\n    height: 65px;\n  }\n}\n@media (max-width: 375px) {\n  .skills-cloud__item {\n    width: 55px;\n    height: 55px;\n  }\n}\n.skills-cloud__item:first-child {\n  position: static;\n}\n.skills-cloud__item > img {\n  width: 59%;\n  height: 59%;\n}\n\n.profile {\n  margin-bottom: 120px;\n}\n@media (max-width: 1024px) {\n  .profile {\n    margin-bottom: 80px;\n  }\n}\n@media (max-width: 768px) {\n  .profile {\n    margin-bottom: 60px;\n  }\n}\n.profile__main {\n  position: relative;\n  left: 0;\n  top: 0;\n  z-index: 0;\n  padding: 40px 0;\n  font-size: 10px;\n  margin-bottom: 35px;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .profile__main {\n    font-size: calc(6px + 4 * (100vw - 520px) / 1400);\n  }\n}\n@media (max-width: 520px) {\n  .profile__main {\n    font-size: 6px;\n    padding: 20px 0 40px;\n  }\n}\n.profile__main::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 108%;\n  z-index: -2;\n  background-color: #C279FF;\n  clip-path: polygon(calc(100% - 0px) 0px, 0px 0px, 0px calc(100% - 170.208px), 0px calc(100% - 170.208px), 0.7008518px calc(100% - 161.020965px), 2.7364384px calc(100% - 152.25564px), 6.0063066px calc(100% - 144.021195px), 10.4100032px calc(100% - 136.4268px), 15.847075px calc(100% - 129.581625px), 22.2170688px calc(100% - 123.59484px), 29.4195314px calc(100% - 118.575615px), 37.3540096px calc(100% - 114.63312px), 45.9200502px calc(100% - 111.876525px), 55.0172px calc(100% - 110.415px), calc(100% - 64.98px) calc(100% - 0.415px), calc(100% - 64.98px) calc(100% - 0.415px), calc(100% - 54.66042px) calc(100% - 0.433105px), calc(100% - 44.78976px) calc(100% - 2.14432px), calc(100% - 35.51814px) calc(100% - 5.410495px), calc(100% - 26.99568px) calc(100% - 10.09348px), calc(100% - 19.3725px) calc(100% - 16.055125px), calc(100% - 12.79872px) calc(100% - 23.15728px), calc(100% - 7.42446px) calc(100% - 31.261795px), calc(100% - 3.39984px) calc(100% - 40.23052px), calc(100% - 0.87498px) calc(100% - 49.925305px), calc(100% - 0px) calc(100% - 60.208px), calc(100% - 0px) 0px);\n}\n@media (max-width: 768px) {\n  .profile__main::before {\n    clip-path: polygon(calc(100% - 0px) 0px, 0px 0px, 0px calc(100% - 107.836px), 0px calc(100% - 107.836px), 0.6049094px calc(100% - 99.307173px), 2.3685232px calc(100% - 91.116824px), 5.2141698px calc(100% - 83.357251px), 9.0651776px calc(100% - 76.120752px), 13.844875px calc(100% - 69.499625px), 19.4765904px calc(100% - 63.586168px), 25.8836522px calc(100% - 58.472679px), 32.9893888px calc(100% - 54.251456px), 40.7171286px calc(100% - 51.014797px), 48.9902px calc(100% - 48.855px), calc(100% - 71.01px) calc(100% - 1.255px), calc(100% - 71.01px) calc(100% - 1.255px), calc(100% - 60.052347px) calc(100% - 0.218402px), calc(100% - 49.451136px) calc(100% - 1.138656px), calc(100% - 39.394089px) calc(100% - 3.859834px), calc(100% - 30.068928px) calc(100% - 8.226008px), calc(100% - 21.663375px) calc(100% - 14.08125px), calc(100% - 14.365152px) calc(100% - 21.269632px), calc(100% - 8.361981px) calc(100% - 29.635226px), calc(100% - 3.841584px) calc(100% - 39.022104px), calc(100% - 0.991683px) calc(100% - 49.274338px), calc(100% - 0px) calc(100% - 60.236px), calc(100% - 0px) 0px);\n  }\n}\n.profile__main::after {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: -1;\n  background: linear-gradient(103deg, #161616 0%, #260046 22.26%, #280048 43.04%, #370065 56.08%, #2A004D 71.88%, #21003C 100%);\n  clip-path: polygon(calc(100% - 0px) 0px, 0px 0px, 0px calc(100% - 143.367px), 0px calc(100% - 143.367px), 0.7214104px calc(100% - 134.044416px), 2.8150472px calc(100% - 125.162208px), 6.1750188px calc(100% - 116.833092px), 10.6954336px calc(100% - 109.169784px), 16.2704px calc(100% - 102.285px), 22.7940264px calc(100% - 96.291456px), 30.1604212px calc(100% - 91.301868px), 38.2636928px calc(100% - 87.428952px), 46.9979496px calc(100% - 84.785424px), 56.2573px calc(100% - 83.484px), calc(100% - 63.74px) calc(100% - 0.984px), calc(100% - 63.74px) calc(100% - 0.984px), calc(100% - 53.56206px) calc(100% - 1.201644px), calc(100% - 43.84768px) calc(100% - 3.060312px), calc(100% - 34.74002px) calc(100% - 6.425508px), calc(100% - 26.38224px) calc(100% - 11.162736px), calc(100% - 18.9175px) calc(100% - 17.1375px), calc(100% - 12.48896px) calc(100% - 24.215304px), calc(100% - 7.23978px) calc(100% - 32.261652px), calc(100% - 3.31312px) calc(100% - 41.142048px), calc(100% - 0.85214px) calc(100% - 50.721996px), calc(100% - 0px) calc(100% - 60.867px), calc(100% - 0px) 0px);\n}\n@media (max-width: 768px) {\n  .profile__main::after {\n    clip-path: polygon(calc(100% - 0px) 0px, 0px 0px, 0px calc(100% - 94.531px), 0px calc(100% - 94.531px), 0.6531388px calc(100% - 85.665557px), 2.5536944px calc(100% - 77.179656px), 5.6133756px calc(100% - 69.174139px), 9.7438912px calc(100% - 61.749848px), 14.85695px calc(100% - 55.007625px), 20.8642608px calc(100% - 49.048312px), 27.6775324px calc(100% - 43.972751px), 35.2084736px calc(100% - 39.881784px), 43.3687932px calc(100% - 36.876253px), 52.0702px calc(100% - 35.057px), calc(100% - 67.93px) calc(100% - 1.057px), calc(100% - 67.93px) calc(100% - 1.057px), calc(100% - 57.287493px) calc(100% - 0.577095px), calc(100% - 47.053184px) calc(100% - 1.91708px), calc(100% - 37.394791px) calc(100% - 4.930105px), calc(100% - 28.480032px) calc(100% - 9.46932px), calc(100% - 20.476625px) calc(100% - 15.387875px), calc(100% - 13.552288px) calc(100% - 22.53892px), calc(100% - 7.874739px) calc(100% - 30.775605px), calc(100% - 3.611696px) calc(100% - 39.95108px), calc(100% - 0.930877px) calc(100% - 49.918495px), calc(100% - 0px) calc(100% - 60.531px), calc(100% - 0px) 0px);\n  }\n}\n.profile__container {\n  display: grid;\n  grid-template-columns: 0.55fr 1fr;\n  grid-template-rows: repeat(4, auto) 1fr;\n  gap: 0 25px;\n  justify-content: space-between;\n  justify-items: start;\n  align-items: start;\n}\n@media (max-width: 1024px) {\n  .profile__container {\n    grid-template-columns: 0.7fr 1fr;\n  }\n}\n@media (max-width: 768px) {\n  .profile__container {\n    grid-template-columns: 0.8fr 1fr;\n  }\n}\n@media (max-width: 710px) {\n  .profile__container {\n    grid-template-rows: auto auto auto minmax(min-content, 100%) 1fr;\n    gap: 0 15px;\n  }\n}\n@media (max-width: 580px) {\n  .profile__container {\n    grid-template-rows: auto auto minmax(min-content, 100%) auto 1fr;\n  }\n}\n@media (max-width: 500px) {\n  .profile__container {\n    grid-template-rows: auto minmax(min-content, 100%) auto auto 1fr;\n  }\n}\n.profile__photo {\n  justify-self: stretch;\n  align-self: start;\n  grid-row: auto/span 5;\n  padding-top: 107%;\n  clip-path: polygon(77.8053px 0.5px, calc(100% - 44.472px) 0.5px, calc(100% - 44.472px) 0.5px, calc(100% - 37.702508px) 1.0760573px, calc(100% - 31.320064px) 2.7383384px, calc(100% - 25.415616px) 5.3880071px, calc(100% - 20.080112px) 8.9262272px, calc(100% - 15.4045px) 13.2541625px, calc(100% - 11.479728px) 18.2729768px, calc(100% - 8.396744px) 23.8838339px, calc(100% - 6.246496px) 29.9878976px, calc(100% - 5.119932px) 36.4863317px, calc(100% - 5.108px) 43.2803px, calc(100% - 38.442px) calc(100% - 44.72px), calc(100% - 38.442px) calc(100% - 44.72px), calc(100% - 39.404061px) calc(100% - 38.730901px), calc(100% - 41.218728px) calc(100% - 33.091488px), calc(100% - 43.814127px) calc(100% - 27.867887px), calc(100% - 47.118384px) calc(100% - 23.126224px), calc(100% - 51.059625px) calc(100% - 18.932625px), calc(100% - 55.565976px) calc(100% - 15.353216px), calc(100% - 60.565563px) calc(100% - 12.454123px), calc(100% - 65.986512px) calc(100% - 10.301472px), calc(100% - 71.756949px) calc(100% - 8.961389px), calc(100% - 77.805px) calc(100% - 8.5px), 44.472px calc(100% - 8.5px), 44.472px calc(100% - 8.5px), 37.70249276px calc(100% - 9.076057px), 31.32005968px calc(100% - 10.738336px), 25.41564372px calc(100% - 13.387999px), 20.08018784px calc(100% - 16.926208px), 15.404635px calc(100% - 21.254125px), 11.47992816px calc(100% - 26.272912px), 8.39701028px calc(100% - 31.883731px), 6.24682432px calc(100% - 37.987744px), 5.12031324px calc(100% - 44.486113px), 5.10842px calc(100% - 51.28px), 38.4418px 36.7197px, 38.4418px 36.7197px, 39.4038615px 30.7307309px, 41.218532px 25.0914112px, 43.8139405px 19.8678723px, 47.118216px 15.1262456px, 51.0594875px 10.9326625px, 55.565884px 7.3532544px, 60.5655345px 4.4541527px, 65.986568px 2.3014888px, 71.7571135px 0.9613941px, 77.8053px 0.5px);\n  margin-bottom: 30px;\n}\n@media (max-width: 1024px) {\n  .profile__photo {\n    margin-bottom: 20px;\n  }\n}\n@media (max-width: 768px) {\n  .profile__photo {\n    padding-top: 120%;\n  }\n}\n@media (max-width: 710px) {\n  .profile__photo {\n    clip-path: polygon(31.7615px 0.5px, calc(100% - 20.763px) 0.5px, calc(100% - 20.763px) 0.5px, calc(100% - 17.418385px) 0.7848366px, calc(100% - 14.26532px) 1.6067248px, calc(100% - 11.348775px) 2.9167322px, calc(100% - 8.71372px) 4.6659264px, calc(100% - 6.405125px) 6.805375px, calc(100% - 4.46796px) 9.2861456px, calc(100% - 2.947195px) 12.0593058px, calc(100% - 1.8878px) 15.0759232px, calc(100% - 1.334745px) 18.2870654px, calc(100% - 1.333px) 21.6438px, calc(100% - 12.331px) calc(100% - 18.356px), calc(100% - 12.331px) calc(100% - 18.356px), calc(100% - 12.808998px) calc(100% - 15.402704px), calc(100% - 13.706984px) calc(100% - 12.622112px), calc(100% - 14.989546px) calc(100% - 10.046768px), calc(100% - 16.621272px) calc(100% - 7.709216px), calc(100% - 18.56675px) calc(100% - 5.642px), calc(100% - 20.790568px) calc(100% - 3.877664px), calc(100% - 23.257314px) calc(100% - 2.448752px), calc(100% - 25.931576px) calc(100% - 1.387808px), calc(100% - 28.777942px) calc(100% - 0.727376px), calc(100% - 31.761px) calc(100% - 0.5px), 20.7634px calc(100% - 0.5px), 20.7634px calc(100% - 0.5px), 17.418780086px calc(100% - 0.784826px), 14.265704928px calc(100% - 1.606688px), 11.349142402px calc(100% - 2.916662px), 8.714060384px calc(100% - 4.665824px), 6.40542675px calc(100% - 6.80525px), 4.468209376px calc(100% - 9.286016px), 2.947376138px calc(100% - 12.059198px), 1.887894912px calc(100% - 15.075872px), 1.334733574px calc(100% - 18.287114px), 1.33286px calc(100% - 21.644px), 12.3309px 18.3562px, 12.3309px 18.3562px, 12.808931px 15.40282793px, 13.706956px 12.62217984px, 14.989563px 10.04679691px, 16.62134px 7.70922032px, 18.566875px 5.64199125px, 20.790756px 3.87765088px, 23.257571px 2.44874039px, 25.931908px 1.38780096px, 28.778355px 0.72737377px, 31.7615px 0.5px);\n  }\n}\n@media (max-width: 600px) {\n  .profile__photo {\n    grid-row: auto/span 4;\n  }\n}\n@media (max-width: 580px) {\n  .profile__photo {\n    padding-top: 107%;\n    grid-row: auto/span 3;\n  }\n}\n@media (max-width: 500px) {\n  .profile__photo {\n    grid-row: auto/span 2;\n  }\n}\n.profile__name {\n  color: var(--white, #FFF);\n  font-family: Thunder;\n  font-size: 7em;\n  font-weight: 700;\n  line-height: 128.571%;\n  margin-bottom: 10px;\n}\n@media (max-width: 1024px) {\n  .profile__name {\n    margin-bottom: 0;\n  }\n}\n@media (max-width: 580px) {\n  .profile__name {\n    margin-bottom: 15px;\n  }\n}\n@media (max-width: 440px) {\n  .profile__name {\n    line-height: 1;\n  }\n}\n@media (max-width: 340px) {\n  .profile__name {\n    font-size: 32px;\n  }\n}\n.profile__title {\n  color: var(--green-new, #9DF850);\n  font-family: Thunder;\n  font-size: 5em;\n  font-weight: 700;\n  margin-bottom: 20px;\n}\n@media (max-width: 1024px) {\n  .profile__title {\n    margin-bottom: 15px;\n  }\n}\n@media (max-width: 440px) {\n  .profile__title {\n    font-size: 26px;\n  }\n}\n@media (max-width: 340px) {\n  .profile__title {\n    font-size: 20px;\n  }\n}\n.profile__experience {\n  color: var(--white, #FFF);\n  font-family: Montserrat;\n  font-size: 3em;\n  font-weight: 600;\n  margin-bottom: 20px;\n}\n@media (max-width: 1024px) {\n  .profile__experience {\n    margin-bottom: 15px;\n  }\n}\n@media (max-width: 500px) {\n  .profile__experience {\n    grid-column: auto/span 2;\n  }\n}\n.profile__areas {\n  color: var(--white, #FFF);\n  font-family: Montserrat;\n  font-size: 2.4em;\n  line-height: 1.8;\n  margin-bottom: 30px;\n}\n@media (max-width: 1024px) {\n  .profile__areas {\n    margin-bottom: 20px;\n  }\n}\n@media (max-width: 580px) {\n  .profile__areas {\n    grid-column: auto/span 2;\n  }\n}\n.profile__areas-term {\n  color: var(--green-new, #9DF850);\n  font-weight: 600;\n}\n@media (max-width: 710px) {\n  .profile__download-btn {\n    justify-self: end;\n  }\n}\n@media (max-width: 600px) {\n  .profile__download-btn {\n    grid-column: auto/span 2;\n    justify-self: center;\n  }\n}\n.profile__skills-rates {\n  margin-bottom: 80px;\n}\n@media (max-width: 768px) {\n  .profile__skills-rates {\n    margin-bottom: 60px;\n  }\n}\n@media (max-width: 520px) {\n  .profile__skills-rates {\n    margin-bottom: 40px;\n  }\n}\n.profile__skills-cloud {\n  max-width: 800px;\n  margin: auto;\n}\n@media (max-width: 1024px) {\n  .profile__skills-cloud {\n    --base-distance: 230px;\n    max-width: 600px;\n    margin: auto;\n  }\n}\n@media (max-width: 768px) {\n  .profile__skills-cloud {\n    --base-distance: 190px;\n    max-width: 500px;\n    margin: auto;\n  }\n}\n@media (max-width: 520px) {\n  .profile__skills-cloud {\n    --base-distance: 160px;\n  }\n}\n@media (max-width: 420px) {\n  .profile__skills-cloud {\n    --base-distance: 130px;\n  }\n}\n@media (max-width: 375px) {\n  .profile__skills-cloud {\n    --base-distance: 100px;\n  }\n}\n\n@keyframes orbite {\n  0% {\n    transform: rotateZ(var(--placing-degree)) translateX(calc(var(--base-distance) + var(--base-distance) * var(--distance-shift))) rotateZ(calc(0deg - var(--placing-degree)));\n  }\n  100% {\n    transform: rotateZ(calc(360deg + var(--placing-degree))) translateX(calc(var(--base-distance) + var(--base-distance) * var(--distance-shift))) rotateZ(calc(-360deg - var(--placing-degree)));\n  }\n}\n.steps__title {\n  max-width: 800px;\n  color: transparent;\n  font-family: Thunder;\n  font-size: 90px;\n  font-style: normal;\n  font-weight: 800;\n  background: linear-gradient(307deg, #161616 0%, #260046 18.82%, #2A004E 36.26%, #500092 56.78%, #3A006A 75.58%, #2A004E 88.57%, #2A004E 100%);\n  background-clip: text;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  margin-bottom: 60px;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .steps__title {\n    font-size: calc(42px + 48 * (100vw - 375.1px) / 1544.9);\n    max-width: calc(260px + 540 * (100vw - 375.1px) / 1544.9);\n  }\n}\n@media (max-width: 520px) {\n  .steps__title {\n    font-size: 42px;\n    max-width: 260px;\n  }\n}\n@media (min-width: 280px) and (max-width: 520px) {\n  .steps__title {\n    max-width: calc(200px + 60 * (100vw - 280px) / 240);\n  }\n}\n@media (max-width: 280px) {\n  .steps__title {\n    max-width: 200px;\n  }\n}\n.steps__decor {\n  position: absolute;\n  left: 0;\n  top: 0;\n  top: -33em;\n  z-index: -1;\n  width: 100%;\n  height: calc(100% + 33em);\n  font-size: 10px;\n  overflow: hidden;\n}\n@media (min-width: 768.1px) and (max-width: 1920px) {\n  .steps__decor {\n    font-size: calc(4px + 6 * (100vw - 768.1px) / 1151.9);\n  }\n}\n@media (min-width: 280px) and (max-width: 768px) {\n  .steps__decor {\n    font-size: calc(3px + 7 * (100vw - 280px) / 744);\n  }\n}\n@media (max-width: 768px) {\n  .steps__decor {\n    top: -50em;\n    height: calc(100% + 50em);\n  }\n}\n@media (max-width: 280px) {\n  .steps__decor {\n    font-size: 3px;\n  }\n}\n.steps__decor::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 105%;\n  height: 100%;\n  background: url(../img/static/steps-bg.svg) top center/cover no-repeat;\n}\n@media (max-width: 768px) {\n  .steps__decor::before {\n    background-image: url(../img/static/steps-bg-mob.svg);\n  }\n}\n.steps__body {\n  position: relative;\n  left: 0;\n  top: 0;\n  z-index: 0;\n  padding: 60px 0;\n}\n@media (max-width: 1440px) {\n  .steps__body {\n    padding-top: 40px;\n  }\n}\n@media (max-width: 768px) {\n  .steps__body {\n    padding-bottom: 50px;\n  }\n}\n\n.step-cards-layout__inner {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin: -20px;\n}\n@media (max-width: 1440px) {\n  .step-cards-layout__inner {\n    margin: -20px -10px;\n  }\n}\n@media (max-width: 1200px) {\n  .step-cards-layout__inner {\n    margin: -15px -5px;\n  }\n}\n.step-cards-layout__inner > * {\n  flex: 0 0 33.3333333333%;\n  padding: 20px;\n  filter: drop-shadow(0 0 60px rgba(21, 0, 38, 0.4));\n}\n@media (max-width: 1440px) {\n  .step-cards-layout__inner > * {\n    padding: 20px 10px;\n  }\n}\n@media (max-width: 1200px) {\n  .step-cards-layout__inner > * {\n    padding: 15px 5px;\n  }\n}\n@media (max-width: 1024px) {\n  .step-cards-layout__inner > * {\n    flex: 0 0 50%;\n  }\n}\n@media (max-width: 768px) {\n  .step-cards-layout__inner > * {\n    flex: 0 0 100%;\n  }\n}\n\n.step-card {\n  background-color: white;\n  clip-path: polygon(16.0633px 21.8844px, 16.0633px 21.8844px, 16.6633191px 18.26171001px, 17.7767768px 14.85199488px, 19.3603537px 11.69490987px, 21.3707304px 8.83011024px, 23.7645875px 6.29725125px, 26.4986056px 4.13598816px, 29.5294653px 2.38597623px, 32.8138472px 1.08687072px, 36.3084319px 0.27832689px, 39.9699px 0px, calc(100% - 24.218px) 0px, calc(100% - 24.218px) 0px, calc(100% - 20.0912px) 0.3522918px, calc(100% - 16.20188px) 1.3686624px, calc(100% - 12.60566px) 2.9883546px, calc(100% - 9.35816px) 5.1506112px, calc(100% - 6.515px) 7.794675px, calc(100% - 4.1318px) 10.8597888px, calc(100% - 2.26418px) 14.2851954px, calc(100% - 0.96776px) 18.0101376px, calc(100% - 0.29816px) 21.9738582px, calc(100% - 0.311px) 26.1156px, calc(100% - 16.063px) calc(100% - 21.884px), calc(100% - 16.063px) calc(100% - 21.884px), calc(100% - 16.662979px) calc(100% - 18.26145px), calc(100% - 17.776432px) calc(100% - 14.85184px), calc(100% - 19.360033px) calc(100% - 11.69483px), calc(100% - 21.370456px) calc(100% - 8.83008px), calc(100% - 23.764375px) calc(100% - 6.29725px), calc(100% - 26.498464px) calc(100% - 4.136px), calc(100% - 29.529397px) calc(100% - 2.38599px), calc(100% - 32.813848px) calc(100% - 1.08688px), calc(100% - 36.308491px) calc(100% - 0.27833px), calc(100% - 39.97px) calc(100% - 0px), 24.2177px calc(100% - 0px), 24.2177px calc(100% - 0px), 20.09093495px calc(100% - 0.352303px), 16.20165812px calc(100% - 1.368704px), 12.60548699px calc(100% - 2.988441px), 9.35803904px calc(100% - 5.150752px), 6.51493175px calc(100% - 7.794875px), 4.1317826px calc(100% - 10.860048px), 2.26420907px calc(100% - 14.285509px), 0.96782864px calc(100% - 18.010496px), 0.29825879px calc(100% - 21.974247px), 0.311117px calc(100% - 26.116px), 16.0633px 21.8844px);\n  padding: 30px 38px 30px 38px;\n  min-height: 100%;\n}\n@media (max-width: 1200px) {\n  .step-card {\n    padding: 25px 30px 25px 30px;\n  }\n}\n.step-card__name {\n  color: #3F0173;\n  font-family: Thunder;\n  font-size: 42px;\n  font-style: italic;\n  font-weight: 700;\n  letter-spacing: 0.84px;\n  margin-bottom: 16px;\n}\n@media (max-width: 1440px) {\n  .step-card__name {\n    font-size: 36px;\n  }\n}\n@media (max-width: 1200px) {\n  .step-card__name {\n    font-size: 32px;\n  }\n}\n.step-card__text {\n  color: #212121;\n  font-family: Montserrat;\n  font-size: 18px;\n  line-height: 133%; /* 133.333% */\n}\n@media (max-width: 1200px) {\n  .step-card__text {\n    font-size: 16px;\n  }\n}\n.step-card .text-btn {\n  --color: #A335FF;\n  --font-size: 18px;\n  font-family: Montserrat;\n  line-height: 24px;\n  text-decoration: underline;\n}\n\n.contact-form-section {\n  padding-top: 120px;\n  padding-bottom: 40px;\n}\n@media (max-width: 1024px) {\n  .contact-form-section {\n    padding-top: 80px;\n    padding-bottom: 10px;\n  }\n}\n@media (max-width: 768px) {\n  .contact-form-section {\n    padding-top: 60px;\n    padding-bottom: 50px;\n  }\n}\n.contact-form-section__container {\n  display: grid;\n  grid-template-columns: 1fr minmax(max-content, 1fr);\n  gap: 120px;\n}\n@media (max-width: 1920px) {\n  .contact-form-section__container {\n    gap: 100px;\n  }\n}\n@media (max-width: 1024px) {\n  .contact-form-section__container {\n    grid-template-columns: 1fr 1fr;\n    gap: 60px;\n  }\n}\n@media (max-width: 768px) {\n  .contact-form-section__container {\n    grid-template-columns: 1fr;\n    gap: 40px;\n    max-width: 600px;\n  }\n}\n.contact-form-section__title {\n  font-family: Thunder;\n  font-size: 70px;\n  font-weight: 800;\n  background: linear-gradient(307deg, #161616 0%, #260046 18.82%, #2A004E 36.26%, #500092 56.78%, #3A006A 75.58%, #2A004E 88.57%, #2A004E 100%);\n  background-clip: text;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  padding-top: 20px;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .contact-form-section__title {\n    font-size: calc(42px + 28 * (100vw - 520px) / 1400);\n  }\n}\n@media (max-width: 520px) {\n  .contact-form-section__title {\n    font-size: 42px;\n  }\n}\n.contact-form__body {\n  display: grid;\n  gap: 30px;\n}\n.contact-form__msg-container {\n  margin: 15px auto;\n}\n.contact-form__msg {\n  display: flex;\n  align-items: center;\n  max-width: 500px;\n  text-align: center;\n  font-family: Montserrat;\n  font-size: 14px;\n  background: #FFF;\n  border-radius: 10px;\n  box-shadow: 0px 4px 66px 0px rgba(32, 6, 70, 0.16);\n  padding: 10px 20px;\n  margin: 0 auto;\n}\n.contact-form__msg_error {\n  color: #FF1D53;\n}\n.contact-form__msg_success {\n  color: #9935EC;\n}\n.contact-form__bottom-inner {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin-left: -20px;\n  margin-top: -12px;\n}\n@media (max-width: 1024px) {\n  .contact-form__bottom-inner {\n    flex-direction: column;\n    align-items: center;\n  }\n}\n@media (max-width: 768px) {\n  .contact-form__bottom-inner {\n    flex-direction: row;\n  }\n}\n@media (max-width: 575px) {\n  .contact-form__bottom-inner {\n    flex-direction: column;\n  }\n}\n.contact-form__bottom-inner > * {\n  margin-left: 20px;\n  margin-top: 12px;\n}\n.contact-form__separator {\n  display: flex;\n  align-items: center;\n  color: #C279FF;\n  font-family: Thunder;\n  font-size: 30px;\n  font-weight: 700;\n  letter-spacing: 0.6px;\n}\n.contact-form__separator::before, .contact-form__separator::after {\n  content: \"\";\n  width: 35px;\n  height: 1.2px;\n  background-color: #C279FF;\n}\n.contact-form__separator::before {\n  margin-right: 10px;\n}\n.contact-form__separator::after {\n  margin-left: 10px;\n}\n.form-field {\n  position: relative;\n  left: 0;\n  top: 0;\n}\n.form-field__label {\n  position: absolute;\n  left: 15px;\n  bottom: calc(100% - 1em);\n  font-family: Montserrat;\n  font-size: 16px;\n  font-weight: 600;\n  transition: opacity 0.4s, top 0.4s, bottom 0.4s;\n}\n.form-field.error .form-field__label {\n  color: #FF1D53;\n}\n.form-field.child-input-is-filled .form-field__label {\n  bottom: calc(100% + 5px);\n  opacity: 1;\n}\n.form-field__input input, .form-field__input textarea {\n  width: 100%;\n  color: var(--white, #FFF);\n  font-family: Montserrat;\n  font-size: 18px;\n  padding: 12px 24px;\n  background: linear-gradient(135deg, #161616 0%, #260046 14.94%, #2A004E 37.47%, #500092 64.84%, #3A006A 100%, #2A004E 100%);\n  clip-path: polygon(7.97274px 4.72542px, 7.97274px 4.72542px, 8.20639585px 3.92288265px, 8.5417712px 3.1748544px, 8.97010875px 2.48839395px, 9.4826512px 1.87056px, 10.07064125px 1.32841125px, 10.7253216px 0.8690064px, 11.43793495px 0.49940415px, 12.199724px 0.2266632px, 13.00193145px 0.05784225px, 13.8358px 0px, calc(100% - 6.444px) 0px, calc(100% - 6.444px) 0px, calc(100% - 5.327924px) 0.10271337px, calc(100% - 4.286632px) 0.39753456px, calc(100% - 3.336228px) 0.86448519px, calc(100% - 2.492816px) 1.48358688px, calc(100% - 1.7725px) 2.23486125px, calc(100% - 1.191384px) 3.09832992px, calc(100% - 0.765572px) 4.05401451px, calc(100% - 0.511168px) 5.08193664px, calc(100% - 0.444276px) 6.16211793px, calc(100% - 0.581px) 7.27458px, calc(100% - 7.973px) calc(100% - 4.7254px), calc(100% - 7.973px) calc(100% - 4.7254px), calc(100% - 8.2065px) calc(100% - 3.9228705px), calc(100% - 8.54176px) calc(100% - 3.174848px), calc(100% - 8.97002px) calc(100% - 2.4883915px), calc(100% - 9.48252px) calc(100% - 1.87056px), calc(100% - 10.0705px) calc(100% - 1.3284125px), calc(100% - 10.7252px) calc(100% - 0.869008px), calc(100% - 11.43786px) calc(100% - 0.4994055px), calc(100% - 12.19972px) calc(100% - 0.226664px), calc(100% - 13.00202px) calc(100% - 0.0578425px), calc(100% - 13.836px) calc(100% - 0px), 6.44447px calc(100% - 0px), 6.44447px calc(100% - 0px), 5.328353973px calc(100% - 0.1027142px), 4.287036304px calc(100% - 0.3975376px), 3.336618611px calc(100% - 0.8644914px), 2.493202512px calc(100% - 1.4835968px), 1.772889625px calc(100% - 2.234875px), 1.191781568px calc(100% - 3.0983472px), 0.765979959px calc(100% - 4.0540346px), 0.511586416px calc(100% - 5.0819584px), 0.444702557px calc(100% - 6.1621398px), 0.58143px calc(100% - 7.2746px), 7.97274px 4.72542px);\n  transition: color 0.4s;\n}\n.form-field__input input::placeholder, .form-field__input textarea::placeholder {\n  color: var(--text-not-filled-team, #AEAEAE);\n  font-family: Montserrat;\n  font-size: 18px;\n}\n.form-field.error .form-field__input input, .form-field.error .form-field__input textarea {\n  color: #FF1D53;\n}\n.form-field .error {\n  display: inline-block;\n  color: #FF1D53;\n  font-family: Montserrat;\n  font-size: 14px;\n  margin-top: 8px;\n  margin-left: 10px;\n}", "",{"version":3,"sources":["webpack://./src/scss/components/temate-card.scss","webpack://./src/scss/pages/home/index.scss","webpack://./src/scss/components/team-slider.scss","webpack://./src/scss/pages/home/welcome.scss","webpack://./src/scss/pages/home/teams-review.scss","webpack://./src/scss/pages/home/profile.scss","webpack://./src/scss/pages/home/steps.scss","webpack://./src/scss/pages/home/contact-form.scss"],"names":[],"mappings":"AAAA;EACC,aAAA;EACA,iCAAA;EACA,iCAAA;EACA,WAAA;EACA,gBAAA;EACA,mBAAA;EACA,aAAA;EACA,gBAAA;EACA,kDAAA;EACA,uBAAA;ACCD;ADAC;EAXD;IAYE,iCAAA;IACA,iCAAA;IACA,WAAA;IACA,aAAA;ECGA;AACF;ADFC;EAjBD;IAkBE,gBAAA;ECKA;AACF;ADJC;EApBD;IAqBE,gBAAA;ECOA;AACF;ADNC;EAvBD;IAwBE,gBAAA;ECSA;AACF;ADRC;EACC,qBAAA;EACA,iBAAA;EACA,2BAAA;EACA,gBAAA;ACUF;ADTE;EALD;IAME,qBAAA;IACA,0BAAA;IACA,+BAAA;ECYD;AACF;ADVC;EACC,mBAAA;ACYF;ADVC;EACC,cAAA;EACA,uBAAA;EACA,eAAA;EACA,gBAAA;EACA,mBAAA;ACYF;ADXE;EAND;IAOE,eAAA;ECcD;AACF;ADbE;EATD;IAUE,mBAAA;ECgBD;AACF;ADdC;EACC,cAAA;EACA,oBAAA;EACA,eAAA;EACA,gBAAA;EACA,sBAAA;ACgBF;ADfE;EAND;IAOE,eAAA;ECkBD;AACF;ADjBE;EATD;IAUE,eAAA;ECoBD;AACF;ADnBE;EAZD;IAaE,eAAA;ECsBD;AACF;ADrBE;EAfD;IAgBE,eAAA;ECwBD;AACF;ADtBC;EACC,aAAA;EACA,SAAA;EACA,mBAAA;ACwBF;ADvBE;EAJD;IAKE,SAAA;EC0BD;AACF;ADzBE;EAPD;IAQE,SAAA;EC4BD;AACF;AD3BE;EAVD;IAWE,wBAAA;IACA,8BAAA;IACA,SAAA;IACA,mBAAA;EC8BD;AACF;AD5BC;EACC,aAAA;EACA,mBAAA;AC8BF;AD5BC;EACC,WAAA;EACA,YAAA;EACA,kBAAA;EACA,wDAAA;AC8BF;AD7BE;EALD;IAME,WAAA;IACA,YAAA;IACA,eAAA;ECgCD;AACF;AD/BE;EAVD;IAWE,WAAA;IACA,YAAA;ECkCD;AACF;ADjCE;EAdD;IAeE,WAAA;IACA,YAAA;IACA,kBAAA;ECoCD;AACF;ADlCC;EACC,cAAA;EACA,oBAAA;EACA,eAAA;EACA,kBAAA;EACA,gBAAA;EACA,sBAAA;ACoCF;ADnCE;EAPD;IAQE,eAAA;ECsCD;AACF;ADrCE;EAVD;IAWE,eAAA;ECwCD;AACF;ADvCE;EAbD;IAcE,eAAA;EC0CD;AACF;ADxCC;EACC,eAAA;EACA,iBAAA;AC0CF;ADzCE;EAHD;IAIE,wBAAA;EC4CD;AACF;;ACnLA;EACC,iBAAA;EACA,WAAA;ADsLD;ACrLC;EACC,mBAAA;ADuLF;ACrLC;EACC,YAAA;EACA,uCAAA;ADuLF;ACtLE;EACC,YAAA;ADwLH;ACtLE;EACC,YAAA;ADwLH;ACtLE;EACC,YAAA;ADwLH;ACtLE;EACC,YAAA;ADwLH;ACtLE;EACC,YAAA;ADwLH;ACtLE;EACC,YAAA;ADwLH;ACtLE;EACC,YAAA;ADwLH;ACtLE;EACC,YAAA;ADwLH;ACrLC;EACC,aAAA;EACA,uBAAA;EACA,kBAAA;ADuLF;ACrLC;EACC,oBAAA;EACA,sCAAA;EACA,UAAA;EACA,mBAAA;ADuLF;ACtLE;EALD;IAME,sCAAA;IACA,aAAA;EDyLD;AACF;ACvLC;EACC,qBAAA;EACA,qBAAA;EACA,8CAAA;ADyLF;ACxLE;EACC,WAAA;EACA,YAAA;EACA,yBAAA;EACA,6BAAA;EACA,iCAAA;AD0LH;ACxLE;EACC,yBAAA;AD0LH;ACvLC;EACC,oBAAA;EACA,sCAAA;EACA,UAAA;EACA,cAAA;EACA,oBAAA;EACA,eAAA;EACA,kBAAA;EACA,gBAAA;EACA,iBAAA;EACA,sBAAA;ADyLF;ACxLE;EAXD;IAYE,kBAAA;IACA,wBAAA;IACA,oBAAA;ED2LD;AACF;ACzLC;EACC,cAAA;EACA,iBAAA;EACA,eAAA;EACA,sBAAA;AD2LF;ACtLA;EACC,cAAA;EACA,oBAAA;EACA,mBAAA;EACA,uBAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;EACA,yBAAA;EACA,kBAAA;EACA,yBAAA;EACA,uBAAA;ADwLD;ACvLC;EACC,wDAAA;ADyLF;ACvLC;EACC,cAAA;EACA,aAAA;EACA,UAAA;EACA,iCAAA;ADyLF;ACtLC;EACC,kBAAA;EACA,MAAA;EACA,UAAA;ADwLF;ACtLC;EACC,SAAA;ADwLF;ACtLC;EACC,UAAA;ADwLF;ACtLC;EACC,SAAA;ADwLF;ACtLC;EACC,UAAA;ADwLF;;AEvTA;EACC,kBAAA;EACA,OAAA;EACA,MAAA;EACA,UAAA;AF0TD;AEzTC;EACC,WAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,WAAA;EACA,YAAA;EACA,yBAAA;EACA,yaAAA;AF2TF;AE1TE;EAVD;IAWE,2aAAA;EF6TD;AACF;AE3TC;EACC,WAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,WAAA;EACA,YAAA;EACA,2HAAA;EACA,maAAA;AF6TF;AE5TE;EAVD;IAWE,2aAAA;EF+TD;AACF;AE7TC;EACC,kBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,UAAA;AF+TF;AE7TC;EACC,kBAAA;EACA,qBAAA;AF+TF;AE9TE;EAHD;IAIE,0DAAA;IACA,4DAAA;EFiUD;AACF;AEhUE;EAPD;IAQE,kBAAA;IACA,oBAAA;EFmUD;AACF;AElUE;EAXD;IAYE,aAAA;IACA,uBAAA;EFqUD;AACF;AEnUC;EACC,gBAAA;EACA,UAAA;EACA,UAAA;AFqUF;AEpUE;EAJD;IAKE,gBAAA;IACA,WAAA;EFuUD;AACF;;AEpUA;EACC,oBAAA;EACA,sBAAA;EACA,uBAAA;EACA,WAAA;EACA,oBAAA;EACA,gBAAA;EACA,gBAAA;EACA,gBAAA;EACA,mBAAA;AFuUD;AEtUC;EAVD;IAWE,uDAAA;EFyUA;AACF;AExUC;EAbD;IAcE,eAAA;EF2UA;AACF;AE1UC;EAhBD;IAiBE,eAAA;EF6UA;AACF;AE5UC;EAnBD;IAoBE,gBAAA;IACA,mBAAA;EF+UA;AACF;AE9UC;EACC,qBAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,cAAA;EACA,gBAAA;EACA,mBAAA;EACA,UAAA;AFgVF;AE/UE;EATD;IAUE,gBAAA;IACA,mBAAA;EFkVD;AACF;AEjVE;EAbD;IAcE,gBAAA;IACA,mBAAA;EFoVD;AACF;AEnVE;EACC,WAAA;EACA,qBAAA;EACA,kBAAA;EACA,WAAA;EACA,SAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;EACA,yBAAA;EACA,ywBAAA;AFqVH;AElVC;EACC,aAAA;AFoVF;AElVC;EACC,gBAAA;AFoVF;;AGhdA;EACC,kBAAA;EACA,OAAA;EACA,MAAA;EACA,UAAA;EACA,eAAA;EACA,gBAAA;EACA,gBAAA;AHmdD;AGldC;EARD;IASE,eAAA;EHqdA;AACF;AGpdC;EAXD;IAYE,cAAA;EHudA;AACF;AGtdC;EACC,aAAA;EACA,sBAAA;AHwdF;AGvdE;EACC,mBAAA;AHydH;AGxdG;EAFD;IAGE,mBAAA;EH2dF;AACF;AGzdE;EACC,iBAAA;EACA,2BAAA;EACA,mBAAA;AH2dH;AGzdE;EACC,4BAAA;AH2dH;AGxdC;EACC,oBAAA;EACA,qBAAA;EACA,gBAAA;EACA,kBAAA;EACA,oBAAA;EACA,gBAAA;EACA,gBAAA;EACA,8HAAA;EACA,qBAAA;EACA,6BAAA;AH0dF;AGzdE;EAXD;IAYE,uDAAA;EH4dD;AACF;AG3dE;EAdD;IAeE,eAAA;EH8dD;AACF;AG7dE;EAjBD;IAkBE,yDAAA;EHgeD;AACF;AG/dE;EApBD;IAqBE,wDAAA;EHkeD;AACF;AGjeE;EAvBD;IAwBE,gBAAA;IACA,eAAA;EHoeD;AACF;AGneE;EA3BD;IA4BE,gBAAA;IACA,eAAA;EHseD;AACF;AGpeC;EACC,mBAAA;AHseF;AGpeC;EACC,kBAAA;EACA,WAAA;EACA,aAAA;EACA,WAAA;AHseF;AGreE;EALD;IAME,aAAA;EHweD;AACF;;AGreA;EACC,kBAAA;EACA,OAAA;EACA,MAAA;AHweD;AGveC;EACC,WAAA;EACA,kBAAA;EACA,SAAA;EACA,QAAA;EACA,WAAA;EACA,aAAA;EACA,YAAA;EACA,yBAAA;EACA,2xDAAA;EACA,mCAAA;AHyeF;AGxeE;EAXD;IAYE,qzDAAA;EH2eD;AACF;AGzeC;EACC,WAAA;EACA,kBAAA;EACA,SAAA;EACA,QAAA;EACA,WAAA;EACA,WAAA;EACA,YAAA;EACA,0JAAA;EACA,8xDAAA;EACA,gCAAA;AH2eF;AG1eE;EAXD;IAYE,8yDAAA;EH6eD;AACF;AG3eC;EACC,iBAAA;EACA,eAAA;EACA,YAAA;AH6eF;AG3eC;EACC,0BAAA;AH6eF;AG5eE;EAFD;IAGE,0BAAA;EH+eD;AACF;AG9eE;EALD;IAME,0BAAA;EHifD;AACF;AG/eC;EACC,8BAAA;AHifF;AGhfE;EACC,WAAA;EACA,cAAA;AHkfH;AGjfG;EAHD;IAIE,cAAA;EHofF;AACF;AGnfG;EACC,cAAA;AHqfJ;AGnfG;EACC,eAAA;AHqfJ;AGjfC;EACC,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,gBAAA;EACA,eAAA;EACA,gBAAA;EACA,kBAAA;EACA,eAAA;AHmfF;AGlfE;EATD;IAUE,gBAAA;IACA,eAAA;EHqfD;AACF;AGpfE;EAbD;IAcE,eAAA;EHufD;AACF;;AInpBA;EACC,aAAA;EACA,+CAAA;EACA,QAAA;EACA,oBAAA;AJspBD;AIrpBC;EACC,kBAAA;EACA,OAAA;EACA,UAAA;EACA,cAAA;EACA,iBAAA;EACA,oBAAA;EACA,eAAA;EACA,kBAAA;EACA,gBAAA;EACA,sBAAA;AJupBF;AItpBE;EAXD;IAYE,uDAAA;EJypBD;AACF;AIxpBE;EAdD;IAeE,eAAA;EJ2pBD;AACF;AI1pBE;EAjBD;IAkBE,eAAA;EJ6pBD;AACF;AI3pBC;EACC,aAAA;EACA,iCAAA;EACA,QAAA;EACA,iBAAA;AJ6pBF;AI5pBE;EALD;IAME,kBAAA;EJ+pBD;AACF;AI7pBC;EACC,aAAA;EACA,mBAAA;EACA,WAAA;AJ+pBF;AI9pBE;EACC,WAAA;EACA,cAAA;EACA,qBAAA;EACA,WAAA;EACA,YAAA;EACA,mBAAA;EACA,kBAAA;AJgqBH;AI9pBE;EACC,WAAA;EACA,cAAA;EACA,qBAAA;EACA,WAAA;EACA,WAAA;EACA,mBAAA;AJgqBH;AI7pBC;EACC,aAAA;EACA,sCAAA;EACA,mBAAA;EACA,4DAAA;EACA,mDAAA;EACA,iBAAA;AJ+pBF;AI9pBE;EACC,WAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,eAAA;EACA,mBAAA;EACA,sBAAA;AJgqBH;AI/pBG;EACC,eAAA;AJiqBJ;AI/pBG;EAXD;IAYE,mDAAA;IACA,oDAAA;EJkqBF;AACF;AIjqBG;EAfD;IAgBE,WAAA;IACA,YAAA;EJoqBF;AACF;;AI/pBC;EACC,qBAAA;EACA,kBAAA;EACA,oCAAA;EACA,oBAAA;EACA,eAAA;EACA,gBAAA;EACA,qBAAA;EACA,qBAAA;EACA,+IAAA;EACA,qBAAA;EACA,6BAAA;EACA,mBAAA;AJkqBF;AIjqBE;EAbD;IAcE,mDAAA;EJoqBD;AACF;AInqBE;EAhBD;IAiBE,eAAA;EJsqBD;AACF;AIpqBC;EACC,aAAA;EACA,sBAAA;AJsqBF;AIpqBC;EACC,aAAA;EACA,qCAAA;EACA,cAAA;AJsqBF;AIrqBE;EAJD;IAKE,cAAA;EJwqBD;AACF;AIvqBE;EAPD;IAQE,SAAA;EJ0qBD;AACF;AIzqBE;EAVD;IAWE,0BAAA;IACA,uBAAA;EJ4qBD;AACF;;AIzqBA;EACC,sBAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;AJ4qBD;AI3qBC;EACC,gBAAA;AJ6qBF;AI3qBC;EACC,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;AJ6qBF;AI3qBC;EACC,WAAA;EACA,kBAAA;EACA,oBAAA;EACA,eAAA;EACA,kBAAA;EACA,gBAAA;AJ6qBF;AI5qBE;EAPD;IAQE,eAAA;EJ+qBD;AACF;AI9qBE;EAVD;IAWE,eAAA;EJirBD;AACF;AIhrBE;EAbD;IAcE,eAAA;EJmrBD;AACF;AIjrBC;EACC,kBAAA;EACA,SAAA;EACA,QAAA;EACA,gCAAA;AJmrBF;AIjrBC;EACC,kBAAA;EACA,OAAA;EACA,MAAA;EACA,cAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,oxBAAA;EACA,qCAAA;AJmrBF;AIlrBE;EAbD;IAcE,YAAA;IACA,aAAA;EJqrBD;AACF;AIprBE;EAjBD;IAkBE,WAAA;IACA,YAAA;EJurBD;AACF;AItrBE;EArBD;IAsBE,WAAA;IACA,YAAA;EJyrBD;AACF;AIxrBE;EAzBD;IA0BE,WAAA;IACA,YAAA;EJ2rBD;AACF;AI1rBE;EA7BD;IA8BE,WAAA;IACA,YAAA;EJ6rBD;AACF;AI5rBE;EACC,gBAAA;AJ8rBH;AI5rBE;EACC,UAAA;EACA,WAAA;AJ8rBH;;AI1rBA;EACC,oBAAA;AJ6rBD;AI5rBC;EAFD;IAGE,mBAAA;EJ+rBA;AACF;AI9rBC;EALD;IAME,mBAAA;EJisBA;AACF;AIhsBC;EACC,kBAAA;EACA,OAAA;EACA,MAAA;EACA,UAAA;EACA,eAAA;EACA,eAAA;EACA,mBAAA;AJksBF;AIjsBE;EARD;IASE,iDAAA;EJosBD;AACF;AInsBE;EAXD;IAYE,cAAA;IACA,oBAAA;EJssBD;AACF;AIrsBE;EACC,WAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;EACA,yBAAA;EACA,qjCAAA;AJusBH;AItsBG;EAVD;IAWE,2jCAAA;EJysBF;AACF;AIvsBE;EACC,WAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;EACA,6HAAA;EACA,kjCAAA;AJysBH;AIxsBG;EAVD;IAWE,qjCAAA;EJ2sBF;AACF;AIxsBC;EACC,aAAA;EACA,iCAAA;EACA,uCAAA;EACA,WAAA;EACA,8BAAA;EACA,oBAAA;EACA,kBAAA;AJ0sBF;AIzsBE;EARD;IASE,gCAAA;EJ4sBD;AACF;AI3sBE;EAXD;IAYE,gCAAA;EJ8sBD;AACF;AI7sBE;EAdD;IAeE,gEAAA;IACA,WAAA;EJgtBD;AACF;AI/sBE;EAlBD;IAmBE,gEAAA;EJktBD;AACF;AIjtBE;EArBD;IAsBE,gEAAA;EJotBD;AACF;AIltBC;EACC,qBAAA;EACA,iBAAA;EACA,qBAAA;EACA,iBAAA;EACA,iwDAAA;EACA,mBAAA;AJotBF;AIntBE;EAPD;IAQE,mBAAA;EJstBD;AACF;AIrtBE;EAVD;IAWE,iBAAA;EJwtBD;AACF;AIvtBE;EAbD;IAcE,svDAAA;EJ0tBD;AACF;AIztBE;EAhBD;IAiBE,qBAAA;EJ4tBD;AACF;AI3tBE;EAnBD;IAoBE,iBAAA;IACA,qBAAA;EJ8tBD;AACF;AI7tBE;EAvBD;IAwBE,qBAAA;EJguBD;AACF;AI9tBC;EACC,yBAAA;EACA,oBAAA;EACA,cAAA;EACA,gBAAA;EACA,qBAAA;EACA,mBAAA;AJguBF;AI/tBE;EAPD;IAQE,gBAAA;EJkuBD;AACF;AIjuBE;EAVD;IAWE,mBAAA;EJouBD;AACF;AInuBE;EAbD;IAcE,cAAA;EJsuBD;AACF;AIruBE;EAhBD;IAiBE,eAAA;EJwuBD;AACF;AItuBC;EACC,gCAAA;EACA,oBAAA;EACA,cAAA;EACA,gBAAA;EACA,mBAAA;AJwuBF;AIvuBE;EAND;IAOE,mBAAA;EJ0uBD;AACF;AIzuBE;EATD;IAUE,eAAA;EJ4uBD;AACF;AI3uBE;EAZD;IAaE,eAAA;EJ8uBD;AACF;AI5uBC;EACC,yBAAA;EACA,uBAAA;EACA,cAAA;EACA,gBAAA;EACA,mBAAA;AJ8uBF;AI7uBE;EAND;IAOE,mBAAA;EJgvBD;AACF;AI/uBE;EATD;IAUE,wBAAA;EJkvBD;AACF;AIhvBC;EACC,yBAAA;EACA,uBAAA;EACA,gBAAA;EACA,gBAAA;EACA,mBAAA;AJkvBF;AIjvBE;EAND;IAOE,mBAAA;EJovBD;AACF;AInvBE;EATD;IAUE,wBAAA;EJsvBD;AACF;AIpvBC;EACC,gCAAA;EACA,gBAAA;AJsvBF;AInvBE;EADD;IAEE,iBAAA;EJsvBD;AACF;AIrvBE;EAJD;IAKE,wBAAA;IACA,oBAAA;EJwvBD;AACF;AItvBC;EACC,mBAAA;AJwvBF;AIvvBE;EAFD;IAGE,mBAAA;EJ0vBD;AACF;AIzvBE;EALD;IAME,mBAAA;EJ4vBD;AACF;AI1vBC;EACC,gBAAA;EACA,YAAA;AJ4vBF;AI3vBE;EAHD;IAIE,sBAAA;IACA,gBAAA;IACA,YAAA;EJ8vBD;AACF;AI7vBE;EARD;IASE,sBAAA;IACA,gBAAA;IACA,YAAA;EJgwBD;AACF;AI/vBE;EAbD;IAcE,sBAAA;EJkwBD;AACF;AIjwBE;EAhBD;IAiBE,sBAAA;EJowBD;AACF;AInwBE;EAnBD;IAoBE,sBAAA;EJswBD;AACF;;AInwBA;EACC;IACC,2KAAA;EJswBA;EIpwBD;IACC,6LAAA;EJswBA;AACF;AK/qCC;EACC,gBAAA;EACA,kBAAA;EACA,oBAAA;EACA,eAAA;EACA,kBAAA;EACA,gBAAA;EACA,6IAAA;EACA,qBAAA;EACA,6BAAA;EACA,oCAAA;EACA,mBAAA;ALirCF;AKhrCE;EAZD;IAaE,uDAAA;IACA,yDAAA;ELmrCD;AACF;AKlrCE;EAhBD;IAiBE,eAAA;IACA,gBAAA;ELqrCD;AACF;AKprCE;EApBD;IAqBE,mDAAA;ELurCD;AACF;AKtrCE;EAvBD;IAwBE,gBAAA;ELyrCD;AACF;AKprCC;EACC,kBAAA;EACA,OAAA;EACA,MAAA;EACA,UAAA;EACA,WAAA;EACA,WAAA;EACA,yBAAA;EACA,eAAA;EACA,gBAAA;ALsrCF;AKrrCE;EAVD;IAWE,qDAAA;ELwrCD;AACF;AKvrCE;EAbD;IAcE,gDAAA;EL0rCD;AACF;AKzrCE;EAhBD;IAiBE,UAAA;IACA,yBAAA;EL4rCD;AACF;AK3rCE;EApBD;IAqBE,cAAA;EL8rCD;AACF;AK7rCE;EACC,WAAA;EACA,kBAAA;EACA,OAAA;EACA,MAAA;EACA,WAAA;EACA,YAAA;EACA,oEAAA;AL+rCH;AK9rCG;EARD;IASE,mDAAA;ELisCF;AACF;AK9rCC;EACC,kBAAA;EACA,OAAA;EACA,MAAA;EACA,UAAA;EACA,eAAA;ALgsCF;AK/rCE;EAND;IAOE,iBAAA;ELksCD;AACF;AKjsCE;EATD;IAUE,oBAAA;ELosCD;AACF;;AKhsCC;EACC,aAAA;EACA,eAAA;EACA,uBAAA;EACA,aAAA;ALmsCF;AKlsCE;EALD;IAME,mBAAA;ELqsCD;AACF;AKpsCE;EARD;IASE,kBAAA;ELusCD;AACF;AKtsCE;EACC,wBAAA;EACA,aAAA;EACA,kDAAA;ALwsCH;AKvsCG;EAJD;IAKE,kBAAA;EL0sCF;AACF;AKzsCG;EAPD;IAQE,iBAAA;EL4sCF;AACF;AK3sCG;EAVD;IAWE,aAAA;EL8sCF;AACF;AK7sCG;EAbD;IAcE,cAAA;ELgtCF;AACF;;AK5sCA;EACC,uBAAA;EACA,muDAAA;EACA,4BAAA;EACA,gBAAA;AL+sCD;AK9sCC;EALD;IAME,4BAAA;ELitCA;AACF;AKhtCC;EACC,cAAA;EACA,oBAAA;EACA,eAAA;EACA,kBAAA;EACA,gBAAA;EACA,sBAAA;EACA,mBAAA;ALktCF;AKjtCE;EARD;IASE,eAAA;ELotCD;AACF;AKntCE;EAXD;IAYE,eAAA;ELstCD;AACF;AKptCC;EACC,cAAA;EACA,uBAAA;EACA,eAAA;EACA,iBAAA,EAAA,aAAA;ALstCF;AKrtCE;EALD;IAME,eAAA;ELwtCD;AACF;AKttCC;EACC,gBAAA;EACA,iBAAA;EACA,uBAAA;EACA,iBAAA;EACA,0BAAA;ALwtCF;;AM/2CA;EACC,kBAAA;EACA,oBAAA;ANk3CD;AMj3CC;EAHD;IAIE,iBAAA;IACA,oBAAA;ENo3CA;AACF;AMn3CC;EAPD;IAQE,iBAAA;IACA,oBAAA;ENs3CA;AACF;AMr3CC;EACC,aAAA;EACA,mDAAA;EACA,UAAA;ANu3CF;AMt3CE;EAJD;IAKE,UAAA;ENy3CD;AACF;AMx3CE;EAPD;IAQE,8BAAA;IACA,SAAA;EN23CD;AACF;AM13CE;EAXD;IAYE,0BAAA;IACA,SAAA;IACA,gBAAA;EN63CD;AACF;AM33CC;EACC,oBAAA;EACA,eAAA;EACA,gBAAA;EACA,6IAAA;EACA,qBAAA;EACA,6BAAA;EACA,oCAAA;EACA,iBAAA;AN63CF;AM53CE;EATD;IAUE,mDAAA;EN+3CD;AACF;AM93CE;EAZD;IAaE,eAAA;ENi4CD;AACF;AM13CC;EACC,aAAA;EACA,SAAA;AN43CF;AM13CC;EACC,iBAAA;AN43CF;AM13CC;EACC,aAAA;EACA,mBAAA;EACA,gBAAA;EACA,kBAAA;EACA,uBAAA;EACA,eAAA;EACA,gBAAA;EACA,mBAAA;EACA,kDAAA;EACA,kBAAA;EACA,cAAA;AN43CF;AM33CE;EACC,cAAA;AN63CH;AM33CE;EACC,cAAA;AN63CH;AM13CC;EACC,aAAA;EACA,eAAA;EACA,uBAAA;EACA,kBAAA;EACA,iBAAA;AN43CF;AM33CE;EAND;IAOE,sBAAA;IACA,mBAAA;EN83CD;AACF;AM73CE;EAVD;IAWE,mBAAA;ENg4CD;AACF;AM/3CE;EAbD;IAcE,sBAAA;ENk4CD;AACF;AMj4CE;EACC,iBAAA;EACA,gBAAA;ANm4CH;AMh4CC;EACC,aAAA;EACA,mBAAA;EACA,cAAA;EACA,oBAAA;EACA,eAAA;EACA,gBAAA;EACA,qBAAA;ANk4CF;AMj4CE;EACC,WAAA;EACA,WAAA;EACA,aAAA;EACA,yBAAA;ANm4CH;AMj4CE;EACC,kBAAA;ANm4CH;AMj4CE;EACC,iBAAA;ANm4CH;AMz3CA;EACC,kBAAA;EACA,OAAA;EACA,MAAA;AN23CD;AM13CC;EACC,kBAAA;EACA,UAAA;EACA,wBAAA;EACA,uBAAA;EACA,eAAA;EACA,gBAAA;EACA,+CAAA;AN43CF;AM13CC;EACC,cAAA;AN43CF;AM13CC;EACC,wBAAA;EACA,UAAA;AN43CF;AMz3CE;EACC,WAAA;EACA,yBAAA;EACA,uBAAA;EACA,eAAA;EACA,kBAAA;EACA,2HAAA;EACA,2uDAAA;EACA,sBAAA;AN23CH;AM13CG;EACC,2CAAA;EACA,uBAAA;EACA,eAAA;AN43CJ;AMt3CE;EACC,cAAA;ANw3CH;AMr3CC;EACC,qBAAA;EACA,cAAA;EACA,uBAAA;EACA,eAAA;EACA,eAAA;EACA,iBAAA;ANu3CF","sourcesContent":[".teamate-card {\r\n\tdisplay: grid;\r\n\tgrid-template-columns: 0.74fr 1fr;\r\n\tgrid-template-rows: auto auto 1fr;\r\n\tgap: 0 24px;\r\n\tmax-width: 690px;\r\n\tborder-radius: 30px;\r\n\tpadding: 24px;\r\n\toverflow: hidden;\r\n\tbox-shadow: 0px 4px 66px 0px rgba(32, 6, 70, 0.16);\r\n\tbackground-color: white;\r\n\t@media (max-width: 520px) {\r\n\t\tgrid-template-columns: 0.59fr 1fr;\r\n\t\tgrid-template-rows: auto auto 1fr;\r\n\t\tgap: 0 16px;\r\n\t\tpadding: 16px;\r\n\t}\r\n\t@media (max-width: 1320px) {\r\n\t\tmax-width: 620px;\r\n\t}\r\n\t@media (max-width: $mbpTEnd) {\r\n\t\tmax-width: 540px;\r\n\t}\r\n\t@media (max-width: 620px) {\r\n\t\tmax-width: 480px;\r\n\t}\r\n\t&__img-wrap {\r\n\t\tgrid-row: auto/span 3;\r\n\t\tpadding-top: 144%;\r\n\t\tmargin: -24px 0 -24px -24px;\r\n\t\toverflow: hidden;\r\n\t\t@media (max-width: 520px) {\r\n\t\t\tgrid-row: auto/span 1;\r\n\t\t\tmargin: -16px 0 16px -16px;\r\n\t\t\tborder-radius: 0px 0px 30px 0px;\r\n\t\t}\r\n\t}\r\n\t&__header {\r\n\t\tmargin-bottom: 16px;\r\n\t}\r\n\t&__title {\r\n\t\tcolor: #9935EC;\r\n\t\tfont-family: Montserrat;\r\n\t\tfont-size: 20px;\r\n\t\tfont-weight: 600;\r\n\t\tmargin-bottom: 16px;\r\n\t\t@media (max-width: 1320px) {\r\n\t\t\tfont-size: 18px;\r\n\t\t}\r\n\t\t@media (max-width: 520px) {\r\n\t\t\tmargin-bottom: 20px;\r\n\t\t}\r\n\t}\r\n\t&__name {\r\n\t\tcolor: #161616;\r\n\t\tfont-family: Thunder;\r\n\t\tfont-size: 42px;\r\n\t\tfont-weight: 700;\r\n\t\tletter-spacing: 0.84px;\r\n\t\t@media (max-width: 1320px) {\r\n\t\t\tfont-size: 36px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpTEnd) {\r\n\t\t\tfont-size: 30px;\r\n\t\t}\r\n\t\t@media (max-width: 520px) {\r\n\t\t\tfont-size: 42px;\r\n\t\t}\r\n\t\t@media (max-width: 375px) {\r\n\t\t\tfont-size: 34px;\r\n\t\t}\r\n\t}\r\n\t&__skills {\r\n\t\tdisplay: grid;\r\n\t\tgap: 20px;\r\n\t\tmargin-bottom: 16px;\r\n\t\t@media (max-width: 1320px) {\r\n\t\t\tgap: 16px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpTEnd) {\r\n\t\t\tgap: 12px;\r\n\t\t}\r\n\t\t@media (max-width: 520px) {\r\n\t\t\tgrid-column: auto/span 2;\r\n\t\t\tgrid-template-columns: 1fr 1fr;\r\n\t\t\tgap: 20px;\r\n\t\t\tmargin-bottom: 20px;\r\n\t\t}\r\n\t}\r\n\t&__skill-item {\r\n\t\tdisplay: flex;\r\n\t\talign-items: center;\r\n\t}\r\n\t&__skill-icon {\r\n\t\twidth: 44px;\r\n\t\theight: 44px;\r\n\t\tmargin-right: 16px;\r\n\t\tfilter: drop-shadow(10px 10px 5px rgba(46, 46, 46, 0.20));\r\n\t\t@media (max-width: 1320px) {\r\n\t\t\twidth: 40px;\r\n\t\t\theight: 40px;\r\n\t\t\tfont-size: 30px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpTEnd) {\r\n\t\t\twidth: 36px;\r\n\t\t\theight: 36px;\r\n\t\t}\r\n\t\t@media (max-width: 520px) {\r\n\t\t\twidth: 32px;\r\n\t\t\theight: 32px;\r\n\t\t\tmargin-right: 10px;\r\n\t\t}\r\n\t}\r\n\t&__skill-name {\r\n\t\tcolor: #1F1F1F;\r\n\t\tfont-family: Thunder;\r\n\t\tfont-size: 36px;\r\n\t\tfont-style: italic;\r\n\t\tfont-weight: 600;\r\n\t\tletter-spacing: 0.72px;\r\n\t\t@media (max-width: 1320px) {\r\n\t\t\tfont-size: 30px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpTEnd) {\r\n\t\t\tfont-size: 28px;\r\n\t\t}\r\n\t\t@media (max-width: 375px) {\r\n\t\t\tfont-size: 22px;\r\n\t\t}\r\n\t}\r\n\t&__btn {\r\n\t\talign-self: end;\r\n\t\tjustify-self: end;\r\n\t\t@media (max-width: 520px) {\r\n\t\t\tgrid-column: auto/span 2;\r\n\t\t}\r\n\t}\r\n}\r\n",".teamate-card {\n  display: grid;\n  grid-template-columns: 0.74fr 1fr;\n  grid-template-rows: auto auto 1fr;\n  gap: 0 24px;\n  max-width: 690px;\n  border-radius: 30px;\n  padding: 24px;\n  overflow: hidden;\n  box-shadow: 0px 4px 66px 0px rgba(32, 6, 70, 0.16);\n  background-color: white;\n}\n@media (max-width: 520px) {\n  .teamate-card {\n    grid-template-columns: 0.59fr 1fr;\n    grid-template-rows: auto auto 1fr;\n    gap: 0 16px;\n    padding: 16px;\n  }\n}\n@media (max-width: 1320px) {\n  .teamate-card {\n    max-width: 620px;\n  }\n}\n@media (max-width: 1024px) {\n  .teamate-card {\n    max-width: 540px;\n  }\n}\n@media (max-width: 620px) {\n  .teamate-card {\n    max-width: 480px;\n  }\n}\n.teamate-card__img-wrap {\n  grid-row: auto/span 3;\n  padding-top: 144%;\n  margin: -24px 0 -24px -24px;\n  overflow: hidden;\n}\n@media (max-width: 520px) {\n  .teamate-card__img-wrap {\n    grid-row: auto/span 1;\n    margin: -16px 0 16px -16px;\n    border-radius: 0px 0px 30px 0px;\n  }\n}\n.teamate-card__header {\n  margin-bottom: 16px;\n}\n.teamate-card__title {\n  color: #9935EC;\n  font-family: Montserrat;\n  font-size: 20px;\n  font-weight: 600;\n  margin-bottom: 16px;\n}\n@media (max-width: 1320px) {\n  .teamate-card__title {\n    font-size: 18px;\n  }\n}\n@media (max-width: 520px) {\n  .teamate-card__title {\n    margin-bottom: 20px;\n  }\n}\n.teamate-card__name {\n  color: #161616;\n  font-family: Thunder;\n  font-size: 42px;\n  font-weight: 700;\n  letter-spacing: 0.84px;\n}\n@media (max-width: 1320px) {\n  .teamate-card__name {\n    font-size: 36px;\n  }\n}\n@media (max-width: 1024px) {\n  .teamate-card__name {\n    font-size: 30px;\n  }\n}\n@media (max-width: 520px) {\n  .teamate-card__name {\n    font-size: 42px;\n  }\n}\n@media (max-width: 375px) {\n  .teamate-card__name {\n    font-size: 34px;\n  }\n}\n.teamate-card__skills {\n  display: grid;\n  gap: 20px;\n  margin-bottom: 16px;\n}\n@media (max-width: 1320px) {\n  .teamate-card__skills {\n    gap: 16px;\n  }\n}\n@media (max-width: 1024px) {\n  .teamate-card__skills {\n    gap: 12px;\n  }\n}\n@media (max-width: 520px) {\n  .teamate-card__skills {\n    grid-column: auto/span 2;\n    grid-template-columns: 1fr 1fr;\n    gap: 20px;\n    margin-bottom: 20px;\n  }\n}\n.teamate-card__skill-item {\n  display: flex;\n  align-items: center;\n}\n.teamate-card__skill-icon {\n  width: 44px;\n  height: 44px;\n  margin-right: 16px;\n  filter: drop-shadow(10px 10px 5px rgba(46, 46, 46, 0.2));\n}\n@media (max-width: 1320px) {\n  .teamate-card__skill-icon {\n    width: 40px;\n    height: 40px;\n    font-size: 30px;\n  }\n}\n@media (max-width: 1024px) {\n  .teamate-card__skill-icon {\n    width: 36px;\n    height: 36px;\n  }\n}\n@media (max-width: 520px) {\n  .teamate-card__skill-icon {\n    width: 32px;\n    height: 32px;\n    margin-right: 10px;\n  }\n}\n.teamate-card__skill-name {\n  color: #1F1F1F;\n  font-family: Thunder;\n  font-size: 36px;\n  font-style: italic;\n  font-weight: 600;\n  letter-spacing: 0.72px;\n}\n@media (max-width: 1320px) {\n  .teamate-card__skill-name {\n    font-size: 30px;\n  }\n}\n@media (max-width: 1024px) {\n  .teamate-card__skill-name {\n    font-size: 28px;\n  }\n}\n@media (max-width: 375px) {\n  .teamate-card__skill-name {\n    font-size: 22px;\n  }\n}\n.teamate-card__btn {\n  align-self: end;\n  justify-self: end;\n}\n@media (max-width: 520px) {\n  .teamate-card__btn {\n    grid-column: auto/span 2;\n  }\n}\n\n.teamates-slider {\n  overflow: visible;\n  width: 100%;\n}\n.teamates-slider__wrapper {\n  margin-bottom: 30px;\n}\n.teamates-slider__slide {\n  height: auto;\n  transition-property: transform, opacity;\n}\n.teamates-slider__slide[data-slide-position=\"-1\"] {\n  opacity: 0.9;\n}\n.teamates-slider__slide[data-slide-position=\"1\"] {\n  opacity: 0.9;\n}\n.teamates-slider__slide[data-slide-position=\"-2\"] {\n  opacity: 0.8;\n}\n.teamates-slider__slide[data-slide-position=\"2\"] {\n  opacity: 0.8;\n}\n.teamates-slider__slide[data-slide-position=\"-3\"] {\n  opacity: 0.7;\n}\n.teamates-slider__slide[data-slide-position=\"3\"] {\n  opacity: 0.7;\n}\n.teamates-slider__slide[data-slide-position=\"-4\"] {\n  opacity: 0.6;\n}\n.teamates-slider__slide[data-slide-position=\"4\"] {\n  opacity: 0.6;\n}\n.teamates-slider__bottom {\n  display: flex;\n  justify-content: center;\n  visibility: hidden;\n}\n.teamates-slider__bottom-inner {\n  display: inline-grid;\n  grid-template-columns: repeat(3, auto);\n  gap: 100px;\n  align-items: center;\n}\n@media (max-width: 375px) {\n  .teamates-slider__bottom-inner {\n    grid-template-columns: repeat(2, auto);\n    gap: 9px 60px;\n  }\n}\n.teamates-slider__pagination {\n  flex: 0 1 max-content;\n  display: inline-block;\n  --swiper-pagination-bullet-horizontal-gap: 8px;\n}\n.teamates-slider__pagination .swiper-pagination-bullet {\n  width: 16px;\n  height: 16px;\n  border: 2px solid #67E000;\n  background-color: transparent;\n  transition: background-color 0.4s;\n}\n.teamates-slider__pagination .swiper-pagination-bullet-active {\n  background-color: #67E000;\n}\n.teamates-slider__counter {\n  display: inline-grid;\n  grid-template-columns: repeat(3, auto);\n  gap: 0.3em;\n  color: #C279FF;\n  font-family: Thunder;\n  font-size: 26px;\n  font-style: italic;\n  font-weight: 600;\n  line-height: 24px;\n  letter-spacing: 0.02em;\n}\n@media (max-width: 375px) {\n  .teamates-slider__counter {\n    grid-row: 1/span 1;\n    grid-column: auto/span 2;\n    justify-self: center;\n  }\n}\n.teamates-slider__current {\n  color: #1F1F1F;\n  text-align: right;\n  font-size: 36px;\n  letter-spacing: 0.72px;\n}\n.swiper-btn {\n  flex: 0 0 auto;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  font-size: 0;\n  border: 2px solid #9DF850;\n  border-radius: 50%;\n  background-color: #161616;\n  transition: filter 0.4s;\n}\n.swiper-btn:hover {\n  filter: drop-shadow(0px 0px 30px rgba(117, 255, 0, 0.5));\n}\n.swiper-btn .svg-icon {\n  flex: 0 0 auto;\n  fill: #9DF850;\n  width: 8px;\n  transition: left 0.4s, right 0.4s;\n}\n.swiper-btn_prev .svg-icon, .swiper-btn_next .svg-icon {\n  position: relative;\n  top: 0;\n  z-index: 0;\n}\n.swiper-btn_prev .svg-icon {\n  left: -2%;\n}\n.swiper-btn_next .svg-icon {\n  right: -2%;\n}\n.swiper-btn_prev:hover .svg-icon {\n  left: -8%;\n}\n.swiper-btn_next:hover .svg-icon {\n  right: -8%;\n}\n\n.welcome {\n  position: relative;\n  left: 0;\n  top: 0;\n  z-index: 0;\n}\n.welcome::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: -2;\n  width: 100%;\n  height: 108%;\n  background-color: #C279FF;\n  clip-path: polygon(0% 0%, 100% 0%, 100% 63.427%, 100% 63.427%, 99.958% 64.404%, 99.837% 65.342%, 99.642% 66.232%, 99.377% 67.063%, 99.049% 67.823%, 98.661% 68.504%, 98.22% 69.093%, 97.731% 69.581%, 97.199% 69.958%, 96.628% 70.212%, 4.962% 99.782%, 4.962% 99.782%, 4.198% 99.911%, 3.458% 99.812%, 2.756% 99.504%, 2.104% 99.004%, 1.516% 98.33%, 1.006% 97.502%, 0.586% 96.536%, 0.269% 95.451%, 0.069% 94.265%, 0% 92.997%, 0% 0%);\n}\n@media (max-width: 768px) {\n  .welcome::before {\n    clip-path: polygon(0% 0%, 100% 0%, 100% 69.403%, 100% 69.403%, 99.873% 70.961%, 99.499% 72.47%, 98.893% 73.916%, 98.068% 75.285%, 97.036% 76.561%, 95.81% 77.732%, 94.405% 78.782%, 92.833% 79.698%, 91.107% 80.464%, 89.241% 81.067%, 21.241% 99.257%, 21.241% 99.257%, 18.12% 99.835%, 15.04% 99.926%, 12.069% 99.568%, 9.273% 98.797%, 6.722% 97.65%, 4.483% 96.166%, 2.623% 94.381%, 1.211% 92.332%, 0.314% 90.056%, 0% 87.592%, 0% 0%);\n  }\n}\n.welcome::after {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: -1;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(170deg, #161616 0%, #260046 32.29%, #2A004E 57.29%, #500092 78.65%, #3A006A 100%, #2A004E 100%);\n  clip-path: polygon(0% 0%, 100% 0%, 100% 66.103%, 100% 66.103%, 99.956% 67.19%, 99.829% 68.233%, 99.624% 69.218%, 99.347% 70.135%, 99.003% 70.97%, 98.599% 71.712%, 98.14% 72.35%, 97.632% 72.869%, 97.08% 73.26%, 96.49% 73.509%, 4.824% 99.863%, 4.824% 99.863%, 4.074% 99.957%, 3.35% 99.815%, 2.666% 99.456%, 2.032% 98.899%, 1.463% 98.163%, 0.969% 97.267%, 0.564% 96.229%, 0.259% 95.069%, 0.067% 93.805%, 0% 92.457%, 0% 0%);\n}\n@media (max-width: 768px) {\n  .welcome::after {\n    clip-path: polygon(0% 0%, 100% 0%, 100% 71.66%, 100% 71.66%, 99.857% 73.439%, 99.437% 75.154%, 98.758% 76.79%, 97.836% 78.326%, 96.688% 79.747%, 95.329% 81.034%, 93.777% 82.169%, 92.047% 83.134%, 90.157% 83.913%, 88.123% 84.486%, 20.123% 99.53%, 20.123% 99.53%, 17.091% 99.953%, 14.129% 99.897%, 11.297% 99.399%, 8.651% 98.498%, 6.252% 97.231%, 4.158% 95.634%, 2.427% 93.746%, 1.118% 91.603%, 0.289% 89.243%, 0% 86.704%, 0% 0%);\n  }\n}\n.welcome__underlay {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 0;\n}\n.welcome__container {\n  padding-top: 160px;\n  padding-bottom: 145px;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .welcome__container {\n    padding-top: calc(100px + 60 * (100vw - 375.1px) / 1544.9);\n    padding-bottom: calc(75px + 70 * (100vw - 375.1px) / 1544.9);\n  }\n}\n@media screen and (max-width: 375px) {\n  .welcome__container {\n    padding-top: 100px;\n    padding-bottom: 75px;\n  }\n}\n@media (max-width: 520px) {\n  .welcome__container {\n    display: flex;\n    justify-content: center;\n  }\n}\n.welcome__title {\n  position: sticky;\n  left: 40px;\n  z-index: 1;\n}\n@media (max-width: 520px) {\n  .welcome__title {\n    position: static;\n    left: unset;\n  }\n}\n\n.page-title {\n  display: inline-flex;\n  flex-direction: column;\n  align-items: flex-start;\n  color: #FFF;\n  font-family: Thunder;\n  font-size: 160px;\n  font-weight: 800;\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .page-title {\n    font-size: calc(70px + 90 * (100vw - 375.1px) / 1544.9);\n  }\n}\n@media screen and (max-width: 375px) {\n  .page-title {\n    font-size: 70px;\n  }\n}\n@media screen and (max-width: 360px) {\n  .page-title {\n    font-size: 55px;\n  }\n}\n@media (max-width: 520px) {\n  .page-title {\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n}\n.page-title > strong {\n  display: inline-block;\n  position: relative;\n  left: 0;\n  top: 0;\n  color: #161616;\n  margin-top: 19px;\n  margin-bottom: 19px;\n  z-index: 1;\n}\n@media (max-width: 1440px) {\n  .page-title > strong {\n    margin-top: 21px;\n    margin-bottom: 21px;\n  }\n}\n@media (max-width: 520px) {\n  .page-title > strong {\n    margin-top: 10px;\n    margin-bottom: 10px;\n  }\n}\n.page-title > strong::before {\n  content: \"\";\n  display: inline-block;\n  position: absolute;\n  top: -8.75%;\n  left: -9%;\n  z-index: -1;\n  height: 112%;\n  width: 118%;\n  background-color: #9DF850;\n  clip-path: polygon(4.182% 8.641%, 4.182% 8.641%, 4.285% 7.171%, 4.431% 5.801%, 4.615% 4.545%, 4.835% 3.416%, 5.087% 2.425%, 5.367% 1.586%, 5.671% 0.911%, 5.995% 0.413%, 6.337% 0.105%, 6.692% 0%, 97.416% 0%, 97.416% 0%, 97.898% 0.192%, 98.347% 0.745%, 98.757% 1.619%, 99.12% 2.778%, 99.429% 4.183%, 99.677% 5.796%, 99.858% 7.581%, 99.965% 9.498%, 99.99% 11.511%, 99.926% 13.581%, 95.818% 91.359%, 95.818% 91.359%, 95.715% 92.829%, 95.569% 94.199%, 95.385% 95.455%, 95.165% 96.584%, 94.913% 97.575%, 94.633% 98.414%, 94.329% 99.089%, 94.005% 99.587%, 93.663% 99.895%, 93.308% 100%, 2.583% 100%, 2.583% 100%, 2.102% 99.808%, 1.653% 99.255%, 1.243% 98.381%, 0.88% 97.222%, 0.571% 95.818%, 0.323% 94.204%, 0.142% 92.42%, 0.035% 90.502%, 0.01% 88.489%, 0.074% 86.419%, 4.182% 8.641%);\n}\n.page-title:first-child {\n  margin-top: 0;\n}\n.page-title:last-child {\n  margin-bottom: 0;\n}\n\n.teams-review {\n  position: relative;\n  left: 0;\n  top: 0;\n  z-index: 1;\n  margin-top: -5%;\n  margin-bottom: 0;\n  overflow: hidden;\n}\n@media (max-width: 768px) {\n  .teams-review {\n    margin-top: -3%;\n  }\n}\n@media (max-width: 520px) {\n  .teams-review {\n    margin-top: 3%;\n  }\n}\n.teams-review__container {\n  display: flex;\n  flex-direction: column;\n}\n.teams-review__container:first-child {\n  margin-bottom: 45px;\n}\n@media (max-width: 768px) {\n  .teams-review__container:first-child {\n    margin-bottom: 35px;\n  }\n}\n.teams-review__container:nth-child(2) {\n  max-width: 1543px;\n  --container-save-space: 5px;\n  margin-bottom: 30px;\n}\n.teams-review__container:nth-child(3) {\n  --container-save-space: 25px;\n}\n.teams-review__call {\n  align-self: flex-end;\n  display: inline-block;\n  max-width: 870px;\n  color: transparent;\n  font-family: Thunder;\n  font-size: 130px;\n  font-weight: 800;\n  background: linear-gradient(127deg, #161616 0%, #260046 10.86%, #2A004E 24.1%, #500092 41.91%, #3A006A 70.64%, #2A004E 88.57%);\n  background-clip: text;\n  -webkit-background-clip: text;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .teams-review__call {\n    font-size: calc(60px + 70 * (100vw - 375.1px) / 1544.9);\n  }\n}\n@media screen and (max-width: 375px) {\n  .teams-review__call {\n    font-size: 60px;\n  }\n}\n@media (min-width: 520.1px) and (max-width: 1920px) {\n  .teams-review__call {\n    max-width: calc(510px + 360 * (100vw - 520.1px) / 1399.9);\n  }\n}\n@media (min-width: 375.1px) and (max-width: 768px) {\n  .teams-review__call {\n    max-width: calc(300px + 130 * (100vw - 375.1px) / 392.9);\n  }\n}\n@media screen and (max-width: 375px) {\n  .teams-review__call {\n    max-width: 270px;\n    font-size: 50px;\n  }\n}\n@media screen and (max-width: 320px) {\n  .teams-review__call {\n    max-width: 250px;\n    font-size: 40px;\n  }\n}\n.teams-review__team-filter {\n  margin-bottom: 60px;\n}\n.teams-review__swipe-area-pointer {\n  position: absolute;\n  right: 30px;\n  bottom: -60px;\n  z-index: 10;\n}\n@media (max-width: 520px) {\n  .teams-review__swipe-area-pointer {\n    bottom: -55px;\n  }\n}\n\n.section-nav {\n  position: relative;\n  left: 0;\n  top: 0;\n}\n.section-nav::before {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: -2;\n  width: 100.5%;\n  height: 235%;\n  background-color: #C279FF;\n  clip-path: polygon(22.3315px 42.9384px, 22.3315px 42.9384px, 23.3069249px 40.6792617px, 24.5318352px 38.5878456px, 25.9848943px 36.6794499px, 27.6447656px 34.9693728px, 29.4901125px 33.4729125px, 31.4995984px 32.2053672px, 33.6518867px 31.1820351px, 35.9256408px 30.4182144px, 38.2995241px 29.9292033px, 40.7522px 29.7303px, calc(100% - 21.21px) 0.57282px, calc(100% - 21.21px) 0.57282px, calc(100% - 17.12625px) 0.901554314px, calc(100% - 13.3536px) 1.993392832px, calc(100% - 9.95595px) 3.758675118px, calc(100% - 6.9972px) 6.107740736px, calc(100% - 4.54125px) 8.95092925px, calc(100% - 2.652px) 12.198580224px, calc(100% - 1.39335px) 15.761033222px, calc(100% - 0.8292px) 19.548627808px, calc(100% - 1.02345px) 23.471703546px, calc(100% - 2.04px) 27.4406px, calc(100% - 17.35px) calc(100% - 57.7228px), calc(100% - 17.35px) calc(100% - 57.7228px), calc(100% - 18.32129px) calc(100% - 55.494854px), calc(100% - 19.53552px) calc(100% - 53.430936px), calc(100% - 20.97223px) calc(100% - 51.545866px), calc(100% - 22.61096px) calc(100% - 49.854464px), calc(100% - 24.43125px) calc(100% - 48.37155px), calc(100% - 26.41264px) calc(100% - 47.111944px), calc(100% - 28.53467px) calc(100% - 46.090466px), calc(100% - 30.77688px) calc(100% - 45.321936px), calc(100% - 33.11881px) calc(100% - 44.821174px), calc(100% - 35.54px) calc(100% - 44.603px), 21.3722px calc(100% - 0.861px), 21.3722px calc(100% - 0.861px), 17.27314874px calc(100% - 1.1521906px), 13.48018352px calc(100% - 2.2136048px), 10.05845318px calc(100% - 3.9553062px), 7.07310656px calc(100% - 6.2873584px), 4.5892925px calc(100% - 9.119825px), 2.67215984px calc(100% - 12.3627696px), 1.38685742px calc(100% - 15.9262558px), 0.79853408px calc(100% - 19.7203472px), 0.97233866px calc(100% - 23.6551074px), 1.97342px calc(100% - 27.6406px), 22.3315px 42.9384px);\n  transform: translate(-50.25%, -42%);\n}\n@media (max-width: 768px) {\n  .section-nav::before {\n    clip-path: polygon(19.0118px 22.8292px, 19.0118px 22.8292px, 20.0382133px 20.7420249px, 21.2816064px 18.8134712px, 22.7235791px 17.0561563px, 24.3457312px 15.4826976px, 26.1296625px 14.1057125px, 28.0569728px 12.9378184px, 30.1092619px 11.9916327px, 32.2681296px 11.2797728px, 34.5151757px 10.8148561px, 36.832px 10.6095px, calc(100% - 20.213px) 0.964999px, calc(100% - 20.213px) 0.964999px, calc(100% - 15.949721px) 1.278584072px, calc(100% - 12.029528px) 2.419490976px, calc(100% - 8.521487px) 4.285204444px, calc(100% - 5.494664px) 6.773209208px, calc(100% - 3.018125px) 9.78099px, calc(100% - 1.160936px) 13.206031552px, calc(100% + 0.007837px) 16.945818596px, calc(100% + 0.419128px) 20.897835864px, calc(100% + 0.003871px) 24.959568088px, calc(100% - 1.307px) 29.0285px, calc(100% - 13.636px) calc(100% - 35.0244px), calc(100% - 13.636px) calc(100% - 35.0244px), calc(100% - 14.636169px) calc(100% - 33.058028px), calc(100% - 15.831032px) calc(100% - 31.235332px), calc(100% - 17.204923px) calc(100% - 29.567322px), calc(100% - 18.742176px) calc(100% - 28.065008px), calc(100% - 20.427125px) calc(100% - 26.7394px), calc(100% - 22.244104px) calc(100% - 25.601508px), calc(100% - 24.177447px) calc(100% - 24.662342px), calc(100% - 26.211488px) calc(100% - 23.932912px), calc(100% - 28.330561px) calc(100% - 23.424228px), calc(100% - 30.519px) calc(100% - 23.1473px), 21.5058px calc(100% - 0.306px), 21.5058px calc(100% - 0.306px), 17.17661333px calc(100% - 0.4543596px), 13.16965504px calc(100% - 1.4635368px), 9.55948971px calc(100% - 3.2293692px), 6.42068192px calc(100% - 5.6476944px), 3.82779625px calc(100% - 8.61435px), 1.85539728px calc(100% - 12.0251736px), 0.57804959px calc(100% - 15.7760028px), 0.07031776px calc(100% - 19.7626752px), 0.40676637px calc(100% - 23.8810284px), 1.66196px calc(100% - 28.0269px), 19.0118px 22.8292px);\n  }\n}\n.section-nav::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: -1;\n  width: 100%;\n  height: 200%;\n  background: linear-gradient(139deg, #161616 0%, #260046 24.18%, #2A004E 39.24%, #45017D 52.24%, #500092 61.79%, #45017D 70.34%, #3A006A 80%, #2A004E 100%);\n  clip-path: polygon(16.172px 42.5529px, 16.172px 42.5529px, 17.1735527px 40.3538988px, 18.4130336px 38.3206104px, 19.8700469px 36.4673376px, 21.5241968px 34.8083832px, 23.3550875px 33.35805px, 25.3423232px 32.1306408px, 27.4655081px 31.1404584px, 29.7042464px 30.4018056px, 32.0381423px 29.9289852px, 34.4468px 29.7363px, calc(100% - 20.74px) 0.58305px, calc(100% - 20.74px) 0.58305px, calc(100% - 16.61802px) 0.918390952px, calc(100% - 12.81536px) 2.029803776px, calc(100% - 9.39694px) 3.824781024px, calc(100% - 6.42768px) 6.210815248px, calc(100% - 3.9725px) 9.095399px, calc(100% - 2.09632px) 12.386024832px, calc(100% - 0.86406px) 15.990185296px, calc(100% - 0.34064px) 19.815372944px, calc(100% - 0.59098px) 23.769080328px, calc(100% - 1.68px) 27.7588px, calc(100% - 16.17px) calc(100% - 42.5529px), calc(100% - 16.17px) calc(100% - 42.5529px), calc(100% - 17.17189px) calc(100% - 40.3538988px), calc(100% - 18.41192px) calc(100% - 38.3206104px), calc(100% - 19.86963px) calc(100% - 36.4673376px), calc(100% - 21.52456px) calc(100% - 34.8083832px), calc(100% - 23.35625px) calc(100% - 33.35805px), calc(100% - 25.34424px) calc(100% - 32.1306408px), calc(100% - 27.46807px) calc(100% - 31.1404584px), calc(100% - 29.70728px) calc(100% - 30.4018056px), calc(100% - 32.04141px) calc(100% - 29.9289852px), calc(100% - 34.45px) calc(100% - 29.7363px), 20.7355px calc(100% - 0.583px), 20.7355px calc(100% - 0.583px), 16.61354445px calc(100% - 0.9184483px), 12.8110328px calc(100% - 2.0299264px), 9.39284455px calc(100% - 3.8249341px), 6.4238592px calc(100% - 6.2109712px), 3.96895625px calc(100% - 9.0955375px), 2.0930152px calc(100% - 12.3861328px), 0.86091555px calc(100% - 15.9902569px), 0.3375368px calc(100% - 19.8154096px), 0.58775845px calc(100% - 23.7690907px), 1.67646px calc(100% - 27.7588px), 16.172px 42.5529px);\n  transform: translate(-50%, -50%);\n}\n@media (max-width: 768px) {\n  .section-nav::after {\n    clip-path: polygon(13.8477px 23.1634px, 13.8477px 23.1634px, 14.9004517px 21.1819173px, 16.1514296px 19.3531544px, 17.5838979px 17.6882491px, 19.1811208px 16.1983392px, 20.9263625px 14.8945625px, 22.8028872px 13.7880568px, 24.7939591px 12.8899599px, 26.8828424px 12.2114096px, 29.0528013px 11.7635437px, 31.2871px 11.5575px, calc(100% - 21.512px) 0.170803px, calc(100% - 21.512px) 0.170803px, calc(100% - 17.194262px) 0.469232109px, calc(100% - 13.227656px) 1.615508672px, calc(100% - 9.682994px) 3.503222443px, calc(100% - 6.631088px) 6.025963176px, calc(100% - 4.14275px) 9.077320625px, calc(100% - 2.288792px) 12.550884544px, calc(100% - 1.140026px) 16.340244687px, calc(100% - 0.767264px) 20.338990808px, calc(100% - 1.241318px) 24.440712661px, calc(100% - 2.633px) 28.539px, calc(100% - 13.848px) calc(100% - 23.1634px), calc(100% - 13.848px) calc(100% - 23.1634px), calc(100% - 14.9007px) calc(100% - 21.1819173px), calc(100% - 16.15164px) calc(100% - 19.3531544px), calc(100% - 17.58408px) calc(100% - 17.6882491px), calc(100% - 19.18128px) calc(100% - 16.1983392px), calc(100% - 20.9265px) calc(100% - 14.8945625px), calc(100% - 22.803px) calc(100% - 13.7880568px), calc(100% - 24.79404px) calc(100% - 12.8899599px), calc(100% - 26.88288px) calc(100% - 12.2114096px), calc(100% - 29.05278px) calc(100% - 11.7635437px), calc(100% - 31.287px) calc(100% - 11.5575px), 21.5123px calc(100% - 0.1708px), 21.5123px calc(100% - 0.1708px), 17.1944036px calc(100% - 0.4692411px), 13.2276668px calc(100% - 1.6155248px), 9.6829052px calc(100% - 3.5032417px), 6.6309344px calc(100% - 6.0259824px), 4.14257px calc(100% - 9.0773375px), 2.2886276px calc(100% - 12.5508976px), 1.1399228px calc(100% - 16.3402533px), 0.7672712px calc(100% - 20.3389952px), 1.2414884px calc(100% - 24.4407139px), 2.63339px calc(100% - 28.539px), 13.8477px 23.1634px);\n  }\n}\n.section-nav__container {\n  max-width: 1340px;\n  padding: 0 35px;\n  margin: auto;\n}\n.section-nav__slider {\n  transform: rotate(-1.3deg);\n}\n@media (max-width: 1024px) {\n  .section-nav__slider {\n    transform: rotate(-1.9deg);\n  }\n}\n@media (max-width: 768px) {\n  .section-nav__slider {\n    transform: rotate(-1.5deg);\n  }\n}\n.section-nav__wrapper {\n  justify-content: space-between;\n}\n.section-nav__wrapper > * {\n  width: auto;\n  margin: 0 32px;\n}\n@media (max-width: 768px) {\n  .section-nav__wrapper > * {\n    margin: 0 16px;\n  }\n}\n.section-nav__wrapper > *:first-child {\n  margin-left: 0;\n}\n.section-nav__wrapper > *:last-child {\n  margin-right: 0;\n}\n.section-nav__btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 50px;\n  font-size: 22px;\n  font-weight: 500;\n  text-align: center;\n  cursor: pointer;\n}\n@media (max-width: 768px) {\n  .section-nav__btn {\n    min-height: 40px;\n    font-size: 18px;\n  }\n}\n@media (max-width: 520px) {\n  .section-nav__btn {\n    font-size: 16px;\n  }\n}\n\n.skill-rate {\n  display: grid;\n  grid-template-columns: 40% minmax(100px, 384px);\n  gap: 8px;\n  justify-content: end;\n}\n.skill-rate__name {\n  position: relative;\n  left: 0;\n  top: 0.1em;\n  color: #1F1F1F;\n  text-align: right;\n  font-family: Thunder;\n  font-size: 38px;\n  font-style: italic;\n  font-weight: 700;\n  letter-spacing: 0.76px;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .skill-rate__name {\n    font-size: calc(24px + 14 * (100vw - 375.1px) / 1544.9);\n  }\n}\n@media (max-width: 520px) {\n  .skill-rate__name {\n    font-size: 24px;\n  }\n}\n@media (max-width: 375px) {\n  .skill-rate__name {\n    font-size: 22px;\n  }\n}\n.skill-rate__rate {\n  display: grid;\n  grid-template-columns: 11.5% auto;\n  gap: 4px;\n  align-self: start;\n}\n@media (max-width: 720px) {\n  .skill-rate__rate {\n    align-self: center;\n  }\n}\n.skill-rate__separator {\n  display: flex;\n  align-items: center;\n  width: 40px;\n}\n.skill-rate__separator::before {\n  content: \"\";\n  flex: 0 0 auto;\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  background: #35CC00;\n  border-radius: 50%;\n}\n.skill-rate__separator::after {\n  content: \"\";\n  flex: 0 0 auto;\n  display: inline-block;\n  width: 30px;\n  height: 2px;\n  background: #35CC00;\n}\n.skill-rate__stars {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  border-radius: 40px;\n  background: linear-gradient(90deg, #F6FF92 0%, #C5FF94 100%);\n  box-shadow: 0px 0px 26px 0px rgba(0, 144, 55, 0.14);\n  padding: 3px 10px;\n}\n.skill-rate__stars > .svg-icon {\n  width: 32px;\n  height: 32px;\n  fill: #35CC00;\n  margin-right: -32px;\n  stroke: #F6FF92;\n  stroke-width: 1.5px;\n  stroke-linejoin: round;\n}\n.skill-rate__stars > .svg-icon:last-child {\n  margin-right: 0;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .skill-rate__stars > .svg-icon {\n    width: calc(20px + 12 * (100vw - 375.1px) / 1544.9);\n    height: calc(20px + 12 * (100vw - 375.1px) / 1544.9);\n  }\n}\n@media (max-width: 520px) {\n  .skill-rate__stars > .svg-icon {\n    width: 20px;\n    height: 20px;\n  }\n}\n\n.skills-rates__title {\n  display: inline-block;\n  color: transparent;\n  -webkit-text-fill-color: transparent;\n  font-family: Thunder;\n  font-size: 70px;\n  font-weight: 700;\n  line-height: 128.571%;\n  letter-spacing: 1.4px;\n  background: var(--purple-grad, linear-gradient(170deg, #161616 0%, #260046 32.29%, #2A004E 57.29%, #500092 78.65%, #3A006A 100%, #2A004E 100%));\n  background-clip: text;\n  -webkit-background-clip: text;\n  margin-bottom: 20px;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .skills-rates__title {\n    font-size: calc(42px + 28 * (100vw - 520px) / 1400);\n  }\n}\n@media (max-width: 520px) {\n  .skills-rates__title {\n    font-size: 42px;\n  }\n}\n.skills-rates__body {\n  display: flex;\n  justify-content: start;\n}\n.skills-rates__body-inner {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 30px 40px;\n}\n@media (max-width: 1024px) {\n  .skills-rates__body-inner {\n    gap: 20px 30px;\n  }\n}\n@media (max-width: 375px) {\n  .skills-rates__body-inner {\n    gap: 15px;\n  }\n}\n@media (max-width: 720px) {\n  .skills-rates__body-inner {\n    grid-template-columns: 1fr;\n    justify-content: center;\n  }\n}\n\n.skills-cloud {\n  --base-distance: 280px;\n  position: relative;\n  left: 0;\n  top: 0;\n}\n.skills-cloud__bg {\n  padding-top: 84%;\n}\n.skills-cloud__body {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n}\n.skills-cloud__msg {\n  color: #FFF;\n  text-align: center;\n  font-family: Thunder;\n  font-size: 60px;\n  font-style: italic;\n  font-weight: 700;\n}\n@media (max-width: 768px) {\n  .skills-cloud__msg {\n    font-size: 50px;\n  }\n}\n@media (max-width: 520px) {\n  .skills-cloud__msg {\n    font-size: 40px;\n  }\n}\n@media (max-width: 375px) {\n  .skills-cloud__msg {\n    font-size: 35px;\n  }\n}\n.skills-cloud__items {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n.skills-cloud__item {\n  position: absolute;\n  left: 0;\n  top: 0;\n  flex: 0 0 auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 136px;\n  height: 136px;\n  background-color: white;\n  clip-path: polygon(4.722% 13.789%, 4.722% 13.789%, 5.046% 11.519%, 5.704% 9.378%, 6.667% 7.392%, 7.908% 5.587%, 9.399% 3.988%, 11.112% 2.621%, 13.018% 1.513%, 15.09% 0.69%, 17.3% 0.177%, 19.619% 0%, 84.859% 0%, 84.859% 0%, 87.383% 0.209%, 89.766% 0.812%, 91.975% 1.775%, 93.976% 3.061%, 95.737% 4.637%, 97.223% 6.466%, 98.402% 8.515%, 99.239% 10.747%, 99.701% 13.129%, 99.755% 15.623%, 95.278% 86.212%, 95.278% 86.212%, 94.954% 88.481%, 94.296% 90.622%, 93.333% 92.608%, 92.091% 94.413%, 90.601% 96.012%, 88.888% 97.379%, 86.982% 98.486%, 84.91% 99.31%, 82.7% 99.823%, 80.381% 100%, 15.141% 100%, 15.141% 100%, 12.617% 99.791%, 10.234% 99.188%, 8.025% 98.225%, 6.024% 96.939%, 4.263% 95.363%, 2.777% 93.533%, 1.598% 91.485%, 0.761% 89.252%, 0.299% 86.871%, 0.245% 84.376%, 4.722% 13.789%);\n  animation: orbite 60s linear infinite;\n}\n@media (max-width: 1440px) {\n  .skills-cloud__item {\n    width: 110px;\n    height: 110px;\n  }\n}\n@media (max-width: 768px) {\n  .skills-cloud__item {\n    width: 90px;\n    height: 90px;\n  }\n}\n@media (max-width: 520px) {\n  .skills-cloud__item {\n    width: 80px;\n    height: 80px;\n  }\n}\n@media (max-width: 420px) {\n  .skills-cloud__item {\n    width: 65px;\n    height: 65px;\n  }\n}\n@media (max-width: 375px) {\n  .skills-cloud__item {\n    width: 55px;\n    height: 55px;\n  }\n}\n.skills-cloud__item:first-child {\n  position: static;\n}\n.skills-cloud__item > img {\n  width: 59%;\n  height: 59%;\n}\n\n.profile {\n  margin-bottom: 120px;\n}\n@media (max-width: 1024px) {\n  .profile {\n    margin-bottom: 80px;\n  }\n}\n@media (max-width: 768px) {\n  .profile {\n    margin-bottom: 60px;\n  }\n}\n.profile__main {\n  position: relative;\n  left: 0;\n  top: 0;\n  z-index: 0;\n  padding: 40px 0;\n  font-size: 10px;\n  margin-bottom: 35px;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .profile__main {\n    font-size: calc(6px + 4 * (100vw - 520px) / 1400);\n  }\n}\n@media (max-width: 520px) {\n  .profile__main {\n    font-size: 6px;\n    padding: 20px 0 40px;\n  }\n}\n.profile__main::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 108%;\n  z-index: -2;\n  background-color: #C279FF;\n  clip-path: polygon(calc(100% - 0px) 0px, 0px 0px, 0px calc(100% - 170.208px), 0px calc(100% - 170.208px), 0.7008518px calc(100% - 161.020965px), 2.7364384px calc(100% - 152.25564px), 6.0063066px calc(100% - 144.021195px), 10.4100032px calc(100% - 136.4268px), 15.847075px calc(100% - 129.581625px), 22.2170688px calc(100% - 123.59484px), 29.4195314px calc(100% - 118.575615px), 37.3540096px calc(100% - 114.63312px), 45.9200502px calc(100% - 111.876525px), 55.0172px calc(100% - 110.415px), calc(100% - 64.98px) calc(100% - 0.415px), calc(100% - 64.98px) calc(100% - 0.415px), calc(100% - 54.66042px) calc(100% - 0.433105px), calc(100% - 44.78976px) calc(100% - 2.14432px), calc(100% - 35.51814px) calc(100% - 5.410495px), calc(100% - 26.99568px) calc(100% - 10.09348px), calc(100% - 19.3725px) calc(100% - 16.055125px), calc(100% - 12.79872px) calc(100% - 23.15728px), calc(100% - 7.42446px) calc(100% - 31.261795px), calc(100% - 3.39984px) calc(100% - 40.23052px), calc(100% - 0.87498px) calc(100% - 49.925305px), calc(100% - 0px) calc(100% - 60.208px), calc(100% - 0px) 0px);\n}\n@media (max-width: 768px) {\n  .profile__main::before {\n    clip-path: polygon(calc(100% - 0px) 0px, 0px 0px, 0px calc(100% - 107.836px), 0px calc(100% - 107.836px), 0.6049094px calc(100% - 99.307173px), 2.3685232px calc(100% - 91.116824px), 5.2141698px calc(100% - 83.357251px), 9.0651776px calc(100% - 76.120752px), 13.844875px calc(100% - 69.499625px), 19.4765904px calc(100% - 63.586168px), 25.8836522px calc(100% - 58.472679px), 32.9893888px calc(100% - 54.251456px), 40.7171286px calc(100% - 51.014797px), 48.9902px calc(100% - 48.855px), calc(100% - 71.01px) calc(100% - 1.255px), calc(100% - 71.01px) calc(100% - 1.255px), calc(100% - 60.052347px) calc(100% - 0.218402px), calc(100% - 49.451136px) calc(100% - 1.138656px), calc(100% - 39.394089px) calc(100% - 3.859834px), calc(100% - 30.068928px) calc(100% - 8.226008px), calc(100% - 21.663375px) calc(100% - 14.08125px), calc(100% - 14.365152px) calc(100% - 21.269632px), calc(100% - 8.361981px) calc(100% - 29.635226px), calc(100% - 3.841584px) calc(100% - 39.022104px), calc(100% - 0.991683px) calc(100% - 49.274338px), calc(100% - 0px) calc(100% - 60.236px), calc(100% - 0px) 0px);\n  }\n}\n.profile__main::after {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: -1;\n  background: linear-gradient(103deg, #161616 0%, #260046 22.26%, #280048 43.04%, #370065 56.08%, #2A004D 71.88%, #21003C 100%);\n  clip-path: polygon(calc(100% - 0px) 0px, 0px 0px, 0px calc(100% - 143.367px), 0px calc(100% - 143.367px), 0.7214104px calc(100% - 134.044416px), 2.8150472px calc(100% - 125.162208px), 6.1750188px calc(100% - 116.833092px), 10.6954336px calc(100% - 109.169784px), 16.2704px calc(100% - 102.285px), 22.7940264px calc(100% - 96.291456px), 30.1604212px calc(100% - 91.301868px), 38.2636928px calc(100% - 87.428952px), 46.9979496px calc(100% - 84.785424px), 56.2573px calc(100% - 83.484px), calc(100% - 63.74px) calc(100% - 0.984px), calc(100% - 63.74px) calc(100% - 0.984px), calc(100% - 53.56206px) calc(100% - 1.201644px), calc(100% - 43.84768px) calc(100% - 3.060312px), calc(100% - 34.74002px) calc(100% - 6.425508px), calc(100% - 26.38224px) calc(100% - 11.162736px), calc(100% - 18.9175px) calc(100% - 17.1375px), calc(100% - 12.48896px) calc(100% - 24.215304px), calc(100% - 7.23978px) calc(100% - 32.261652px), calc(100% - 3.31312px) calc(100% - 41.142048px), calc(100% - 0.85214px) calc(100% - 50.721996px), calc(100% - 0px) calc(100% - 60.867px), calc(100% - 0px) 0px);\n}\n@media (max-width: 768px) {\n  .profile__main::after {\n    clip-path: polygon(calc(100% - 0px) 0px, 0px 0px, 0px calc(100% - 94.531px), 0px calc(100% - 94.531px), 0.6531388px calc(100% - 85.665557px), 2.5536944px calc(100% - 77.179656px), 5.6133756px calc(100% - 69.174139px), 9.7438912px calc(100% - 61.749848px), 14.85695px calc(100% - 55.007625px), 20.8642608px calc(100% - 49.048312px), 27.6775324px calc(100% - 43.972751px), 35.2084736px calc(100% - 39.881784px), 43.3687932px calc(100% - 36.876253px), 52.0702px calc(100% - 35.057px), calc(100% - 67.93px) calc(100% - 1.057px), calc(100% - 67.93px) calc(100% - 1.057px), calc(100% - 57.287493px) calc(100% - 0.577095px), calc(100% - 47.053184px) calc(100% - 1.91708px), calc(100% - 37.394791px) calc(100% - 4.930105px), calc(100% - 28.480032px) calc(100% - 9.46932px), calc(100% - 20.476625px) calc(100% - 15.387875px), calc(100% - 13.552288px) calc(100% - 22.53892px), calc(100% - 7.874739px) calc(100% - 30.775605px), calc(100% - 3.611696px) calc(100% - 39.95108px), calc(100% - 0.930877px) calc(100% - 49.918495px), calc(100% - 0px) calc(100% - 60.531px), calc(100% - 0px) 0px);\n  }\n}\n.profile__container {\n  display: grid;\n  grid-template-columns: 0.55fr 1fr;\n  grid-template-rows: repeat(4, auto) 1fr;\n  gap: 0 25px;\n  justify-content: space-between;\n  justify-items: start;\n  align-items: start;\n}\n@media (max-width: 1024px) {\n  .profile__container {\n    grid-template-columns: 0.7fr 1fr;\n  }\n}\n@media (max-width: 768px) {\n  .profile__container {\n    grid-template-columns: 0.8fr 1fr;\n  }\n}\n@media (max-width: 710px) {\n  .profile__container {\n    grid-template-rows: auto auto auto minmax(min-content, 100%) 1fr;\n    gap: 0 15px;\n  }\n}\n@media (max-width: 580px) {\n  .profile__container {\n    grid-template-rows: auto auto minmax(min-content, 100%) auto 1fr;\n  }\n}\n@media (max-width: 500px) {\n  .profile__container {\n    grid-template-rows: auto minmax(min-content, 100%) auto auto 1fr;\n  }\n}\n.profile__photo {\n  justify-self: stretch;\n  align-self: start;\n  grid-row: auto/span 5;\n  padding-top: 107%;\n  clip-path: polygon(77.8053px 0.5px, calc(100% - 44.472px) 0.5px, calc(100% - 44.472px) 0.5px, calc(100% - 37.702508px) 1.0760573px, calc(100% - 31.320064px) 2.7383384px, calc(100% - 25.415616px) 5.3880071px, calc(100% - 20.080112px) 8.9262272px, calc(100% - 15.4045px) 13.2541625px, calc(100% - 11.479728px) 18.2729768px, calc(100% - 8.396744px) 23.8838339px, calc(100% - 6.246496px) 29.9878976px, calc(100% - 5.119932px) 36.4863317px, calc(100% - 5.108px) 43.2803px, calc(100% - 38.442px) calc(100% - 44.72px), calc(100% - 38.442px) calc(100% - 44.72px), calc(100% - 39.404061px) calc(100% - 38.730901px), calc(100% - 41.218728px) calc(100% - 33.091488px), calc(100% - 43.814127px) calc(100% - 27.867887px), calc(100% - 47.118384px) calc(100% - 23.126224px), calc(100% - 51.059625px) calc(100% - 18.932625px), calc(100% - 55.565976px) calc(100% - 15.353216px), calc(100% - 60.565563px) calc(100% - 12.454123px), calc(100% - 65.986512px) calc(100% - 10.301472px), calc(100% - 71.756949px) calc(100% - 8.961389px), calc(100% - 77.805px) calc(100% - 8.5px), 44.472px calc(100% - 8.5px), 44.472px calc(100% - 8.5px), 37.70249276px calc(100% - 9.076057px), 31.32005968px calc(100% - 10.738336px), 25.41564372px calc(100% - 13.387999px), 20.08018784px calc(100% - 16.926208px), 15.404635px calc(100% - 21.254125px), 11.47992816px calc(100% - 26.272912px), 8.39701028px calc(100% - 31.883731px), 6.24682432px calc(100% - 37.987744px), 5.12031324px calc(100% - 44.486113px), 5.10842px calc(100% - 51.28px), 38.4418px 36.7197px, 38.4418px 36.7197px, 39.4038615px 30.7307309px, 41.218532px 25.0914112px, 43.8139405px 19.8678723px, 47.118216px 15.1262456px, 51.0594875px 10.9326625px, 55.565884px 7.3532544px, 60.5655345px 4.4541527px, 65.986568px 2.3014888px, 71.7571135px 0.9613941px, 77.8053px 0.5px);\n  margin-bottom: 30px;\n}\n@media (max-width: 1024px) {\n  .profile__photo {\n    margin-bottom: 20px;\n  }\n}\n@media (max-width: 768px) {\n  .profile__photo {\n    padding-top: 120%;\n  }\n}\n@media (max-width: 710px) {\n  .profile__photo {\n    clip-path: polygon(31.7615px 0.5px, calc(100% - 20.763px) 0.5px, calc(100% - 20.763px) 0.5px, calc(100% - 17.418385px) 0.7848366px, calc(100% - 14.26532px) 1.6067248px, calc(100% - 11.348775px) 2.9167322px, calc(100% - 8.71372px) 4.6659264px, calc(100% - 6.405125px) 6.805375px, calc(100% - 4.46796px) 9.2861456px, calc(100% - 2.947195px) 12.0593058px, calc(100% - 1.8878px) 15.0759232px, calc(100% - 1.334745px) 18.2870654px, calc(100% - 1.333px) 21.6438px, calc(100% - 12.331px) calc(100% - 18.356px), calc(100% - 12.331px) calc(100% - 18.356px), calc(100% - 12.808998px) calc(100% - 15.402704px), calc(100% - 13.706984px) calc(100% - 12.622112px), calc(100% - 14.989546px) calc(100% - 10.046768px), calc(100% - 16.621272px) calc(100% - 7.709216px), calc(100% - 18.56675px) calc(100% - 5.642px), calc(100% - 20.790568px) calc(100% - 3.877664px), calc(100% - 23.257314px) calc(100% - 2.448752px), calc(100% - 25.931576px) calc(100% - 1.387808px), calc(100% - 28.777942px) calc(100% - 0.727376px), calc(100% - 31.761px) calc(100% - 0.5px), 20.7634px calc(100% - 0.5px), 20.7634px calc(100% - 0.5px), 17.418780086px calc(100% - 0.784826px), 14.265704928px calc(100% - 1.606688px), 11.349142402px calc(100% - 2.916662px), 8.714060384px calc(100% - 4.665824px), 6.40542675px calc(100% - 6.80525px), 4.468209376px calc(100% - 9.286016px), 2.947376138px calc(100% - 12.059198px), 1.887894912px calc(100% - 15.075872px), 1.334733574px calc(100% - 18.287114px), 1.33286px calc(100% - 21.644px), 12.3309px 18.3562px, 12.3309px 18.3562px, 12.808931px 15.40282793px, 13.706956px 12.62217984px, 14.989563px 10.04679691px, 16.62134px 7.70922032px, 18.566875px 5.64199125px, 20.790756px 3.87765088px, 23.257571px 2.44874039px, 25.931908px 1.38780096px, 28.778355px 0.72737377px, 31.7615px 0.5px);\n  }\n}\n@media (max-width: 600px) {\n  .profile__photo {\n    grid-row: auto/span 4;\n  }\n}\n@media (max-width: 580px) {\n  .profile__photo {\n    padding-top: 107%;\n    grid-row: auto/span 3;\n  }\n}\n@media (max-width: 500px) {\n  .profile__photo {\n    grid-row: auto/span 2;\n  }\n}\n.profile__name {\n  color: var(--white, #FFF);\n  font-family: Thunder;\n  font-size: 7em;\n  font-weight: 700;\n  line-height: 128.571%;\n  margin-bottom: 10px;\n}\n@media (max-width: 1024px) {\n  .profile__name {\n    margin-bottom: 0;\n  }\n}\n@media (max-width: 580px) {\n  .profile__name {\n    margin-bottom: 15px;\n  }\n}\n@media (max-width: 440px) {\n  .profile__name {\n    line-height: 1;\n  }\n}\n@media (max-width: 340px) {\n  .profile__name {\n    font-size: 32px;\n  }\n}\n.profile__title {\n  color: var(--green-new, #9DF850);\n  font-family: Thunder;\n  font-size: 5em;\n  font-weight: 700;\n  margin-bottom: 20px;\n}\n@media (max-width: 1024px) {\n  .profile__title {\n    margin-bottom: 15px;\n  }\n}\n@media (max-width: 440px) {\n  .profile__title {\n    font-size: 26px;\n  }\n}\n@media (max-width: 340px) {\n  .profile__title {\n    font-size: 20px;\n  }\n}\n.profile__experience {\n  color: var(--white, #FFF);\n  font-family: Montserrat;\n  font-size: 3em;\n  font-weight: 600;\n  margin-bottom: 20px;\n}\n@media (max-width: 1024px) {\n  .profile__experience {\n    margin-bottom: 15px;\n  }\n}\n@media (max-width: 500px) {\n  .profile__experience {\n    grid-column: auto/span 2;\n  }\n}\n.profile__areas {\n  color: var(--white, #FFF);\n  font-family: Montserrat;\n  font-size: 2.4em;\n  line-height: 1.8;\n  margin-bottom: 30px;\n}\n@media (max-width: 1024px) {\n  .profile__areas {\n    margin-bottom: 20px;\n  }\n}\n@media (max-width: 580px) {\n  .profile__areas {\n    grid-column: auto/span 2;\n  }\n}\n.profile__areas-term {\n  color: var(--green-new, #9DF850);\n  font-weight: 600;\n}\n@media (max-width: 710px) {\n  .profile__download-btn {\n    justify-self: end;\n  }\n}\n@media (max-width: 600px) {\n  .profile__download-btn {\n    grid-column: auto/span 2;\n    justify-self: center;\n  }\n}\n.profile__skills-rates {\n  margin-bottom: 80px;\n}\n@media (max-width: 768px) {\n  .profile__skills-rates {\n    margin-bottom: 60px;\n  }\n}\n@media (max-width: 520px) {\n  .profile__skills-rates {\n    margin-bottom: 40px;\n  }\n}\n.profile__skills-cloud {\n  max-width: 800px;\n  margin: auto;\n}\n@media (max-width: 1024px) {\n  .profile__skills-cloud {\n    --base-distance: 230px;\n    max-width: 600px;\n    margin: auto;\n  }\n}\n@media (max-width: 768px) {\n  .profile__skills-cloud {\n    --base-distance: 190px;\n    max-width: 500px;\n    margin: auto;\n  }\n}\n@media (max-width: 520px) {\n  .profile__skills-cloud {\n    --base-distance: 160px;\n  }\n}\n@media (max-width: 420px) {\n  .profile__skills-cloud {\n    --base-distance: 130px;\n  }\n}\n@media (max-width: 375px) {\n  .profile__skills-cloud {\n    --base-distance: 100px;\n  }\n}\n\n@keyframes orbite {\n  0% {\n    transform: rotateZ(var(--placing-degree)) translateX(calc(var(--base-distance) + var(--base-distance) * var(--distance-shift))) rotateZ(calc(0deg - var(--placing-degree)));\n  }\n  100% {\n    transform: rotateZ(calc(360deg + var(--placing-degree))) translateX(calc(var(--base-distance) + var(--base-distance) * var(--distance-shift))) rotateZ(calc(-360deg - var(--placing-degree)));\n  }\n}\n.steps__title {\n  max-width: 800px;\n  color: transparent;\n  font-family: Thunder;\n  font-size: 90px;\n  font-style: normal;\n  font-weight: 800;\n  background: linear-gradient(307deg, #161616 0%, #260046 18.82%, #2A004E 36.26%, #500092 56.78%, #3A006A 75.58%, #2A004E 88.57%, #2A004E 100%);\n  background-clip: text;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  margin-bottom: 60px;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .steps__title {\n    font-size: calc(42px + 48 * (100vw - 375.1px) / 1544.9);\n    max-width: calc(260px + 540 * (100vw - 375.1px) / 1544.9);\n  }\n}\n@media (max-width: 520px) {\n  .steps__title {\n    font-size: 42px;\n    max-width: 260px;\n  }\n}\n@media (min-width: 280px) and (max-width: 520px) {\n  .steps__title {\n    max-width: calc(200px + 60 * (100vw - 280px) / 240);\n  }\n}\n@media (max-width: 280px) {\n  .steps__title {\n    max-width: 200px;\n  }\n}\n.steps__decor {\n  position: absolute;\n  left: 0;\n  top: 0;\n  top: -33em;\n  z-index: -1;\n  width: 100%;\n  height: calc(100% + 33em);\n  font-size: 10px;\n  overflow: hidden;\n}\n@media (min-width: 768.1px) and (max-width: 1920px) {\n  .steps__decor {\n    font-size: calc(4px + 6 * (100vw - 768.1px) / 1151.9);\n  }\n}\n@media (min-width: 280px) and (max-width: 768px) {\n  .steps__decor {\n    font-size: calc(3px + 7 * (100vw - 280px) / 744);\n  }\n}\n@media (max-width: 768px) {\n  .steps__decor {\n    top: -50em;\n    height: calc(100% + 50em);\n  }\n}\n@media (max-width: 280px) {\n  .steps__decor {\n    font-size: 3px;\n  }\n}\n.steps__decor::before {\n  content: \"\";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 105%;\n  height: 100%;\n  background: url(../img/static/steps-bg.svg) top center/cover no-repeat;\n}\n@media (max-width: 768px) {\n  .steps__decor::before {\n    background-image: url(../img/static/steps-bg-mob.svg);\n  }\n}\n.steps__body {\n  position: relative;\n  left: 0;\n  top: 0;\n  z-index: 0;\n  padding: 60px 0;\n}\n@media (max-width: 1440px) {\n  .steps__body {\n    padding-top: 40px;\n  }\n}\n@media (max-width: 768px) {\n  .steps__body {\n    padding-bottom: 50px;\n  }\n}\n\n.step-cards-layout__inner {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin: -20px;\n}\n@media (max-width: 1440px) {\n  .step-cards-layout__inner {\n    margin: -20px -10px;\n  }\n}\n@media (max-width: 1200px) {\n  .step-cards-layout__inner {\n    margin: -15px -5px;\n  }\n}\n.step-cards-layout__inner > * {\n  flex: 0 0 33.3333333333%;\n  padding: 20px;\n  filter: drop-shadow(0 0 60px rgba(21, 0, 38, 0.4));\n}\n@media (max-width: 1440px) {\n  .step-cards-layout__inner > * {\n    padding: 20px 10px;\n  }\n}\n@media (max-width: 1200px) {\n  .step-cards-layout__inner > * {\n    padding: 15px 5px;\n  }\n}\n@media (max-width: 1024px) {\n  .step-cards-layout__inner > * {\n    flex: 0 0 50%;\n  }\n}\n@media (max-width: 768px) {\n  .step-cards-layout__inner > * {\n    flex: 0 0 100%;\n  }\n}\n\n.step-card {\n  background-color: white;\n  clip-path: polygon(16.0633px 21.8844px, 16.0633px 21.8844px, 16.6633191px 18.26171001px, 17.7767768px 14.85199488px, 19.3603537px 11.69490987px, 21.3707304px 8.83011024px, 23.7645875px 6.29725125px, 26.4986056px 4.13598816px, 29.5294653px 2.38597623px, 32.8138472px 1.08687072px, 36.3084319px 0.27832689px, 39.9699px 0px, calc(100% - 24.218px) 0px, calc(100% - 24.218px) 0px, calc(100% - 20.0912px) 0.3522918px, calc(100% - 16.20188px) 1.3686624px, calc(100% - 12.60566px) 2.9883546px, calc(100% - 9.35816px) 5.1506112px, calc(100% - 6.515px) 7.794675px, calc(100% - 4.1318px) 10.8597888px, calc(100% - 2.26418px) 14.2851954px, calc(100% - 0.96776px) 18.0101376px, calc(100% - 0.29816px) 21.9738582px, calc(100% - 0.311px) 26.1156px, calc(100% - 16.063px) calc(100% - 21.884px), calc(100% - 16.063px) calc(100% - 21.884px), calc(100% - 16.662979px) calc(100% - 18.26145px), calc(100% - 17.776432px) calc(100% - 14.85184px), calc(100% - 19.360033px) calc(100% - 11.69483px), calc(100% - 21.370456px) calc(100% - 8.83008px), calc(100% - 23.764375px) calc(100% - 6.29725px), calc(100% - 26.498464px) calc(100% - 4.136px), calc(100% - 29.529397px) calc(100% - 2.38599px), calc(100% - 32.813848px) calc(100% - 1.08688px), calc(100% - 36.308491px) calc(100% - 0.27833px), calc(100% - 39.97px) calc(100% - 0px), 24.2177px calc(100% - 0px), 24.2177px calc(100% - 0px), 20.09093495px calc(100% - 0.352303px), 16.20165812px calc(100% - 1.368704px), 12.60548699px calc(100% - 2.988441px), 9.35803904px calc(100% - 5.150752px), 6.51493175px calc(100% - 7.794875px), 4.1317826px calc(100% - 10.860048px), 2.26420907px calc(100% - 14.285509px), 0.96782864px calc(100% - 18.010496px), 0.29825879px calc(100% - 21.974247px), 0.311117px calc(100% - 26.116px), 16.0633px 21.8844px);\n  padding: 30px 38px 30px 38px;\n  min-height: 100%;\n}\n@media (max-width: 1200px) {\n  .step-card {\n    padding: 25px 30px 25px 30px;\n  }\n}\n.step-card__name {\n  color: #3F0173;\n  font-family: Thunder;\n  font-size: 42px;\n  font-style: italic;\n  font-weight: 700;\n  letter-spacing: 0.84px;\n  margin-bottom: 16px;\n}\n@media (max-width: 1440px) {\n  .step-card__name {\n    font-size: 36px;\n  }\n}\n@media (max-width: 1200px) {\n  .step-card__name {\n    font-size: 32px;\n  }\n}\n.step-card__text {\n  color: #212121;\n  font-family: Montserrat;\n  font-size: 18px;\n  line-height: 133%; /* 133.333% */\n}\n@media (max-width: 1200px) {\n  .step-card__text {\n    font-size: 16px;\n  }\n}\n.step-card .text-btn {\n  --color: #A335FF;\n  --font-size: 18px;\n  font-family: Montserrat;\n  line-height: 24px;\n  text-decoration: underline;\n}\n\n.contact-form-section {\n  padding-top: 120px;\n  padding-bottom: 40px;\n}\n@media (max-width: 1024px) {\n  .contact-form-section {\n    padding-top: 80px;\n    padding-bottom: 10px;\n  }\n}\n@media (max-width: 768px) {\n  .contact-form-section {\n    padding-top: 60px;\n    padding-bottom: 50px;\n  }\n}\n.contact-form-section__container {\n  display: grid;\n  grid-template-columns: 1fr minmax(max-content, 1fr);\n  gap: 120px;\n}\n@media (max-width: 1920px) {\n  .contact-form-section__container {\n    gap: 100px;\n  }\n}\n@media (max-width: 1024px) {\n  .contact-form-section__container {\n    grid-template-columns: 1fr 1fr;\n    gap: 60px;\n  }\n}\n@media (max-width: 768px) {\n  .contact-form-section__container {\n    grid-template-columns: 1fr;\n    gap: 40px;\n    max-width: 600px;\n  }\n}\n.contact-form-section__title {\n  font-family: Thunder;\n  font-size: 70px;\n  font-weight: 800;\n  background: linear-gradient(307deg, #161616 0%, #260046 18.82%, #2A004E 36.26%, #500092 56.78%, #3A006A 75.58%, #2A004E 88.57%, #2A004E 100%);\n  background-clip: text;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  padding-top: 20px;\n}\n@media (min-width: 375.1px) and (max-width: 1920px) {\n  .contact-form-section__title {\n    font-size: calc(42px + 28 * (100vw - 520px) / 1400);\n  }\n}\n@media (max-width: 520px) {\n  .contact-form-section__title {\n    font-size: 42px;\n  }\n}\n.contact-form__body {\n  display: grid;\n  gap: 30px;\n}\n.contact-form__msg-container {\n  margin: 15px auto;\n}\n.contact-form__msg {\n  display: flex;\n  align-items: center;\n  max-width: 500px;\n  text-align: center;\n  font-family: Montserrat;\n  font-size: 14px;\n  background: #FFF;\n  border-radius: 10px;\n  box-shadow: 0px 4px 66px 0px rgba(32, 6, 70, 0.16);\n  padding: 10px 20px;\n  margin: 0 auto;\n}\n.contact-form__msg_error {\n  color: #FF1D53;\n}\n.contact-form__msg_success {\n  color: #9935EC;\n}\n.contact-form__bottom-inner {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin-left: -20px;\n  margin-top: -12px;\n}\n@media (max-width: 1024px) {\n  .contact-form__bottom-inner {\n    flex-direction: column;\n    align-items: center;\n  }\n}\n@media (max-width: 768px) {\n  .contact-form__bottom-inner {\n    flex-direction: row;\n  }\n}\n@media (max-width: 575px) {\n  .contact-form__bottom-inner {\n    flex-direction: column;\n  }\n}\n.contact-form__bottom-inner > * {\n  margin-left: 20px;\n  margin-top: 12px;\n}\n.contact-form__separator {\n  display: flex;\n  align-items: center;\n  color: #C279FF;\n  font-family: Thunder;\n  font-size: 30px;\n  font-weight: 700;\n  letter-spacing: 0.6px;\n}\n.contact-form__separator::before, .contact-form__separator::after {\n  content: \"\";\n  width: 35px;\n  height: 1.2px;\n  background-color: #C279FF;\n}\n.contact-form__separator::before {\n  margin-right: 10px;\n}\n.contact-form__separator::after {\n  margin-left: 10px;\n}\n.form-field {\n  position: relative;\n  left: 0;\n  top: 0;\n}\n.form-field__label {\n  position: absolute;\n  left: 15px;\n  bottom: calc(100% - 1em);\n  font-family: Montserrat;\n  font-size: 16px;\n  font-weight: 600;\n  transition: opacity 0.4s, top 0.4s, bottom 0.4s;\n}\n.form-field.error .form-field__label {\n  color: #FF1D53;\n}\n.form-field.child-input-is-filled .form-field__label {\n  bottom: calc(100% + 5px);\n  opacity: 1;\n}\n.form-field__input input, .form-field__input textarea {\n  width: 100%;\n  color: var(--white, #FFF);\n  font-family: Montserrat;\n  font-size: 18px;\n  padding: 12px 24px;\n  background: linear-gradient(135deg, #161616 0%, #260046 14.94%, #2A004E 37.47%, #500092 64.84%, #3A006A 100%, #2A004E 100%);\n  clip-path: polygon(7.97274px 4.72542px, 7.97274px 4.72542px, 8.20639585px 3.92288265px, 8.5417712px 3.1748544px, 8.97010875px 2.48839395px, 9.4826512px 1.87056px, 10.07064125px 1.32841125px, 10.7253216px 0.8690064px, 11.43793495px 0.49940415px, 12.199724px 0.2266632px, 13.00193145px 0.05784225px, 13.8358px 0px, calc(100% - 6.444px) 0px, calc(100% - 6.444px) 0px, calc(100% - 5.327924px) 0.10271337px, calc(100% - 4.286632px) 0.39753456px, calc(100% - 3.336228px) 0.86448519px, calc(100% - 2.492816px) 1.48358688px, calc(100% - 1.7725px) 2.23486125px, calc(100% - 1.191384px) 3.09832992px, calc(100% - 0.765572px) 4.05401451px, calc(100% - 0.511168px) 5.08193664px, calc(100% - 0.444276px) 6.16211793px, calc(100% - 0.581px) 7.27458px, calc(100% - 7.973px) calc(100% - 4.7254px), calc(100% - 7.973px) calc(100% - 4.7254px), calc(100% - 8.2065px) calc(100% - 3.9228705px), calc(100% - 8.54176px) calc(100% - 3.174848px), calc(100% - 8.97002px) calc(100% - 2.4883915px), calc(100% - 9.48252px) calc(100% - 1.87056px), calc(100% - 10.0705px) calc(100% - 1.3284125px), calc(100% - 10.7252px) calc(100% - 0.869008px), calc(100% - 11.43786px) calc(100% - 0.4994055px), calc(100% - 12.19972px) calc(100% - 0.226664px), calc(100% - 13.00202px) calc(100% - 0.0578425px), calc(100% - 13.836px) calc(100% - 0px), 6.44447px calc(100% - 0px), 6.44447px calc(100% - 0px), 5.328353973px calc(100% - 0.1027142px), 4.287036304px calc(100% - 0.3975376px), 3.336618611px calc(100% - 0.8644914px), 2.493202512px calc(100% - 1.4835968px), 1.772889625px calc(100% - 2.234875px), 1.191781568px calc(100% - 3.0983472px), 0.765979959px calc(100% - 4.0540346px), 0.511586416px calc(100% - 5.0819584px), 0.444702557px calc(100% - 6.1621398px), 0.58143px calc(100% - 7.2746px), 7.97274px 4.72542px);\n  transition: color 0.4s;\n}\n.form-field__input input::placeholder, .form-field__input textarea::placeholder {\n  color: var(--text-not-filled-team, #AEAEAE);\n  font-family: Montserrat;\n  font-size: 18px;\n}\n.form-field.error .form-field__input input, .form-field.error .form-field__input textarea {\n  color: #FF1D53;\n}\n.form-field .error {\n  display: inline-block;\n  color: #FF1D53;\n  font-family: Montserrat;\n  font-size: 14px;\n  margin-top: 8px;\n  margin-left: 10px;\n}",".teamates-slider {\r\n\toverflow: visible;\r\n\twidth: 100%;\r\n\t&__wrapper {\r\n\t\tmargin-bottom: 30px;\r\n\t}\r\n\t&__slide {\r\n\t\theight: auto;\r\n\t\ttransition-property: transform, opacity;\r\n\t\t&[data-slide-position=\"-1\"] {\r\n\t\t\topacity: 0.9;\r\n\t\t}\r\n\t\t&[data-slide-position=\"1\"] {\r\n\t\t\topacity: 0.9;\r\n\t\t}\r\n\t\t&[data-slide-position=\"-2\"] {\r\n\t\t\topacity: 0.8;\r\n\t\t}\r\n\t\t&[data-slide-position=\"2\"] {\r\n\t\t\topacity: 0.8;\r\n\t\t}\r\n\t\t&[data-slide-position=\"-3\"] {\r\n\t\t\topacity: 0.7;\r\n\t\t}\r\n\t\t&[data-slide-position=\"3\"] {\r\n\t\t\topacity: 0.7;\r\n\t\t}\r\n\t\t&[data-slide-position=\"-4\"] {\r\n\t\t\topacity: 0.6;\r\n\t\t}\r\n\t\t&[data-slide-position=\"4\"] {\r\n\t\t\topacity: 0.6;\r\n\t\t}\r\n\t}\r\n\t&__bottom {\r\n\t\tdisplay: flex;\r\n\t\tjustify-content: center;\r\n\t\tvisibility: hidden;\r\n\t}\r\n\t&__bottom-inner {\r\n\t\tdisplay: inline-grid;\r\n\t\tgrid-template-columns: repeat(3, auto);\r\n\t\tgap: 100px;\r\n\t\talign-items: center;\r\n\t\t@media (max-width: $mbpESMEnd) {\r\n\t\t\tgrid-template-columns: repeat(2, auto);\r\n\t\t\tgap: 9px 60px;\r\n\t\t}\r\n\t}\r\n\t&__pagination {\r\n\t\tflex: 0 1 max-content;\r\n\t\tdisplay: inline-block;\r\n\t\t--swiper-pagination-bullet-horizontal-gap: 8px;\r\n\t\t& .swiper-pagination-bullet {\r\n\t\t\twidth: 16px;\r\n\t\t\theight: 16px;\r\n\t\t\tborder: 2px solid #67E000;\r\n\t\t\tbackground-color: transparent;\r\n\t\t\ttransition: background-color 0.4s;\r\n\t\t}\r\n\t\t& .swiper-pagination-bullet-active {\r\n\t\t\tbackground-color: #67E000;\r\n\t\t}\r\n\t}\r\n\t&__counter {\r\n\t\tdisplay: inline-grid;\r\n\t\tgrid-template-columns: repeat(3, auto);\r\n\t\tgap: 0.3em;\r\n\t\tcolor: #C279FF;\r\n\t\tfont-family: Thunder;\r\n\t\tfont-size: 26px;\r\n\t\tfont-style: italic;\r\n\t\tfont-weight: 600;\r\n\t\tline-height: 24px;\r\n\t\tletter-spacing: 0.02em;\r\n\t\t@media (max-width: $mbpESMEnd) {\r\n\t\t\tgrid-row: 1/ span 1;\r\n\t\t\tgrid-column: auto/span 2;\r\n\t\t\tjustify-self: center;\r\n\t\t}\r\n\t}\r\n\t&__current {\r\n\t\tcolor: #1F1F1F;\r\n\t\ttext-align: right;\r\n\t\tfont-size: 36px;\r\n\t\tletter-spacing: 0.72px;\r\n\t}\r\n\t&__total {\r\n\t}\r\n}\r\n.swiper-btn {\r\n\tflex: 0 0 auto;\r\n\tdisplay: inline-flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\twidth: 36px;\r\n\theight: 36px;\r\n\tfont-size: 0;\r\n\tborder: 2px solid #9DF850;\r\n\tborder-radius: 50%;\r\n\tbackground-color: #161616;\r\n\ttransition: filter 0.4s;\r\n\t&:hover {\r\n\t\tfilter: drop-shadow(0px 0px 30px rgba(117, 255, 0, 0.50));\r\n\t}\r\n\t& .svg-icon {\r\n\t\tflex: 0 0 auto;\r\n\t\tfill: #9DF850;\r\n\t\twidth: 8px;\r\n\t\ttransition: left 0.4s, right 0.4s;\r\n\t}\r\n\t\r\n\t&_prev .svg-icon, &_next .svg-icon {\r\n\t\tposition: relative;\r\n\t\ttop: 0;\r\n\t\tz-index: 0;\r\n\t}\r\n\t&_prev .svg-icon {\r\n\t\tleft: -2%;\r\n\t}\r\n\t&_next .svg-icon {\r\n\t\tright: -2%;\r\n\t}\r\n\t&_prev:hover .svg-icon {\r\n\t\tleft: -8%;\r\n\t}\r\n\t&_next:hover .svg-icon {\r\n\t\tright: -8%;\r\n\t}\r\n}\r\n",".welcome {\r\n\tposition: relative;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\tz-index: 0;\r\n\t&::before {\r\n\t\tcontent: \"\";\r\n\t\tposition: absolute;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\tz-index: -2;\r\n\t\twidth: 100%;\r\n\t\theight: 108%;\r\n\t\tbackground-color: #C279FF;\r\n\t\tclip-path: polygon( 0% 0%,100% 0%,100% 63.427%,100% 63.427%,99.958% 64.404%,99.837% 65.342%,99.642% 66.232%,99.377% 67.063%,99.049% 67.823%,98.661% 68.504%,98.22% 69.093%,97.731% 69.581%,97.199% 69.958%,96.628% 70.212%,4.962% 99.782%,4.962% 99.782%,4.198% 99.911%,3.458% 99.812%,2.756% 99.504%,2.104% 99.004%,1.516% 98.33%,1.006% 97.502%,0.586% 96.536%,0.269% 95.451%,0.069% 94.265%,0% 92.997%,0% 0% );\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tclip-path: polygon( 0% 0%,100% 0%,100% 69.403%,100% 69.403%,99.873% 70.961%,99.499% 72.47%,98.893% 73.916%,98.068% 75.285%,97.036% 76.561%,95.81% 77.732%,94.405% 78.782%,92.833% 79.698%,91.107% 80.464%,89.241% 81.067%,21.241% 99.257%,21.241% 99.257%,18.12% 99.835%,15.04% 99.926%,12.069% 99.568%,9.273% 98.797%,6.722% 97.65%,4.483% 96.166%,2.623% 94.381%,1.211% 92.332%,0.314% 90.056%,0% 87.592%,0% 0% );\r\n\t\t}\r\n\t}\r\n\t&::after {\r\n\t\tcontent: \"\";\r\n\t\tposition: absolute;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\tz-index: -1;\r\n\t\twidth: 100%;\r\n\t\theight: 100%;\r\n\t\tbackground: linear-gradient(170deg, #161616 0%, #260046 32.29%, #2A004E 57.29%, #500092 78.65%, #3A006A 100%, #2A004E 100%);\r\n\t\tclip-path: polygon( 0% 0%,100% 0%,100% 66.103%,100% 66.103%,99.956% 67.19%,99.829% 68.233%,99.624% 69.218%,99.347% 70.135%,99.003% 70.97%,98.599% 71.712%,98.14% 72.35%,97.632% 72.869%,97.08% 73.26%,96.49% 73.509%,4.824% 99.863%,4.824% 99.863%,4.074% 99.957%,3.35% 99.815%,2.666% 99.456%,2.032% 98.899%,1.463% 98.163%,0.969% 97.267%,0.564% 96.229%,0.259% 95.069%,0.067% 93.805%,0% 92.457%,0% 0% );\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tclip-path: polygon( 0% 0%,100% 0%,100% 71.66%,100% 71.66%,99.857% 73.439%,99.437% 75.154%,98.758% 76.79%,97.836% 78.326%,96.688% 79.747%,95.329% 81.034%,93.777% 82.169%,92.047% 83.134%,90.157% 83.913%,88.123% 84.486%,20.123% 99.53%,20.123% 99.53%,17.091% 99.953%,14.129% 99.897%,11.297% 99.399%,8.651% 98.498%,6.252% 97.231%,4.158% 95.634%,2.427% 93.746%,1.118% 91.603%,0.289% 89.243%,0% 86.704%,0% 0% );\r\n\t\t}\r\n\t}\r\n\t&__underlay {\r\n\t\tposition: absolute;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\twidth: 100%;\r\n\t\theight: 100%;\r\n\t\tz-index: 0;\r\n\t}\r\n\t&__container {\r\n\t\tpadding-top: 160px;\r\n\t\tpadding-bottom: 145px;\r\n\t\t@media (min-width: $mbpSMStart) and (max-width: $mbpPCEnd) {\r\n\t\t\tpadding-top: aval(100, 160, 0, $mbpSMStartNu, $mbpPCEndNu);\r\n\t\t\tpadding-bottom: aval(75, 145, 0, $mbpSMStartNu, $mbpPCEndNu);\r\n\t\t}\r\n\t\t@media screen and (max-width: $mbpESMEnd) {\r\n\t\t\tpadding-top: 100px;\r\n\t\t\tpadding-bottom: 75px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\tdisplay: flex;\r\n\t\t\tjustify-content: center;\r\n\t\t}\r\n\t}\r\n\t&__title{\r\n\t\tposition: sticky;\r\n\t\tleft: 40px;\r\n\t\tz-index: 1;\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\tposition: static;\r\n\t\t\tleft: unset;\r\n\t\t}\r\n\t}\r\n}\r\n.page-title {\r\n\tdisplay: inline-flex;\r\n\tflex-direction: column;\r\n\talign-items: flex-start;\r\n\tcolor: #FFF;\r\n\tfont-family: Thunder;\r\n\tfont-size: 160px;\r\n\tfont-weight: 800;\r\n\tmargin-top: 15px;\r\n\tmargin-bottom: 15px;\r\n\t@media (min-width: $mbpSMStart) and (max-width: $mbpPCEnd) {\r\n\t\tfont-size: aval(70, 160, 0, $mbpSMStartNu, $mbpPCEndNu);\r\n\t}\r\n\t@media screen and (max-width: $mbpESMEnd) {\r\n\t\tfont-size: 70px;\r\n\t}\r\n\t@media screen and (max-width: 360px) {\r\n\t\tfont-size: 55px;\r\n\t}\r\n\t@media (max-width: $mbpSMEnd) {\r\n\t\tmargin-top: 10px;\r\n\t\tmargin-bottom: 10px;\r\n\t}\r\n\t& > strong {\r\n\t\tdisplay: inline-block;\r\n\t\tposition: relative;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\tcolor: #161616;\r\n\t\tmargin-top: 19px;\r\n\t\tmargin-bottom: 19px;\r\n\t\tz-index: 1;\r\n\t\t@media (max-width: $mbpSPCEnd) {\r\n\t\t\tmargin-top: 21px;\r\n\t\t\tmargin-bottom: 21px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\tmargin-top: 10px;\r\n\t\t\tmargin-bottom: 10px;\r\n\t\t}\r\n\t\t&::before {\r\n\t\t\tcontent: \"\";\r\n\t\t\tdisplay: inline-block;\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: -8.75%;\r\n\t\t\tleft: -9%;\r\n\t\t\tz-index: -1;\r\n\t\t\theight: 112%;\r\n\t\t\twidth: 118%;\r\n\t\t\tbackground-color: #9DF850;\r\n\t\t\tclip-path: polygon( 4.182% 8.641%,4.182% 8.641%,4.285% 7.171%,4.431% 5.801%,4.615% 4.545%,4.835% 3.416%,5.087% 2.425%,5.367% 1.586%,5.671% 0.911%,5.995% 0.413%,6.337% 0.105%,6.692% 0%,97.416% 0%,97.416% 0%,97.898% 0.192%,98.347% 0.745%,98.757% 1.619%,99.12% 2.778%,99.429% 4.183%,99.677% 5.796%,99.858% 7.581%,99.965% 9.498%,99.99% 11.511%,99.926% 13.581%,95.818% 91.359%,95.818% 91.359%,95.715% 92.829%,95.569% 94.199%,95.385% 95.455%,95.165% 96.584%,94.913% 97.575%,94.633% 98.414%,94.329% 99.089%,94.005% 99.587%,93.663% 99.895%,93.308% 100%,2.583% 100%,2.583% 100%,2.102% 99.808%,1.653% 99.255%,1.243% 98.381%,0.88% 97.222%,0.571% 95.818%,0.323% 94.204%,0.142% 92.42%,0.035% 90.502%,0.01% 88.489%,0.074% 86.419%,4.182% 8.641% );\r\n\t\t}\r\n\t}\r\n\t&:first-child {\r\n\t\tmargin-top: 0;\r\n\t}\r\n\t&:last-child {\r\n\t\tmargin-bottom: 0;\r\n\t}\r\n}",".teams-review {\r\n\tposition: relative;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\tz-index: 1;\r\n\tmargin-top: -5%;\r\n\tmargin-bottom: 0;\r\n\toverflow: hidden;\r\n\t@media (max-width: $mbpMEnd) {\r\n\t\tmargin-top: -3%;\r\n\t}\r\n\t@media (max-width: $mbpSMEnd) {\r\n\t\tmargin-top: 3%;\r\n\t}\r\n\t&__container {\r\n\t\tdisplay: flex;\r\n\t\tflex-direction: column;\r\n\t\t&:first-child {\r\n\t\t\tmargin-bottom: 45px;\r\n\t\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\t\tmargin-bottom: 35px;\r\n\t\t\t}\r\n\t\t}\r\n\t\t&:nth-child(2) {\r\n\t\t\tmax-width: 1543px;\r\n\t\t\t--container-save-space: 5px;\r\n\t\t\tmargin-bottom: 30px;\r\n\t\t}\r\n\t\t&:nth-child(3) {\r\n\t\t\t--container-save-space: 25px;\r\n\t\t}\r\n\t}\r\n\t&__call {\r\n\t\talign-self: flex-end;\r\n\t\tdisplay: inline-block;\r\n\t\tmax-width: 870px;\r\n\t\tcolor: transparent;\r\n\t\tfont-family: Thunder;\r\n\t\tfont-size: 130px;\r\n\t\tfont-weight: 800;\r\n\t\tbackground: linear-gradient(127deg, #161616 0%, #260046 10.86%, #2A004E 24.10%, #500092 41.91%, #3A006A 70.64%, #2A004E 88.57%);\r\n\t\tbackground-clip: text;\r\n\t\t-webkit-background-clip: text;\r\n\t\t@media (min-width: $mbpSMStart) and (max-width: $mbpPCEnd) {\r\n\t\t\tfont-size: aval(60, 130, 0, $mbpSMStartNu, $mbpPCEndNu);\r\n\t\t}\r\n\t\t@media screen and (max-width: $mbpESMEnd) {\r\n\t\t\tfont-size: 60px;\r\n\t\t}\r\n\t\t@media (min-width: $mbpMStart) and (max-width: $mbpPCEnd) {\r\n\t\t\tmax-width: aval(510, 870, 0, $mbpMStartNu, $mbpPCEndNu);\r\n\t\t}\r\n\t\t@media (min-width: $mbpSMStart) and (max-width: $mbpMEnd) {\r\n\t\t\tmax-width: aval(300, 430, 0, $mbpSMStartNu, $mbpMEndNu);\r\n\t\t}\r\n\t\t@media screen and (max-width: $mbpESMEnd) {\r\n\t\t\tmax-width: 270px;\r\n\t\t\tfont-size: 50px;\r\n\t\t}\r\n\t\t@media screen and (max-width: 320px) {\r\n\t\t\tmax-width: 250px;\r\n\t\t\tfont-size: 40px;\r\n\t\t}\r\n\t}\r\n\t&__team-filter {\r\n\t\tmargin-bottom: 60px;\r\n\t}\r\n\t&__swipe-area-pointer {\r\n\t\tposition: absolute;\r\n\t\tright: 30px;\r\n\t\tbottom: -60px;\r\n\t\tz-index: 10;\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\tbottom: -55px;\r\n\t\t}\r\n\t}\r\n}\r\n.section-nav {\r\n\tposition: relative;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\t&::before {\r\n\t\tcontent: \"\";\r\n\t\tposition: absolute;\r\n\t\tleft: 50%;\r\n\t\ttop: 50%;\r\n\t\tz-index: -2;\r\n\t\twidth: 100.5%;\r\n\t\theight: 235%;\r\n\t\tbackground-color: #C279FF;\r\n\t\tclip-path: polygon(22.3315px 42.9384px, 22.3315px 42.9384px, 23.3069249px 40.6792617px, 24.5318352px 38.5878456px, 25.9848943px 36.6794499px, 27.6447656px 34.9693728px, 29.4901125px 33.4729125px, 31.4995984px 32.2053672px, 33.6518867px 31.1820351px, 35.9256408px 30.4182144px, 38.2995241px 29.9292033px, 40.7522px 29.7303px, calc(100% - 21.21px) 0.57282px, calc(100% - 21.21px) 0.57282px, calc(100% - 17.12625px) 0.901554314px, calc(100% - 13.3536px) 1.993392832px, calc(100% - 9.9559500000003px) 3.758675118px, calc(100% - 6.9972000000002px) 6.107740736px, calc(100% - 4.5412500000002px) 8.95092925px, calc(100% - 2.6519999999998px) 12.198580224px, calc(100% - 1.3933500000001px) 15.761033222px, calc(100% - 0.8291999999999px) 19.548627808px, calc(100% - 1.0234499999999px) 23.471703546px, calc(100% - 2.0400000000002px) 27.4406px, calc(100% - 17.35px) calc(100% - 57.7228px), calc(100% - 17.35px) calc(100% - 57.7228px), calc(100% - 18.32129px) calc(100% - 55.494854px), calc(100% - 19.53552px) calc(100% - 53.430936px), calc(100% - 20.97223px) calc(100% - 51.545866px), calc(100% - 22.61096px) calc(100% - 49.854464px), calc(100% - 24.43125px) calc(100% - 48.37155px), calc(100% - 26.41264px) calc(100% - 47.111944px), calc(100% - 28.53467px) calc(100% - 46.090466px), calc(100% - 30.77688px) calc(100% - 45.321936px), calc(100% - 33.11881px) calc(100% - 44.821174px), calc(100% - 35.54px) calc(100% - 44.603px), 21.3722px calc(100% - 0.861px), 21.3722px calc(100% - 0.861px), 17.27314874px calc(100% - 1.1521906px), 13.48018352px calc(100% - 2.2136048px), 10.05845318px calc(100% - 3.9553062px), 7.07310656px calc(100% - 6.2873584px), 4.5892925px calc(100% - 9.119825px), 2.67215984px calc(100% - 12.3627696px), 1.38685742px calc(100% - 15.9262558px), 0.79853408px calc(100% - 19.7203472px), 0.97233866px calc(100% - 23.6551074px), 1.97342px calc(100% - 27.6406px), 22.3315px 42.9384px);\r\n\t\ttransform: translate(-50.25%, -42%);\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tclip-path: polygon(19.0118px 22.8292px, 19.0118px 22.8292px, 20.0382133px 20.7420249px, 21.2816064px 18.8134712px, 22.7235791px 17.0561563px, 24.3457312px 15.4826976px, 26.1296625px 14.1057125px, 28.0569728px 12.9378184px, 30.1092619px 11.9916327px, 32.2681296px 11.2797728px, 34.5151757px 10.8148561px, 36.832px 10.6095px, calc(100% - 20.213px) 0.964999px, calc(100% - 20.213px) 0.964999px, calc(100% - 15.949721px) 1.278584072px, calc(100% - 12.029528px) 2.419490976px, calc(100% - 8.521487px) 4.285204444px, calc(100% - 5.4946639999999px) 6.773209208px, calc(100% - 3.0181249999999px) 9.78099px, calc(100% - 1.1609359999999px) 13.206031552px, calc(100% - -0.007836999999995px) 16.945818596px, calc(100% - -0.419128px) 20.897835864px, calc(100% - -0.0038710000000037px) 24.959568088px, calc(100% - 1.3070000000001px) 29.0285px, calc(100% - 13.636px) calc(100% - 35.0244px), calc(100% - 13.636px) calc(100% - 35.0244px), calc(100% - 14.636169px) calc(100% - 33.058028px), calc(100% - 15.831032px) calc(100% - 31.235332px), calc(100% - 17.204923px) calc(100% - 29.567322px), calc(100% - 18.742176px) calc(100% - 28.065008px), calc(100% - 20.427125px) calc(100% - 26.7394px), calc(100% - 22.244104px) calc(100% - 25.601508px), calc(100% - 24.177447px) calc(100% - 24.662342px), calc(100% - 26.211488px) calc(100% - 23.932912px), calc(100% - 28.330561px) calc(100% - 23.424228px), calc(100% - 30.519px) calc(100% - 23.1473px), 21.5058px calc(100% - 0.306px), 21.5058px calc(100% - 0.306px), 17.17661333px calc(100% - 0.45435959999999px), 13.16965504px calc(100% - 1.4635368px), 9.55948971px calc(100% - 3.2293692px), 6.42068192px calc(100% - 5.6476944px), 3.82779625px calc(100% - 8.61435px), 1.85539728px calc(100% - 12.0251736px), 0.57804959px calc(100% - 15.7760028px), 0.07031776px calc(100% - 19.7626752px), 0.40676637px calc(100% - 23.8810284px), 1.66196px calc(100% - 28.0269px), 19.0118px 22.8292px);\r\n\t\t}\r\n\t}\r\n\t&::after {\r\n\t\tcontent: \"\";\r\n\t\tposition: absolute;\r\n\t\tleft: 50%;\r\n\t\ttop: 50%;\r\n\t\tz-index: -1;\r\n\t\twidth: 100%;\r\n\t\theight: 200%;\r\n\t\tbackground: linear-gradient(139deg, #161616 0%, #260046 24.18%, #2A004E 39.24%, #45017D 52.24%, #500092 61.79%, #45017D 70.34%, #3A006A 80.00%, #2A004E 100%);\r\n\t\tclip-path: polygon(16.172px 42.5529px, 16.172px 42.5529px, 17.1735527px 40.3538988px, 18.4130336px 38.3206104px, 19.8700469px 36.4673376px, 21.5241968px 34.8083832px, 23.3550875px 33.35805px, 25.3423232px 32.1306408px, 27.4655081px 31.1404584px, 29.7042464px 30.4018056px, 32.0381423px 29.9289852px, 34.4468px 29.7363px, calc(100% - 20.74px) 0.58305px, calc(100% - 20.74px) 0.58305px, calc(100% - 16.61802px) 0.918390952px, calc(100% - 12.81536px) 2.029803776px, calc(100% - 9.3969400000001px) 3.824781024px, calc(100% - 6.4276799999998px) 6.210815248px, calc(100% - 3.9724999999999px) 9.095399px, calc(100% - 2.0963199999999px) 12.386024832px, calc(100% - 0.86405999999988px) 15.990185296px, calc(100% - 0.34063999999989px) 19.815372944px, calc(100% - 0.59098000000017px) 23.769080328px, calc(100% - 1.6800000000003px) 27.7588px, calc(100% - 16.17px) calc(100% - 42.5529px), calc(100% - 16.17px) calc(100% - 42.5529px), calc(100% - 17.17189px) calc(100% - 40.3538988px), calc(100% - 18.41192px) calc(100% - 38.3206104px), calc(100% - 19.86963px) calc(100% - 36.4673376px), calc(100% - 21.52456px) calc(100% - 34.8083832px), calc(100% - 23.35625px) calc(100% - 33.35805px), calc(100% - 25.34424px) calc(100% - 32.1306408px), calc(100% - 27.46807px) calc(100% - 31.1404584px), calc(100% - 29.70728px) calc(100% - 30.4018056px), calc(100% - 32.04141px) calc(100% - 29.9289852px), calc(100% - 34.45px) calc(100% - 29.7363px), 20.7355px calc(100% - 0.583px), 20.7355px calc(100% - 0.583px), 16.61354445px calc(100% - 0.91844829999999px), 12.8110328px calc(100% - 2.0299264px), 9.39284455px calc(100% - 3.8249341px), 6.4238592px calc(100% - 6.2109712px), 3.96895625px calc(100% - 9.0955375px), 2.0930152px calc(100% - 12.3861328px), 0.86091555px calc(100% - 15.9902569px), 0.3375368px calc(100% - 19.8154096px), 0.58775845px calc(100% - 23.7690907px), 1.67646px calc(100% - 27.7588px), 16.172px 42.5529px);\r\n\t\ttransform: translate(-50%, -50%);\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tclip-path: polygon(13.8477px 23.1634px, 13.8477px 23.1634px, 14.9004517px 21.1819173px, 16.1514296px 19.3531544px, 17.5838979px 17.6882491px, 19.1811208px 16.1983392px, 20.9263625px 14.8945625px, 22.8028872px 13.7880568px, 24.7939591px 12.8899599px, 26.8828424px 12.2114096px, 29.0528013px 11.7635437px, 31.2871px 11.5575px, calc(100% - 21.512px) 0.170803px, calc(100% - 21.512px) 0.170803px, calc(100% - 17.194262px) 0.469232109px, calc(100% - 13.227656px) 1.615508672px, calc(100% - 9.682994px) 3.503222443px, calc(100% - 6.631088px) 6.025963176px, calc(100% - 4.14275px) 9.077320625px, calc(100% - 2.288792px) 12.550884544px, calc(100% - 1.140026px) 16.340244687px, calc(100% - 0.76726400000007px) 20.338990808px, calc(100% - 1.241318px) 24.440712661px, calc(100% - 2.633px) 28.539px, calc(100% - 13.848px) calc(100% - 23.1634px), calc(100% - 13.848px) calc(100% - 23.1634px), calc(100% - 14.9007px) calc(100% - 21.1819173px), calc(100% - 16.15164px) calc(100% - 19.3531544px), calc(100% - 17.58408px) calc(100% - 17.6882491px), calc(100% - 19.18128px) calc(100% - 16.1983392px), calc(100% - 20.9265px) calc(100% - 14.8945625px), calc(100% - 22.803px) calc(100% - 13.7880568px), calc(100% - 24.79404px) calc(100% - 12.8899599px), calc(100% - 26.88288px) calc(100% - 12.2114096px), calc(100% - 29.05278px) calc(100% - 11.7635437px), calc(100% - 31.287px) calc(100% - 11.5575px), 21.5123px calc(100% - 0.1708px), 21.5123px calc(100% - 0.1708px), 17.1944036px calc(100% - 0.46924109999999px), 13.2276668px calc(100% - 1.6155248px), 9.6829052px calc(100% - 3.5032417px), 6.6309344px calc(100% - 6.0259824px), 4.14257px calc(100% - 9.0773375px), 2.2886276px calc(100% - 12.5508976px), 1.1399228px calc(100% - 16.3402533px), 0.7672712px calc(100% - 20.3389952px), 1.2414884px calc(100% - 24.4407139px), 2.63339px calc(100% - 28.539px), 13.8477px 23.1634px); \r\n\t\t}\r\n\t}\r\n\t&__container {\r\n\t\tmax-width: 1340px;\r\n\t\tpadding: 0 35px;\r\n\t\tmargin: auto;\r\n\t}\r\n\t&__slider {\r\n\t\ttransform: rotate(-1.3deg);\r\n\t\t@media (max-width: $mbpTEnd) {\r\n\t\t\ttransform: rotate(-1.9deg);\r\n\t\t}\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\ttransform: rotate(-1.5deg);\r\n\t\t}\r\n\t}\r\n\t&__wrapper {\r\n\t\tjustify-content: space-between;\r\n\t\t& > * {\r\n\t\t\twidth: auto;\r\n\t\t\tmargin: 0 32px;\r\n\t\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\t\tmargin: 0 16px;\r\n\t\t\t}\r\n\t\t\t&:first-child {\r\n\t\t\t\tmargin-left: 0;\r\n\t\t\t}\r\n\t\t\t&:last-child {\r\n\t\t\t\tmargin-right: 0;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\t&__btn {\r\n\t\tdisplay: flex;\r\n\t\talign-items: center;\r\n\t\tjustify-content: center;\r\n\t\tmin-height: 50px;\r\n\t\tfont-size: 22px;\r\n\t\tfont-weight: 500;\r\n\t\ttext-align: center;\r\n\t\tcursor: pointer;\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tmin-height: 40px;\r\n\t\t\tfont-size: 18px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\tfont-size: 16px;\r\n\t\t}\r\n\t}\r\n}\r\n",".skill-rate {\r\n\tdisplay: grid;\r\n\tgrid-template-columns: 40% minmax(100px, 384px);\r\n\tgap: 8px;\r\n\tjustify-content: end;\r\n\t&__name {\r\n\t\tposition: relative;\r\n\t\tleft: 0;\r\n\t\ttop: 0.1em;\r\n\t\tcolor: #1F1F1F;\r\n\t\ttext-align: right;\r\n\t\tfont-family: Thunder;\r\n\t\tfont-size: 38px;\r\n\t\tfont-style: italic;\r\n\t\tfont-weight: 700;\r\n\t\tletter-spacing: 0.76px;\r\n\t\t@media (min-width: $mbpSMStart) and (max-width: $mbpPCEnd) {\r\n\t\t\tfont-size: aval(24, 38, 0, $mbpSMStartNu,  $mbpPCEndNu);\r\n\t\t}\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\tfont-size: 24px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpESMEnd) {\r\n\t\t\tfont-size: 22px;\r\n\t\t}\r\n\t}\r\n\t&__rate {\r\n\t\tdisplay: grid;\r\n\t\tgrid-template-columns: 11.5% auto;\r\n\t\tgap: 4px;\r\n\t\talign-self: start;\r\n\t\t@media (max-width: 720px) {\r\n\t\t\talign-self: center;\r\n\t\t}\r\n\t}\r\n\t&__separator {\r\n\t\tdisplay: flex;\r\n\t\talign-items: center;\r\n\t\twidth: 40px;\r\n\t\t&::before {\r\n\t\t\tcontent: \"\";\r\n\t\t\tflex: 0 0 auto;\r\n\t\t\tdisplay: inline-block;\r\n\t\t\twidth: 10px;\r\n\t\t\theight: 10px;\r\n\t\t\tbackground: #35CC00;\r\n\t\t\tborder-radius: 50%;\r\n\t\t}\r\n\t\t&::after {\r\n\t\t\tcontent: \"\";\r\n\t\t\tflex: 0 0 auto;\r\n\t\t\tdisplay: inline-block;\r\n\t\t\twidth: 30px;\r\n\t\t\theight: 2px;\r\n\t\t\tbackground: #35CC00;\r\n\t\t}\r\n\t}\r\n\t&__stars {\r\n\t\tdisplay: grid;\r\n\t\tgrid-template-columns: repeat(10, 1fr);\r\n\t\tborder-radius: 40px;\r\n\t\tbackground: linear-gradient(90deg, #F6FF92 0%, #C5FF94 100%);\r\n\t\tbox-shadow: 0px 0px 26px 0px rgba(0, 144, 55, 0.14);\r\n\t\tpadding: 3px 10px;\r\n\t\t& > .svg-icon {\r\n\t\t\twidth: 32px;\r\n\t\t\theight: 32px;\r\n\t\t\tfill: #35CC00;\r\n\t\t\tmargin-right: -32px;\r\n\t\t\tstroke: #F6FF92;\r\n\t\t\tstroke-width: 1.5px;\r\n\t\t\tstroke-linejoin: round;\r\n\t\t\t&:last-child {\r\n\t\t\t\tmargin-right: 0;\r\n\t\t\t}\r\n\t\t\t@media (min-width: $mbpSMStart) and (max-width: $mbpPCEnd) {\r\n\t\t\t\twidth: aval(20, 32, 0, $mbpSMStartNu,  $mbpPCEndNu);\r\n\t\t\t\theight: aval(20, 32, 0, $mbpSMStartNu,  $mbpPCEndNu);\r\n\t\t\t}\r\n\t\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\t\twidth: 20px;\r\n\t\t\t\theight: 20px;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n.skills-rates {\r\n\t&__title {\r\n\t\tdisplay: inline-block;\r\n\t\tcolor: transparent;\r\n\t\t-webkit-text-fill-color: transparent;\r\n\t\tfont-family: Thunder;\r\n\t\tfont-size: 70px;\r\n\t\tfont-weight: 700;\r\n\t\tline-height: 128.571%;\r\n\t\tletter-spacing: 1.4px;\r\n\t\tbackground: var(--purple-grad, linear-gradient(170deg, #161616 0%, #260046 32.29%, #2A004E 57.29%, #500092 78.65%, #3A006A 100%, #2A004E 100%));\r\n\t\tbackground-clip: text;\r\n\t\t-webkit-background-clip: text;\r\n\t\tmargin-bottom: 20px;\r\n\t\t@media (min-width: $mbpSMStart) and (max-width: $mbpPCEnd) {\r\n\t\t\tfont-size: aval(42, 70, 0, $mbpSMEndNu, $mbpPCEndNu);\r\n\t\t}\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\tfont-size: 42px;\r\n\t\t}\r\n\t}\r\n\t&__body {\r\n\t\tdisplay: flex;\r\n\t\tjustify-content: start;\r\n\t}\r\n\t&__body-inner {\r\n\t\tdisplay: grid;\r\n\t\tgrid-template-columns: repeat(2, 1fr);\r\n\t\tgap: 30px 40px;\r\n\t\t@media (max-width: $mbpTEnd) {\r\n\t\t\tgap: 20px 30px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpESMEnd) {\r\n\t\t\tgap: 15px;\r\n\t\t}\r\n\t\t@media (max-width: 720px) {\r\n\t\t\tgrid-template-columns: 1fr;\r\n\t\t\tjustify-content: center;\r\n\t\t}\r\n\t}\r\n}\r\n.skills-cloud {\r\n\t--base-distance: 280px;\r\n\tposition: relative;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\t&__bg {\r\n\t\tpadding-top: 84%;\r\n\t}\r\n\t&__body {\r\n\t\tdisplay: flex;\r\n\t\talign-items: center;\r\n\t\tjustify-content: center;\r\n\t\tposition: absolute;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\twidth: 100%;\r\n\t\theight: 100%;\r\n\t}\r\n\t&__msg {\r\n\t\tcolor: #FFF;\r\n\t\ttext-align: center;\r\n\t\tfont-family: Thunder;\r\n\t\tfont-size: 60px;\r\n\t\tfont-style: italic;\r\n\t\tfont-weight: 700;\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tfont-size: 50px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\tfont-size: 40px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpESMEnd) {\r\n\t\t\tfont-size: 35px;\r\n\t\t}\r\n\t}\r\n\t&__items {\r\n\t\tposition: absolute;\r\n\t\tleft: 50%;\r\n\t\ttop: 50%;\r\n\t\ttransform: translate(-50%, -50%);\r\n\t}\r\n\t&__item {\r\n\t\tposition: absolute;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\tflex: 0 0 auto;\r\n\t\tdisplay: flex;\r\n\t\talign-items: center;\r\n\t\tjustify-content: center;\r\n\t\twidth: 136px;\r\n\t\theight: 136px;\r\n\t\tbackground-color: white;\r\n\t\tclip-path: polygon( 4.722% 13.789%,4.722% 13.789%,5.046% 11.519%,5.704% 9.378%,6.667% 7.392%,7.908% 5.587%,9.399% 3.988%,11.112% 2.621%,13.018% 1.513%,15.09% 0.69%,17.3% 0.177%,19.619% 0%,84.859% 0%,84.859% 0%,87.383% 0.209%,89.766% 0.812%,91.975% 1.775%,93.976% 3.061%,95.737% 4.637%,97.223% 6.466%,98.402% 8.515%,99.239% 10.747%,99.701% 13.129%,99.755% 15.623%,95.278% 86.212%,95.278% 86.212%,94.954% 88.481%,94.296% 90.622%,93.333% 92.608%,92.091% 94.413%,90.601% 96.012%,88.888% 97.379%,86.982% 98.486%,84.91% 99.31%,82.7% 99.823%,80.381% 100%,15.141% 100%,15.141% 100%,12.617% 99.791%,10.234% 99.188%,8.025% 98.225%,6.024% 96.939%,4.263% 95.363%,2.777% 93.533%,1.598% 91.485%,0.761% 89.252%,0.299% 86.871%,0.245% 84.376%,4.722% 13.789% );\r\n\t\tanimation: orbite 60s linear infinite;\r\n\t\t@media (max-width: $mbpSPCEnd) {\r\n\t\t\twidth: 110px;\r\n\t\t\theight: 110px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\twidth: 90px;\r\n\t\t\theight: 90px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\twidth: 80px;\r\n\t\t\theight: 80px;\r\n\t\t}\r\n\t\t@media (max-width: 420px) {\r\n\t\t\twidth: 65px;\r\n\t\t\theight: 65px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpESMEnd) {\r\n\t\t\twidth: 55px;\r\n\t\t\theight: 55px;\r\n\t\t}\r\n\t\t&:first-child {\r\n\t\t\tposition: static;\r\n\t\t}\r\n\t\t& > img {\r\n\t\t\twidth: 59%;\r\n\t\t\theight: 59%;\r\n\t\t}\r\n\t}\r\n}\r\n.profile {\r\n\tmargin-bottom: 120px;\r\n\t@media (max-width: $mbpTEnd) {\r\n\t\tmargin-bottom: 80px;\r\n\t}\r\n\t@media (max-width: $mbpMEnd) {\r\n\t\tmargin-bottom: 60px;\r\n\t}\r\n\t&__main {\r\n\t\tposition: relative;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\tz-index: 0;\r\n\t\tpadding: 40px 0;\r\n\t\tfont-size: 10px;\r\n\t\tmargin-bottom: 35px;\r\n\t\t@media (min-width: $mbpSMStart) and (max-width: $mbpPCEnd) {\r\n\t\t\tfont-size: aval(6, 10, 0, $mbpSMEndNu, $mbpPCEndNu);\r\n\t\t}\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\tfont-size: 6px;\r\n\t\t\tpadding: 20px 0 40px;\r\n\t\t}\r\n\t\t&::before {\r\n\t\t\tcontent: \"\";\r\n\t\t\tposition: absolute;\r\n\t\t\tleft: 0;\r\n\t\t\ttop: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 108%;\r\n\t\t\tz-index: -2;\r\n\t\t\tbackground-color: #C279FF;\r\n\t\t\tclip-path: polygon(calc(100% - 0px) 0px, 0px 0px, 0px calc(100% - 170.208px), 0px calc(100% - 170.208px), 0.7008518px calc(100% - 161.020965px), 2.7364384px calc(100% - 152.25564px), 6.0063066px calc(100% - 144.021195px), 10.4100032px calc(100% - 136.4268px), 15.847075px calc(100% - 129.581625px), 22.2170688px calc(100% - 123.59484px), 29.4195314px calc(100% - 118.575615px), 37.3540096px calc(100% - 114.63312px), 45.9200502px calc(100% - 111.876525px), 55.0172px calc(100% - 110.415px), calc(100% - 64.98px) calc(100% - 0.41499999999996px), calc(100% - 64.98px) calc(100% - 0.41499999999996px), calc(100% - 54.66042px) calc(100% - 0.43310499999984px), calc(100% - 44.78976px) calc(100% - 2.1443199999999px), calc(100% - 35.51814px) calc(100% - 5.4104950000001px), calc(100% - 26.99568px) calc(100% - 10.09348px), calc(100% - 19.3725px) calc(100% - 16.055125px), calc(100% - 12.79872px) calc(100% - 23.15728px), calc(100% - 7.4244600000002px) calc(100% - 31.261795px), calc(100% - 3.39984px) calc(100% - 40.23052px), calc(100% - 0.87498000000005px) calc(100% - 49.925305px), calc(100% - 2.2737367544323E-13px) calc(100% - 60.208px), calc(100% - 0px) 0px); \r\n\t\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\t\tclip-path: polygon(calc(100% - 0px) 0px, 0px 0px, 0px calc(100% - 107.836px), 0px calc(100% - 107.836px), 0.6049094px calc(100% - 99.307173px), 2.3685232px calc(100% - 91.116824px), 5.2141698px calc(100% - 83.357251px), 9.0651776px calc(100% - 76.120752px), 13.844875px calc(100% - 69.499625px), 19.4765904px calc(100% - 63.586168px), 25.8836522px calc(100% - 58.472679px), 32.9893888px calc(100% - 54.251456px), 40.7171286px calc(100% - 51.014797px), 48.9902px calc(100% - 48.855px), calc(100% - 71.01px) calc(100% - 1.255px), calc(100% - 71.01px) calc(100% - 1.255px), calc(100% - 60.052347px) calc(100% - 0.21840199999986px), calc(100% - 49.451136px) calc(100% - 1.1386559999999px), calc(100% - 39.394089px) calc(100% - 3.8598340000001px), calc(100% - 30.068928px) calc(100% - 8.226008px), calc(100% - 21.663375px) calc(100% - 14.08125px), calc(100% - 14.365152px) calc(100% - 21.269632px), calc(100% - 8.361981px) calc(100% - 29.635226px), calc(100% - 3.841584px) calc(100% - 39.022104px), calc(100% - 0.99168299999997px) calc(100% - 49.274338px), calc(100% - 5.6843418860808E-14px) calc(100% - 60.236px), calc(100% - 0px) 0px);\r\n\t\t\t}\r\n\t\t}\r\n\t\t&::after {\r\n\t\t\tcontent: \"\";\r\n\t\t\tposition: absolute;\r\n\t\t\tleft: 0;\r\n\t\t\ttop: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t\tz-index: -1;\r\n\t\t\tbackground: linear-gradient(103deg, #161616 0%, #260046 22.26%, #280048 43.04%, #370065 56.08%, #2A004D 71.88%, #21003C 100%);\r\n\t\t\tclip-path: polygon(calc(100% - 0px) 0px, 0px 0px, 0px calc(100% - 143.367px), 0px calc(100% - 143.367px), 0.7214104px calc(100% - 134.044416px), 2.8150472px calc(100% - 125.162208px), 6.1750188px calc(100% - 116.833092px), 10.6954336px calc(100% - 109.169784px), 16.2704px calc(100% - 102.285px), 22.7940264px calc(100% - 96.291456px), 30.1604212px calc(100% - 91.301868px), 38.2636928px calc(100% - 87.428952px), 46.9979496px calc(100% - 84.785424px), 56.2573px calc(100% - 83.484px), calc(100% - 63.74px) calc(100% - 0.98400000000004px), calc(100% - 63.74px) calc(100% - 0.98400000000004px), calc(100% - 53.56206px) calc(100% - 1.201644px), calc(100% - 43.84768px) calc(100% - 3.060312px), calc(100% - 34.74002px) calc(100% - 6.425508px), calc(100% - 26.38224px) calc(100% - 11.162736px), calc(100% - 18.9175px) calc(100% - 17.1375px), calc(100% - 12.48896px) calc(100% - 24.215304px), calc(100% - 7.2397800000001px) calc(100% - 32.261652px), calc(100% - 3.31312px) calc(100% - 41.142048px), calc(100% - 0.85214000000019px) calc(100% - 50.721996px), calc(100% - 2.2737367544323E-13px) calc(100% - 60.867px), calc(100% - 0px) 0px);\r\n\t\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\t\tclip-path: polygon(calc(100% - 0px) 0px, 0px 0px, 0px calc(100% - 94.531px), 0px calc(100% - 94.531px), 0.6531388px calc(100% - 85.665557px), 2.5536944px calc(100% - 77.179656px), 5.6133756px calc(100% - 69.174139px), 9.7438912px calc(100% - 61.749848px), 14.85695px calc(100% - 55.007625px), 20.8642608px calc(100% - 49.048312px), 27.6775324px calc(100% - 43.972751px), 35.2084736px calc(100% - 39.881784px), 43.3687932px calc(100% - 36.876253px), 52.0702px calc(100% - 35.057px), calc(100% - 67.93px) calc(100% - 1.057px), calc(100% - 67.93px) calc(100% - 1.057px), calc(100% - 57.287493px) calc(100% - 0.57709499999987px), calc(100% - 47.053184px) calc(100% - 1.9170799999998px), calc(100% - 37.394791px) calc(100% - 4.930105px), calc(100% - 28.480032px) calc(100% - 9.46932px), calc(100% - 20.476625px) calc(100% - 15.387875px), calc(100% - 13.552288px) calc(100% - 22.53892px), calc(100% - 7.874739px) calc(100% - 30.775605px), calc(100% - 3.6116959999999px) calc(100% - 39.95108px), calc(100% - 0.93087699999995px) calc(100% - 49.918495px), calc(100% - 5.6843418860808E-14px) calc(100% - 60.531px), calc(100% - 0px) 0px);\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\t&__container {\r\n\t\tdisplay: grid;\r\n\t\tgrid-template-columns: 0.55fr 1fr;\r\n\t\tgrid-template-rows: repeat(4, auto) 1fr;\r\n\t\tgap: 0 25px;\r\n\t\tjustify-content: space-between;\r\n\t\tjustify-items: start;\r\n\t\talign-items: start;\r\n\t\t@media (max-width: $mbpTEnd) {\r\n\t\t\tgrid-template-columns: 0.7fr 1fr;\r\n\t\t}\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tgrid-template-columns: 0.8fr 1fr;\r\n\t\t}\r\n\t\t@media (max-width: 710px) {\r\n\t\t\tgrid-template-rows: auto auto auto minmax(min-content, 100%) 1fr;\r\n\t\t\tgap: 0 15px;\r\n\t\t}\r\n\t\t@media (max-width: 580px) {\r\n\t\t\tgrid-template-rows: auto auto minmax(min-content, 100%) auto 1fr;\r\n\t\t}\r\n\t\t@media (max-width: 500px) {\r\n\t\t\tgrid-template-rows: auto minmax(min-content, 100%) auto auto 1fr;\r\n\t\t}\r\n\t}\r\n\t&__photo {\r\n\t\tjustify-self: stretch;\r\n\t\talign-self: start;\r\n\t\tgrid-row: auto/span 5;\r\n\t\tpadding-top: 107%;\r\n\t\tclip-path: polygon(77.8053px 0.5px, calc(100% - 44.472px) 0.5px, calc(100% - 44.472px) 0.5px, calc(100% - 37.702508px) 1.0760573px, calc(100% - 31.320064px) 2.7383384px, calc(100% - 25.415616px) 5.3880071px, calc(100% - 20.080112px) 8.9262272px, calc(100% - 15.4045px) 13.2541625px, calc(100% - 11.479728px) 18.2729768px, calc(100% - 8.396744px) 23.8838339px, calc(100% - 6.246496px) 29.9878976px, calc(100% - 5.119932px) 36.4863317px, calc(100% - 5.108px) 43.2803px, calc(100% - 38.442px) calc(100% - 44.72px), calc(100% - 38.442px) calc(100% - 44.72px), calc(100% - 39.404061px) calc(100% - 38.730901px), calc(100% - 41.218728px) calc(100% - 33.091488px), calc(100% - 43.814127px) calc(100% - 27.867887px), calc(100% - 47.118384px) calc(100% - 23.126224px), calc(100% - 51.059625px) calc(100% - 18.932625px), calc(100% - 55.565976px) calc(100% - 15.353216px), calc(100% - 60.565563px) calc(100% - 12.454123px), calc(100% - 65.986512px) calc(100% - 10.301472px), calc(100% - 71.756949px) calc(100% - 8.961389px), calc(100% - 77.805px) calc(100% - 8.5px), 44.472px calc(100% - 8.5px), 44.472px calc(100% - 8.5px), 37.70249276px calc(100% - 9.0760569999999px), 31.32005968px calc(100% - 10.738336px), 25.41564372px calc(100% - 13.387999px), 20.08018784px calc(100% - 16.926208px), 15.404635px calc(100% - 21.254125px), 11.47992816px calc(100% - 26.272912px), 8.39701028px calc(100% - 31.883731px), 6.24682432px calc(100% - 37.987744px), 5.12031324px calc(100% - 44.486113px), 5.10842px calc(100% - 51.28px), 38.4418px 36.7197px, 38.4418px 36.7197px, 39.4038615px 30.7307309px, 41.218532px 25.0914112px, 43.8139405px 19.8678723px, 47.118216px 15.1262456px, 51.0594875px 10.9326625px, 55.565884px 7.3532544px, 60.5655345px 4.4541527px, 65.986568px 2.3014888px, 71.7571135px 0.9613941px, 77.8053px 0.5px);\r\n\t\tmargin-bottom: 30px;\r\n\t\t@media (max-width: $mbpTEnd) {\r\n\t\t\tmargin-bottom: 20px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tpadding-top: 120%;\r\n\t\t}\r\n\t\t@media (max-width: 710px) {\r\n\t\t\tclip-path: polygon(31.7615px 0.5px, calc(100% - 20.763px) 0.5px, calc(100% - 20.763px) 0.5px, calc(100% - 17.418385px) 0.7848366px, calc(100% - 14.26532px) 1.6067248px, calc(100% - 11.348775px) 2.9167322px, calc(100% - 8.71372px) 4.6659264px, calc(100% - 6.405125px) 6.805375px, calc(100% - 4.46796px) 9.2861456px, calc(100% - 2.947195px) 12.0593058px, calc(100% - 1.8878px) 15.0759232px, calc(100% - 1.334745px) 18.2870654px, calc(100% - 1.333px) 21.6438px, calc(100% - 12.331px) calc(100% - 18.356px), calc(100% - 12.331px) calc(100% - 18.356px), calc(100% - 12.808998px) calc(100% - 15.402704px), calc(100% - 13.706984px) calc(100% - 12.622112px), calc(100% - 14.989546px) calc(100% - 10.046768px), calc(100% - 16.621272px) calc(100% - 7.709216px), calc(100% - 18.56675px) calc(100% - 5.642px), calc(100% - 20.790568px) calc(100% - 3.877664px), calc(100% - 23.257314px) calc(100% - 2.448752px), calc(100% - 25.931576px) calc(100% - 1.387808px), calc(100% - 28.777942px) calc(100% - 0.72737599999999px), calc(100% - 31.761px) calc(100% - 0.50000000000003px), 20.7634px calc(100% - 0.5px), 20.7634px calc(100% - 0.5px), 17.418780086px calc(100% - 0.78482599999998px), 14.265704928px calc(100% - 1.606688px), 11.349142402px calc(100% - 2.916662px), 8.714060384px calc(100% - 4.665824px), 6.40542675px calc(100% - 6.80525px), 4.468209376px calc(100% - 9.286016px), 2.947376138px calc(100% - 12.059198px), 1.887894912px calc(100% - 15.075872px), 1.334733574px calc(100% - 18.287114px), 1.33286px calc(100% - 21.644px), 12.3309px 18.3562px, 12.3309px 18.3562px, 12.808931px 15.40282793px, 13.706956px 12.62217984px, 14.989563px 10.04679691px, 16.62134px 7.70922032px, 18.566875px 5.64199125px, 20.790756px 3.87765088px, 23.257571px 2.44874039px, 25.931908px 1.38780096px, 28.778355px 0.72737377px, 31.7615px 0.5px); \r\n\t\t}\r\n\t\t@media (max-width: 600px) {\r\n\t\t\tgrid-row: auto/span 4;\r\n\t\t}\r\n\t\t@media (max-width: 580px) {\r\n\t\t\tpadding-top: 107%;\r\n\t\t\tgrid-row: auto/span 3;\r\n\t\t}\r\n\t\t@media (max-width: 500px) {\r\n\t\t\tgrid-row: auto/span 2;\r\n\t\t}\r\n\t}\r\n\t&__name {\r\n\t\tcolor: var(--white, #FFF);\r\n\t\tfont-family: Thunder;\r\n\t\tfont-size: 7em;\r\n\t\tfont-weight: 700;\r\n\t\tline-height: 128.571%;\r\n\t\tmargin-bottom: 10px;\r\n\t\t@media (max-width: $mbpTEnd) {\r\n\t\t\tmargin-bottom: 0;\r\n\t\t}\r\n\t\t@media (max-width: 580px) {\r\n\t\t\tmargin-bottom: 15px;\r\n\t\t}\r\n\t\t@media (max-width: 440px) {\r\n\t\t\tline-height: 1;\r\n\t\t}\r\n\t\t@media (max-width: 340px) {\r\n\t\t\tfont-size: 32px;\r\n\t\t}\r\n\t}\r\n\t&__title {\r\n\t\tcolor: var(--green-new, #9DF850);\r\n\t\tfont-family: Thunder;\r\n\t\tfont-size: 5em;\r\n\t\tfont-weight: 700;\r\n\t\tmargin-bottom: 20px;\r\n\t\t@media (max-width: $mbpTEnd) {\r\n\t\t\tmargin-bottom: 15px;\r\n\t\t}\r\n\t\t@media (max-width: 440px) {\r\n\t\t\tfont-size: 26px;\r\n\t\t}\r\n\t\t@media (max-width: 340px) {\r\n\t\t\tfont-size: 20px;\r\n\t\t}\r\n\t}\r\n\t&__experience {\r\n\t\tcolor: var(--white, #FFF);\r\n\t\tfont-family: Montserrat;\r\n\t\tfont-size: 3em;\r\n\t\tfont-weight: 600;\r\n\t\tmargin-bottom: 20px;\r\n\t\t@media (max-width: $mbpTEnd) {\r\n\t\t\tmargin-bottom: 15px;\r\n\t\t}\r\n\t\t@media (max-width: 500px) {\r\n\t\t\tgrid-column: auto/span 2;\r\n\t\t}\r\n\t}\r\n\t&__areas {\r\n\t\tcolor: var(--white, #FFF);\r\n\t\tfont-family: Montserrat;\r\n\t\tfont-size: 2.4em;\r\n\t\tline-height: 1.8;\r\n\t\tmargin-bottom: 30px;\r\n\t\t@media (max-width: $mbpTEnd) {\r\n\t\t\tmargin-bottom: 20px;\r\n\t\t}\r\n\t\t@media (max-width: 580px) {\r\n\t\t\tgrid-column: auto/span 2;\r\n\t\t}\r\n\t}\r\n\t&__areas-term {\r\n\t\tcolor: var(--green-new, #9DF850);\r\n\t\tfont-weight: 600;\r\n\t}\r\n\t&__download-btn {\r\n\t\t@media (max-width: 710px) {\r\n\t\t\tjustify-self: end;\r\n\t\t}\r\n\t\t@media (max-width: 600px) {\r\n\t\t\tgrid-column: auto/span 2;\r\n\t\t\tjustify-self: center;\r\n\t\t}\r\n\t}\r\n\t&__skills-rates {\r\n\t\tmargin-bottom: 80px;\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tmargin-bottom: 60px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\tmargin-bottom: 40px;\r\n\t\t}\r\n\t}\r\n\t&__skills-cloud {\r\n\t\tmax-width: 800px;\r\n\t\tmargin: auto;\r\n\t\t@media (max-width: $mbpTEnd) {\r\n\t\t\t--base-distance: 230px;\r\n\t\t\tmax-width: 600px;\r\n\t\t\tmargin: auto;\r\n\t\t}\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\t--base-distance: 190px;\r\n\t\t\tmax-width: 500px;\r\n\t\t\tmargin: auto;\r\n\t\t}\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\t--base-distance: 160px;\r\n\t\t}\r\n\t\t@media (max-width: 420px) {\r\n\t\t\t--base-distance: 130px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpESMEnd) {\r\n\t\t\t--base-distance: 100px;\r\n\t\t}\r\n\t}\r\n}\r\n@keyframes orbite {\r\n\t0% {\r\n\t\ttransform: rotateZ(var(--placing-degree)) translateX(calc(var(--base-distance) + var(--base-distance) * var(--distance-shift))) rotateZ(calc(0deg - var(--placing-degree)));\r\n\t}\r\n\t100% {\r\n\t\ttransform: rotateZ(calc(360deg + var(--placing-degree))) translateX(calc(var(--base-distance) + var(--base-distance) * var(--distance-shift))) rotateZ(calc(-360deg - var(--placing-degree)));\r\n\t}\r\n}",".steps {\r\n\t&__container {\r\n\t}\r\n\t&__title {\r\n\t\tmax-width: 800px;\r\n\t\tcolor: transparent;\r\n\t\tfont-family: Thunder;\r\n\t\tfont-size: 90px;\r\n\t\tfont-style: normal;\r\n\t\tfont-weight: 800;\r\n\t\tbackground: linear-gradient(307deg, #161616 0%, #260046 18.82%, #2A004E 36.26%, #500092 56.78%, #3A006A 75.58%, #2A004E 88.57%, #2A004E 100%);\r\n\t\tbackground-clip: text;\r\n\t\t-webkit-background-clip: text;\r\n\t\t-webkit-text-fill-color: transparent;\r\n\t\tmargin-bottom: 60px;\r\n\t\t@media (min-width: $mbpSMStart) and (max-width: $mbpPCEnd) {\r\n\t\t\tfont-size: aval(42, 90, 0, $mbpSMStartNu, $mbpPCEndNu);\r\n\t\t\tmax-width: aval(260, 800, 0, $mbpSMStartNu, $mbpPCEndNu);\r\n\t\t}\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\tfont-size: 42px;\r\n\t\t\tmax-width: 260px;\r\n\t\t}\r\n\t\t@media (min-width: 280px) and (max-width: $mbpSMEnd) {\r\n\t\t\tmax-width: aval(200, 260, 0, 280, $mbpSMEndNu);\r\n\t\t}\r\n\t\t@media (max-width: 280px) {\r\n\t\t\tmax-width: 200px;\r\n\t\t}\r\n\t}\r\n\t&__cards {\r\n\t\t\r\n\t}\r\n\t&__decor {\r\n\t\tposition: absolute;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\ttop: -33em;\r\n\t\tz-index: -1;\r\n\t\twidth: 100%;\r\n\t\theight: calc(100% + 33em);\r\n\t\tfont-size: 10px;\r\n\t\toverflow: hidden;\r\n\t\t@media (min-width: $mbpTStart) and (max-width: $mbpPCEnd) {\r\n\t\t\tfont-size: aval(4, 10, 0, $mbpTStartNu, $mbpPCEndNu);\r\n\t\t}\r\n\t\t@media (min-width: 280px) and (max-width: $mbpMEnd) {\r\n\t\t\tfont-size: aval(3, 10, 0, 280, $mbpTEndNu);\r\n\t\t}\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\ttop: -50em;\r\n\t\t\theight: calc(100% + 50em);\r\n\t\t}\r\n\t\t@media (max-width: 280px) {\r\n\t\t\tfont-size: 3px;\r\n\t\t}\r\n\t\t&::before {\r\n\t\t\tcontent: \"\";\r\n\t\t\tposition: absolute;\r\n\t\t\tleft: 0;\r\n\t\t\ttop: 0;\r\n\t\t\twidth: 105%;\r\n\t\t\theight: 100%;\r\n\t\t\tbackground: url(../img/static/steps-bg.svg) top center / cover no-repeat;\r\n\t\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\t\tbackground-image: url(../img/static/steps-bg-mob.svg);\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\t&__body {\r\n\t\tposition: relative;\r\n\t\tleft: 0;\r\n\t\ttop: 0;\r\n\t\tz-index: 0;\r\n\t\tpadding: 60px 0;\r\n\t\t@media (max-width: $mbpSPCEnd) {\r\n\t\t\tpadding-top: 40px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tpadding-bottom: 50px;\r\n\t\t}\r\n\t}\r\n}\r\n.step-cards-layout {\r\n\t&__inner {\r\n\t\tdisplay: flex;\r\n\t\tflex-wrap: wrap;\r\n\t\tjustify-content: center;\r\n\t\tmargin: -20px;\r\n\t\t@media (max-width: $mbpSPCEnd) {\r\n\t\t\tmargin: -20px -10px;\r\n\t\t}\r\n\t\t@media (max-width: 1200px) {\r\n\t\t\tmargin: -15px -5px;\r\n\t\t}\r\n\t\t& > * {\r\n\t\t\tflex: 0 0 calc(100% / 3);\r\n\t\t\tpadding: 20px;\r\n\t\t\tfilter: drop-shadow(0 0 60px rgba(21, 0, 38, 0.40));\r\n\t\t\t@media (max-width: $mbpSPCEnd) {\r\n\t\t\t\tpadding: 20px 10px;\r\n\t\t\t}\r\n\t\t\t@media (max-width: 1200px) {\r\n\t\t\t\tpadding: 15px 5px;\r\n\t\t\t}\r\n\t\t\t@media (max-width: $mbpTEnd) {\r\n\t\t\t\tflex: 0 0 50%;\r\n\t\t\t}\r\n\t\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\t\tflex: 0 0 100%;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n.step-card {\r\n\tbackground-color: white;\r\n\tclip-path: polygon(16.0633px 21.8844px, 16.0633px 21.8844px, 16.6633191px 18.26171001px, 17.7767768px 14.85199488px, 19.3603537px 11.69490987px, 21.3707304px 8.83011024px, 23.7645875px 6.29725125px, 26.4986056px 4.13598816px, 29.5294653px 2.38597623px, 32.8138472px 1.08687072px, 36.3084319px 0.27832689px, 39.9699px 3.5121085902523E-31px, calc(100% - 24.218px) 0px, calc(100% - 24.218px) 0px, calc(100% - 20.0912px) 0.3522918px, calc(100% - 16.20188px) 1.3686624px, calc(100% - 12.60566px) 2.9883546px, calc(100% - 9.3581599999999px) 5.1506112px, calc(100% - 6.515px) 7.794675px, calc(100% - 4.1318px) 10.8597888px, calc(100% - 2.26418px) 14.2851954px, calc(100% - 0.96776px) 18.0101376px, calc(100% - 0.29816000000005px) 21.9738582px, calc(100% - 0.31100000000004px) 26.1156px, calc(100% - 16.063px) calc(100% - 21.884px), calc(100% - 16.063px) calc(100% - 21.884px), calc(100% - 16.662979px) calc(100% - 18.26145px), calc(100% - 17.776432px) calc(100% - 14.85184px), calc(100% - 19.360033px) calc(100% - 11.69483px), calc(100% - 21.370456px) calc(100% - 8.83008px), calc(100% - 23.764375px) calc(100% - 6.29725px), calc(100% - 26.498464px) calc(100% - 4.136px), calc(100% - 29.529397px) calc(100% - 2.38599px), calc(100% - 32.813848px) calc(100% - 1.08688px), calc(100% - 36.308491px) calc(100% - 0.27832999999998px), calc(100% - 39.97px) calc(100% - 0px), 24.2177px calc(100% - 0px), 24.2177px calc(100% - 0px), 20.09093495px calc(100% - 0.35230299999998px), 16.20165812px calc(100% - 1.368704px), 12.60548699px calc(100% - 2.988441px), 9.35803904px calc(100% - 5.150752px), 6.51493175px calc(100% - 7.794875px), 4.1317826px calc(100% - 10.860048px), 2.26420907px calc(100% - 14.285509px), 0.96782864px calc(100% - 18.010496px), 0.29825879px calc(100% - 21.974247px), 0.311117px calc(100% - 26.116px), 16.0633px 21.8844px);\r\n\tpadding: 30px 38px 30px 38px;\r\n\tmin-height: 100%;\r\n\t@media (max-width: 1200px) {\r\n\t\tpadding: 25px 30px 25px 30px;\r\n\t}\r\n\t&__name {\r\n\t\tcolor: #3F0173;\r\n\t\tfont-family: Thunder;\r\n\t\tfont-size: 42px;\r\n\t\tfont-style: italic;\r\n\t\tfont-weight: 700;\r\n\t\tletter-spacing: 0.84px;\r\n\t\tmargin-bottom: 16px;\r\n\t\t@media (max-width: $mbpSPCEnd) {\r\n\t\t\tfont-size: 36px;\r\n\t\t}\r\n\t\t@media (max-width: 1200px) {\r\n\t\t\tfont-size: 32px;\r\n\t\t}\r\n\t}\r\n\t&__text {\r\n\t\tcolor: #212121;\r\n\t\tfont-family: Montserrat;\r\n\t\tfont-size: 18px;\r\n\t\tline-height: 133%; /* 133.333% */\r\n\t\t@media (max-width: 1200px) {\r\n\t\t\tfont-size: 16px;\r\n\t\t}\r\n\t}\r\n\t& .text-btn {\r\n\t\t--color: #A335FF;\r\n\t\t--font-size: 18px;\r\n\t\tfont-family: Montserrat;\r\n\t\tline-height: 24px;\r\n\t\ttext-decoration: underline;\r\n\t}\r\n}",".contact-form-section {\r\n\tpadding-top: 120px;\r\n\tpadding-bottom: 40px;\r\n\t@media (max-width: $mbpTEnd) {\r\n\t\tpadding-top: 80px;\r\n\t\tpadding-bottom: 10px;\r\n\t}\r\n\t@media (max-width: $mbpMEnd) {\r\n\t\tpadding-top: 60px;\r\n\t\tpadding-bottom: 50px;\r\n\t}\r\n\t&__container {\r\n\t\tdisplay: grid;\r\n\t\tgrid-template-columns: 1fr minmax(max-content, 1fr);\r\n\t\tgap: 120px;\r\n\t\t@media (max-width: $mbpPCEnd) {\r\n\t\t\tgap: 100px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpTEnd) {\r\n\t\t\tgrid-template-columns: 1fr 1fr;\r\n\t\t\tgap: 60px;\r\n\t\t}\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tgrid-template-columns: 1fr;\r\n\t\t\tgap: 40px;\r\n\t\t\tmax-width: 600px;\r\n\t\t}\r\n\t}\r\n\t&__title {\r\n\t\tfont-family: Thunder;\r\n\t\tfont-size: 70px;\r\n\t\tfont-weight: 800;\r\n\t\tbackground: linear-gradient(307deg, #161616 0%, #260046 18.82%, #2A004E 36.26%, #500092 56.78%, #3A006A 75.58%, #2A004E 88.57%, #2A004E 100%);\r\n\t\tbackground-clip: text;\r\n\t\t-webkit-background-clip: text;\r\n\t\t-webkit-text-fill-color: transparent;\r\n\t\tpadding-top: 20px;\r\n\t\t@media (min-width: $mbpSMStart) and (max-width: $mbpPCEnd) {\r\n\t\t\tfont-size: aval(42, 70, 0, $mbpSMEndNu, $mbpPCEndNu);\r\n\t\t}\r\n\t\t@media (max-width: $mbpSMEnd) {\r\n\t\t\tfont-size: 42px;\r\n\t\t}\r\n\t}\r\n\t&__form {\r\n\t\t\r\n\t}\r\n}\r\n.contact-form {\r\n\t&__body {\r\n\t\tdisplay: grid;\r\n\t\tgap: 30px;\r\n\t}\r\n\t&__msg-container {\r\n\t\tmargin: 15px auto;\r\n\t}\r\n\t&__msg {\r\n\t\tdisplay: flex;\r\n\t\talign-items: center;\r\n\t\tmax-width: 500px;\r\n\t\ttext-align: center;\r\n\t\tfont-family: Montserrat;\r\n\t\tfont-size: 14px;\r\n\t\tbackground: #FFF;\r\n\t\tborder-radius: 10px;\r\n\t\tbox-shadow: 0px 4px 66px 0px rgba(32, 6, 70, 0.16);\r\n\t\tpadding: 10px 20px;\r\n\t\tmargin: 0 auto;\r\n\t\t&_error {\r\n\t\t\tcolor: #FF1D53;\r\n\t\t}\r\n\t\t&_success {\r\n\t\t\tcolor: #9935EC;\r\n\t\t}\r\n\t}\r\n\t&__bottom-inner {\r\n\t\tdisplay: flex;\r\n\t\tflex-wrap: wrap;\r\n\t\tjustify-content: center;\r\n\t\tmargin-left: -20px;\r\n\t\tmargin-top: -12px;\r\n\t\t@media (max-width: $mbpTEnd) {\r\n\t\t\tflex-direction: column;\r\n\t\t\talign-items: center;\r\n\t\t}\r\n\t\t@media (max-width: $mbpMEnd) {\r\n\t\t\tflex-direction: row;\r\n\t\t}\r\n\t\t@media (max-width: 575px) {\r\n\t\t\tflex-direction: column;\r\n\t\t}\r\n\t\t& > * {\r\n\t\t\tmargin-left: 20px;\r\n\t\t\tmargin-top: 12px;\r\n\t\t}\r\n\t}\r\n\t&__separator {\r\n\t\tdisplay: flex;\r\n\t\talign-items: center;\r\n\t\tcolor: #C279FF;\r\n\t\tfont-family: Thunder;\r\n\t\tfont-size: 30px;\r\n\t\tfont-weight: 700;\r\n\t\tletter-spacing: 0.6px;\r\n\t\t&::before, &::after {\r\n\t\t\tcontent: \"\";\r\n\t\t\twidth: 35px;\r\n\t\t\theight: 1.2px;\r\n\t\t\tbackground-color: #C279FF;\r\n\t\t}\r\n\t\t&::before {\r\n\t\t\tmargin-right: 10px;\r\n\t\t}\r\n\t\t&::after {\r\n\t\t\tmargin-left: 10px;\r\n\t\t}\r\n\t}\r\n\t&__send-btn {\r\n\t\t\r\n\t}\r\n\t&__call-btn {\r\n\r\n\t}\r\n}\r\n.form-field {\r\n\tposition: relative;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\t&__label {\r\n\t\tposition: absolute;\r\n\t\tleft: 15px;\r\n\t\tbottom: calc(100% - 1em);\r\n\t\tfont-family: Montserrat;\r\n\t\tfont-size: 16px;\r\n\t\tfont-weight: 600;\r\n\t\ttransition: opacity 0.4s, top 0.4s, bottom 0.4s;\r\n\t}\r\n\t&.error &__label {\r\n\t\tcolor: #FF1D53;\r\n\t}\r\n\t&.child-input-is-filled &__label {\r\n\t\tbottom: calc(100% + 5px);\r\n\t\topacity: 1;\r\n\t}\r\n\t&__input {\r\n\t\t& input, & textarea {\r\n\t\t\twidth: 100%;\r\n\t\t\tcolor: var(--white, #FFF);\r\n\t\t\tfont-family: Montserrat;\r\n\t\t\tfont-size: 18px;\r\n\t\t\tpadding: 12px 24px;\r\n\t\t\tbackground: linear-gradient(135deg, #161616 0%, #260046 14.94%, #2A004E 37.47%, #500092 64.84%, #3A006A 100%, #2A004E 100%);\r\n\t\t\tclip-path: polygon(7.97274px 4.72542px, 7.97274px 4.72542px, 8.20639585px 3.92288265px, 8.5417712px 3.1748544px, 8.97010875px 2.48839395px, 9.4826512px 1.87056px, 10.07064125px 1.32841125px, 10.7253216px 0.8690064px, 11.43793495px 0.49940415px, 12.199724px 0.2266632px, 13.00193145px 0.05784225px, 13.8358px 7.2746164229636E-32px, calc(100% - 6.444px) 0px, calc(100% - 6.444px) 0px, calc(100% - 5.3279239999999px) 0.10271337px, calc(100% - 4.2866319999997px) 0.39753456px, calc(100% - 3.3362279999999px) 0.86448519px, calc(100% - 2.4928160000001px) 1.48358688px, calc(100% - 1.7725px) 2.23486125px, calc(100% - 1.191384px) 3.09832992px, calc(100% - 0.76557200000002px) 4.05401451px, calc(100% - 0.511168px) 5.08193664px, calc(100% - 0.44427600000006px) 6.16211793px, calc(100% - 0.58100000000013px) 7.27458px, calc(100% - 7.973px) calc(100% - 4.7254px), calc(100% - 7.973px) calc(100% - 4.7254px), calc(100% - 8.2064999999999px) calc(100% - 3.9228705px), calc(100% - 8.5417599999998px) calc(100% - 3.174848px), calc(100% - 8.97002px) calc(100% - 2.4883915px), calc(100% - 9.4825199999999px) calc(100% - 1.87056px), calc(100% - 10.0705px) calc(100% - 1.3284125px), calc(100% - 10.7252px) calc(100% - 0.869008px), calc(100% - 11.43786px) calc(100% - 0.49940550000001px), calc(100% - 12.19972px) calc(100% - 0.226664px), calc(100% - 13.00202px) calc(100% - 0.0578425px), calc(100% - 13.836px) calc(100% - 7.105427357601E-15px), 6.44447px calc(100% - 0px), 6.44447px calc(100% - 0px), 5.328353973px calc(100% - 0.1027142px), 4.287036304px calc(100% - 0.39753759999999px), 3.336618611px calc(100% - 0.8644914px), 2.493202512px calc(100% - 1.4835968px), 1.772889625px calc(100% - 2.234875px), 1.191781568px calc(100% - 3.0983472px), 0.765979959px calc(100% - 4.0540346px), 0.511586416px calc(100% - 5.0819584px), 0.444702557px calc(100% - 6.1621398px), 0.58143px calc(100% - 7.2746px), 7.97274px 4.72542px);\r\n\t\t\ttransition: color 0.4s;\r\n\t\t\t&::placeholder {\r\n\t\t\t\tcolor: var(--text-not-filled-team, #AEAEAE);\r\n\t\t\t\tfont-family: Montserrat;\r\n\t\t\t\tfont-size: 18px;\r\n\t\t\t}\r\n\t\t}\r\n\t\t\r\n\t}\r\n\t&.error &__input {\r\n\t\t& input, & textarea {\r\n\t\t\tcolor: #FF1D53;\r\n\t\t}\r\n\t}\r\n\t& .error {\r\n\t\tdisplay: inline-block;\r\n\t\tcolor: #FF1D53;\r\n\t\tfont-family: Montserrat;\r\n\t\tfont-size: 14px;\r\n\t\tmargin-top: 8px;\r\n\t\tmargin-left: 10px;\r\n\t}\r\n}\r\n.form-input {\r\n\t&__wrap {\r\n\t}\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/scss/pages/home/index.scss":
/*!****************************************!*\
  !*** ./src/scss/pages/home/index.scss ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/string-replace-loader/index.js??ruleSet[1].rules[1].use[1]!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./index.scss */ "./node_modules/string-replace-loader/index.js??ruleSet[1].rules[1].use[1]!./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scss/pages/home/index.scss");

      
      
      
      
      
      
      
      
      

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
      /*! !!../../../../node_modules/string-replace-loader/index.js??ruleSet[1].rules[1].use[1]!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./index.scss */ "./node_modules/string-replace-loader/index.js??ruleSet[1].rules[1].use[1]!./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scss/pages/home/index.scss",
      function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _node_modules_string_replace_loader_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/string-replace-loader/index.js??ruleSet[1].rules[1].use[1]!../../../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!../../../../node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./index.scss */ "./node_modules/string-replace-loader/index.js??ruleSet[1].rules[1].use[1]!./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scss/pages/home/index.scss");
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

/***/ "./src/js/pages/home/index.js":
/*!************************************!*\
  !*** ./src/js/pages/home/index.js ***!
  \************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/ModuleManager/index.js */ "./src/js/shared/ModuleManager/index.js");
/* harmony import */ var _store_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store/index.js */ "./src/js/pages/home/store/index.js");
/* harmony import */ var _sliders_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sliders.js */ "./src/js/pages/home/sliders.js");
/* harmony import */ var _shared_contactForm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/contactForm.js */ "./src/js/shared/contactForm.js");
/* harmony import */ var _shared_services_employees_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/employees.js */ "./src/js/shared/services/employees.js");
/* harmony import */ var _repo_js_libs_logger_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../repo/js/libs/logger.js */ "./repo/js/libs/logger.js");






(0,_store_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
const entry = (context, module) => {
  const {
    pageStore,
    events
  } = context;
  pageStore.on("update", _ref => {
    let {
      state,
      prevState
    } = _ref;
    return console.log(state, prevState);
  });
  if (document.readyState === "interactive") {
    onDomReady();
  } else {
    window.addEventListener("DOMContentLoaded", onDomReady);
  }
  function onDomReady(event) {
    try {
      (0,_sliders_js__WEBPACK_IMPORTED_MODULE_2__.initTeamSelectSlider)(pageStore, events);
      (0,_sliders_js__WEBPACK_IMPORTED_MODULE_2__.initTeamatesSliders)(pageStore, events);
      initNavToProfile(pageStore, events);
      (0,_shared_contactForm_js__WEBPACK_IMPORTED_MODULE_3__.initContactForm)("main-contact-form", pageStore, events);
      (0,_shared_contactForm_js__WEBPACK_IMPORTED_MODULE_3__.initContactForm)("cv-request-contact-form", pageStore, events);
      initEmloyeeView(pageStore, events);
      initDepartmentView(pageStore, events);
      initDepartmentsFilter(pageStore, events);
    } catch (ex) {
      (0,_repo_js_libs_logger_js__WEBPACK_IMPORTED_MODULE_5__.error)(ex);
    }
  }
};
const page = new _shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__.Module({
  name: "page",
  entry: entry,
  required: ["events", "commonStore", "pageStore"]
});
_shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].add(page);
function initNavToProfile(store, events) {
  $("#teamates-list-wrapper").on("click", _ref2 => {
    let {
      target
    } = _ref2;
    const $header = $("header");
    const $profile = $("#profile");
    if (!target.classList.contains("teamate-card__btn") && !target.closest(".teamate-card__btn")) return;
    const profileBcr = $profile.get(0).getBoundingClientRect();
    const headerHeight = $header.outerHeight();
    window.scrollTo({
      top: window.scrollY + profileBcr.top - headerHeight,
      behavior: "smooth"
    });
  });
}
function initEmloyeeView(store, events) {
  const $profileWrapper = $("#profile-main");
  const profileTemplate = $("#employee-profile-template").html();
  const $skillsRatesWrapper = $("#profile-skills-rates");
  const skillsRatesTemplate = $("#employee-skills-rates-template").html();
  const $tagsCloudWrapper = $("#profile-tags-cloud");
  const tagsCloudTemplate = $("#employee-tags-cloud-template").html();
  Mustache.parse(profileTemplate);
  Mustache.parse(skillsRatesTemplate);
  Mustache.parse(tagsCloudTemplate);
  $profileWrapper.on("click", _ref3 => {
    let {
      target
    } = _ref3;
    if (target.classList.contains("profile__download-btn") || target.closest(".profile__download-btn")) {
      drawers.open("cv-request-form", target);
    }
  });
  store.on("update", _ref4 => {
    let {
      state,
      prevState
    } = _ref4;
    if (state.selectedEmployeeIdx === prevState.selectedEmployeeIdx && state.employees === prevState.employees) return;
    const {
      status,
      data
    } = state.employees;
    if (data.length === 0) return;
    const {
      selectedEmployeeIdx
    } = state;
    const selectedEmployeeData = data[selectedEmployeeIdx];
    renderProfile(status, selectedEmployeeData);
    renderSkillsRates(status, selectedEmployeeData.crb_skills_list);
    renderTagsCloud(status, selectedEmployeeData);
  });
  function renderProfile(status, data) {
    $profileWrapper.html(Mustache.render(profileTemplate, data));
  }
  ;
  function renderSkillsRates(status, data) {
    const finalizedData = data.map(_ref5 => {
      let {
        crb_name,
        crb_rate
      } = _ref5;
      return {
        crb_name,
        crb_rate: new Array(crb_rate)
      };
    });
    $skillsRatesWrapper.html(Mustache.render(skillsRatesTemplate, finalizedData));
  }
  ;
  function renderTagsCloud(status, _ref6) {
    let {
      crb_main_message,
      crb_tags_cloud
    } = _ref6;
    const sectionCut = 360 / crb_tags_cloud.length;
    const generateDegreeOffset = () => -sectionCut * 0.1 + sectionCut * 0.2 * Math.random();
    const finalizedData = {
      crb_main_message,
      crb_tags_cloud: crb_tags_cloud.map((tags, idx) => {
        const thisSectionCut = idx * sectionCut;
        return {
          ...tags,
          "placing-degree": `${thisSectionCut + generateDegreeOffset()}deg`,
          "distance-shift": `${-0.05 + 0.1 * Math.random()}`
        };
      })
    };
    console.log(finalizedData);
    $tagsCloudWrapper.html(Mustache.render(tagsCloudTemplate, finalizedData));
  }
  ;
}
function initDepartmentView(store, events) {
  const $wrapper = $("#teamates-list-wrapper");
  const template = $("#employee-card-template").html();
  Mustache.parse(template);
  store.on("update", _ref7 => {
    let {
      state,
      prevState
    } = _ref7;
    if (state.employees === prevState.employees) return;
    const {
      status,
      data
    } = state.employees;
    render(status, data);
  });
  store.on("update", _ref8 => {
    let {
      state,
      prevState
    } = _ref8;
    if (state.selectedDepartmentId === prevState.selectedDepartmentId) return;
    (0,_shared_services_employees_js__WEBPACK_IMPORTED_MODULE_4__.fetchDepartmentEmployees)(state.selectedDepartmentId);
  });
  const {
    status,
    data
  } = store.state.employees;
  render(status, data);
  function render(status, data) {
    $wrapper.html(Mustache.render(template, data));
    events.emit("slideToFirstEmployee");
  }
  ;
}
async function initDepartmentsFilter(store, events) {
  let activeElem = null;
  const $wrapper = $("#department-select-wrapper");
  store.on("update", _ref9 => {
    let {
      state,
      prevState
    } = _ref9;
    if (state.departments === prevState.departments) return;
    const {
      status,
      data
    } = state.departments;
    render(status, data);
    const firstElem = $wrapper.find("[data-id]").first().get(0);
    if (firstElem) setActive(firstElem);
  });
  (0,_shared_services_employees_js__WEBPACK_IMPORTED_MODULE_4__.fetchDepartments)();
  $wrapper.on("click", _ref10 => {
    let {
      target
    } = _ref10;
    if (!target.hasAttribute("data-id")) return;
    setActive(target);
  });
  function setActive(elem) {
    if (activeElem === elem) return;
    if (activeElem) {
      activeElem.classList.remove("active");
    }
    const departmentId = elem.getAttribute("data-id");
    store.update(state => {
      return {
        ...state,
        selectedDepartmentId: departmentId
      };
    });
    elem.classList.add("active");
    activeElem = elem;
  }
  function render(status, data) {
    $wrapper.html(preserve(status, data));
  }
  function preserve(status, data) {
    return data.map(item => `<div class="swiper-slide">
															<div class="text-link section-nav__btn" data-slug="${item.slug}" data-id="${item.id}">${item.html_representation}</div>
														</div>`).join("");
  }
}

/***/ }),

/***/ "./src/js/pages/home/sliders.js":
/*!**************************************!*\
  !*** ./src/js/pages/home/sliders.js ***!
  \**************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initTeamSelectSlider: function() { return /* binding */ initTeamSelectSlider; },
/* harmony export */   initTeamatesSliders: function() { return /* binding */ initTeamatesSliders; }
/* harmony export */ });
/* harmony import */ var _repo_js_libs_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../repo/js/libs/logger.js */ "./repo/js/libs/logger.js");

function initTeamSelectSlider() {
  const teamatesSliders = new Swiper("#team-select-slider", {
    observer: true,
    resizeObserver: true,
    slidesPerView: "auto",
    grabCursor: true,
    centeredSlides: true,
    breakpoints: {
      420: {
        centeredSlides: false
      }
    }
  });
}
function initTeamatesSliders(store, events) {
  (0,_repo_js_libs_logger_js__WEBPACK_IMPORTED_MODULE_0__.log)("initTeamatesSliders");
  const currentSlideNumberElem = document.querySelector("#teamates-slider-counter .teamates-slider__current");
  const totalSlidesNumberElem = document.querySelector("#teamates-slider-counter .teamates-slider__total");
  const slider = new Swiper("#teamates-slider", {
    observer: true,
    resizeObserver: true,
    slidesPerView: "auto",
    centeredSlides: true,
    grabCursor: true,
    loop: true,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 40,
      stretch: 350,
      depth: 300,
      modifier: 0.65,
      slideShadows: false
    },
    autoplay: {
      delay: 3000
    },
    navigation: {
      prevEl: "#teamates-slider-prev",
      nextEl: "#teamates-slider-next"
    },
    // pagination: {
    // 	clickable: true,
    // 	el: "#teamates-slider-pagination"
    // },
    breakpoints: {
      1024: {
        coverflowEffect: {
          rotate: 40,
          stretch: 500,
          depth: 400,
          modifier: 0.65,
          slideShadows: false
        }
      }
    },
    on: {
      slideChange: function () {
        const slides = this.slides;
        const activeSlide = this.activeIndex;
        slides.forEach((slide, index) => {
          const position = index - activeSlide;
          slide.setAttribute("data-slide-position", position);
        });
        const [activeSlideElem] = findActiveSlide(slides);
        processSlideChange(activeSlideElem);
      },
      afterInit: swiper => {
        initSelectByClick(swiper);
        const slides = getSlides(swiper);
        setSlidesIdx(slides);
        setTotal(slides);
        const [activeSlideElem] = findActiveSlide(slides);
        processSlideChange(activeSlideElem);
      },
      observerUpdate: swiper => {
        const slides = getSlides(swiper);
        setSlidesIdx(slides);
        setTotal(slides); // Можно было бы заморочиться, и перерисовывать это значение по рендеру, а не по каждой перестройке DOM, что значит, по каждой смене слайда
        setTimeout(() => {
          const [activeSlideElem] = findActiveSlide(slides);
          processSlideChange(activeSlideElem);
        }, 300);
      },
      slideChangeTransitionStart: swiper => {
        setTimeout(() => {
          const slides = getSlides(swiper);
          const [activeSlideElem, activeSlideIdx] = findActiveSlide(slides);
          setSlidesOrder(slides, activeSlideElem, activeSlideIdx);
          processSlideChange(activeSlideElem);
        }, 300);
      }
    }
  });
  events.on("slideToFirstEmployee", () => {
    slider.slideTo(0, 300);
    setSelectedEmployee(0);
  });
  function processSlideChange(activeSlideElem) {
    if (activeSlideElem) {
      const cardIdx = Number(activeSlideElem.getAttribute("data-card-idx"));
      updateActiveSlideNumber(cardIdx + 1);
      setSelectedEmployee(cardIdx);
    }
  }
  function setSelectedEmployee(idx) {
    store.update(state => {
      return {
        ...state,
        selectedEmployeeIdx: idx
      };
    });
  }
  function initSelectByClick(swiper) {
    swiper.wrapperEl.addEventListener("click", _ref => {
      let {
        target
      } = _ref;
      if (!target.classList.contains("teamate-card__btn") && !target.closest(".teamate-card__btn")) return;
      const slideRootElem = target.closest(".swiper-slide");
      swiper.slideTo(slideRootElem.getAttribute("data-slide-idx"), 300);
    });
  }
  function setTotal(slides) {
    totalSlidesNumberElem.textContent = slides.length;
  }
  function updateActiveSlideNumber(number) {
    currentSlideNumberElem.textContent = number;
  }
  function getSlides(swiper) {
    return [...swiper.wrapperEl.querySelectorAll(".swiper-slide")];
  }
  function findActiveSlide(slides) {
    const activeSlideIdx = slides.findIndex(elem => elem.classList.contains("swiper-slide-active"));
    return [slides[activeSlideIdx], activeSlideIdx];
  }
  // Нужно вызывать каждый раз при обновлении DOM
  function setSlidesIdx(slides) {
    if (slides.length < 1) return;
    slides.forEach((elem, idx) => elem.setAttribute("data-slide-idx", idx));
  }
  // Нужно вызывать каждый раз при обновлении DOM или изменении активного слайда
  function setSlidesOrder(slides, activeSlideElem, activeSlideIdx) {
    if (slides.length < 1 || !activeSlideElem) return;
    activeSlideElem.setAttribute("data-slide-position", 0);
    const recalcDepth = Math.min(5, Math.ceil((slides.length - 1) / 2));
    const leftEdgeIdx = Math.max(0, activeSlideIdx - recalcDepth);
    const rightEdgeIdx = Math.min(slides.length, activeSlideIdx + recalcDepth + 1);
    slides.slice(leftEdgeIdx, activeSlideIdx).reverse().forEach((elem, idx) => {
      elem.setAttribute("data-slide-position", -1 - idx);
    });
    slides.slice(activeSlideIdx + 1, rightEdgeIdx).forEach((elem, idx) => {
      elem.setAttribute("data-slide-position", 1 + idx);
    });
  }
}

/***/ }),

/***/ "./src/js/pages/home/store/index.js":
/*!******************************************!*\
  !*** ./src/js/pages/home/store/index.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: function() { return /* binding */ init; }
/* harmony export */ });
/* harmony import */ var _shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/ModuleManager/index.js */ "./src/js/shared/ModuleManager/index.js");
/* harmony import */ var _shared_store_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/store/index.js */ "./src/js/shared/store/index.js");


const initialState = {
  departments: {
    status: "idle",
    data: []
  },
  selectedEmployeeIdx: null,
  selectedDepartmentId: null,
  employees: {
    status: "idle",
    data: []
  }
};
const init = () => {
  const module = new _shared_ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__.Module({
    name: "pageStore",
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

/***/ "./src/js/shared/contactForm.js":
/*!**************************************!*\
  !*** ./src/js/shared/contactForm.js ***!
  \**************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initContactForm: function() { return /* binding */ initContactForm; }
/* harmony export */ });
/* harmony import */ var _services_contactForm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/contactForm.js */ "./src/js/shared/services/contactForm.js");

class AntispamBlock {
  constructor(duration) {
    this.duration = duration;
    this.timer = null;
  }
  unset() {
    clearInterval(this.timer);
    this.timer = null;
  }
  set(callback) {
    if (this.active) this.unset();
    this.counter = this.duration;
    this.timer = setInterval(() => {
      const lastCallback = this.counter === 1;
      callback && callback(this.counter, lastCallback);
      if (lastCallback) {
        this.unset();
      } else {
        this.counter--;
      }
    }, 1000);
  }
  get active() {
    return this.timer !== null;
  }
}
const reduceIterator = function (iterator) {
  let acc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  console.log("reduceIterator");
  let current;
  do {
    current = iterator.next();
    acc.push(current.value);
  } while (!current.done);
  return acc;
};
function initContactForm(formId, pageStore, events) {
  const antispamBlock = new AntispamBlock(5);
  const $msgDataNotSentDisclosure = $(`#${formId} [data-msg-disclosure='data-not-sent']`);
  const $msgSuccessDisclosure = $(`#${formId} [data-msg-disclosure='data-successfully-sent']`);
  const $sendBtn = $(`#${formId} .contact-form__send-btn`);
  const $watsappCallBtn = $(`#${formId} .contact-form__call-btn`);
  const $form = $(`#${formId}`);
  $watsappCallBtn.on("click", event => {
    const formData = new FormData($form.get(0));
    if (reduceIterator(formData.values()).some(value => value !== undefined && value.length > 0)) {
      showIsNotSentMsg();
    }
  });
  const validator = $form.validate({
    ignore: [],
    highlight: function (element, errorClass, validClass) {
      $(element).closest(".form-field").addClass(errorClass);
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).closest(".form-field").removeClass(errorClass);
    },
    errorPlacement: function (error, element) {
      error.appendTo(element.closest(".form-input"));
    },
    // Отправляем данные на сервер
    submitHandler: async function (form, event) {
      event.preventDefault();
      if (antispamBlock.active) return false;
      antispamBlock.set((counter, lastCallback) => {
        if (lastCallback) enableBtns();
      });
      disableBtns();
      const formData = new FormData(form);
      if (formId == "cv-request-contact-form") {
        const {
          selectedEmployeeIdx,
          employees
        } = pageStore.state;
        if (selectedEmployeeIdx > -1 && employees.data.length) {
          formData.append("employee-id", employees.data[selectedEmployeeIdx].id);
          formData.append("employee-name", employees.data[selectedEmployeeIdx].crb_person_name);
        }
      }
      const response = (0,_services_contactForm_js__WEBPACK_IMPORTED_MODULE_0__.sendContactRequest)(formData);
      $form.get(0).reset();
      $msgDataNotSentDisclosure.removeClass("open");
      showSucccessMsg();
    }
  });
  function disableBtns() {
    $sendBtn.addClass("disabled");
    $watsappCallBtn.addClass("disabled");
  }
  function enableBtns() {
    $sendBtn.removeClass("disabled");
    $watsappCallBtn.removeClass("disabled");
  }
  function showSucccessMsg() {
    $msgSuccessDisclosure.addClass("open");
    setTimeout(() => {
      $msgSuccessDisclosure.removeClass("open");
    }, 5000);
  }
  function showIsNotSentMsg() {
    $msgDataNotSentDisclosure.addClass("open");
  }
  async function send(formData) {
    return await fetch(`${origin}/contact_request`, {
      method: "POST",
      body: formData,
      redirect: 'follow'
    });
  }
}

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

/***/ "./src/js/shared/services/config.js":
/*!******************************************!*\
  !*** ./src/js/shared/services/config.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiUrl: function() { return /* binding */ apiUrl; },
/* harmony export */   customApiUrl: function() { return /* binding */ customApiUrl; }
/* harmony export */ });
const origin = "https://team.web-you.pl/"; // window.origin
const apiUrl = `${origin}/wp-json/wp/v2`;
const customApiUrl = `${origin}/wp-json/custom/v1`;

/***/ }),

/***/ "./src/js/shared/services/contactForm.js":
/*!***********************************************!*\
  !*** ./src/js/shared/services/contactForm.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sendContactRequest: function() { return /* binding */ sendContactRequest; }
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ "./src/js/shared/services/config.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors.js */ "./src/js/shared/services/errors.js");


async function sendContactRequest(data) {
  const response = await fetch(`${_config_js__WEBPACK_IMPORTED_MODULE_0__.customApiUrl}/contact-request/`, {
    method: "POST",
    body: data
  });
  (0,_errors_js__WEBPACK_IMPORTED_MODULE_1__.errorOnBadResponce)(response);
  return response.json();
}

/***/ }),

/***/ "./src/js/shared/services/employees.js":
/*!*********************************************!*\
  !*** ./src/js/shared/services/employees.js ***!
  \*********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchCategories: function() { return /* binding */ fetchCategories; },
/* harmony export */   fetchCategory: function() { return /* binding */ fetchCategory; },
/* harmony export */   fetchDepartmentEmployees: function() { return /* binding */ fetchDepartmentEmployees; },
/* harmony export */   fetchDepartments: function() { return /* binding */ fetchDepartments; },
/* harmony export */   fetchEmployees: function() { return /* binding */ fetchEmployees; }
/* harmony export */ });
/* harmony import */ var _ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ModuleManager/index.js */ "./src/js/shared/ModuleManager/index.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.js */ "./src/js/shared/services/config.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors.js */ "./src/js/shared/services/errors.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils.js */ "./src/js/shared/utils.js");




async function fetchDepartmentEmployees(departmentId) {
  const store = _ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].use("pageStore");
  const sortEmployees = (a, b) => {
    const aOrder = a.crb_order;
    const bOrder = b.crb_order;
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isNotEmptyString)(aOrder) && (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isNotEmptyString)(bOrder)) {
      return Number(aOrder) - Number(bOrder);
    } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isNotEmptyString)(aOrder)) {
      return -1;
    } else if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.isNotEmptyString)(bOrder)) {
      return 1;
    } else {
      return 0;
    }
  };
  store.update(state => {
    return {
      ...state,
      employees: {
        ...state.employees,
        status: "loading"
      }
    };
  });
  const employees = (await fetchEmployees(`categories=${departmentId}`)).sort(sortEmployees);
  employees.forEach((data, idx) => data.__idx = idx);
  store.update(state => {
    return {
      ...state,
      employees: {
        ...state.employees,
        status: "idle",
        data: employees
      }
    };
  });
  return employees;
}
async function fetchEmployees(query) {
  const store = _ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].use("pageStore");
  try {
    const response = await fetch(`${_config_js__WEBPACK_IMPORTED_MODULE_1__.apiUrl}/employees?per_page=100&${query}`, {
      method: "GET"
    });
    (0,_errors_js__WEBPACK_IMPORTED_MODULE_2__.errorOnBadResponce)(response);
    return response.json();
  } catch (ex) {
    console.error("Error while fetcheeng employees");
  }
}
async function fetchDepartments() {
  const store = _ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].use("pageStore");
  const langMap = {
    "en-US": "en",
    "pl-PL": "pl"
  };
  const lang = document.documentElement.getAttribute("lang");
  console.log(lang);
  store.update(state => {
    return {
      ...state,
      departments: {
        ...state.departments,
        status: "loading"
      }
    };
  });
  console.log(langMap[lang]);
  const employeesCategory = await fetchCategory(`employees-${langMap[lang]}`);
  console.log(employeesCategory);
  const departmentsList = await fetchCategories(`parent=${employeesCategory.id}`);
  store.update(state => {
    return {
      ...state,
      departments: {
        ...state.departments,
        status: "idle",
        data: departmentsList
      }
    };
  });
}
async function fetchCategory(slug) {
  const store = _ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].use("pageStore");
  console.log(`fetchCategory. slug: ${slug}`);
  const query = `slug=${slug}`;
  return (await fetchCategories(query))[0];
}
async function fetchCategories(query) {
  const store = _ModuleManager_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].use("pageStore");
  try {
    const response = await fetch(`${_config_js__WEBPACK_IMPORTED_MODULE_1__.apiUrl}/categories?${query}`, {
      method: "GET"
    });
    (0,_errors_js__WEBPACK_IMPORTED_MODULE_2__.errorOnBadResponce)(response);
    return response.json();
  } catch (ex) {
    console.error("Error while fetching categories", ex);
  }
}

/***/ }),

/***/ "./src/js/shared/services/errors.js":
/*!******************************************!*\
  !*** ./src/js/shared/services/errors.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BadResponseError: function() { return /* binding */ BadResponseError; },
/* harmony export */   errorOnBadResponce: function() { return /* binding */ errorOnBadResponce; }
/* harmony export */ });
class BadResponseError extends Error {
  constructor(response, msg) {
    super(msg || "Bad response (not ok)");
    this.response = response;
  }
}
function errorOnBadResponce(response) {
  if (!response.ok) throw new BadResponseError(response);
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