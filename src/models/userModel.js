const mongoose = require('mongoose');
const schema = {
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    age: {
        type: Number
    },
    address: {
        city: {
            type: String
        },
        country: {
            type: String
        }
    },
    friends:{
        type:Number,
        default:0
    },
    posts:{
        type:Number,
        default:0,
    },
    about_me: {
        type: String
    },
    avatar: {
        type: String,
        default:"https://instaslack.s3.ap-south-1.amazonaws.com/1592022640178"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
    },
    deleted_at: {
        type: Date
    }
}
const options = {
    versionKey: false,
    toObject: {
      transform: (doc, ret) => {}
    },
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.salt;
      }
    }
  };

const UserSchema = new mongoose.Schema(schema,options);
module.exports = mongoose.model('user', UserSchema);
//module.exports = mongoose.model('user', new mongoose.Schema(shcema));