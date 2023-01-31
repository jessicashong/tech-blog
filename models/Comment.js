const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const BlogPost = require('./BlogPost');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_username: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'username',
            },
        },
        blogPost_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blogPost',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;