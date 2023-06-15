const router = require('express').Router();
const { User, Post, Comment } = require('../models');

const Auth = require('../utils/auth');


//home page router
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            }],
            order: [['date_created', 'ASC']]
        });
        const postList = postData.map((post) => post.get({ plain: true }));

        res.render('home', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//login router
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login')
})
router.get('/register', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('dashboard');
        return;
    }
    res.render('register')
})

//dashboard router
router.get('/dashboard', Auth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Post
            }],
        });

        const user = userData.get({ plain: true });
        const posts = user.posts
        res.render('dashboard', {
            user,
            posts,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//post_byId page
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await POst.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: [User]
                }
            ]
        });
        if (!postData){
        res.status(404).render('404');
        return;
        }

        const post = postData.get({plain: true});

        res.render('post', {
            post,
            logged_in: req.sessions.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
        return
    }
});

//create post
router.get('/createPost', Auth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id)
        const user = userData.get({ plain: true });
        const posts = user.posts;

        res.render('createPost', {
            user,
            posts,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
//post_byId edit
router.get('/dashboard/update/:id', Auth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                include: [User],
            }]
        })

        const post = postData.get({ plain: true })

        res.render('editPost', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;