const { Joi } = require('celebrate');
const { objectId } = require('./object-id-schema');
const { linkSchema } = require('./link-schema');
const { textSchema } = require('./text-schema');
const { emailSchema } = require('./email-schema');
const { passwordSchema } = require('./password-schema');

const registrationSchema = Joi.object().keys({
  email: emailSchema,
  password: passwordSchema,
  name: textSchema,
  about: textSchema,
  avatar: linkSchema,
});

const loginSchema = Joi.object().keys({
  email: emailSchema,
  password: passwordSchema,
});

const objectIdSchema = Joi.object().keys({ id: objectId });

const userAvatarSchema = Joi.object().keys({ avatar: linkSchema });

const userInfoSchema = Joi.object().keys({
  name: textSchema,
  about: textSchema,
});

const cardSchema = Joi.object().keys({ name: textSchema, link: linkSchema });

module.exports = {
  loginSchema,
  registrationSchema,
  cardSchema,
  userInfoSchema,
  userAvatarSchema,
  objectIdSchema,
};
