const Contact = require("../../models/contact");

const getAll = async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json({ data: contacts });
};

module.exports = getAll;
