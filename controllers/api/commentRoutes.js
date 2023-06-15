const { Comment } = require('../../models');
const Auth = require('../../utils/auth');

const router = require('express').Router();

//add Comment
router.post('/', Auth, async(req,res) => {
    try {
        const { comment, postId } = req.body;

        const newComment = await Comment.create({
            comment: comment,
            user_id: req.session.user_id,
            post_id: postId
        });
        res.status(200).json(newComment);
    }catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router;