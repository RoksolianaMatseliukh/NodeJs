const { Sequelize: { Op } } = require('sequelize');

const { carService } = require('../services');

module.exports = async (query) => {
    let where = {
        limit: await carService.getNumberOfCars(),
        offset: 0
    };

    if (+query.limit) {
        where.limit = +query.limit;
    }

    if (+query.page) {
        where.offset = where.limit * (query.page - 1);
    }

    if (query.models) {
        const models = query.models.split(',');

        where = {
            ...where,
            model: {
                [Op.in]: models
            }
        };
    }

    if (query.price_gte) {
        where = {
            ...where,
            price: {
                [Op.gte]: query.price_gte
            }
        };
    }

    if (query.year_lte) {
        where = {
            ...where,
            year: {
                [Op.lte]: query.year_lte
            }
        };
    }

    return where;
};
