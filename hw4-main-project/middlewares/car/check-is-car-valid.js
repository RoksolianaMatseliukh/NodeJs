module.exports = (req, res, next) => {
    try {
        const {
            model, price, year, user_id
        } = req.body;

        if (!model || !price || !year || !user_id || user_id < 0 || !Number.isInteger(+user_id)) {
            throw new Error('car isn\'t valid');
        }

        next();
    } catch (e) {
        res.status(400).json(e.message);
    }
};
