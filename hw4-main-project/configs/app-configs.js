module.exports = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'SECRET',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'R_SECRET',

    ROOT_EMAIL: process.env.ROOT_EMAIL || 'xxx@x.com',
    ROOT_EMAIL_PASS: process.env.ROOT_EMAIL_PASS || 'xxx',
    ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',
    ROOT_EMAIL_FROM: process.env.ROOT_EMAIL_FROM || 'xxx@x.com',

    PORT: process.env.PORT || 5000
};
