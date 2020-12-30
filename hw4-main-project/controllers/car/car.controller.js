const { carService } = require('../../services');

module.exports = {
    getCars: async (req, res) => {
        try {
            const cars = await carService.getCars();
            res.status(200).json(cars);
        } catch (e) {
            res.json(e.message);
        }
    },

    createCar: async (req, res) => {
        try {
            await carService.createCar(req.body);
            res.status(201).json('car has been added to user');
        } catch (e) {
            res.json(e.message);
        }
    }
};
