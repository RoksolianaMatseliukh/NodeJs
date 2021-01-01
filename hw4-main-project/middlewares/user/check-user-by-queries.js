const { statusMessagesEnum: { NO_ENTITY_FOUND } } = require('../../constants');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        // eslint-disable-next-line prefer-const
        let { page, limit, ...queries } = req.query;

        if (!page || page <= 0 || !Number.isInteger(+page)) {
            page = 1;
        }

        if (!limit || limit <= 0 || !Number.isInteger(+limit)) {
            limit = await userService.getNumberOfUsers();
        }

        const offset = limit * (page - 1);

        const foundUsers = await userService.getUsers(queries, offset, +limit);

        if (!foundUsers.length) {
            req.message = NO_ENTITY_FOUND;
        } else {
            req.users = foundUsers;
        }

        next();
    } catch (e) {
        next(e);
    }
};
