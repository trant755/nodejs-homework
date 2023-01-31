const Book = require("../../models/contact");

const getAll = async (req, res) => {
  const contacts = await Book.find();

  res.status(200).json({ data: contacts });
};

module.exports = getAll;
