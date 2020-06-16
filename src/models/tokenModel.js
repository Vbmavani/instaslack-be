const mongoose = require('mongoose');

const schema = {
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String
    },
    type: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    expires_at: {
        type: String,
        default: null
    }
}
const TokenSchema =new mongoose.Schema(schema);
module.exports = mongoose.model('token',TokenSchema);