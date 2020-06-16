const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const config = require('../config')
const {TokenModel} = require('../models');

class TokenService {
    async create(model){
        let jwtToken = "";
        try {
            jwtToken = jwt.sign(
              {
                id: model.user_id
                
              },process.env.JWT_SECRET
            );
          } catch (error) {
            throw new Error("LOGIN FAILED");
          }
        model.token = jwtToken;
        //model.token = jwtToken;

        return TokenModel.create(model);
    }
    async getOne(where){
        return TokenModel.findOne(where);
    }
    async removeAuthToken(where) {
        return TokenModel.deleteOne(where);
    }
}

module.exports = new TokenService();