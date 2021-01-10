const { ErrorHandler, customErrors: { USER_ALREADY_HAVE_SAME_CAR } } = require('../../errors');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { userId: user_id } = req.params;
        const { car_id } = req.body;

        const foundRelation = await userService.getRelationUserToCar(user_id, car_id);

        if (foundRelation) {
            throw new ErrorHandler(
                USER_ALREADY_HAVE_SAME_CAR.message,
                USER_ALREADY_HAVE_SAME_CAR.code,
                USER_ALREADY_HAVE_SAME_CAR.customCode
            );
        }

        next();
    } catch (e) {
        next(e);
    }
};
