import {useState, useEffect} from 'react';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import {Grid, TextField, Button} from '@material-ui/core';
import {post, put, get} from './Calls.js';
import {articleRoute} from './ApiRoutes.js';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddArticle(){

    const [article, setArticle] = useState
    ({
        ArticleTitle: "",
        ArticleSummary: "",
        ArticleDate: "2021-12-01"
    });

    const navigate = useNavigate();
    const routerParams = useParams();
    const id = routerParams.id;

    useEffect(async () => {
        if (!id)
            return;

        let data = await get(articleRoute, id);
        setArticle(data);    
    }, [])

     const onChangeArticle = e => {
         setArticle({...article, [e.target.name]: e.target.value});
     }

    const saveArticle = async () => {
        if (!id)
            await post(articleRoute, article);
        else
            await put(articleRoute, id, article);
            
        navigate("/");    
    }

    return (
        <div>

            <Grid container spacing={3}>
                <Grid item xs={8} sm={8}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id=" ArticleTitle"
                        name="ArticleTitle"
                        label="ArticleTitle"
                        fullWidth
                        value={article.ArticleTitle}
                        onChange={e => onChangeArticle(e)}
                        />
                </Grid>

                <Grid item xs={4} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ArticleSummary"
                        name="ArticleSummary"
                        label="ArticleSummary"
                        fullWidth
                        value={article.ArticleSummary}
                        onChange={e => onChangeArticle(e)}
                        />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ArticleDate"
                        name="ArticleDate"
                        label="ArticleDate"
                        fullWidth
                        value={article.ArticleDate}
                        onChange={e => onChangeArticle(e)}
                        />
                </Grid>
            </Grid>

            <Button color="secondary" variant='outlined' startIcon={<CancelIcon />}
                onClick={() => {navigate("/")}}
            >
                Cancel
            </Button>  

             <Button color="primary" variant='outlined' startIcon={<SaveIcon />}
                onClick={saveArticle}
            >
                Save
            </Button>  

        </div>
    )
}