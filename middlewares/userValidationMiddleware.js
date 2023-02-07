const Joi = require("joi");

const signupUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const loginUserSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  signupUserValidation: (req, res, next) => {
    const validation = signupUserSchema.validate(req.body);
    if (validation.error?.details[0].type === "any.required") {
      return res.status(400).json({ message: "missing required field" });
    }
    if (validation.error) {
      return res.status(400).json(validation.error.details[0].message);
    }
    next();
  },

  loginUserValidation: (req, res, next) => {
    const validation = loginUserSchema.validate(req.body);

    if (validation.error?.details[0].type === "any.required") {
      return res.status(400).json({ message: "missing required field" });
    }
    if (validation.error) {
      return res.status(400).json(validation.error.details[0].message);
    }
    next();
  },

  updateSubscriptionValidation: (req, res, next) => {
    const validation = updateSubscriptionSchema.validate(req.body);

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
