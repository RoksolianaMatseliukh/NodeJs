const Joi = require('joi');

const { regexpEnum: { EMAIL, PASSWORD } } = require('../../constants');

module.exports = Joi.object({
    name: Joi.string().trim().alphanum().min(2)
        .max(25)
        .optional(),
    age: Joi.number().integer().greater(15).less(120)
        .optional(),
    email: Joi.string().trim().regex(EMAIL).optional(),
    password: Joi.string().trim().regex(PASSWORD).optional()
});
