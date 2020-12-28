let dataBase = require('../../dataBase/users');

module.exports = {
    getUsers: () => dataBase,

    getUserByEmail: (email) => dataBase.find((user) => user.email === email),

    createUser: (user) => {
        dataBase.push(user);
    },

    deleteUserByEmail: (email) => {
        dataBase = dataBase.filter((user) => user.email !== email);
    },

    editUserByEmail: (email, editedUser) => {
        const index = dataBase.findIndex((user) => user.email === email);
        dataBase[index] = editedUser;
    }
};
