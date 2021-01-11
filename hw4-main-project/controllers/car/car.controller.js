const fs = require('fs-extra').promises;
const path = require('path');

const { carService } = require('../../services');
const { fileHelper } = require('../../helpers');
const {
    folderNamesEnum: {
        CARS, DOCS, IMAGES, PUBLIC
    }
} = require('../../constants');
const {
    statusCodesEnum: { CREATED, NO_CONTENT },
    statusMessagesEnum: { ENTITY_CREATED, ENTITY_EDITED },
    uploadFilesEnum: { FILE_TYPES: { DOCUMENT, IMAGE } }
} = require('../../constants');
const transactionInstance = require('../../dataBase/create-transactions');

module.exports = {
    getCars: async (req, res, next) => {
        try {
            const cars = await carService.getCars();

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    getCarById: (req, res, next) => {
        try {
            res.json(req.car);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { body, docs, images } = req;

            const { id } = await carService.createCar(body, transaction);

            if (docs.length) {
                await fileHelper.carFileCreator(docs, id, DOCS, DOCUMENT, transaction);
            }

            if (images.length) {
                await fileHelper.carFileCreator(images, id, IMAGES, IMAGE, transaction);
            }

            await transaction.commit();

            res.status(CREATED).json(ENTITY_CREATED);
        } catch (e) {
            await transaction.rollback();

            next(e);
        }
    },

    editCarById: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const {
                body, docs, images, params: { carId }
            } = req;

            await carService.editCarById(carId, body, transaction);

            if (docs.length) {
                await fileHelper.carFileCreator(docs, carId, DOCS, DOCUMENT, transaction);
            }

            if (images.length) {
                await fileHelper.carFileCreator(images, carId, IMAGES, IMAGE, transaction);
            }

            await transaction.commit();

            res.status(CREATED).json(ENTITY_EDITED);
        } catch (e) {
            await transaction.rollback();

            next(e);
        }
    },

    deleteCarById: async (req, res, next) => {
        try {
            const { carId } = req.params;

            await carService.deleteCarById(carId);

            await fs.rmdir(path.join(process.cwd(), PUBLIC, CARS, carId), { recursive: true });

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
};
