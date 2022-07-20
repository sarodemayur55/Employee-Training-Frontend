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
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
function Sendlink() {
  const [allCourses, setallCourses] = useState([])
  const { user_id, first_name, last_name, role } = useAuthState();
  useEffect(() => {
    axios.get(BASE_URL + `/batch/trainer/${user_id}`)
      .then(response => {
        setallCourses(response.data);
      });
  }, [])


  const [selectedcourse, setSelectedcourse] = useState('')
  const [availablesession, setAvailablesession] = useState(null)
  const [completedalert, setCompletedalert] = useState(0)
  const [index, setindex] = useState()
  const [canaddsession, setCanaddsession] = useState(1)
  const changealert = (c) => {
    const sessionsinfo = c.virtual.sessionsinfo; 
    var flag = false;
    // var index;
    var temp;
    for (var i = 0; i < sessionsinfo.length; i++) {
      if (sessionsinfo[i].completed == false) {
        flag = true;
        temp=i;
        setindex(i);
        break;
      }
    }
    if (flag == false) {
      setCompletedalert(1);
      return;
    }
    else {
      setCompletedalert(0);
      if(sessionsinfo[temp].date!=null)
      {
        setCanaddsession(0);
        return;
      }
      setCanaddsession(1);
      setAvailablesession(sessionsinfo[temp]);
    }
  }


  const [sessiondate, setsessiondate] = useState(new Date())
  const handleDateChange = (newValue) => {
    setsessiondate(newValue);
  };

  const [sessionmode, setSessionmode] = useState('online')
  const [description, setDescription] = useState();
  const [link, setLink] = useState()
  const [venue, setVenue] = useState()


  const handlesubmit = (e) => {
    e.preventDefault();
    var data = {
      date: sessiondate,
      description: description,
      mode: sessionmode,
      course_id: selectedcourse._id,
      index: index
    };
    if (sessionmode == 'online') {
      data.link = link
    }
    else {
      data.venue = venue
    }
    axios(
      {
        url: BASE_URL + "/course/addsession",
        method: "POST",
        data: data,
      })
      .then(res => {
        toast.success('Session Info Added And Sent Successfully ', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      })
      .catch(err => {
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
  }

  return (
    <div>
      <Container maxWidth="md">
        {
          allCourses.length == 0 ?
            <Alert severity="warning">Please create a batch first!</Alert> :
            <div>
              <Typography variant="h4" gutterBottom component="div">
                Send Session Information
              </Typography>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth >
                  <InputLabel id="demo-simple-select-label"> Batch And Course </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"

                    label=" Batch And Course "
                    onChange={(e) => {
                      if (e.target.value) {
                        setSelectedcourse(e.target.value);
                        changealert(e.target.value)
                      }
                    }}
                    value={selectedcourse}
                  >
                    {
                      allCourses.map((b, i) => {
                        return b?.course_id?.mode == 'virtual' ? <MenuItem key={i} value={b.course_id}>{b.batch_name} | {b.course_id.course_name}</MenuItem> : null
                      })
                    }
                  </Select>
                </FormControl >
                {
                  completedalert > 0 ? <Alert className="mt-3" severity="success">This course has been completed</Alert> :canaddsession==0? <Alert className="mt-3" severity="warning">Please complete the previous session!</Alert> :
                    selectedcourse != '' ?
                      <div className="mt-3">
                        <form action="#" method="post" onSubmit={handlesubmit}>
                          <Box sx={{ flexGrow: 1 }} >
                            <Alert severity="info"><AlertTitle>Info</AlertTitle>
                              <Typography variant="h6" gutterBottom component="div">
                                Current Incomplete Session: {availablesession?.session_name}
                              </Typography>
                            </Alert>

                            <Grid className="mt-3" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                              <Grid item xs={6} >
                                <div>
                                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <p className="">Session Date And Time: </p>
                                    <DateTimePicker
                                      label="Date And Time"
                                      value={sessiondate}
                                      onChange={handleDateChange}
                                      minDate={new Date()}
                                      renderInput={(params) => <TextField {...params} />}
                                    />
                                  </LocalizationProvider>
                                </div>
                              </Grid>
                              <Grid item xs={6} >
                                <div>
                                  <div className="">
                                    <p className="">Session Description </p>
                                    <TextField
                                      id="standard-textarea"
                                      label=""
                                      placeholder=""
                                      multiline
                                      variant="standard"
                                      required
                                      style={{ width: 300 }}
                                      value={description}
                                      onChange={(e) => { setDescription(e.target.value) }}
                                    />
                                  </div>
                                </div>
                              </Grid>
                              <Grid item xs={6} >
                                <div>
                                  <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Session Mode</FormLabel>
                                    <RadioGroup
                                      row
                                      aria-labelledby="demo-row-radio-buttons-group-label"
                                      name="row-radio-buttons-group"
                                      defaultValue="online"
                                    >
                                      <FormControlLabel value="online" onClick={(e) => { setSessionmode(e.target.value) }} control={<Radio />} label="Online" />
                                      <FormControlLabel value="offline" onClick={(e) => { setSessionmode(e.target.value) }} control={<Radio />} label="Offline" />
                                    </RadioGroup>
                                  </FormControl>
                                  <div>
                                    {
                                      sessionmode == 'online' ?
                                        <div>
                                          <TextField id="standard-basic" value={link}
                                            onChange={(e) => { setLink(e.target.value) }} required style={{ width: 300 }} label="Meet Link" variant="standard" />
                                        </div> : null
                                    }
                                    {
                                      sessionmode == 'offline' ?
                                        <div>
                                          <TextField id="standard-basic" value={venue}
                                            onChange={(e) => { setVenue(e.target.value) }} required style={{ width: 300 }} label="Venue" variant="standard" />
                                        </div> : null
                                    }
                                  </div>
                                </div>
                              </Grid>
                              <Grid item xs={6} >
                                {/* <div>xs=2</div> */}
                              </Grid>
                            </Grid>
                            <Button className="mt-3" type="submit" endIcon={<SendIcon />} fullWidth variant="outlined" size="large">Send</Button>
                          </Box>
                        </form>
                      </div>
                      : null
                }
              </Box>
            </div>
        }
      </Container>
    </div>
  );
}

export default Sendlink;
