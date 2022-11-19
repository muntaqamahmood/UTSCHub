const inAppNotification = require('../models/InAppNotification');

module.exports = async function createOrAddActivity(user, message, endpoint) {
    if (user.followedUsers.length > 0) {
        for (const eachUser of user.followedUsers) {
            const isExist = await inAppNotification.find({ 'user': { $in: eachUser } });
            if (isExist.length === 0) {
                const parameters = {
                    user: eachUser,
                    messages: message,
                    endpoints: endpoint,
                }
                const notification = new inAppNotification(parameters);
                notification.save();
            }
            else {
                isExist[0].messages.push(message);
                isExist[0].endpoints.push(endpoint);
                isExist[0].save();
                console.log("The notification is\n", isExist);
            }
        }
    }
}
