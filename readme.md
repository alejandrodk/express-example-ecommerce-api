# Express Ecommerce API

Github job search is a command line app develop in Java 8 using Functional Programming concepts.
this app use the github jobs api to find, filter and get jobs.

## Tech stack
- NodeJs
- Express
- MongoAtlas
- Jest
- Git

## Dependencies

| Plugin | Description |
| ------ | ------ |
| [Express](https://www.npmjs.com/package/express) | HTTP Server |
| [Nodemon](https://www.npmjs.com/package/nodemon) | Reload server in dev mode |
| [dotenv](https://www.npmjs.com/package/dotenv) | Get environments variables |
| [pug](https://www.npmjs.com/package/pug) | Server side rendering |
| [Passport](https://www.npmjs.com/package/passport) | Users authentication |
| [JWT](https://www.npmjs.com/package/jsonwebtoken) | Token validation |
| [Bcrypt](https://www.npmjs.com/package/bcrypt) | Data encode |
| [Joi](https://www.npmjs.com/package/joi) | Schemas validation |
| [Sentry](https://www.npmjs.com/package/@sentry/node) | Online exception monitoring |
| [Boom](https://www.npmjs.com/package/@hapi/boom) | Verbose exceptions |
| [proxyquire](https://www.npmjs.com/package/proxyquire) | Mock service calls |
| [sinon](https://www.npmjs.com/package/sinon) | Mock database calls |

## Installation and usage
```sh
# Install all dependencies
npm install

# Run in dev mode
npm dev

# Run test suites
npm test
```

## Endpoints

| method | uri | description 
| -- | -- | -- |
| GET | /api/products | Get products list 
| GET | /api/products/:id | Get product detail 
| POST | /api/products/ | Create product
| PUT | /api/products/:id | Update product
| PATCH | /api/products/:id | Update product
| DELETE | /api/products/:id | Remove product
| POST | /token | Get auth token

