'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

var useBoolean = function useBoolean(initialValue) {
  var _useState = React.useState(initialValue),
      value = _useState[0],
      setValue = _useState[1];

  var toggle = function toggle(forceValue) {
    if (typeof forceValue === 'boolean') {
      setValue(forceValue);
    } else {
      setValue(!value);
    }
  };

  return [value, toggle];
};

var copyPolyfill = function copyPolyfill(text) {
  var textArea = document.createElement('textarea');
  textArea.style.position = 'absolute';
  textArea.style.top = '-9999px';
  textArea.style.left = '-9999px';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    return document.execCommand('copy');
  } catch (err) {
    console.log(err);
    return false;
  } finally {
    document.body.removeChild(textArea);
  }
};

var copy = function copy(text) {
  document.addEventListener('copy', function onCopy(e) {
    e.clipboardData.setData('text/plain', text);
    e.preventDefault();
    document.removeEventListener('copy', onCopy);
  });
  var isCopied;

  try {
    isCopied = document.execCommand('copy');
  } catch (err) {
    isCopied = false;
    console.log(err);
  }

  if (!isCopied) {
    isCopied = copyPolyfill(text);
  }

  return isCopied;
}; // TODO: Async Clipboard API
// https://developers.google.com/web/updates/2018/03/clipboardapi


var useCopyClipboard = function useCopyClipboard() {
  var _useState = React.useState(false),
      isCopied = _useState[0],
      setCopied = _useState[1];

  return [isCopied, function (text) {
    var didCopy = copy(text);
    setCopied(didCopy);
  }];
};

function useDebounce(func, delay) {
  var timerRef = React.useRef(null);

  var debounced = function debounced() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(function () {
      func.apply(void 0, args);
    }, delay);
  };

  return debounced;
}

var throttle = function throttle(func, wait) {
  var last, timer;
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var now = Date.now();

    if (last && now - last < wait) {
      clearTimeout(timer);
      timer = window.setTimeout(function () {
        last = now;
        func.apply(void 0, args);
      }, wait);
    } else {
      last = now;
      func.apply(void 0, args);
    }
  };
};

var inViewportPolyfill = function inViewportPolyfill(element, callback, options) {
  var _options$root = options.root,
      root = _options$root === void 0 ? document.documentElement : _options$root;
  var viewWidth = root.clientWidth;
  var viewHeight = root.clientHeight;
  var update = throttle(function () {
    var _element$getBoundingC = element.getBoundingClientRect(),
        width = _element$getBoundingC.width,
        height = _element$getBoundingC.height,
        top = _element$getBoundingC.top,
        bottom = _element$getBoundingC.bottom,
        left = _element$getBoundingC.left,
        right = _element$getBoundingC.right;

    callback(width && height && top < viewHeight && bottom > 0 && left < viewWidth && right > 0);
  }, 250);
  document.addEventListener('scroll', update);
  return function () {
    return document.removeEventListener('scroll', update);
  };
};

var useInViewport = function useInViewport(options) {
  if (options === void 0) {
    options = {};
  }

  var _useState = React.useState(false),
      inViewport = _useState[0],
      setInViewport = _useState[1];

  var ref = React.useRef();
  var _options = options,
      root = _options.root,
      _options$rootMargin = _options.rootMargin,
      rootMargin = _options$rootMargin === void 0 ? '0px' : _options$rootMargin,
      _options$threshold = _options.threshold,
      threshold = _options$threshold === void 0 ? [0] : _options$threshold;
  React.useEffect(function () {
    var unobserve = function unobserve() {};

    if (window.IntersectionObserver) {
      var observer = new window.IntersectionObserver(function (_ref) {
        var entry = _ref[0];
        setInViewport(entry.isIntersecting);
      }, {
        root: root,
        rootMargin: rootMargin,
        threshold: threshold
      });

      if (ref.current) {
        observer.observe(ref.current);

        unobserve = function unobserve() {
          return observer.unobserve(ref.current);
        };
      }
    } else {
      if (ref.current) {
        unobserve = inViewportPolyfill(ref.current, setInViewport, options);
      }
    }

    return unobserve;
  }, []);
  return [inViewport, ref];
};

function useMounted() {
  var _useState = React.useState(false),
      mounted = _useState[0],
      setMounted = _useState[1];

  React.useEffect(function () {
    setMounted(true);
  }, []);
  return mounted;
}

var Hello = function Hello() {
  return React.createElement("div", null, "hello react hooks");
};

exports.Hello = Hello;
exports.useBoolean = useBoolean;
exports.useCopyClipboard = useCopyClipboard;
exports.useDebounce = useDebounce;
exports.useInViewport = useInViewport;
exports.useMounted = useMounted;
//# sourceMappingURL=react-use-hooks.cjs.development.js.map
