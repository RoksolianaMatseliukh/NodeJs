const { userService } = require('../../services');

module.exports = (req, res, next) => {
    try {
        const { email } = req.body;
        const { email: emailFromParams } = req.params;

        if (email !== emailFromParams) {
            const foundUser = userService.getUserByEmail(email);

            if (foundUser) {
                throw new Error(`user with email: ${email} already exists`);
            }

            next();
        }

        next();
    } catch (e) {
        res.status(401).json(e.message);
    }
};
