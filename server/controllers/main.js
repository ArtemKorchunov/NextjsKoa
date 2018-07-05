const main = require("./functions/main.js");

module.exports = function (router) {
  router.get('/test', main.get)
};
