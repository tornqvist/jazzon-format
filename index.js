'use strict';

const util = require('util');

module.exports = function () {
  return function (state, helper, args) {
    switch (helper) {
      case 'format':
        if (!args || !args.length) {
          throw (new Error('"format" requires a template'));
        }

        if (Array.isArray(state)) {
          args = [ args.join(', ') ];
          args = args.concat(state);
        } else {
          args = [ args.join(', '), state ];
        }

        return util.format.apply(util, args);
      default:
        return state;
    }
  };
};
