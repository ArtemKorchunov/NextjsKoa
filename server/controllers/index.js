const Router = require("koa-router");
const main = require("./login");

const api = new Router({ prefix: '/api' });

main(api);

module.exports = api;
