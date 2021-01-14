const Joi = require('joi');

const { regexpEnum: { EMAIL } } = require('../../constants');

module.exports = Joi.object({
    name: Joi.string().trim().alphanum().min(2)
        .max(25)
        .optional(),
    age: Joi.number().integer().greater(17).less(120)
        .optional(),
    email: Joi.string().trim().regex(EMAIL).optional()
});
