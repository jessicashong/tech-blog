const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./userSeeds.json');
const blogPostData = require('./postSeeds.json');
// const commentData = require('./commentSeeds.json');
// const sequelize = require('sequelize');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    //bulk create users and apply individual hooks to each user
    await User.bulkCreate(userData, {individualHooks: true});

    //bulk create blog posts from blog post seed
    await BlogPost.bulkCreate(blogPostData);

    //bulk create comments
    // await Comment.bulkCreate(commentData)

    process.exit(0);
};

seedDatabase();