const Router = require("koa-router");
const main = require("./main.js");

const api = new Router({ prefix: '/api' });

main(api);

module.exports = api;
