import { useState, useEffect } from 'react';
import React from 'react';
import ReactPlayer from 'react-player'
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlayCircleFilledWhiteSharpIcon from '@mui/icons-material/PlayCircleFilledWhiteSharp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
export default function Upcomingsessions({ batchesenrolled }) {
   
    const [batchcourse, setBatchcourse] = useState(null)
    useEffect(() => {
        var create=[]
        batchesenrolled.map((e, i) => {
          
            if (e.course_id.mode == 'virtual') {
                var index = [];
                var temp = e.course_id.virtual.sessionsinfo;
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i].completed == false && temp[i].added == true) {
                        index.push(temp[i]);
                    }
                }
                if (index.length > 0) {
                    var data = {};
                    data.batch_name = e.batch_name;
                    data.course = e.course_id;
                    data.upcomingsessions = index;
                    create.push(data);
                }
            }
            
        })
        setBatchcourse(create)

    }, [])

    return (
        <div>
            <Container maxWidth="md">
                {
                    batchcourse == null ?

                        <Alert severity="info">
                            <AlertTitle>Info</AlertTitle>
                            No Upcming Sessions... <strong>Enjoy Your Day!</strong>
                        </Alert>
                        :
                        <div>
                            {
                                batchcourse.map((b, t) => {
                                    return <div className="mt-3" key={t} >
                                        <div>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Batch: {b.batch_name}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="h6" gutterBottom component="div">
                                                Course: {b.course.course_name}
                                            </Typography>
                                        </div>
                                        <div>
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Sr No.</TableCell>
                                                            <TableCell align="left">Session Name</TableCell>
                                                            <TableCell align="left">Date</TableCell>
                                                            <TableCell align="left">Description</TableCell>
                                                            <TableCell align="left">Mode</TableCell>
                                                            <TableCell align="left">Link/Venue</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            b.upcomingsessions.map((e, i) => {
                                                                return <TableRow key={i}

                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell align="left">
                                                                        {i + 1}
                                                                    </TableCell>
                                                                    <TableCell align="left">
                                                                        {e.session_name}
                                                                    </TableCell>
                                                                  
                                                                    {
                                                                        e.showdate == null ? <TableCell align="left">-</TableCell> : <TableCell align="left">{e.showdate} {e.showtime}</TableCell>
                                                                    }
                                                                    {
                                                                        e.description == null ? <TableCell align="left">-</TableCell> : <TableCell align="left">{e.description}</TableCell>
                                                                    }
                                                                    {
                                                                        e.mode == null ? <TableCell align="left">-</TableCell> : <TableCell align="left">{e.mode}</TableCell>
                                                                    }
                                                                    {
                                                                        e.mode == null ? <TableCell align="left">-</TableCell> : null
                                                                    }
                                                                    {
                                                                        e.mode == 'online' ? <TableCell align="left">{e.link}</TableCell> : e.mode == 'offline' ? <TableCell align="left">{e.venue}</TableCell> : null
                                                                    }
                                                                </TableRow>
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                }
            </Container>
        </div>
    )
}
