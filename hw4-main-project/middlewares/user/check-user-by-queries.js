const { statusMessagesEnum: { NO_ENTITY_FOUND } } = require('../../constants');
const { tableAttributesEnum: { EMAIL, PASSWORD } } = require('../../constants');
const { userQueryBuilder } = require('../../helpers');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { offset, limit, ...where } = await userQueryBuilder(req.query);

        const foundUsers = await userService.getUsers(where, offset, limit, EMAIL, PASSWORD);

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
