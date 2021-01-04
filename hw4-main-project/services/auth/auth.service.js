const db = require('../../dataBase').getInstance();
const { modelNamesEnum: { OAUTH, USER } } = require('../../constants');

module.exports = {
    createTokenPair: (token_pair) => {
        const OAuthModel = db.getModel(OAUTH);

        return OAuthModel.create(token_pair);
    },

    getUserWithTokenByParams: (params) => {
        const OAuthModel = db.getModel(OAUTH);
        const UserModel = db.getModel(USER);

        return UserModel.findOne({
            include: { model: OAuthModel, where: params }
        });
    },

    deleteTokenPair: async (params) => {
        const OAuthModel = db.getModel(OAUTH);

        await OAuthModel.destroy({
            where: params
        });
    }
};
