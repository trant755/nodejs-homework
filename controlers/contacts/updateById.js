const Contact = require("../../models/contact");
const createError = require("http-errors");

const updateById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.findOneAndUpdate(
    {
      _id: req.params.contactId,
      owner,
    },
    req.body,
    { new: true }
  );

  if (!newContact) {
    const error = createError.NotFound(
      `Product with id=${req.params.contactId} not found`
    );
    throw error;
  }

  res.status(200).json({ data: newContact });
};

module.exports = updateById;
