module.exports = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'SECRET',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'R_SECRET',

    PORT: process.env.PORT || 5000,

    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_USER: process.env.DATABASE_USER
};
