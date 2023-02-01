const Contact = require("../../models/contact");

const add = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json({ data: newContact });
};

module.exports = add;
