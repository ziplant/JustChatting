const Joi = require("@hapi/joi");

module.exports.createValidation = (req, res, next) => {
  if (!req.body.password) delete req.body.password;

  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date_created: Joi.date().default(Date.now()),
    password: Joi.string(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports.updateValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    password: Joi.string().default(""),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
