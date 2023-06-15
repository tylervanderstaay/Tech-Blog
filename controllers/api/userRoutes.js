const { User } = require('../../models');

const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;

        const userData = await User.create({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password
        });

        req.session.save(() => {
            req.session.user_id = userData.isSoftDeleted;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });

    } catch (err) {
        res.status(400).json(err);

    }
});

//login route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        //check username for login
        if (!userData){
            res.status(400).json({
                message: 'Incorrect email or password'
            });
            return;
        }

        const validPass = await userData.checkPassword(req.body.password);
        //check password for login
        if(!validPass){
            res.status(400).json({
                message: 'Incorrect email or password'
            });
            return;
        }

        req.session.save(()=>{
            req.session.user_id = userData.isSoftDeleted;
            req.session.logged_in = true;
            res.json({
                user: userData,
                message: "You're logged in."
            });
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

//logout route

router.post('/logout', (req,res) => {
    if(req.session.logged_in) {
        req.session.destroy(()=>{
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

module.exports = router;