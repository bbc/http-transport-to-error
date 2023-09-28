'use strict';

const BAD_REQUEST = 400;

function createResponseError(ctx) {
  const { statusCode, headers, body } = ctx.res;
  const error = new Error(`Received HTTP code ${statusCode} for ${ctx.req.getMethod()} ${ctx.req.getUrl()}`);
  error.statusCode = statusCode;
  error.headers = headers;
  error.body = body;
  return error;
}

module.exports = () => {
  return async (ctx, next) => {
    await next();

    if (ctx.res.statusCode >= BAD_REQUEST) throw createResponseError(ctx);
  };
};
