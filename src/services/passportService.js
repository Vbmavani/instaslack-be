'use strict'

const {UserModel} = require('../models');  
const constants  = require('../api/constants');
const passport = require("passport")
const passportJWT = require("passport-jwt")
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

class PassportService {

  /**
   * Initialize Passport JWT strategy
   */
  initializePassport() {

    let jwtOptions = {}

    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    //console.log('const',constants.JWT_SECRET);
    jwtOptions.secretOrKey = constants.JWT_SECRET;
    const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
      //console.log('user',jwt_payload.id);
      
      //if (jwt_payload.id.match(/^[0-9a-fA-F]{24}$/)) {
        UserModel.findOne({_id: jwt_payload.id})
        .then(user=> {
         // console.log('user%%',user)
          if (user) {
            next(null, user);
          } else {
            next(null, false);
          }
        })
        // Yes, it's a valid ObjectId, proceed with `findById` call.
      // }else{
      //   console.log('ID doesnt match')
      // }
     
    });

    passport.use(strategy); 
  }
}

module.exports = new PassportService()
