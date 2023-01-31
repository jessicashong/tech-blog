const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');
const withAuth = require('../../utils/auth')


//GET existing blog posts
router.get('/', withAuth, async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: BlogPost,
                    attributes: ['title'],
                },
            ],
        });
        const blogPosts = blogPostData.map((blogPost) => {
            blogPost.get({ plain: true })
        });

        res.render('blogPosts', {
            blogPosts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET blog post by id
router.get('/:id', withAuth, async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                    model: Comment,
                    attributes: [
                        'comment',
                        'createdAt',
                        'username',
                    ],
                },
            ],
        });
        const blogPost = blogPostData.get({ plain: true });
        res.render('blogPosts', { ...blogPost, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});

//CREATE new blogPost
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlogPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newBlogPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

//UPDATE post
router.put('/:id', withAuth, async (req, res) => {
    try { 
        const blogPostData = await BlogPost.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if(!blogPostData){
            res.status(404).json({ message: 'No blog post exists with that id.' });
            return;
        }
        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogPostData = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!blogPostData){
            res.status(404).json({ message: "No post found with that id." });
            return;
        }
        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;