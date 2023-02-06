const Contact = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const contacts = favorite
    ? await Contact.find({ owner: _id, favorite }, "", {
        skip,
        limit: Number(limit),
      })
    : await Contact.find({ owner: _id }, "", {
        skip,
        limit: Number(limit),
      });

  res.status(200).json({ data: contacts });
};

module.exports = getAll;
