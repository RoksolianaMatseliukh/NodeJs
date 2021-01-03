const jwt = require('jsonwebtoken');

const { JWTEnum: { JWT_SECRET, JWT_REFRESH_SECRET } } = require('../constants');

// генеруємо токени
module.exports = () => {
                    // генереємо токен - перший параметр - payload - те що генерується
                    // реальні дані туди не кидати - бо це легко розшифрувати - бо це шифрування,
                    // а не хешування - тому залишаємо пустий обєкт
                    // другий параметр - це секретний ключ за допомогою якого буде відбуватись шифрування
                    // та розшифровування (для refresh та access - ключі різні!!!!!!)
                    // третій параметр - якісь опції, є багато різних - основне це використовуємо
                    // expiresIn - протермінувати через - час в секундах - 100
                    // якщо довше, то пишемо наприклад - 7d - 7 днів, 10 h - 10 годин, 10m - 10 хвилин
    const access_token = jwt.sign({}, JWT_SECRET, { expiresIn: '10m' });
    const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '10d' });

    return {
        access_token,
        refresh_token
    };
};
