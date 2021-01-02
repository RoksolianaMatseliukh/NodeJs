const {
    statusCodesEnum: { CREATED, NO_CONTENT, OK },
    statusMessagesEnum: { ENTITY_EDITED, ENTITY_CREATED }
} = require('../../constants');
const { userService } = require('../../services');
const { hash } = require('../../helpers');

module.exports = {
    getUsersWithCars: (req, res, next) => {
        try {
            res.status(OK).json(req.message || req.users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            res.status(OK).json(req.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const password = await hash(req.body.password);

            await userService.createUser({ ...req.body, password });

            res.status(CREATED).json(ENTITY_CREATED);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await userService.deleteUserById(userId);

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    editUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await userService.editUserById(userId, req.body);

            res.status(CREATED).json(ENTITY_EDITED);
        } catch (e) {
            next(e);
        }
    }
};
