const {
    commonValidators: { numericalFieldValidator },
    userValidators: { optionalUserFieldsValidator }
} = require('../../validators');
const { statusMessagesEnum: { NO_ENTITY_FOUND } } = require('../../constants');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        // eslint-disable-next-line prefer-const
        let { page, limit, ...queries } = req.query;

        const { error: pageErr } = numericalFieldValidator.validate(+page);
        const { error: limitErr } = numericalFieldValidator.validate(+limit);
        const { error } = optionalUserFieldsValidator.validate(queries);

        if (pageErr) {
            page = 1;
        }

        if (limitErr) {
            limit = await userService.getNumberOfUsers();
        }

        if (error) {
            const [{ message }] = error.details;
            req.message = message;
        } else {
            const offset = limit * (page - 1);

            const foundUsers = await userService.getUsers(queries, offset, +limit);

            if (!foundUsers.length) {
                req.message = NO_ENTITY_FOUND;
            } else {
                req.users = foundUsers;
            }
        }

        next();
    } catch (e) {
        next(e);
    }
};
