import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../../constant/constants'
import { useAuthState, useAuth } from '../../states/AuthState';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
function Trackvirtual() {
    const [testingrerender, setTestingrerender] = useState(1)
    const [allCourses, setallCourses] = useState([])
    const { user_id, first_name, last_name, role } = useAuthState();
    const [showloader, setShowloader] = useState(false);
    useEffect(() => {
        setShowloader(true)
        axios.get(BASE_URL + `/batch/trainer/${user_id}`)
            .then(response => {
                setShowloader(false)
                changeselectedcourse(null)
                var temp = [];
                response?.data?.map((e, i) => {
                    if (e?.course_id?.mode == 'virtual') {
                        for (var i = 0; i < e.course_id.virtual.sessionsinfo.length; i++) {
                            var t = e.course_id.virtual.sessionsinfo[i];
                            if (t.date != null) {
                                const date = new Date(t.date);
                                const n = date.toDateString();

                                // get the time as a string
                                const time = date.toLocaleTimeString();
                                t.showdate = n;
                                t.showtime = time;
                            }
                            e.course_id.virtual.sessionsinfo[i] = t;
                        }

                        temp.push(e);
                    }
                })
                setallCourses(temp);

            })
            .catch((err)=>{
                setShowloader(false)
                toast.error('Server Error! Please Try Later', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            })
    }, [testingrerender])
    const [selectedcourse, setSelectedcourse] = useState('')
    const [selectedcourseindex, setSelectedcourseindex] = useState(-1)
    const changeselectedcourse = (e) => {
        if (e == null) {
            return;
        }
        if (e.target.value) {
            setSelectedcourse(e.target.value);
        }
    }

    // Update Completed Status
    const [markcompleted, setMarkcompleted] = useState(false)
    const updatecompletedstatus = (event, e, i) => {
        const data = {
            course_id: selectedcourse._id,
            session_index: i,
            status: event.target.checked
        }
        axios.patch(BASE_URL + `/course/updatecompletedstatus`, data)
            .then((res) => {
                setTestingrerender(testingrerender + 1)
                toast.success('Status Updated', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch((e) => {
                toast.error('Error While Updating Status', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }


    return (
        <div>
            <Container maxWidth="lg">
            {
                  showloader ? <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <CircularProgress />
                  </Box> :      
                            allCourses?.length == 0 ? <Grid container justify="center">


                              <Alert severity="warning">
                                <AlertTitle>Warning</AlertTitle>
                                No course found. Please create one
                              </Alert>
                            </Grid> : null
                          
                }
                
                <FormControl fullWidth className="mt-2" >
                    <InputLabel id="demo-simple-select-label"> Batch And Course </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"

                        label=" Batch And Course "
                        onChange={(e) => {
                            // changeselectedcourse(e);
                            if (e.target.value) {
                                setSelectedcourse(e.target.value);
                            }
                        }}
                        value={selectedcourse}
                    >
                        {
                            allCourses.map((b, i) => {
                                return b.course_id.mode == 'virtual' ? <MenuItem key={i} onClick={(e) => { setSelectedcourseindex(i);}} value={b.course_id}>{b.batch_name} | {b.course_id.course_name}</MenuItem> : null
                            })
                        }
                    </Select>
                </FormControl >
                {
                    selectedcourseindex != -1 ?
                        <div className="mt-3">
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
                                            allCourses[selectedcourseindex]?.course_id?.virtual?.sessionsinfo.map((e, i) => {
                                                return <TableRow

                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left" style={{ verticalAlign: 'top' }}>
                                                        {i + 1}
                                                    </TableCell>
                                                    <TableCell align="left" style={{ verticalAlign: 'top' }}>
                                                        {e.session_name}
                                                    </TableCell>
                                                    {
                                                        e.completed == true ? <TableCell style={{ color: "green" }} align="left">
                                                            <div>
                                                                <FormGroup>
                                                                    {/* <span style={{ color: "red" }} >No</span> */}
                                                                    <FormControlLabel componentsProps={{ typography: { variant: 'body2' } }} control={<Checkbox disabled checked size="small" />} label="Completed" />
                                                                </FormGroup>
                                                            </div>
                                                        </TableCell> :
                                                            <TableCell align="left" style={{ verticalAlign: 'top' }}>
                                                                {
                                                                    e.added == true ? <div>
                                                                        <Checkbox className="p-0 mr-1" onChange={(event) => { updatecompletedstatus(event, e, i); }} />Mark As Completed
                                                                       
                                                                    </div> :
                                                                        <div>
                                                                            <Checkbox className="p-0 mr-1" disabled onChange={(event) => { updatecompletedstatus(event, e, i); }} /><span style={{color:"grey"}}>Mark As Completed</span>

                                                                        </div>
                                                                }
                                                                {/* <div>
                                                                    <Checkbox className="p-0 mr-1" onChange={(event) => { updatecompletedstatus(event, e, i); }} />Mark As Completed
                                                                    
                                                                </div> */}
                                                            </TableCell>
                                                    }
                                                    {
                                                        e.showdate == null ? <TableCell align="left" style={{ verticalAlign: 'top' }}>-</TableCell> : <TableCell style={{ verticalAlign: 'top' }} align="left">{e.showdate} {e.showtime}</TableCell>
                                                    }
                                                    {
                                                        e.description == null ? <TableCell style={{ verticalAlign: 'top' }} align="left">-</TableCell> : <TableCell style={{ verticalAlign: 'top' }} align="left">{e.description}</TableCell>
                                                    }
                                                    {
                                                        e.mode == null ? <TableCell style={{ verticalAlign: 'top' }} align="left">-</TableCell> : <TableCell style={{ verticalAlign: 'top' }} align="left">{e.mode}</TableCell>
                                                    }
                                                    {
                                                        e.mode == null ? <TableCell style={{ verticalAlign: 'top' }} align="left">-</TableCell> : null
                                                    }
                                                    {
                                                        e.mode == 'online' ? <TableCell style={{ verticalAlign: 'top' }} align="left">{e.link}</TableCell> : e.mode == 'offline' ? <TableCell style={{ verticalAlign: 'top' }} align="left">{e.venue}</TableCell> : null
                                                    }
                                                    {/* <TableCell align="left">{e.description}</TableCell>
                                                    <TableCell align="left">{e.mode}</TableCell>
                                                    {
                                                        e.mode == 'online' ? <TableCell align="left">{e.link}</TableCell> : <TableCell align="left">{e.venue}</TableCell>
                                                    } */}
                                                </TableRow>
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div> : null
                }
            </Container>
        </div>
    );
}

export default Trackvirtual;
