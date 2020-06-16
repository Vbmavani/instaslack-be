const mongoose = require('mongoose');

const schema = {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }
}
const LikeSchema = new mongoose.Schema(schema)
module.exports = mongoose.model('like', LikeSchema);