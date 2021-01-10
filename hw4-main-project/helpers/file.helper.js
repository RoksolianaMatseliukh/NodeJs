const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid');

const { fileService } = require('../services');
const {
    folderNamesEnum: {
        AVATAR, CARS, PUBLIC, USERS
    }
} = require('../constants');

module.exports = {
    addAvatarToUser: async (avatar, id) => {
        const avatarDirPath = path.join(USERS, id, AVATAR);
        const avatarFullDirPath = path.join(process.cwd(), PUBLIC, avatarDirPath);

        const avatarExtension = avatar.name.split('.').pop();

        const avatarName = `${uuid.v1()}.${avatarExtension}`;
        const avatarPath = path.join(avatarDirPath, avatarName);

        await fs.mkdir(avatarFullDirPath, { recursive: true });
        await avatar.mv(path.join(avatarFullDirPath, avatarName));

        return avatarPath;
    },

    changeUserAvatar: async (avatar, existingAvatarPath, id) => {
        const avatarDirPath = path.join(USERS, id, AVATAR);
        const avatarFullDirPath = path.join(process.cwd(), PUBLIC, avatarDirPath);

        const avatarExtension = avatar.name.split('.').pop();

        const avatarName = `${uuid.v1()}.${avatarExtension}`;
        const avatarPath = path.join(avatarDirPath, avatarName);

        if (!existingAvatarPath) {
            await fs.mkdir(avatarFullDirPath, { recursive: true });
        } else {
            await fs.unlink(path.join(process.cwd(), PUBLIC, existingAvatarPath));
        }

        await avatar.mv(path.join(avatarFullDirPath, avatarName));

        return avatarPath;
    },

    carFileCreator: async (files, id, folder, type) => {
        const filesDirPath = path.join(CARS, id, folder);
        const filesFullDirPath = path.join(process.cwd(), PUBLIC, filesDirPath);

        await fs.mkdir(filesFullDirPath, { recursive: true });

        const promises = files.map((file) => {
            const fileExtension = file.name.split('.').pop();
            const fileName = `${uuid.v1()}.${fileExtension}`;
            const filePath = path.join(filesDirPath, fileName);

            file.mv(path.join(filesFullDirPath, fileName));

            return fileService.createCarFile({ car_id: id, file: filePath, type });
        });

        await Promise.allSettled(promises);
    }
};
