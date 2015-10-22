'use strict';

const resolve = require('path').resolve;
const test = require('tape');
const jazzon = require('jazzon');
const pkg = require('../package.json');
const plugin = require(resolve(__dirname, '..', pkg.main));

const inject = function (context) {
  return function (state, helper) {
    switch (helper) {
      case 'inject': return context;
      default: return state;
    }
  };
};

test('throws error when missing argument', (assert) => {
  jazzon
    .create()
    .use(plugin())
    .compile({ test: '@{ format }' })
    .then(() => assert.fail('should have failed'))
    .catch(assert.pass)
    .then(assert.end);
});

test('formats string', (assert) => {
  jazzon
    .create()
    .use(inject('world'))
    .use(plugin())
    .compile({ test: '@{ inject | format(Hello %s!) }' })
    .then(result => assert.equal(result.test, 'Hello world!'))
    .then(assert.end, assert.end);
});

test('joins arguments', (assert) => {
  jazzon
    .create()
    .use(inject(['world']))
    .use(plugin())
    .compile({ test: '@{ inject | format(Hello, %s!) }' })
    .then(result => assert.equal(result.test, 'Hello, world!'))
    .then(assert.end, assert.end);
});

test('spreads arrays', (assert) => {
  jazzon
    .create()
    .use(inject(['foo', 'bar', 'baz']))
    .use(plugin())
    .compile({ test: '@{ inject | format(Hello %s, %s and %s!) }' })
    .then(result => assert.equal(result.test, 'Hello foo, bar and baz!'))
    .then(assert.end, assert.end);
});
