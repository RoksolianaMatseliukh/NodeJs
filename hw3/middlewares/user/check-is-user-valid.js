module.exports = (req, res, next) => {
    try {
        const {
            name, age, password, email
        } = req.body;

        if (!name || !age || !password || !email) {
            throw new Error('user isn\'t valid');
        }

        next();
    } catch (e) {
        res.status(400).json(e.message);
    }
};
