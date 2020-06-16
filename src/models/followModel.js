const mongoose = require('mongoose');

const schema = {
    follow_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    follow_from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}
const FollowSchema = new mongoose.Schema(schema)
module.exports = mongoose.model('follow', FollowSchema);