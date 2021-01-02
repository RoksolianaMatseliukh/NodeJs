const Joi = require('joi');

const { dateEnum: { CURRENT_YEAR } } = require('../../constants');

module.exports = Joi.object({
    model: Joi.string().trim().alphanum().min(2)
        .max(25)
        .required(),
    price: Joi.number().positive().required(),
    year: Joi.number().integer().min(CURRENT_YEAR - 300).max(CURRENT_YEAR)
        .required(),
    user_id: Joi.number().integer().min(1).required()
});
