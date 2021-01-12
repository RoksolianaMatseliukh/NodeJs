const db = require('../../dataBase').getInstance();
const { modelNamesEnum: { OAUTH, USER } } = require('../../constants');

module.exports = {
    createTokenPair: async (token_pair, transaction) => {
        const OAuthModel = db.getModel(OAUTH);

        await OAuthModel.create(token_pair, {
            transaction
        });
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
