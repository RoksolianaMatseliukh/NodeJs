const { ErrorHandler, customErrors: { WRONG_EMAIL_OR_PASSWORD } } = require('../../errors');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const [foundUser] = await userService.getUsers({ email });

        if (!foundUser) {
            throw new ErrorHandler(
                WRONG_EMAIL_OR_PASSWORD.message,
                WRONG_EMAIL_OR_PASSWORD.code,
                WRONG_EMAIL_OR_PASSWORD.customCode
            );
        }

        req.user = foundUser;
        next();
    } catch (e) {
        next(e);
    }
};
