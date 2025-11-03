[![NPM downloads](https://img.shields.io/npm/dm/@bbc/http-transport-to-error.svg?style=flat)](https://npmjs.org/package/@bbc/http-transport-to-error)
![npm](https://img.shields.io/npm/v/@bbc/http-transport-to-error.svg)
 ![license](https://img.shields.io/badge/license-MIT-blue.svg) 
![github-issues](https://img.shields.io/github/issues/bbc/http-transport-to-error.svg)
![stars](https://img.shields.io/github/stars/bbc/http-transport-to-error.svg)
![forks](https://img.shields.io/github/forks/bbc/http-transport-to-error.svg)

# http-transport-to-error

> Middleware convert 4XX and 5XX responses to errors

## Installation

```
pnpm install --save @bbc/http-transport-to-error
```

## Usage

```js
Convert any response equal to or greater than 400 to errors: 

const url = 'http://example.com/404';
const HttpTransport = require('@bbc/http-transport');
const toError = require('@bbc/http-transport-to-error');

const client = HttpTransport.createBuilder()
   .use(toError())
   .createClient();

  try {
    await client.get(url).asResponse();
  } catch (err) {
    console.error(err);    
  }
});
```

## Test

```
pnpm test
```

To generate a test coverage report:

```
pnpm run coverage
```
