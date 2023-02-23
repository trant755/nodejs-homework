const User = require("../../models/user");
const { BadRequest, NotFound } = require("http-errors");
const sendMail = require("../../helpers/sendMail");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });
  if (!user) {
    throw NotFound("Email not found");
  }
  if (user.verify) {
    throw BadRequest("Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Register verefication",
    html: `<a href="http//localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Сonfirm your email</a>`,
  };
  await sendMail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
