const { carService, userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { user_id } = req.body;

        const foundUser = await userService.getUserById(user_id);
        const foundCar = await carService.getCarByUserId(user_id);

        if (!foundUser) {
            throw new Error(`cannot add car, user with id: ${user_id} doesn't exists`);
        }

        if (foundCar) {
            throw new Error(`car with user id: ${user_id} already exists`);
        }

        next();
    } catch (e) {
        res.status(400).json(e.message);
    }
};
