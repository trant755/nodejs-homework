const Jimp = require("jimp");

const resizeAvatar = (tempUpload, resultUpload) => {
  Jimp.read(tempUpload).then((avatar) => {
    return avatar.resize(250, 250).write(resultUpload);
  });
};

module.exports = resizeAvatar;
