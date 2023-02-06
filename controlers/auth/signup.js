const User = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }

  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ email, password: hashPass, subscription });
  res.status(201).json({
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = signup;
