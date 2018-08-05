const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const config = require("../../config");

const RefreshToken = require("../../models/refresh-token");

module.exports.generateTokens = async ({ email, _id, token }) => {
  const jwtToken = token
    ? token
    : jwt.sign(
        {
          email
        },
        config.get("jwt:secret"),
        {
          expiresIn: parseInt(config.get("jwt:tokenExpiration"))
        }
      );

  await RefreshToken.findOneAndRemove({ user: _id });

  const refreshTokenVal = uuid.v4();
  await RefreshToken.create({
    token: refreshTokenVal,
    user: _id
  });
  return {
    jwtToken,
    refreshToken: refreshTokenVal,
    expires_in: config.get("jwt:tokenExpiration")
  };
};
