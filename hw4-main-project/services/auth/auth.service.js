const db = require('../../dataBase').getInstance();
const { dataBaseEnum: { USER_ID }, modelNamesEnum: { OAUTH, USER } } = require('../../constants');

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

    getNumberOfTokensByDistinctUserId: (params) => {
        const OAuthModel = db.getModel(OAUTH);

        return OAuthModel.count({
            where: params,
            distinct: true,
            col: USER_ID
        });
    },

    deleteTokenPair: (params, transaction) => {
        const OAuthModel = db.getModel(OAUTH);

        return OAuthModel.destroy({
            where: params,
            transaction
        });
    }
};
