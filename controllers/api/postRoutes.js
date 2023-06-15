const { Post } = require('../../models');
const Auth = require('../../utils/auth');

const router = require('express').Router();


//create post
router.post('/', Auth, async (req, res) => {
    try {
        const { title, post } = req.body;
        const newPost = await Post.create({
            title: title,
            post: post,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost)
    } catch (err) {
        res.status(400).json(err);
    }
});

//update post by ID
router.put('/update', Auth, async (req, res) => {
    try {
        const { title, post, postId } = req.body;

        const updatePost = await Post.update(
            {
                title: title,
                post: post
            },
            {
                where: {
                    id: postId,
                },
                returning: true,
            });
        res.status(200).json(updatePost);
    } catch (err) {
        res.status(500).json(err)
    }
});


//delete post by ID
router.delete('/delete', Auth, async (req,res) => {
    const {postId} = req.body;
    try{
        const postData = await Post.destroy({
            where: {
                id: postId,
                user_id: req.session.user_id
            },
        });
        res.status(200).json(postData)
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;