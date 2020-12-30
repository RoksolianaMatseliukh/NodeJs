const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (id <= 0 || !Number.isInteger(+id)) {
            throw new Error('id must be greater than zero and consist only of numbers');
        }

        const foundUser = await userService.getUserById(id);

        if (!foundUser) {
            throw new Error(`user with id: ${id} doesn't exists`);
        }

        req.user = foundUser;
        next();
    } catch (e) {
        res.status(404).json(e.message);
    }
};
