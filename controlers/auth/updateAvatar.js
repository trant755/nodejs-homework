const User = require("../../models/user");
const path = require("path");
const resizeAvatar = require("../../helpers/resizeAvatar");
const fs = require("fs").promises;

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;

  const imgName = `${req.user._id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarDir, imgName);

    await resizeAvatar(tempUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", imgName);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
