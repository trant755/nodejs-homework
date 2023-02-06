const User = require("../../models/user");

const updateFavorite = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const updateUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.status(200).json({ data: updateUser });
};

module.exports = updateFavorite;
