const { userService } = require('../../services');

module.exports = {
    getUsersWithCars: (req, res) => {
        try {
            res.status(200).json(req.message || req.users);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserById: (req, res) => {
        try {
            res.status(200).json(req.user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            await userService.createUser(req.body);
            res.status(201).json('user has been created');
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const { id } = req.params;
            await userService.deleteUserById(id);
            res.status(204).end();
        } catch (e) {
            res.json(e.message);
        }
    },

    editUserById: async (req, res) => {
        try {
            const { id } = req.params;
            await userService.editUserById(id, req.body);
            res.status(201).json('user has been edited');
        } catch (e) {
            res.json(e.message);
        }
    }
};
