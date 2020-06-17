const { UserModel, PostModel, FollowModel, LikeModel } = require('../models');
const mongoose = require('mongoose');
class PostService {
    async create(where) {
        return await PostModel.create(where);
    }
    async delete(where) {
        return PostModel.findOneAndUpdate(where, { deleted_at: Date.now() }, { new: true });
    }
    async update(where,model){
        return PostModel.findByIdAndUpdate(where,model,{new:true});
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
    async getPostsForFeed(followers, user_id){
        const posts = await PostModel.find({owner:followers}).populate('owner','username avatar age').sort( { created_at: -1 } );
        console.log('posts',posts);
        // console.log('posts',posts[0]);
        //Here temporary i have taken age for LIKE because i am not able to add new field in existing collection.
        const postWithLike = Promise.all(posts.map( async (post)=>{ 
            const Like =  await LikeModel.find({user:user_id,_id:post._id});
            console.log('postWithLike',Like);
           if(Like && Like.length>0){
                // post["isLiked"] = true;
                // post["obj"] = {random :'random'}
                post["owner"].age = 1;
                console.log('single',post);
            
                //return post;
           }else{
                // post["isLiked"] = false;
                post["owner"].age = 0;
                console.log('single',post);
                //return post;
            }
            return post;
        }) )
         //posts[0]["owner"].age = 1;
        return postWithLike;
    }
    async getAll(where){
        return PostModel.find(where)  
    }
    async handleLike(where,what){
        return LikeModel.update(where,what);
    }
}

module.exports = new PostService();
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