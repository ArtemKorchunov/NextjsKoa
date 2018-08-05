const Joi = require("joi");

const v = {};
v.authToken = {
  body: {
    username: Joi.string().required(),
    email: Joi.string()
      .regex(
        "[^\\.\\s@:](?:[^\\s@:]*[^\\s@:\\.])?@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*"
      )
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
  }
};

v.refreshToken = {
  body: {
    token: Joi.string().required(),
    expires_in: Joi.number().required(),
    refresh_token: Joi.string().required()
  }
};

module.exports = v;
