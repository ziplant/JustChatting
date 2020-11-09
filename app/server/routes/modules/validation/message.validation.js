const Joi = require("@hapi/joi");

module.exports.createValidation = (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.number().required(),
    group_id: Joi.number().required(),
    message_text: Joi.string().required(),
    date_of_writing: Joi.date().default(Date.now()),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};
