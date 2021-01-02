const { compare } = require('../../helpers');

module.exports = async (req, res, next) => {
    try {
        const { password } = req.body;
        const { password: hashedPassword, ...userToShow } = req.user.dataValues;

        await compare(password, hashedPassword);

        req.user = userToShow;
        next();
    } catch (e) {
        next(e);
    }
};
