const Sentry = require('@sentry/node');

const { appConfigs: { SENTRY_DSN } } = require('../configs');

Sentry.init({
    dsn: SENTRY_DSN
});

module.exports = Sentry;
