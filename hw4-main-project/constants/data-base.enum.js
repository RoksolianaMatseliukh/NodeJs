module.exports = {
    DATABASE_NAME: 'auto_shop',
    LOCALHOST: 'localhost',
    MYSQL: 'mysql',

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
