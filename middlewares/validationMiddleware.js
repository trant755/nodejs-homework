const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).required(),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phone: Joi.string().min(5),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addContactValidation: (req, res, next) => {
    const validation = addContactSchema.validate(req.body);
    if (validation.error?.details[0].type === "any.required") {
      return res.status(400).json({ message: "missing required name field" });
    }
    if (validation.error) {
      return res.status(400).json(validation.error.details[0].message);
    }
    next();
  },

  updateContactValidation: (req, res, next) => {
    const validation = updateContactSchema.validate(req.body);

    if (validation.error) {
      return res.status(400).json(validation.error.details[0].message);
    }
    next();
  },

  updateFavoriteValidation: (req, res, next) => {
    const validation = updateFavoriteSchema.validate(req.body);

    if (validation.error?.details[0].type === "any.required") {
      return res.status(400).json({ message: "missing field favorite" });
    }

    if (validation.error) {
      console.log(validation.error);
      return res.status(400).json(validation.error.details[0].message);
    }
    next();
  },
};
