import { useState, useRef, useEffect, createElement } from 'react';

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

  var _useState = useState(false),
      inViewport = _useState[0],
      setInViewport = _useState[1];

  var ref = useRef();
  var _options = options,
      root = _options.root,
      _options$rootMargin = _options.rootMargin,
      rootMargin = _options$rootMargin === void 0 ? '0px' : _options$rootMargin,
      _options$threshold = _options.threshold,
      threshold = _options$threshold === void 0 ? [0] : _options$threshold;
  useEffect(function () {
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
  var _useState = useState(false),
      isCopied = _useState[0],
      setCopied = _useState[1];

  return [isCopied, function (text) {
    var didCopy = copy(text);
    setCopied(didCopy);
  }];
};

var useBoolean = function useBoolean(initialValue) {
  var _useState = useState(initialValue),
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

var Hello = function Hello() {
  return createElement("div", null, "hello react hooks");
};

export { Hello, useBoolean, useCopyClipboard, useInViewport };
//# sourceMappingURL=react-use-hooks.esm.js.map
