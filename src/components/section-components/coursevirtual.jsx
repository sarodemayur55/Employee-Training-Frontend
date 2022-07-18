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
export default function Coursevirtual({ courseinfo }) {
    if (courseinfo.mode == 'virtual') {
        for(var i = 0; i < courseinfo.virtual.sessionsinfo.length; i++) {
            var t=courseinfo.virtual.sessionsinfo[i];
            if (t.date != null) {
                const date=new Date(t.date);
                const n = date.toDateString();

                // get the time as a string
                const time = date.toLocaleTimeString();
                t.showdate=n;
                t.showtime=time;
            }
            courseinfo.virtual.sessionsinfo[i]=t;
        }
        
        // temp.push(e);
    }
    return (
        <div>
            <Container maxWidth="lg">
                <div className="mt-3 pb-5">
                    <Typography variant="h4" className="mb-3"  align="center">
                        {courseinfo.course_name}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sr No.</TableCell>
                                    <TableCell align="left">Session Name</TableCell>
                                    <TableCell align="left">Completed</TableCell>
                                    <TableCell align="left">Date</TableCell>
                                    <TableCell align="left">Description</TableCell>
                                    <TableCell align="left">Mode</TableCell>
                                    <TableCell align="left">Link/Venue</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    courseinfo?.virtual.sessionsinfo.map((e, i) => {
                                        return <TableRow

                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left">
                                                {i + 1}
                                            </TableCell>
                                            <TableCell align="left">
                                                {e.session_name}
                                            </TableCell>
                                            {
                                                e.completed == true ? <TableCell style={{ color: "green" }} align="left">Yes</TableCell> : <TableCell style={{ color: "red" }} align="left">No</TableCell>
                                            }
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
            </Container>
        </div>
    )
}
