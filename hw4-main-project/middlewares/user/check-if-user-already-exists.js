const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const foundUser = await userService.getUserByEmail(email);

        if (foundUser) {
            throw new Error(`user with email: ${email} already exists`);
        }

        next();
    } catch (e) {
        res.status(401).json(e.message);
    }
};
