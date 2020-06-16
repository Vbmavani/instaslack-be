"use strict";
const {TokenModel} = require('../../models');

class auth {
  /**
   * Check if token exist in DB or not, if not then unauthorized
   * @param req
   * @param res
   * @param next
   */
  validateToken(req, res, next) {
    let { authorization: token } = req.headers;
    if (token && token.startsWith("bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    TokenModel.findOne({ token }).then(token => {
      if (token){
        
        req.token = token;
        return next();
      } 
      return res.status(401).send("Unauthorized");
    });
  }
}
module.exports = new auth();
