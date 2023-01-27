const router = require('express').Router();
const { User, BlogPost } = require('../models');
//withauth

//GET all blog posts for homepage 
//************************** add withauth situation [miniproject homeroutes] */
router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            
        });

        const blogPosts = blogPostData.map((post) => 
            post.get({ plain: true })
        );
        res.render('homepage', {
            blogPosts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET one blogPost
router.get('posts/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            
        });
    } catch (err) {
        res.status(500).json(err);
    }

})