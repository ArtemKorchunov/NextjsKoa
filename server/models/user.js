const mongoose = require("mongoose");
const logger = require("../utils/logger");
const bcrypt = require("bcrypt");

const log = logger(module);
const SALT_WORK_FACTOR = 10;

const UserModel = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  salt: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    unique: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

UserModel.pre("save", async function preSave(next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    user.salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    user.password = await bcrypt.hash(user.password, user.salt);
    next();
  } catch (error) {
    log.error(error);
    next(error);
  }
});

UserModel.methods = {
  comparePassword: async function comparePassword(candidatePassword) {
    return bcrypt.compareAsync(candidatePassword, this.password);
  }
};

module.exports = mongoose.model("User", UserModel);
