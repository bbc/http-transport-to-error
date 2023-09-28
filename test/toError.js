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

async function assertErrorResponse(code) {
  api.get(path).reply(code);

  const client = HttpTransport.createBuilder()
    .use(toError())
    .createClient();

  try {
    await client
      .get(url)
      .asResponse();
    assert.ok(false, 'Promise should have failed');
  } catch (e) {
    assert.ok(e);
    assert.equal(e.message, `Received HTTP code ${code} for GET http://www.example.com/foo`);
  }
}

describe('toError', () => {
  beforeEach(() => {
    nock.disableNetConnect();
    nock.cleanAll();
  });

  it('returns an error for 4XX responses', async () => {
    await assertErrorResponse(400);
  });

  it('returns an error for 5XX responses', async () => {
    await assertErrorResponse(500);
  });

  it('does not convert to error for 2XX responses', async () => {
    api.get(path).reply(200, textResponseBody);

    const client = HttpTransport.createBuilder()
      .use(toError())
      .createClient();

    const res = await client
      .get(url)
      .asResponse();

    assert.equal(res.statusCode, 200);
  });
});
