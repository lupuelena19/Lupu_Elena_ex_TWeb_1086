import {useState, useEffect} from 'react';
import {get, remove} from './Calls.js';
import {Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SendSharpIcon from '@material-ui/icons/SendSharp';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PersonIcon from '@material-ui/icons/Person';
import {articleRoute} from './ApiRoutes.js';
import { useNavigate } from 'react-router-dom';
import './ArticleList.css';


export default function ArticleList(){
    
    const [rows, setRows] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(async () => {
        let data = await get(articleRoute);
        setRows(data);
    }, [needUpdate]);

    const deleteArticle = async(id, index) => {
        await remove(articleRoute, id);

        rows.splice(index, 1);
        setRows(rows);
        setNeedUpdate(!needUpdate);
        alert("Article id:" + id + " has been successfully deleted!")
    }

    return(
        <div>

            <h1>Welcome to my Article Page</h1> 

            <br/>
            
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Article Id</TableCell>
                            <TableCell align="center">Article Title</TableCell>
                            <TableCell align="center">Article Summary</TableCell>
                            <TableCell align="center">Article Date</TableCell>
                            <TableCell align="center">References</TableCell>
                            <TableCell align="center">Edit or Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.ArticleId}>
                                <TableCell component="th" scope="row" align="center">
                                    {row.ArticleId}
                                </TableCell>
                                <TableCell align='center'>{row.ArticleTitle}</TableCell>
                                <TableCell align='center'>{row.ArticleSummary}</TableCell>
                                <TableCell align='center'>{row.ArticleDate}</TableCell>
                                <TableCell align='center'>
                                    <IconButton onClick={() => navigate(`/Reference/${row.ArticleId}`)}>
                                        <PersonIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => navigate(`/AddArticle/${row.ArticleId}`)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => deleteArticle(row.ArticleId, index)}>
                                        <DeleteIcon color="secondary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <br></br>
                     <div>
                          <Button
                           variant='contained'
                            color="inherit"
                         startIcon={<AddIcon />}
                         onClick={() => {navigate("AddArticle")}}
                             >
                              Add a new article
                      </Button>
                     </div>

                     <br></br>
                     <div>
                          <Button
                          variant='contained'
                          color="primary"
                           id = 'export'
                         startIcon={<SendSharpIcon />}
                         
                             >
                              Import data
                      </Button>
                     </div>

                     <br></br>
                     <div>
                          <Button
                          variant='contained'
                          color="primary"
                           id= 'import'
                         startIcon={<ImportExportIcon />}
                         
                             >
                              Export data
                      </Button>
                     </div>
        </div>
    )
}