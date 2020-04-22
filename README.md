# Node.js TypeScript Koa Boilerplate Basic

Basic boilerplate for Node.js development with TypeScript, Koa, koa-router, koa-helmet, @koa/cors, koa-bodyparser, koa-requestid, ESLint, Prettier, Airbnb styleguide, Mocha, Chai, supertest, sinon.js, istanbul, pino, tsc-watch

[<img alt="npm" src="https://img.shields.io/david/alphabitdev/node-typescript-koa-boilerplate-basic.svg?style=flat-square">](https://david-dm.org/alphabitdev/node-typescript-koa-boilerplate-basic)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/591d2aec2a0148aea36aa3e5c787ffe9)](https://app.codacy.com/manual/alphabitdev/node-typescript-koa-boilerplate-basic?utm_source=github.com&utm_medium=referral&utm_content=alphabitdev/node-typescript-koa-boilerplate-basic&utm_campaign=Badge_Grade_Dashboard)


[<img alt="MIT Licence" src="https://badges.frapsoft.com/os/mit/mit.svg?v=103">](https://opensource.org/licenses/mit-license.php)

[<img alt="Open Source Love" src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103">](https://github.com/ellerbrock/open-source-badge/)

This boilerplate includes the following features:
  - Koa HTTP server with [koa-router](https://github.com/ZijianHe/koa-router), [koa-helmet](https://github.com/venables/koa-helmet#readme), [@koa/cors](https://github.com/koajs/cors), [koa-bodyparser](https://github.com/koajs/bodyparser) and [koa-requestid](https://github.com/uphold/koa-requestid/),
  - Error handling
  - Health module
  - Request logging with [pino](https://github.com/pinojs/pino)
  - Response time header using [moment.js](https://momentjs.com/)
  - Data input validation with [joi](https://github.com/hapijs/joi)
  - Easy development with [tsc-watch](https://github.com/gilamran/tsc-watch#readme) and [pino-pretty](https://github.com/pinojs/pino-pretty)
  - Linting with [ESLint](https://eslint.org/).
  - Formatting with [Prettier](https://prettier.io/) and [Airbnb styleguide](https://github.com/airbnb/javascript).
  - Unit Test and Integration Test along with Test Coverage using [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), [istanbul](https://istanbul.js.org/), [sinon.js]() and [supertest]()

## install
```zsh
git clone https://github.com/alphabitdev/node-typescript-koa-boilerplate-basic <project-name>
cd <project-name>
rm -rf .git && git init     # remove git and initialize new git
npm i                       # install dependencies
code -n .                   # open in VS Code
```
## Commands
> Run

```zsh
npm run build       # build dist
npm run clean       # remove all generated and node_modules
npm run start       # start node
npm run start:dev   # tsc-watch and start with debugger
```
> Test

```zsh
# Test
npm run test                           # Run all test
npm run test:unit                      # Run only unit test
npm run test:integration               # Run only integration test
# Test Coverage
npm run test:coverage                  # Calculate the coverage of all test
npm run test:coverage:unit             # Calculate the coverage of unit test
npm run test:coverage:integration      # Calculate the coverage of integration test
# Test consistent coding style (Lint)
npm run lint                           # Lint all sourcecode
```
