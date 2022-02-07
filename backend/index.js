import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './dbConfig.js';
import mysql from 'mysql2/promise';
import { DB_USERNAME, DB_PASSWORD } from './Consts.js';
import Article from './entities/Article.js';
import Reference from './entities/Reference.js';
import Operators from './Operators.js';



let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

// se creeaza conexiunea la database

let conn;
mysql.createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD
})
.then((connection)=>{
    conn = connection
    return connection.query('CREATE DATABASE IF NOT EXISTS Article')
})
.then(()=>{
    return conn.end();
})
.catch((err)=>{
    console.warn(err.stack);
})

// relatia one to many de la articol la referinta

Article.hasMany(Reference, {as : "References", foreignKey: "ArticleId"});
Reference.belongsTo(Article, { foreignKey: "ArticleId"})

db.sync();

//--------------------------functii async--------------------------\\


async function createArticle(article) {
    return await Article.create(article, {include: [{model: Reference, as: "References"}]});
}

async function createReference(reference){
    return await Reference.create(reference);
}


async function getArticle() {
    return await Article.findAll({include: ["References"]});
}

async function getReference(){
    return await Reference.findAll();
}

async function getArticlebyId(id) {
    return await Article.findByPk(id, {include: ["References"]});
}


async function getReferencebyPK(id){
    return await Reference.findByPk(id);
}



async function getArticlebyTile(title) {
    return await Article.findAll({
       where: title ? {ArticleTitle: title} : undefined
    });
    
}


async function updateArticle(id, article){
    if(parseInt(id) !== article.ArticleId){
        console.log("Entity id different")
        return;
    }

    let updateEntity = await getArticlebyId(id);

    if(!updateEntity){
        console.log("There isn't a article with this id");
        return;
    }

    return updateEntity.update(article);

}

async function updateReference(id, reference){
    if(parseInt(id) !== reference.ReferenceId){
        console.log("Entity id different")
        return;
    }

    let updateEntity = await getReferencebyPK(id);

    if(!updateEntity){
        console.log("There isn't a reference with this id");
        return;
    }

    return updateEntity.update(reference);

}

async function deleteArticle(id){

    let deleteEntity = await getArticlebyId(id);

    if(!deleteEntity){
        console.log("There isn't a article with this id");
        return;
    }

    return await deleteEntity.destroy();

}

async function deleteReference(id){

    let deleteEntity = await getReferencebyPK(id);

    if(!deleteEntity){
        console.log("There isn't a reference with this id");
        return;
    }

    return await deleteEntity.destroy();

}



async function filterArticle(filter) {
    let whereClause = {};

    if(filter.articleTitle)
        whereClause.ArticleTitle = {[Operators] : `%${filter.articleTitle}%`};

    if(filter.articleSummary)
        whereClause.ArticleSummary = {[Operators] : `%${filter.articleSummary}%`};

    return await Article.findAll({
        where: whereClause
    });

}

//----------------------------------------------------------------------\\





//-------------------------- rute pentru functii --------------------------\\


router.route('/create').get(async (req, res)=>{
    try {
        await db.sync({force : true}) //creeaza baza de date sau o recreeaza
        res.status(201).json({message: 'created'});
    
    } catch (error) {
        console.warn(error.stack);
        res.status(500).json({message: 'server error'});
    }
})


router.route('/article').post(async (req, res) =>{
    return res.json(await createArticle(req.body));
})

router.route('/reference').post(async (req, res) =>{
    return res.json(await createReference(req.body));
})




router.route('/article').get(async (req, res) =>{
    return res.json(await getArticle());
})

router.route('/reference').get(async (req, res) =>{
    return res.json(await getReference());
})




router.route('/article/:id').get(async (req, res) =>{
    return res.json(await getArticlebyId(req.params.id));
})

router.route('/reference/:id').get(async (req, res) =>{
    return res.json(await getReferencebyPK(req.params.id));
})





router.route ('/article/:id').put(async (req, res)=>{

    res.json(await updateArticle(req.params.id, req.body));

})

router.route ('/reference/:id').put(async (req, res)=>{

    res.json(await updateReference(req.params.id, req.body));

})


router.route ('/article/:id').delete(async (req, res)=>{

    res.json(await deleteArticle(req.params.id));

})

router.route ('/reference/:id').delete(async (req, res)=>{

    res.json(await deleteReference(req.params.id));

})


router.route('/articleFilter').get(async (req, res) =>{
    return res.json(await filterArticle(req.query));
})

router.route('/articleSort').get(async (req, res) =>{
    return res.json(await getArticlebyTile(req.query.des));
})



let port = process.env.PORT || 8000;
app.listen(port);
console.log(`API ruleaza in portul ${port}`);