const fs = require('fs-extra').promises;
const path = require('path');

const { emailActionsEnum: { ACTIVATE_ACCOUNT, RESTORE_ACCOUNT } } = require('../../constants');
const { emailService, logService, userService } = require('../../services');
const { fileHelper } = require('../../helpers');
const { folderFileNamesEnum: { PUBLIC, USERS } } = require('../../constants');
const { passwordHelper: { hash } } = require('../../helpers');
const {
    logActionsEnum: {
        AVATAR_CHANGED,
        REGISTRATION,
        REGISTRATION_WITH_AVATAR,
        REGISTRATION_WITHOUT_AVATAR,
        USER_ADDED_CAR, USER_DELETED,
        USER_DELETED_CAR,
        USER_EDITED_DATA
    },
    statusCodesEnum: { CREATED, NO_CONTENT },
    statusMessagesEnum: { CAR_ADDED_TO_USER, ENTITY_EDITED, ENTITY_CREATED }
} = require('../../constants');
const { transactionInstance } = require('../../dataBase').getInstance();

module.exports = {
    getUsers: (req, res, next) => {
        try {
            res.json(req.message || req.users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const {
                avatar,
                body: { name, email, password }
            } = req;

            const hashedPassword = await hash(password);

            const { id } = await userService.createUser({ ...req.body, password: hashedPassword }, transaction);

            if (avatar) {
                const avatarPath = await fileHelper.addAvatarToUser(avatar, id);

                await userService.editUserById(id, { avatar: avatarPath }, transaction);
            }

            await emailService.sendMail(email, ACTIVATE_ACCOUNT, { userName: name });
            await logService.createLog({
                action: REGISTRATION,
                comment: avatar ? REGISTRATION_WITH_AVATAR : REGISTRATION_WITHOUT_AVATAR,
                user_id: id
            });

            await transaction.commit();

            res.status(CREATED).json(ENTITY_CREATED);
        } catch (e) {
            await transaction.rollback();

            next(e);
        }
    },

    addCarToUser: async (req, res, next) => {
        try {
            const {
                body: { car_id },
                params: { userId: user_id }
            } = req;

            await userService.addCarToUser({ car_id, user_id });
            await logService.createLog({
                action: USER_ADDED_CAR,
                car_id,
                user_id
            });

            res.json(CAR_ADDED_TO_USER);
        } catch (e) {
            next(e);
        }
    },

    editUserById: async (req, res, next) => {
        try {
            const {
                avatar,
                params: { userId },
                user: { avatar: existingAvatarPath }
            } = req;

            if (avatar) {
                req.body.avatar = await fileHelper.changeUserAvatar(avatar, existingAvatarPath, userId);
            }

            await userService.editUserById(userId, req.body);
            await logService.createLog({
                action: USER_EDITED_DATA,
                comment: avatar && AVATAR_CHANGED,
                user_id: userId
            });

            res.status(CREATED).json(ENTITY_EDITED);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const {
                params: { userId },
                user: { name, email }
            } = req;

            await userService.deleteUserById(userId, transaction);
            await emailService.sendMail(email, RESTORE_ACCOUNT, { userName: name });
            await logService.createLog({
                action: USER_DELETED,
                user_id: userId
            });

            await fs.rmdir(path.join(process.cwd(), PUBLIC, USERS, userId), { recursive: true });

            await transaction.commit();

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            await transaction.rollback();

            next(e);
        }
    },

    deleteCarFromUser: async (req, res, next) => {
        try {
            const { userId: user_id, carId: car_id } = req.params;

            await userService.deleteCarFromUser(user_id, car_id);
            await logService.createLog({
                action: USER_DELETED_CAR,
                car_id,
                user_id
            });

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
};
