const login = require("./functions/login");

module.exports = function (router) {
  router.post('/login', login.post)
};
