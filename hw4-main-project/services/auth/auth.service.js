const db = require('../../dataBase').getInstance();
const { modelNamesEnum: { OAUTH, USER } } = require('../../constants');

module.exports = {
    getTokens: () => {
        const OAuthModel = db.getModel(OAUTH);

        return OAuthModel.findAll();
    },

    createTokenPair: (token_pair, transaction) => {
        const OAuthModel = db.getModel(OAUTH);

        return OAuthModel.create(token_pair, { transaction });
    },

    getUserWithTokenByParams: (params) => {
        const OAuthModel = db.getModel(OAUTH);
        const UserModel = db.getModel(USER);

        return UserModel.findOne({
            include: { model: OAuthModel, where: params }
        });
    },

    deleteTokenPair: async (params, transaction) => {
        const OAuthModel = db.getModel(OAUTH);

        await OAuthModel.destroy({
            where: params,
            transaction
        });
    }
};
