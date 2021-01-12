const { Schema, model } = require('mongoose');

const { tableNamesEnum: { LOGS } } = require('../../constants');

const LogSchema = new Schema({
    user_id: {
        type: Number,
        required: true
    },

    action: {
        type: String,
        required: true
    },

    car_id: {
        type: Number
    },

    comment: {
        type: Schema.Types.Mixed
    },

    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model(LOGS, LogSchema);
