const { tableNamesEnum: { CARS, USERS } } = require('../../constants');

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(USERS, [{
            id: 1,
            name: 'roksi',
            age: 26,
            email: 'roksi@gmail.com',
            password: '111hhh555'
        }]);

        await queryInterface.bulkInsert(CARS, [
            {
                id: 1,
                model: 'audi',
                price: 228000,
                year: 2010,
                user_id: 1
            },
            {
                id: 2,
                model: 'bmw',
                price: 234000,
                year: 2011,
                user_id: 1
            }
        ]);
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(USERS, { id: 1 }, {});
    }
};
