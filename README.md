[![Build Status](https://travis-ci.org/bbc/http-transport-to-error.svg)](https://travis-ci.org/bbc/http-transport-to-error) [![Coverage Status](https://coveralls.io/repos/github/bbc/http-transport-to-error/badge.svg?branch=master)](https://coveralls.io/github/bbc/http-transport-to-error?branch=master)

# http-transport-to-error

> Middleware convert 4XX and 5XX responses to errors

## Installation

```
npm install --save http-transport-to-error
```

## Usage

```js
Convert any response equal to or greater than 400 to errors: 

const url = 'http://example.com/404';
const HttpTransport = require('http-transport');
const toError = require('http-transport-to-error');

HttpTransport.createClient()
   .useGlobal(toError())
   .get(url)
   .asResponse()
   .catch((err) => {
    console.error(err);
   });
});
```

## Test

```
npm test
```

To generate a test coverage report:

```
npm run coverage
```
