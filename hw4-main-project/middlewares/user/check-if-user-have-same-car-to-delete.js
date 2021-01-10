const { ErrorHandler, customErrors: { ENTITY_NOT_FOUND } } = require('../../errors');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { userId: user_id, carId: car_id } = req.params;

        const foundRelation = await userService.getRelationUserToCar(user_id, car_id);

        if (!foundRelation) {
            throw new ErrorHandler(
                ENTITY_NOT_FOUND.message,
                ENTITY_NOT_FOUND.code,
                ENTITY_NOT_FOUND.customCode
            );
        }

        next();
    } catch (e) {
        next(e);
    }
};
