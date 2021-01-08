const { tableNamesEnum: { CARS, USERS } } = require('../../constants');
const { passwordHelper: { hash } } = require('../../helpers');

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(USERS, [
            {
                id: 1,
                name: 'roksi',
                age: 26,
                email: 'roksi@gmail.com',
                password: await hash('111hT!h555')
            },
            {
                id: 2,
                name: 'lili',
                age: 21,
                email: 'lili@gmail.com',
                password: await hash('222hT!h555')
            },
            {
                id: 3,
                name: 'max',
                age: 28,
                email: 'max@gmail.com',
                password: await hash('333hT!h555')
            }
        ]);

        await queryInterface.bulkInsert(CARS, [
            {
                id: 1,
                model: 'audi',
                price: 228000,
                year: 2010
            },
            {
                id: 2,
                model: 'bmw',
                price: 234000,
                year: 2011
            },
            {
                id: 3,
                model: 'skoda',
                price: 235500,
                year: 2015
            },
            {
                id: 4,
                model: 'tesla',
                price: 234110,
                year: 2016
            },
            {
                id: 5,
                model: 'opel',
                price: 334000,
                year: 2017
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(USERS, {
            id: {
                [Sequelize.Op.between]: [
                    1,
                    3
                ]
            }
        }, {});

        await queryInterface.bulkDelete(CARS, {
            id: {
                [Sequelize.Op.between]: [
                    1,
                    5
                ]
            }
        }, {});
    }
};
