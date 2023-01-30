const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, BlogPost } = require('../models');

//GET users to verify login
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
        });

        const users = userData.map((post) => 
            post.get({ plain: true })
        );
        res.render('homepage', {
            users,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//redirect or login
router.get('/login', async (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;