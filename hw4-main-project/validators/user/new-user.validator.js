const Joi = require('joi');

const { regexpEnum: { EMAIL, PASSWORD } } = require('../../constants');

module.exports = Joi.object({
    name: Joi.string().trim().alphanum().min(2)
        .max(25)
        .required(),
    age: Joi.number().integer().greater(17).less(120)
        .required(),
    email: Joi.string().trim().regex(EMAIL).required(),
    password: Joi.string().trim().regex(PASSWORD).required()
});
