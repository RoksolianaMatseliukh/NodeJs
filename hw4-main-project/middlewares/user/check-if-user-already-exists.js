const { ErrorHandler, customErrors: { EMAIL_ALREADY_EXISTS } } = require('../../errors');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;
        const { email: registeredEmail } = req.user || {};

        const checkUserByEmail = async () => {
            const [foundUser] = await userService.getUsers({ email });

            if (foundUser) {
                throw new ErrorHandler(EMAIL_ALREADY_EXISTS.message, EMAIL_ALREADY_EXISTS.code);
            }
        };

        // when create
        if (!registeredEmail) {
            await checkUserByEmail();
        }

        // when edit
        if (registeredEmail && email && registeredEmail !== email) {
            await checkUserByEmail();
        }

        next();
    } catch (e) {
        next(e);
    }
};
