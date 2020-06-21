const { UserModel, PostModel, FollowModel, LikeModel } = require('../models');
const mongoose = require('mongoose');
class PostService {
    async create(where) {
        return await PostModel.create(where);
    }
    async delete(where) {
        return PostModel.findOneAndUpdate(where, { deleted_at: Date.now() }, { new: true });
    }
    async update(where, model) {
        return PostModel.findByIdAndUpdate(where, model, { new: true });
    }
    async createFollow(where) {
        return FollowModel.create(where);
    }
    async removeFollow(where) {
        return FollowModel.deleteOne(where);
    }
    async createLike(where) {
        return LikeModel.create(where);
    }
    async removeLike(where) {
        return LikeModel.deleteOne(where);
    }
    async getPostLikedUsers(where) {
        return LikeModel.find(where).populate('user');
    }
    async getPostsForFeed(followers, user_id, skips, limit) {
        const posts = await PostModel.find({ owner: followers }).skip(skips).limit(limit).populate('owner', 'username avatar age').sort({ created_at: -1 });
        // console.log('posts',posts);
        // console.log('posts',posts[0]);
        //Here temporary i have taken age for LIKE because i am not able to add new field in existing collection.
        // console.log('user_id',user_id);
        const arr = [];
        const postWithLike = await Promise.all(posts.map( async (post)=>{ 
            const Like =  await LikeModel.find({user:user_id,_id:post._id});

            console.log('Map ',Like);
           if(Like && Like.length>0){
                // post["isLiked"] = true;
                // post["obj"] = {random :'random'}
                post["owner"].age = 1;
                console.log('single',post);
            console.log("likesd")
                //return post;
           }else{
                // post["isLiked"] = false;
                post["owner"].age = 0;
                console.log('single',post);
                //return post;
                console.log('non Liked');
            }
            arr.push(post);
            return post;
        }) ) 
        // console.log('user_id, Post_id,,1', user_id, posts[0]._id)
        // const Like1 = await LikeModel.find({ user: user_id, _id: posts[0]._id });
        // console.log('like1', Like1.length);
        // posts[0]["owner"].age = true ? 1 : 0;

        // console.log('user_id, Post_id,2', user_id, posts[1]._id)
        // const Like2 = await LikeModel.find({ user: user_id, _id: posts[1]._id });
        // console.log('like2', Like2);
        // posts[0]["owner"].age = (Like2.length > 0) ? 1 : 0;

        // console.log('user_id, Post_id,3', user_id, posts[2]._id)
        // const Like3 = await LikeModel.find({ user: user_id, _id: posts[2]._id });
        // console.log('like3', Like3);
        // posts[0]["owner"].age = (Like3.length > 0) ? 1 : 0;
        //posts[0]["owner"].age = 1;
        //  console.log('resp',postWithLike,arr);
        return postWithLike;
    }
    async getAll(where) {
        return PostModel.find(where)
    }
    async handleLike(where, what) {
        return LikeModel.update(where, what);
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