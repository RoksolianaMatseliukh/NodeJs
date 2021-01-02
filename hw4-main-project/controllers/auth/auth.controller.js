const { statusCodesEnum: { OK } } = require('../../constants');

module.exports = {
    login: (req, res, next) => {
        try {
            res.status(OK).json(req.user);
        } catch (e) {
            next(e);
        }
    }
};
