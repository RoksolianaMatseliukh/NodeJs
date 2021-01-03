const db = require('../../dataBase').getInstance();
const { modelNamesEnum: { OAUTH } } = require('../../constants');

module.exports = {
    createTokenPair: (token_pair) => {
        const OAuthModel = db.getModel(OAUTH);

        return OAuthModel.create(token_pair);
    }
};
