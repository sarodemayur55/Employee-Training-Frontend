import React, { useState, useEffect } from "react";
import "animate.css";
import Batch from "./batch";
import Sendlink from "./sendlink";
import Trackvirtual from "./trackvirtual";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BASE_URL from '../../constant/constants'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
const Grid = styled(MuiGrid)(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
    
  },
}));

function Trainer() {
  const [showloader, setShowloader] = useState(false);
  // Tabs
  // Keep the initial value as 1
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  // Tabs Done
  const [allCourses, setallCourses] = useState()
  useEffect(() => {
    setShowloader(true)
    axios.get(BASE_URL + '/course/all')
      .then(response => {
        setShowloader(false)
        var temp=response.data;
        var size=temp.length;
        for(var i=0; i<size; i++) {
          var totalvideos=0;
          var totalsessions=0;
          var calc;
          if(temp[i].mode=='virtual'){
            calc=temp[i].virtual.sessionsinfo;
          }
          else{
            calc=temp[i].elearning.sessionsinfo;
          }
          totalsessions=calc.length;
          calc.map((e,i)=>{
            totalvideos+=e.no_of_videos;
          })
          temp[i].totalvideos=totalvideos;
          temp[i].totalsessions=totalsessions;
        }
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
  }, [])


  return (
    <div className="">
      
      <div className="">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" variant="fullWidth">
                <Tab label="All Courses" value="1" />
                <Tab label="Your Batches" value="2" />
                <Tab label="Send Session Info" value="3" />
                <Tab label="Track Virtual Courses" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div>
              {
                  showloader ? <Box display="flex" 
                    justifyContent="center"
                    alignItems="center">
                    <CircularProgress />
                  </Box> :      
                            allCourses?.length == 0 ? <Grid container justify="center" className="mb-4">


                              <Alert severity="warning">
                                <AlertTitle>Warning</AlertTitle>
                                No course found. Please create one
                              </Alert>
                            </Grid> : null
                          
                }
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
                  {
                    allCourses?.map((e, i) => {
                      return <Grid item xs={2} sm={4} md={4} key={i}  >
                        <Card sx={{ boxShadow: 3, }} className=" shadow p-3 mb-5  rounded bg-light">
                          <CardContent>
                           
                            <Typography variant="h5" >
                              <Typography variant="h6"  >
                                <p>Course Name: {e.course_name}</p>
                                <p>Mode: {e.mode == "elearning" ? <span>E-Learning</span> : <span>Virtual Classroom</span>}</p>
                                <p>{e.totalsessions} Sessions {e.mode == "elearning" ? <span>&#8226; {e.totalvideos} Videos</span> :null}    </p>
                              </Typography>
                            </Typography>

                          </CardContent>
                        </Card>

                      </Grid>
                    })
                  }
                </Grid>
              </div>
            </TabPanel>
            <TabPanel value="2"><Batch /></TabPanel>
            <TabPanel value="3"><Sendlink /></TabPanel>
            <TabPanel value="4"><Trackvirtual /></TabPanel>
          </TabContext>
        </Box>


      </div>

    </div>
  );
}

export default Trainer;
