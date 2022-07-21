import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
// import "./CSS/admin.css";
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../../constant/constants'
import { styled } from '@mui/material/styles';
import { Button, LinearProgress, Box, Container, Select, InputLabel, MenuItem, FormControl } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MuiGrid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import underconstruction from '../../assets/img/signin/underconstruction-removebg-preview.png'
import HandymanSharpIcon from '@mui/icons-material/HandymanSharp';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import { Buffer } from 'buffer';

// import AWS from 'aws-sdk'
// import S3FileUpload from 'react-s3';
// import S3 from 'react-aws-s3';
import ReactS3Client from 'react-aws-s3-typescript';
window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
  bucketName: 'itechseed',
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_aws_access_key_id,
  secretAccessKey: process.env.REACT_APP_aws_secret_access_key,
  s3Url: 'https://itechseed.s3.amazonaws.com'
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const section = {
  height: "100%",
  paddingTop: 5,
};


// //Optional Import
// import { uploadFile } from 'react-s3';
// const config = {
//   bucketName: 'itechseed',
//   region: 'us-east-1',
//   accessKeyId: import.meta.env.VITE_aws_access_key_id,
//   secretAccessKey: import.meta.env.VITE_aws_secret_access_key,
// }

// import S3FileUpload from 'react-s3';
// import { Buffer } from 'buffer';
// Buffer.from('anything', 'base64');

// const S3_BUCKET = 'itechseed';
// const REGION = 'us-east-1';
// AWS.config.update({
//   accessKeyId: import.meta.env.VITE_aws_access_key_id,
//   secretAccessKey: import.meta.env.VITE_aws_secret_access_key
// })

// const myBucket = new AWS.S3({
//   params: { Bucket: S3_BUCKET },
//   region: REGION,
// })

