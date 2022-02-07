import {useState, useEffect} from 'react';
import {get, remove} from './Calls.js';
import {Button, Paper, Table, TableBody, TableCell, TableRow, TableContainer, TableHead, IconButton} from '@material-ui/core';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {referenceRoute} from './ApiRoutes.js';
import { useNavigate } from 'react-router-dom';



export default function ReferenceList(){
    
    const [rows, setRows] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(async () => {
        let data = await get(referenceRoute);
        setRows(data);
    }, [needUpdate]);

    const deleteReference = async(id, index) => {
        await remove(referenceRoute, id);

        rows.splice(index, 1);
        setRows(rows);
        setNeedUpdate(!needUpdate);
        alert("Reference id:" + id + " has been successfully deleted!")
    }

    return(
        <div>

            <h1>Welcome to Reference List</h1> <br></br>
          

            <br/>
            
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Reference Id</TableCell>
                            <TableCell align="center">Reference Title</TableCell>
                            <TableCell align="center">Reference Summary</TableCell>
                            <TableCell align="center">Reference Date</TableCell>
                        
                            <TableCell align="center">Edit or Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.ReferenceId}>
                                <TableCell component="th" scope="row" align="center">
                                    {row.ReferenceId}
                                </TableCell>
                                <TableCell align='center'>{row.ReferenceTitle}</TableCell>
                                <TableCell align='center'>{row.ReferenceSummary}</TableCell>
                                <TableCell align='center'>{row.ReferenceDate}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => navigate(`/AddReference/${row.ReferenceId}`)}>
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton onClick={() => deleteReference(row.ReferenceId, index)}>
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
                         startIcon={<ArrowBackIosTwoToneIcon />}
                         onClick={() => {navigate("/")}}
                             >
                              Go back
                      </Button>
                     </div>

        </div>
    )
}