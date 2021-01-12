const { Sequelize: { Op } } = require('sequelize');

const { userService } = require('../services');

module.exports = async (query) => {
    let where = {
        limit: await userService.getNumberOfUsers(),
        offset: 0
    };

    if (+query.limit) {
        where.limit = +query.limit;
    }

    if (+query.page) {
        where.offset = where.limit * (query.page - 1);
    }

    if (query.age_gte) {
        where = {
            ...where,
            age: {
                [Op.gte]: query.age_gte
            }
        };
    }

    if (query.name) {
        where = {
            ...where,
            name: {
                [Op.substring]: query.name
            }
        };
    }

    if (query.ids) {
        const ids = query.ids.split(',');

        where = {
            ...where,
            id: {
                [Op.in]: ids
            }
        };
    }

    return where;
};
