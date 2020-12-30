module.exports = (req, res, next) => {
    try {
        const {
            name, age, email, password
        } = req.body;

        if (!name || !email || !password || !age || age < 0 || !Number.isInteger(+age)) {
            throw new Error('user isn\'t valid');
        }

        next();
    } catch (e) {
        res.status(400).json(e.message);
    }
};
