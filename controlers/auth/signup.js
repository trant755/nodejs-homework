const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const User = require("../../models/user");
const sendMail = require("../../helpers/sendMail");
const { nanoid } = require("nanoid");

const signup = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }

  const avatarURL = gravatar.url(email);
  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = nanoid();
  const mail = {
    to: email,
    subject: "Register verefication",
    html: `<a href="http//localhost:3000/api/users/verify/${verificationToken}" target="_blank">Сonfirm your email</a>`,
  };

  await sendMail(mail);

  await User.create({
    email,
    password: hashPass,
    subscription,
    avatarURL,
    verificationToken,
  });
  res.status(201).json({
    data: {
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = signup;
