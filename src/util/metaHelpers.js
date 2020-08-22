"use strict";

const betterLogger = () => {
  const old = console.log;
  console.log = function() {
    let stack = new Error().stack.split(/\n/);
    if (stack[0].indexOf("Error") === 0) {
      stack = stack.slice(1);
    }
    const args = [].slice.apply(arguments).concat([stack[1].trim()]);
    return old.apply(console, args);
  };
};

const getFunctionCallers = () => {
  Object.defineProperty(global, "__stack", {
    get: function() {
      var orig = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_, stack) {
        return stack;
      };
      var err = new Error();
      Error.captureStackTrace(err, arguments.callee);
      var stack = err.stack;
      Error.prepareStackTrace = orig;
      return stack;
    }
  });

  Object.defineProperty(global, "__line", {
    get: function() {
      return __stack[1].getLineNumber();
    }
  });

  Object.defineProperty(global, "__function", {
    get: function() {
      return __stack[1].getFunctionName();
    }
  });
};

module.exports = {
  getFunctionCallers,
  betterLogger
};
