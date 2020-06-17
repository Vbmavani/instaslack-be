const mongoose = require('mongoose');

const schema = {
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    image_url: {
        type:String
    },
    description: {
        type: String
    },
    likes:{
        type:Number,
        default:0
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    deleted_at:{
        type:Date,
        default:null
    }
}
const PostSchema = new mongoose.Schema(schema)
module.exports = mongoose.model('post', PostSchema);