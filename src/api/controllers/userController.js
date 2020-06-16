const {userService} = require ('../../services');
class UserService {
    async getUser(req,res){
        return res.json({flag:true});
    }
}