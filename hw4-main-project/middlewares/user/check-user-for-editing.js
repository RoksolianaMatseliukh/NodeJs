const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { email: editedEmail } = req.body;
        const { email } = req.user;

        if (editedEmail !== email) {
            const foundUser = await userService.getUserByEmail(editedEmail);

            if (foundUser) {
                throw new Error(`user with email: ${editedEmail} already exists`);
            }
        }

        next();
    } catch (e) {
        res.status(401).json(e.message);
    }
};