function Admin() {

  // Adding Loaders
  const [courseloader, setCourseloader] = useState(false);
  const [elearningsubmitloader, setElearningsubmitloader] = useState(false);
  const [virtualsubmitloader, setVirtualsubmitloader] = useState(false);
  const [employeesubmitloader, setEmployeesubmitloader] = useState(false);

  // Add employee
  // Employee Type
  const [employeetype, setEmployeetype] = useState('employee')
  const changeemployeetype = (e) => {
    setEmployeetype(e.target.value);

  }



  const [testing, setTesting] = useState([1, 2, 3])
  // tabs
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // For Rerender


  // Done

  const [options, setOptions] = useState();
  const [role, setRole] = useState("Employee");
  const [inputList, setInputList] = useState([
    { first_name: "", last_name: "", email: "", phone: null, role: "employee" },
  ]);
  const [sessionlist, setsessionlist] = useState([
    { videos: '0' },
  ]);

  const [no_of_sessions, setNo_of_sessions] = useState(null);
  const [course_name, setCourse_name] = useState("");
  const [ispretest, setIspretest] = useState(false);
  const [isposttest, setIsposttest] = useState(false);

  const [testingrerender, setTestingrerender] = useState(1)
  const [redirect, setredirect] = useState(false);

  const [AllEmployees, setAllEmployees] = useState([])

  // Employee Data In Excel
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedexcelFile, setSelectedexcelFile] = useState(false);
  const employeefilechangeHandler = (event) => {
    var temp = document.getElementById("employeeexcelfile");
    if (temp.files.length > 0) {
      setSelectedexcelFile(temp.files[0]);
    }

  };

  const handleexcelSubmission = () => {
    if (selectedexcelFile == false) {
      toast.error('Please choose a file', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    setIsSuccess(true);
    setEmployeesubmitloader(true);
    const formData = new FormData();


    formData.append('File', selectedexcelFile);

    var data = {
      data: formData,
      role: employeetype
    }
    axios(
      {
        url: BASE_URL + `/user/register/employeedatabyadmin/excel/${employeetype}`,
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 50;
          setProgress(progress);
        },
        onDownloadProgress: (progressEvent) => {
          const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
          setProgress(progress);
        },
      })
      .then(res => {
        setEmployeesubmitloader(false)
        setTestingrerender(testingrerender + 1);
        setTimeout(() => {
          setIsSuccess(false); setProgress(0);
        }, 5000);
        toast.success(' Employee Data Added Successfully', {
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
        setEmployeesubmitloader(false)
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

  };


  // For Modified Virtual 



  const [virtualsessionlist, setvirtualsessionlist] = useState([
    { videos: Number },
  ]);
  const [no_of_sessions_virtual, setNo_of_sessions_virtual] = useState(null);
  // add session
  const addsessionvirtual = () => {
    setvirtualsessionlist([
      ...virtualsessionlist,
      { videos: Number },
    ]);
  };

  const removesessionvirtual = (i) => {
    var temp = [...virtualsessionlist];
    temp.splice(i, 1);
    setvirtualsessionlist(temp);
  }

  const onchangevideovirtual = (e, i) => {
    var temp = [...virtualsessionlist];
    temp[i].videos = e.target.value;
    setvirtualsessionlist(temp);
  }






  // Done
  const [allCourses, setallCourses] = useState()
  useEffect(() => {
    setCourseloader(true)
    axios.get(BASE_URL + "/user/all/employees")
      .then(response => {

        setAllEmployees(response.data);
        setTimeout(() => {
          setShowloading(false);
        }, 4000);


      })
      .catch(err => {

        toast.error('Server Error While Fetching Employee Data', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    axios.get(BASE_URL + '/course/all')
      .then(response => {
        setCourseloader(false)
        var temp = response.data;
        var size = temp.length;
        for (var i = 0; i < size; i++) {
          var totalvideos = 0;
          var totalsessions = 0;
          var calc;
          if (temp[i].mode == 'virtual') {
            calc = temp[i].virtual.sessionsinfo;
          }
          else {
            calc = temp[i].elearning.sessionsinfo;
          }
          totalsessions = calc.length;
          calc.map((e, i) => {
            totalvideos += e.no_of_videos;
          })
          temp[i].totalvideos = totalvideos;
          temp[i].totalsessions = totalsessions;
        }
        setallCourses(temp);
      })
      .catch((err) => {
        setCourseloader(false)
        toast.error('Server Error While Fetching Course Data', {
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


  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { first_name: "", last_name: "", email: "", phone: "", role: "employee" },
    ]);
  };

  // add session
  const addsession = () => {
    setsessionlist([
      ...sessionlist,
      { videos: '0' },
    ]);
  };

  const removesession = (i) => {
    var temp = [...sessionlist];
    temp.splice(i, 1);
    setsessionlist(temp);
  }

  const onchangevideo = (e, i) => {
    var temp = [...sessionlist];
    temp[i].videos = e.target.value;
    setsessionlist(temp);
  }
  const onvirtualsubmit = (e) => {
    setVirtualsubmitloader(true);
    e.preventDefault();
    var tempsessions = []
    var arrayofvideocount = [];
    for (let i = 0; i < virtualsessionlist.length; i++) {
      var tempobj = {
        session_name: virtualsessionlist[i].videos
      }
      tempsessions.push(tempobj);

    }
    var data = {
      course_name: course_name,
      mode: "virtual",
      sessionsinfo: tempsessions,
      feedback_questions: feedbackquestions

    }
    axios(
      {
        url: BASE_URL + "/course/create/virtual",
        method: "POST",
        data: data,
      })
      .then(res => {
        setVirtualsubmitloader(false);
        setTestingrerender(testingrerender + 1);
        setFeedbackquestions([""]);
        setCourse_name("");
        setOptions("");
        setvirtualsessionlist([
          { videos: Number },
        ]);
        toast.success('Virtual-learning Course Designed Successfully', {
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
        setVirtualsubmitloader(false);
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


  const uploadfile = async (file) => {
    // const params = {
    //   ACL: 'public-read',
    //   Body: file,
    //   Bucket: S3_BUCKET,
    //   Key: file.name
    // };
    const s3 = new ReactS3Client(config);

    // const s3 = new S3(config);
    var upload = s3.uploadFile(file)
      .then((data) => { return data; })
      .catch(err => console.error(err))



    // var upload= await S3FileUpload
    // .uploadFile(file, config)
    // .then((data) =>{ console.log(data);return data;})
    // .catch(err => console.error(err))
    // var upload = myBucket.upload(params).on('httpUploadProgress', function (progress) {
    //   let progressPercentage = Math.round(progress.loaded / progress.total * 100);

    // });
    return upload;
    // var promise = upload.promise();
    // return promise;
  }
  const uploadall = async () => {
    var len = sessionlist.length;

    var filescount = 0;
    var allfiles = [];

    [...Array(len)].map((e, i) => {
      const x = document.getElementsByClassName(`session${i}videos`);
      filescount += x.length;
    });



    var promises = [];

    [...Array(len)].map((e, i) => {
      const x = document.getElementsByClassName(`session${i}videos`);
      [...Array(x.length)].map((ee, ii) => {
        allfiles.push(x[ii].files[0]);
        promises.push(uploadfile(x[ii].files[0]));
      })
    })

    Promise.all(promises).then((data) => {
      setLoaderwhileuploding(false);
      var datacounter = 0;
      var tempsessions = []
      var arrayofvideocount = [];
      for (let i = 0; i < sessionlist.length; i++) {
        var temparr = [];
        for (let j = 0; j < sessionlist[i].videos; j++) {
          // console.log(data)
          temparr.push(data[datacounter].location);
          datacounter++;
        }
        var tempobj = {
          no_of_videos: parseInt(sessionlist[i].videos),
          videoslinks: temparr
        }
        tempsessions.push(tempobj);

      }
      var data = {
        course_name: course_name,
        mode: "elearning",
        sessionsinfo: tempsessions,
        feedback_questions: feedbackquestions

      }
      axios(
        {
          url: BASE_URL + "/course/create/elearning",
          method: "POST",
          data: data,
        })
        .then(res => {
          setElearningsubmitloader(false);
          setTestingrerender(testingrerender + 1);
          setFeedbackquestions([""]);
          setCourse_name("");
          setOptions("");
          setsessionlist([
            { videos: Number },
          ]);
          toast.success('E-learning Course Designed Successfully', {
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
          setElearningsubmitloader(false);
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
    })
  }
  const [loaderwhileuploding, setLoaderwhileuploding] = useState(false);
  const onelearningsubmit = async (e) => {
    setElearningsubmitloader(true);
    e.preventDefault();
    setLoaderwhileuploding(true);
    uploadall();

    //Done 

  }
  const onemployeedatasubmit = (e) => {
    setEmployeesubmitloader(true)
    e.preventDefault();
    for (var i = 0; i < inputList.length; i++) {
      inputList[i].role = employeetype
    }
    var data = {
      data: inputList
    }
    axios(
      {
        url: BASE_URL + `/user/register/employeedatabyadmin/${employeetype}`,
        method: "POST",
        data: data,
      })
      .then(res => {
        setEmployeesubmitloader(false)
        toast.success(' Employee Data Added Successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setInputList([
          { first_name: "", last_name: "", email: "", phone: "", role: "employee" },
        ]);
      })
      .catch(err => {
        setEmployeesubmitloader(false)
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
  // For Feedback 
  const [feedbackquestions, setFeedbackquestions] = useState([""]);
  const onfeedbackchange = (e, i) => {
    const temp = [...feedbackquestions];
    temp[i] = e.target.value;
    setFeedbackquestions(temp);
  }
  const addfeedback = () => {
    setFeedbackquestions([...feedbackquestions, ""]);
  }
  const removefeedback = (index) => {
    const temp = [...feedbackquestions];
    temp.splice(index, 1);
    setFeedbackquestions(temp);
  };
  // Feedback Done



  // Using Excel Or Not
  const Input = styled('input')({
    display: 'none',
  });
  const [isexcel, setIsexcel] = useState(false);

  const toggleexcel = (e) => {
    if (e == "noexcel") {
      setIsexcel(false);
    }
    else {
      setIsexcel(true);
    }
  }

  // Loader
  const [showloading, setShowloading] = useState(true);


  //Toggle Button In Design Course Module
  const [alignment, setAlignment] = React.useState('1');

  const handleToggleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };


  // Delete Course
  const [coursetodelete, setCoursetodelete] = useState()
  const ondeleteCourse = (e, course) => {
    setCoursetodelete(course);
    handleClickOpen();
    return;

  }
  // Dialog Box For Delete Course

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseWithDelete = () => {
    setOpen(false);
    axios.delete(BASE_URL + `/course/delete/${coursetodelete._id}`)
      .then((res) => {
        setTestingrerender(testingrerender + 1);
        toast.success('Course Deleted Successfully', {
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

  };


  // Course Page Navigator
  const [valuenav, setValuenav] = React.useState(0);

  return (
    <div className="bg-light">
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Delete ${coursetodelete?.course_name}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once deleted, it cannot be recovered
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button color="error" onClick={handleCloseWithDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="main-blog-area pd-bottom-90">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" variant="fullWidth">
                <Tab label="Design Course" value="1" />
                <Tab label="Knowledge Bank" value="2" />
                <Tab label="Employees" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Container maxWidth="">

                <Box display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <div>
                    <Box sx={{ width: 320 }}  >
                      <BottomNavigation
                        showLabels
                        value={valuenav}
                        onChange={(event, newValue) => {
                          setValuenav(newValue);
                        }}
                      >
                        <BottomNavigationAction label="All Courses" icon={<AlignHorizontalLeftIcon />} />
                        <BottomNavigationAction label="Create New Course" icon={<AddCircleOutlineIcon />} />
                      </BottomNavigation>
                    </Box>
                  </div>

                </Box>
                {
                  courseloader ? <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <CircularProgress />
                  </Box> : null
                }
                <div>
                  {
                    valuenav == 0 ?
                      <div>
                        <div>


                          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }} className="mt-4" >
                            {
                              allCourses?.length == 0 ? <Grid container justify="center">


                                <Alert severity="warning">
                                  <AlertTitle>Warning</AlertTitle>
                                  No courses found. Please create one first
                                </Alert>
                              </Grid> : null
                            }

                            {
                              allCourses?.map((e, i) => {
                                return <Grid item xs={2} sm={4} md={4} key={i} >
                                  <Card sx={{ boxShadow: 3, }} className=" shadow p-3 mb-5  rounded" >
                                    <CardContent style={section}>

                                      <Typography variant="h5" >
                                        <Typography variant="h6"  >
                                          <p>Course Name: {e.course_name}</p>
                                          <p>Mode: {e.mode == "elearning" ? <span>E-Learning</span> : <span>Virtual Classroom</span>}</p>
                                          <p>{e.totalsessions} Sessions {e.mode == "elearning" ? <span>&#8226; {e.totalvideos} Videos</span> : null}    </p>
                                        </Typography>
                                      </Typography>
                                      <Box
                                        m={1}
                                        //margin
                                        display="flex"
                                        justifyContent="flex-end"
                                        alignItems="flex-end"
                                      >
                                        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={(event) => { ondeleteCourse(event, e) }} >
                                          Delete
                                        </Button>
                                      </Box>

                                    </CardContent>
                                  </Card>

                                </Grid>
                              })
                            }
                          </Grid>
                        </div>
                      </div>
                      : valuenav == 1 ?
                        <Container maxWidth="md">
                          <div>

                            <div>
                              <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Course Name</label>
                                <input type="text" class="form-control" id="exampleInputEmail1" value={course_name} onChange={(e) => { setCourse_name(e.target.value); }} aria-describedby="emailHelp" required />
                              </div>

                              <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth >
                                  <InputLabel id="demo-simple-select-label"> Enter mode of the course </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"

                                    label=" Enter mode of the course "
                                    onChange={(e) => {
                                      if (e.target.value) {
                                        setOptions(e.target.value);
                                        setFeedbackquestions([""]);
                                      }
                                    }}
                                    value={options}
                                  >
                                    <MenuItem value="virtual">Virtual Classroom</MenuItem>
                                    <MenuItem value="elearn">E-learning</MenuItem>
                                  </Select>
                                </FormControl >
                              </Box>
                              <br />
                              {options === "virtual" && (
                                <form onSubmit={onvirtualsubmit} method="post">
                                  <div className="">
                                    {virtualsessionlist.map((x, i) => {
                                      return (
                                        <div style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px" }} className="card bg-white rounded mt-4 ">
                                          <div className="card-body my-2">
                                            <h4>Session {i + 1}</h4>
                                            <input type="text" class="form-control mb-2" id="exampleInputEmail1" aria-describedby="emailHelp" value={x.videos} onChange={(e) => { onchangevideovirtual(e, i) }} placeholder="Session Name" />


                                            {
                                              i > 0 ? <button onClick={() => { removesessionvirtual(i) }} type="button" className="btn btn-outline-danger btn-sm">Remove Session</button> : null
                                            }
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>

                                  <button onClick={addsessionvirtual} type="button" className="btn btn-outline-success btn-sm mt-4">Add session +</button>

                                  <br />
                                  <br />
                                  {/* <div className="mt-3">
                                    <p>Feedback Questions</p>
                                    {
                                      feedbackquestions.map((data, i) => {
                                        return <div class="input-group mb-3">
                                          <span class="input-group-text" id="basic-addon1">{i + 1}</span>
                                          <input type="text" class="form-control" placeholder="Question" value={data} onChange={(e) => { onfeedbackchange(e, i) }} aria-label="Username" aria-describedby="basic-addon1" required />

                                          <div class="btn-group" role="group" aria-label="Basic example">
                                            {feedbackquestions.length !== 1 && (
                                              <button
                                                type="button"
                                                class="btn btn-outline-danger"
                                                onClick={() => removefeedback(i)}
                                              >
                                                -
                                              </button>
                                            )}
                                            {feedbackquestions.length - 1 === i && (
                                              <button
                                                type="button"
                                                class="btn btn-outline-success"
                                                onClick={addfeedback}
                                              >
                                                +
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      })
                                    }
                                  </div> */}
                                  <br />
                                  {
                                    virtualsubmitloader ?
                                      <LoadingButton
                                        loading
                                        loadingPosition="start"
                                        startIcon={<SaveIcon />}
                                        variant="outlined"
                                        fullWidth size="large"
                                        disabled
                                      >
                                        Submitting
                                      </LoadingButton> :
                                      <Button fullWidth size="large" variant="outlined" type="submit">
                                        Submit
                                      </Button>
                                  }
                                  {/* <button type="submit" className=" btn btn-outline-primary">Submit</button> */}
                                </form>
                              )}
                              {options === "elearn" && (
                                <form method="post" onSubmit={onelearningsubmit}>

                                  <br />

                                  <div className="">
                                    {sessionlist.map((x, i) => {
                                      return (
                                        <div style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px" }} className="card bg-white rounded mt-4 ">
                                          <div className="card-body my-2">
                                            <h4>Session {i + 1}</h4>
                                            <input type="text" class="form-control mb-2" id="exampleInputEmail1" aria-describedby="emailHelp" value={x.videos} onChange={(e) => { onchangevideo(e, i) }} placeholder="No. of videos" />
                                            <form>
                                              {isNaN(parseInt(x.videos)) ? null : parseInt(x.videos) != 0 ? [...Array(parseInt(x.videos))].map((tee, t) =>
                                                <div className="m-1">
                                                  <span>Video {t + 1}:  </span>
                                                  <input type="file" className={`session${i}videos`} />
                                                  {/* <Box sx={{ m: 1, p: 1, border: '1px dashed grey', width: '100%' }}>
                                                    <LinearProgress variant="determinate" value={progress} />
                                                  </Box> */}
                                                </div>
                                              ) : null}
                                            </form>
                                            {
                                              i > 0 ? <button onClick={() => { removesession(i) }} type="button" className="btn btn-outline-danger btn-sm">Remove Session</button> : null
                                            }
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>

                                  <button onClick={addsession} type="button" className="btn btn-outline-success btn-sm mt-4">Add session +</button>

                                  <br />
                                  {/* <div className="mt-3">
                                    <p>Feedback Questions</p>
                                    {
                                      feedbackquestions.map((data, i) => {
                                        return <div class="input-group mb-3">
                                          <span class="input-group-text" id="basic-addon1">{i + 1}</span>
                                          <input type="text" class="form-control" placeholder="Question" value={data} onChange={(e) => { onfeedbackchange(e, i) }} aria-label="Username" aria-describedby="basic-addon1" required />

                                          <div class="btn-group" role="group" aria-label="Basic example">
                                            {feedbackquestions.length !== 1 && (
                                              <button
                                                type="button"
                                                class="btn btn-outline-danger"
                                                onClick={() => removefeedback(i)}
                                              >
                                                -
                                              </button>
                                            )}
                                            {feedbackquestions.length - 1 === i && (
                                              <button
                                                type="button"
                                                class="btn btn-outline-success"
                                                onClick={addfeedback}
                                              >
                                                +
                                              </button>
                                            )}
                                          </div>
                                        </div>
                                      })
                                    }
                                  </div> */}
                                  <br />
                                  {
                                    loaderwhileuploding ?
                                      <div className="mt-3">
                                        <Box display="flex">
                                          <CircularProgress />
                                        </Box>
                                        <div className="mt-3">
                                          <p>Please Wait While Videos Are Uploading</p>
                                        </div>
                                      </div>
                                      : null
                                  }
                                  {
                                    elearningsubmitloader ?
                                      <LoadingButton
                                        loading
                                        loadingPosition="start"
                                        startIcon={<SaveIcon />}
                                        variant="outlined"
                                        fullWidth size="large"
                                        disabled
                                      >
                                        Submitting
                                      </LoadingButton> :
                                      <Button fullWidth size="large" variant="outlined" type="submit">
                                        Submit
                                      </Button>
                                  }
                                  {/* <Button fullWidth size="large" variant="outlined" type="submit">
                                    Submit
                                  </Button> */}
                                  {/* <button type="submit" className="btn btn-outline-primary">Submit</button> */}
                                </form>
                              )}
                            </div>
                          </div>
                        </Container>

                        : null
                  }
                </div>

              </Container >
            </TabPanel>
            <TabPanel value="2"> <Container className="mt-5" maxWidth="md">
              <Typography className="text-center" variant="h6" gutterBottom component="div">
                <img src={underconstruction} alt="" style={{ maxWidth: '350px', maxHeight: '350px' }} />
                <HandymanSharpIcon />
                <span className="ml-2">Under Construction</span>
              </Typography>
            </ Container>
            </TabPanel>
            <TabPanel value="3" ><div className="course-details-content">
              <div className="container pd-top-60">
                <h2 style={{ textAlign: "center" }}>Employees</h2>

                <div className="App">

                  <h3>Add Employees</h3>

                  <div className="my-3" onChange={(e) => { changeemployeetype(e) }}>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="employee" name="employee" defaultChecked={true} /> Employee
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="trainer" name="employee" /> Trainer

                    </div>

                  </div>


                  <div className="my-3" onChange={(e) => { toggleexcel(e.target.value) }}>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="noexcel" name="excel" defaultChecked={true} /> Enter Data
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="excel" name="excel" /> Using Excel

                    </div>

                  </div>
                  {!isexcel && <form method="post" onSubmit={onemployeedatasubmit}>
                    {inputList.map((x, i) => {
                      return (
                        <div className="mw-100">
                          <div class="mb-3  d-flex flex-wrap  justify-content-between">
                            <div>
                              <input
                                type="name"
                                class="form-control"
                                id="exampleInputEmail1"
                                placeholder="First Name"
                                aria-describedby="emailHelp"
                                name="first_name"
                                value={x.first_name}
                                onChange={(e) => handleInputChange(e, i)}
                                required
                              />
                            </div>
                            <div>
                              <input
                                type="name"
                                class="form-control"
                                name="last_name"
                                placeholder="Last Name"
                                id="exampleInputPassword1"
                                value={x.last_name}
                                onChange={(e) => handleInputChange(e, i)}
                                required
                              />
                            </div>

                            <div>
                              <input
                                type="name"
                                class="form-control"
                                name="email"
                                placeholder="Email"
                                id="exampleInputPassword1"
                                value={x.email}
                                onChange={(e) => handleInputChange(e, i)}
                                required
                              />
                            </div>
                            <div>
                              <input
                                type="number"
                                class="form-control"
                                placeholder="Phone Number"
                                name="phone"
                                id="exampleInputPassword1"
                                value={x.phone}
                                onChange={(e) => handleInputChange(e, i)}
                                required
                              />
                            </div>

                            <div>
                              {inputList.length !== 1 && (
                                <RemoveCircleOutlineSharpIcon color="error" style={{ cursor: 'pointer' }} onClick={() => handleRemoveClick(i)} />
                                // <button
                                //   type="button"
                                //   class="btn btn-outline-danger"
                                //   onClick={() => handleRemoveClick(i)}
                                // >
                                //   -
                                // </button>
                              )}
                              {inputList.length - 1 === i && (
                                <AddCircleOutlineSharpIcon color="success" style={{ cursor: 'pointer' }} onClick={handleAddClick} />

                                // <button
                                //   type="button"
                                //   class="btn btn-outline-success"
                                //   onClick={handleAddClick}
                                // >
                                //   +
                                // </button>
                              )}
                            </div>
                          </div>


                        </div>
                      );
                    })}

                    <div class="d-grid gap-2">
                      {
                        employeesubmitloader ?
                          <LoadingButton
                            loading
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="outlined"
                            disabled
                          
                          >
                            Submitting
                          </LoadingButton> :
                         <Button variant="outlined" type="submit">
                         Submit
                       </Button>
                      }
                      {/* <Button variant="outlined" type="submit">
                        Submit
                      </Button> */}
                    </div>
                  </form>}
                  {
                    isexcel && <div>
                      <input type="file" name="file" id="employeeexcelfile" required onChange={employeefilechangeHandler} />
                      {
                        employeesubmitloader ?
                          <LoadingButton
                            loading
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="outlined"
                            disabled
                          
                          >
                            Uploading
                          </LoadingButton> :
                          <Button variant="outlined" endIcon={<FileUploadOutlinedIcon />} onClick={handleexcelSubmission}>
                          Upload
                        </Button>
                      }
                      {/* <Button variant="outlined" endIcon={<FileUploadOutlinedIcon />} onClick={handleexcelSubmission}>
                        Upload
                      </Button> */}
                      <Box>
                        <Grid container >
                          <Grid item className="mt-3">
                            <Alert severity="info">
                              <AlertTitle>Please Note</AlertTitle>
                              Excel Sheet Format Should Be:- FirstName | LastName | Email | PhoneNumber
                            </Alert>
                          </Grid>

                        </Grid>
                      </Box>

                      {
                        isSuccess && <Box sx={{ m: 1, p: 1, border: '1px dashed grey', width: '100%' }}>
                          <LinearProgress variant="determinate" value={progress} />
                        </Box>
                      }
                    </div>
                  }
                </div>
                <div className=" box">
                  <h3 className="mt-5">All Employees</h3>

                  {
                    showloading ? <Box display="flex"
                      justifyContent="center"
                      alignItems="center">
                      <CircularProgress />
                    </Box> :
                      <div>
                        <TableContainer component={Paper}>
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Sr no.</TableCell>
                                <TableCell align="left">Employee Name</TableCell>
                                <TableCell align="left">Employee Email</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {AllEmployees.map((data, i) => (
                                <TableRow
                                  key={i}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell align="left">
                                    {i + 1}
                                  </TableCell>
                                  <TableCell align="left">{data.first_name} {data.last_name}</TableCell>
                                  <TableCell align="left">{data.email}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        {/* <table class="table mt-4">
                          <thead class="thead">
                            <tr className="rowline rowlinehead">
                              <th scope="col">Sr no.</th>
                              <th scope="col">Employee Name</th>
                              <th scope="col">Employee Email</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              AllEmployees.map((data, i) => {
                                return <tr className="rowline">
                                  <th scope="row">{i + 1}</th>
                                  <td>{data.first_name} {data.last_name}</td>
                                  <td>{data.email}</td>

                                </tr>
                              })
                            }
                          </tbody>
                        </table> */}
                      </div>
                  }
                </div>
              </div>
            </div></TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}
export default Admin;
