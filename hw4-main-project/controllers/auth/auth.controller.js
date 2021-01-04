const { authService } = require('../../services');
const { JWTEnum: { AUTHORIZATION }, statusCodesEnum: { NO_CONTENT } } = require('../../constants');
const { tokenizer } = require('../../helpers');

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
        try {
            const { id } = req.user;
            const token_pair = tokenizer();

            await authService.deleteTokenPair({ user_id: id });
            await authService.createTokenPair({ ...token_pair, user_id: id });

            res.json(token_pair);
        } catch (e) {
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
