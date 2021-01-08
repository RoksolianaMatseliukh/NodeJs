const Joi = require('joi');

module.exports = Joi.object({
    car_id: Joi.number().integer().min(1).required()
});
