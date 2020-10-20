const Joi = require("@hapi/joi");

module.exports.createValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
    portrait_path: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports.updateValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3),
    password: Joi.string().min(5),
    portrait_path: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports.loginValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
