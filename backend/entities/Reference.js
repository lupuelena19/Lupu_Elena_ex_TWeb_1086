import db from '../dbConfig.js'
import Sequelize from 'sequelize';


const Reference = db.define("Reference", 
{
    ReferenceId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    ReferenceTitle: 
    {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [5,200]
        }
    },

    ReferenceDate: 
    {
        type: Sequelize.DATE,
        allowNull: true
    },

    ReferenceListAuthors: 
    {
        type: Sequelize.STRING,
        allowNull: true
    },

    ArticleId:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default Reference;
