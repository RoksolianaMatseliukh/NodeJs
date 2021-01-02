const bcrypt = require('bcrypt');

const { ErrorHandler, customErrors: { WRONG_EMAIL_OR_PASSWORD } } = require('../errors');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashedPassword) => {
        const isPasswordEqual = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordEqual) {
            throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.code);
        }
    }
};
