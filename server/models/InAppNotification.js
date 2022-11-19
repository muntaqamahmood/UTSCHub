const mongoose = require("mongoose");

const inAppNotificationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        messages: {
            type: [String],
            default: [],
        },
        endpoints: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('inAppNotification', inAppNotificationSchema);