const db = require('../../dataBase').getInstance();
const { modelNamesEnum: { CAR_FILE } } = require('../../constants');

module.exports = {
    createCarFile: (file) => {
        const CarFileModel = db.getModel(CAR_FILE);

        return CarFileModel.create(file);
    }
};
