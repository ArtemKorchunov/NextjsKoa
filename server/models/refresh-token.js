const mongoose = require("mongoose");
const crypto = require("crypto");
const config = require("../config");
const logger = require("../utils/logger");
const log = logger(module);

const RefreshTokenModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true
  },
  token: {
    type: String,
    unique: true,
    required: true
  },
  created_at: {
    type: Date,
    expires: config.get("jwt:tokenExpiration")
  }
});

RefreshTokenModel.pre("validate", function preValidate(next) {
  if (this.isNew) {
    try {
      this.token = this.constructor.encryptToken(this.token);
      this.created_at = Date.now();
    } catch (error) {
      log.error(error);
      next(error);
    }
  }
  next();
});

/**
 * Static methods
 */
RefreshTokenModel.statics = {
  encryptToken: function encryptToken(refreshToken) {
    return crypto
      .createHash("sha1")
      .update(refreshToken)
      .digest("hex");
  }
};

module.exports = mongoose.model("RefreshToken", RefreshTokenModel);
