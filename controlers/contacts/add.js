const Contact = require("../../models/contact");

const add = async (req, res) => {
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({ data: newContact });
};

module.exports = add;
