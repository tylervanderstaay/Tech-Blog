const { User, Post, Comment } = require('../models');
const userSeeds = require('./userSeed.json');
const postSeeds = require('./postSeed.json');
const commentSeeds = require('./commentSeed.json');

const sequelize = require('../config/connection');

const seedDB = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userSeeds, {
        individualHooks: true
    });
    await Post.bulkCreate(postSeeds);
    await Comment.bulkCreate(commentSeeds);

    process.exit(0);
};

seedDB();