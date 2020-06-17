const { UserModel } = require('../models');
const jwt = require("jsonwebtoken");

class authService {
    async create(where) {
        return UserModel.create(where);
    }
    async getOne(where) {
        return UserModel.findOne(where).select('-password');
    }
    async update(where, model) {
        return UserModel.findOneAndUpdate(where, model, { new: true })
    }
    async getAll(where){
        return UserModel.find(where)  
    }
    async handleNumber(where,what){ 
        return UserModel.update(where,what);
    }
}
    

module.exports = new authService();