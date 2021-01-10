const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1();

const { emailActionsEnum: { ACTIVATE_ACCOUNT, RESTORE_ACCOUNT } } = require('../../constants');
const { folderNamesEnum: { AVATAR, PUBLIC, USERS } } = require('../../constants');
const { passwordHelper: { hash } } = require('../../helpers');
const {
    statusCodesEnum: { CREATED, NO_CONTENT },
    statusMessagesEnum: { CAR_ADDED_TO_USER, ENTITY_EDITED, ENTITY_CREATED }
} = require('../../constants');
const { emailService, userService } = require('../../services');

module.exports = {
    getUsersWithCars: (req, res, next) => {
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
        try {
            const {
                avatar,
                body: { name, email, password }
            } = req;
            const hashedPassword = await hash(password);

            const { id } = await userService.createUser({ ...req.body, password: hashedPassword });

            if (avatar) {
                const avatarDirPath = path.join(USERS, `${id}`, AVATAR);
                const avatarFullDirPath = path.join(process.cwd(), PUBLIC, avatarDirPath);

                const avatarExtension = avatar.name.split('.').pop();

                const avatarName = `${uuid}.${avatarExtension}`;
                const avatarPath = path.join(avatarDirPath, avatarName);

                await fs.mkdir(avatarFullDirPath, { recursive: true });
                await avatar.mv(path.join(avatarFullDirPath, avatarName));

                await userService.editUserById(id, { avatar: avatarPath });
            }

            await emailService.sendMail(email, ACTIVATE_ACCOUNT, { userName: name });

            res.status(CREATED).json(ENTITY_CREATED);
        } catch (e) {
            next(e);
        }
    },

    addCarToUser: async (req, res, next) => {
        try {
            const { userId: user_id } = req.params;
            const { car_id } = req.body;

            await userService.addCarToUser({ user_id, car_id });

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
                const avatarDirPath = path.join(USERS, `${userId}`, AVATAR);
                const avatarFullDirPath = path.join(process.cwd(), PUBLIC, avatarDirPath);

                const avatarExtension = avatar.name.split('.').pop();

                const avatarName = `${uuid}.${avatarExtension}`;
                const avatarPath = path.join(avatarDirPath, avatarName);

                if (!existingAvatarPath) {
                    await fs.mkdir(avatarFullDirPath, { recursive: true });
                } else {
                    await fs.unlink(path.join(process.cwd(), PUBLIC, existingAvatarPath));
                }

                await avatar.mv(path.join(avatarFullDirPath, avatarName));

                req.body.avatar = avatarPath;
            }

            await userService.editUserById(userId, req.body);

            res.status(CREATED).json(ENTITY_EDITED);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { name, email } = req.user;

            await userService.deleteUserById(userId);
            await emailService.sendMail(email, RESTORE_ACCOUNT, { userName: name });

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    deleteCarFromUser: async (req, res, next) => {
        try {
            const { userId: user_id, carId: car_id } = req.params;

            await userService.deleteCarFromUser(user_id, car_id);

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
};
