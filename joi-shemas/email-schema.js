const { Joi } = require('celebrate');

module.exports.emailSchema = Joi.string().required().email();
