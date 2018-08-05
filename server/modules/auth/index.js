const Router = require("koa-router");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const validate = require("koa2-validation");
const router = new Router();

const User = require("../../models/user");
const generateToken = require("./oauth").generateTokens;
const config = require("../../config");
const v = require("./validate");

router.post("/auth/token", validate(v.authToken), async ctx => {
  const existUser = await User.findOne({ email });
  if (existUser) {
    ctx.throw(422, "Email has already been taken", {
      email: ["Email has already been taken"]
    });
  }
  try {
    const { email, ...other } = ctx.request.body.data;
    const token = jwt.sign({ email }, config.get("jwt:secret"), {
      expiresIn: config.get("jwt:tokenExpiration")
    });
    const user = new User({ token, email, ...other });
    await user.save();
    const res = await generateToken(user);
    ctx.status = 201;
    ctx.body = { ...res };
  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
  }
});

router.post("/auth/resfresh-token", () => {});

module.exports = router;
