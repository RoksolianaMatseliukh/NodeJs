const { userService } = require('../../services');

module.exports = (req, res, next) => {
    try {
        const { email } = req.params;

        const foundUser = userService.getUserByEmail(email);

        if (!foundUser) {
            throw new Error(`user with email: ${email} doesn't exists`);
        }

        req.user = foundUser;
        next();
    } catch (e) {
        res.status(404).json(e.message);
    }
};
