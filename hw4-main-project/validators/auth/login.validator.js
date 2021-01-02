const Joi = require('joi');

const { regexpEnum: { EMAIL, PASSWORD } } = require('../../constants');

module.exports = Joi.object({
    email: Joi.string().trim().regex(EMAIL).required(),
    password: Joi.string().trim().regex(PASSWORD).required()
});
