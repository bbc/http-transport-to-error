'use strict';

const BAD_REQUEST = 400;

function createResponseError(ctx) {
  const res = ctx.res;
  const error = new Error(`Request failed for ${ctx.req.getMethod()} ${ctx.req.getUrl()}`);
  error.statusCode = res.statusCode;
  error.headers = res.headers;
  return error;
}

module.exports = () => {
  return (ctx, next) => {
    return next().then(() => {
      if (ctx.res.statusCode >= BAD_REQUEST) return next(createResponseError(ctx));
    });
  };
};
