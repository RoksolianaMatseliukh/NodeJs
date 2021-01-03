const { tokenizer } = require('../../helpers');
const { authService } = require('../../services');

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
    }
};
