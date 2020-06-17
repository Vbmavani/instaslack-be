const express = require('express');
const router = express.Router();
const passport = require("passport");

const  controllers  = require('../controllers');
const { Auth } = require('../middlewares');
const routes = [
    //User
    {
        method: 'POST',
        path: '/register',
        handler: 'AuthController.create'
    },
    {
        method:'POST',
        path :'/login',
        handler:'AuthController.login'
    },
    {
        method:'PATCH',
        path:'/update-profile',
        handler:'AuthController.updateprofile',
        authenticate:true,
    },
    {
        method:'GET',
        path:'/fetch-user-profile',
        handler:'AuthController.getUser',
        authenticate:true,
    },
    {
        method:'GET',
        path:'/logout',
        handler:'AuthController.logout',
        authenticate:true,
    },
    //post
    {
        method:'GET',
        path:'/fetch-profile-posts/:username',
        handler:'PostController.getProfilePosts',
        authenticate:true,
    },
    {
        method:'GET',
        path:'/newsfeed',
        handler:'PostController.newsfeed',
        authenticate:true,
    },
    {
        method:'POST',
        path:'/create-url',
        handler:'PostController.createUrl',
        authenticate:true,
    },
    {
        method:'POST',
        path:'/create-post',
        handler:'PostController.createPost',
        authenticate:true,
    },
    {
        method:'DELETE',
        path:'/post/:id',
        handler:'PostController.deletePost',
        authenticate:true,
    },
    {
        method:'POST',
        path:'/toggle-follow',
        handler:'PostController.followToggle',
        authenticate:true
    },
    {
        method:'POST',
        path:'/toggle-like',
        handler:'PostController.likeToggle',
        authenticate:true
    },
    {
        method:'GET',
        path:'/get-liked-users/:id',
        handler:'PostController.getPostLikedUsers',
        authenticate:true
    },
    {
        method:'GET',
        path:'/search/:username',
        handler:'AuthController.getusers',
        authenticate:true
    },
    //public
    {
        method:'GET',
        path:'/user/public/:username',
        handler:'PostController.getdetailsbypublic',
    },
];
routes.forEach((route) => {
    const handler = route.handler.split('.');
    let middleware = route.authenticate ?
        [Auth.validateToken, passport.authenticate('jwt', { session: false })] :
        [(req, res, next) => next()];

    router[route.method.toLowerCase()](route.path, ...middleware, controllers[handler[0]][handler[1]]);
});

module.exports = router;