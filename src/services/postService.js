const { UserModel, PostModel, FollowModel, LikeModel } = require('../models');

class PostService {
    async create(where) {
        return await PostModel.create(where);
    }
    async delete(where) {
        return PostModel.findOneAndUpdate(where, { deleted_at: Date.now() }, { new: true });
    }
    async createFollow(where) {
        return FollowModel.create(where);
    }
    async removeFollow(where){
        return FollowModel.deleteOne(where);
    }
    async createLike(where) {
        return LikeModel.create(where);
    }
    async removeLike(where){
        return LikeModel.deleteOne(where);
    }
    async getPostLikedUsers(where){
        return LikeModel.find(where).populate('user');
    }
    async getposts(user_id){
    //     const posts = await PostModel.aggregate([
    //     { 
    //         "$lookup": {
    //             "from": "FollowModel",
    //             "localField": "owner",
    //             "foreignField": {$match : {follow_from : user_id} },
    //             "as": "bList"
    //         }
    //     }
    // ])
//     const posts = await FollowModel.aggregate([
//     { "$match": { "follow_from": user_id } }, 
//     { 
//         "$lookup": {
//             "from": "PostModel",
//             "localField": "follow_to",
//             "foreignField": "owner",
//             "as": "bList"
//         }
//     }
// ])
        const posts = PostModel.find({owner:user_id}).populate('owner','username avatar');
        return posts;
    }
    async getAll(where){
        return PostModel.find(where)  
    }
}

module.exports = new PostService();

// const posts = await FollowModel.aggregate([
//     { "$match": { "follow_from": user_id } }, 
//     { 
//         "$lookup": {
//             "from": "PostModel",
//             "localField": "follow_to",
//             "foreignField": "owner",
//             "as": "bList"
//         }
//     }
// ])