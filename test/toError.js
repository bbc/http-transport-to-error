'use strict';

const assert = require('chai').assert;
const nock = require('nock');

const HttpTransport = require('@bbc/http-transport');
const toError = require('../lib/toError');

const host = 'http://www.example.com';
const path = '/foo';
const url = `${host}${path}`;
const api = nock(host);
const textResponseBody = 'inimicum tuum';

function assertFailure(promise, message) {
  return promise
    .then(() => {
      assert.ok(false, 'Promise should have failed')
    })
    .catch((e) => {
      assert.ok(e);
      if (message) {
        assert.equal(e.message, message);
      }
    });
}

function assertErrorResponse(code) {
  nock.cleanAll();
  api.get(path).reply(code);

  const client = HttpTransport.createClient();
  const response = client
    .useGlobal(toError())
    .get(url)
    .asBody();

  return assertFailure(response, `Received HTTP code ${code} for GET http://www.example.com/foo`);
}

describe('toError', () => {
  beforeEach(() => {
    nock.disableNetConnect();
    nock.cleanAll();
    api.get(path).reply(200, textResponseBody);
  });

  it('returns an error for 4XX responses', () => {
    return assertErrorResponse(400);
  });

  it('returns an error for 5XX responses', () => {
    return assertErrorResponse(500);
  });

  it('does not convert to error for 2XX responses', () => {
    nock.cleanAll();
    api.get(path).reply(200, textResponseBody);

    const client = HttpTransport.createClient();
    return client
      .useGlobal(toError())
      .get(url)
      .asResponse()
      .catch(assert.ifError)
      .then((res) => {
        assert.equal(res.statusCode, 200);
      });
  });
});
