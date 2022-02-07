import db from '../dbConfig.js'
import Sequelize from 'sequelize';


const Article = db.define("Article", 
{
    ArticleId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    
    ArticleTitle: 
    {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [5,200]
        }
    },

    ArticleSummary:
    {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [5,200]
        }
    },

    ArticleDate: 
    {
        type: Sequelize.DATE,
        allowNull: false
    },
});

export default Article;
