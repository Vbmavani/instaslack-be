const { UserService, TokenService } = require('../../services');
const bcrypt = require('bcrypt');
class authController {
    async create(req, res) {
        const model = req.body;
        try {
            const user_exist = await UserService.getOne({username : model.username});
            if(user_exist){
                return res.json({flag:false,data:{},message:'username has been taken',code:500});
            }
            const user = await UserService.create(model);
            const token = await TokenService.create({
                user_id: user._id,
                type: "user_login"
            });
            return res.json({ flag: true, data: { user, token: token.token }, message: 'success', code: 200 });
        } catch (e) {
            console.log('e', e);
            return res.json({ flag: false, data: {}, message: 'something went wrong', code: 500 });
        }
    }
    async login(req, res) {
        const model = req.body;
        const user_exist = await UserService.getOne({ username: model.username });
        if (!user_exist) {
            return res.json({ flag: false, data: {}, message: 'user dones not exists Please Register', code: 500 });
        }
        const user = await UserService.getOne({ username: model.username, password: model.password });
        if (!user) {
            res.json({ flag: false, data: {}, message: 'Invalid Password', code: 200 })
        }
        const token = await TokenService.create({
            user_id: user._id,
            type: "user_login"
        });
        res.json({ flag: true, data: { user, token: token.token }, message: 'success', code: 200 })
        
    }
    async updateprofile(req, res) {
        const model = req.body;
        
        try {
            if(!(model.username == req.user.username)){
                let username_exist = await UserService.getOne({username : model.username});
                if(username_exist){
                    return res.json({flag:false,data:{},message:"usename has been taken by someone",code:200})
                }
            }
            let user = await UserService.update({ _id: req.user._id }, model);

            return res.json({ flag: true, data: { user }, message: 'success', code: 200 });

        } catch (e) {
            return res.json({ flag: false, data: {}, message: 'backend something went wrong', code: 500 });
        }
    }
    async logout(req, res) { 
        try{
            const token = await TokenService.removeAuthToken({ token: req.token.token }) 
            return res.json({flag:true,data:{token},message:'success',data:200 });
        }catch{
            return res.json({flag:false,data:{},message:'something went wrong',data:500})  
        }
    }
    async getusers(req, res) {
        const { username } = req.params;
        const users = await UserService.getAll({username : {$regex: `^${username}`}},{_id:true,avatar:true,username:true,name:true,});
        res.json({ flag: true, data: users, message: 'success', code: 200 });
    }
    async getUser(req,res){
        //console.log('req.user',req.user);
        res.json({flag:true,data:{user: req.user},message:'success',code:200}); 
    }
}
 
module.exports = new authController();