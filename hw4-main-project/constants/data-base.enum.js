module.exports = {
    DATABASE_NAME: process.env.DATABASE_NAME,
    LOCALHOST: 'localhost',
    MYSQL: 'mysql',
    PASSWORD: process.env.DATABASE_PASSWORD,
    USER: process.env.DATABASE_USER,

    NOW: 'now',

    // reference key
    ID: 'id',

    // foreignKey
    USER_ID: 'user_id',

    // association between tables
    ASSOCIATION: {
        foreignKey: 'user_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    }
};
