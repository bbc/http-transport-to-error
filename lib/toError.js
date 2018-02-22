'use strict';

const BAD_REQUEST = 400;

function createResponseError(ctx) {
  const res = ctx.res;
  const error = new Error(`Received HTTP code ${res.statusCode} for ${ctx.req.getMethod()} ${ctx.req.getUrl()}`);
  error.statusCode = res.statusCode;
  error.headers = res.headers;
  return error;
}

module.exports = () => {
  return async (ctx, next) => {
    await next();

    const res = ctx.res;
    if (res.statusCode >= BAD_REQUEST) throw createResponseError(ctx);
  };
};
