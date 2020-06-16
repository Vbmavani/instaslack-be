const { PostService, UserService } = require('../../services');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../../config');
class postController {
    async createPost(req, res) {
        const model = req.body;
        try{
            const data = await PostService.create({...model,owner:req.user._id});
            res.json({flag:true,data:{},message:'success',code:200});
        }catch{
            res.json({flag:false,data:{},message:'something went wrong',code:500});
        }
        
    }
    async createUrl(req,res){
        
        aws.config.update({
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
            accessKeyId: process.env.ACCESS_KEY_ID,
            region: 'ap-south-1'
          });
          
          const s3 = new aws.S3();
          const fileFilter = (req, file, cb) => { 
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {     
                cb(null, true)
            } else {
                cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
            }
          }
          const upload = multer({ 
            storage: multerS3({
              s3,
              bucket: 'instaslack',
              acl: 'public-read',
              metadata: function (req, file, cb) { 
                cb(null, {fieldName: 'TESTING_META_DATA!'});
              },
              key: function (req, file, cb) {
                cb(null, Date.now().toString())
              }
            }),
          })
          let url = '';
          const singleUpload = upload.single('file');
          await singleUpload(req, res, function(err) {
            if (err) {
              return res.json({flag:false,data:{},message: 'File UploaD Error'});
            }
            url = req.file.location;
            return res.json({flag:true,data:url,message:'success',code:200})
          });
    }
    async deletePost(req, res) {
        const { id } = req.params;
        const post = await PostService.delete({ _id: id });
        return res.json({ flag: true, data: {}, message: 'success', code: 200 })
    }
    async followToggle(req, res) {
        const model = req.body;
        if (model.toggle) {
            const createFollow = await PostService.createFollow({ follow_from: req.user._id, follow_to: model.follow_from })
            res.json({ flag: true, data: {}, message: 'success', code: 200 });
        } else {
            const removeFollow = await PostService.removeFollow({ follow_from:  req.user._id, follow_to: model.follow_from });
            res.json({ flag: true, data: {}, message: 'success', code: 200 })
        }
    }
    async likeToggle(req, res) {
        const model = req.body;
        if (model.toggle) {
            const createLike = await PostService.createLike({ post: model.post_id, user: req.user._id });
            res.json({ flag: true, data: {}, message: 'success', code: 200 });
        } else {
            const removeLike = await PostService.removeLike({ post: model.post_id, user: req.user._id });
            res.json({ flag: true, data: {}, message: 'success', code: 200 });
        }
    }
    async getPostLikedUsers(req, res) {
        const { id } = req.params;
        const users = await PostService.getPostLikedUsers({ post: id });
        res.json({ flag: true, data: { users }, message: 'success', code: 200 });
    }
    async newsfeed(req, res) {
        //const follow_to = req.user._id;
        // const followers = await PostService.getfollowers({ follow_to })
        const posts = await PostService.getposts(req.user._id);
        res.json({ flag: true, data: posts, message: 'success', code: 200 });
    }
    
    async getdetailsbypublic(req,res) {
        const {username} = req.params;
        const user = await UserService.getOne({username});
        if(!user){
            return res.json({flag:false,data:{},message:'User doesn not Exist'})
        }
        const posts = await PostService.getAll({owner : user._id});
        return res.json({flag:true,data:{user,posts},message:'success',code:200});
    }
}

module.exports = new postController();