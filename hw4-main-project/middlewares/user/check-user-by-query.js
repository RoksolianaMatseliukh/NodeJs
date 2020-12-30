const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { name } = req.query;

        if (name) {
            const foundUsers = await userService.getFilteredUsersByName(name);

            if (!foundUsers.length) {
                req.message = 'no user found';
            } else {
                req.users = foundUsers;
            }
        } else {
            const users = await userService.getUsersWithCars();

            if (!users.length) {
                req.message = 'db has no users';
            } else {
                req.users = users;
            }
        }

        next();
    } catch (e) {
        res.json(e.message);
    }
};
