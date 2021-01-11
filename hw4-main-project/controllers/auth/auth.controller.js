const { authService } = require('../../services');
const { JWTEnum: { AUTHORIZATION }, statusCodesEnum: { NO_CONTENT } } = require('../../constants');
const { tokenizer } = require('../../helpers');
const { transactionInstance } = require('../../dataBase').getInstance();

module.exports = {
    login: async (req, res, next) => {
        try {
            const { id } = req.user;
            const token_pair = tokenizer();

            await authService.createTokenPair({ ...token_pair, user_id: id });

            res.json(token_pair);
        } catch (e) {
            next(e);
        }
    },

    createNewTokenPair: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { id } = req.user;
            const token_pair = tokenizer();

            await authService.deleteTokenPair({ user_id: id }, transaction);
            await authService.createTokenPair({ ...token_pair, user_id: id }, transaction);
            await transaction.commit();

            res.json(token_pair);
        } catch (e) {
            await transaction.rollback();

            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await authService.deleteTokenPair({ access_token });

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },
};
