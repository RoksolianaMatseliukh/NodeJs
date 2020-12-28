const { userService } = require('../../services');

module.exports = {
    getUsers: (req, res) => {
        try {
            const users = userService.getUsers();
            res.status(200).json(users);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUserByEmail: (req, res) => {
        try {
            res.status(200).json(req.user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: (req, res) => {
        try {
            userService.createUser(req.body);
            res.status(201).json('user has been created');
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUserByEmail: (req, res) => {
        try {
            const { email } = req.params;
            userService.deleteUserByEmail(email);
            res.status(204);
        } catch (e) {
            res.json(e.message);
        }
    },

    editUserByEmail: (req, res) => {
        try {
            const { email } = req.params;
            userService.editUserByEmail(email, req.body);
            res.status(201).json('user has been edited');
        } catch (e) {
            res.json(e.message);
        }
    }
};
