const { userService } = require('../services');

module.exports = async () => {
    console.log(await userService.getNumberOfUsers());
};
