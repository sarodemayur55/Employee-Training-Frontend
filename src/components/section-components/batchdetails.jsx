import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BASE_URL from '../../constant/constants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Course from './course'
import Coursevirtual from './coursevirtual'


const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& [role="separator"]': {
        margin: theme.spacing(0, 2),
    },
}));
export default function Batchdetails({ setShowbatchdetails, batch_id }) {
    const [batchinfo, setbatchinfo] = useState()
    const [currcourse, setCurrcourse] = useState()
    useEffect(() => {
        axios.get(BASE_URL + `/employee/batchinfo/${batch_id}`)
            .then(response => {
                var temp = []
                temp.push(response.data.batchinfo)
                setbatchinfo(temp);
                setCurrcourse(response.data.batchinfo.courseinfo);
            })
            .catch(err => {
                toast.error('Server Error While Fetching Enrolled Batches', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }, [])

    const [showCourse, setShowCourse] = useState(false)

    return (
        <div>
            {
                showCourse ?
                    <div>
                        <Button startIcon={<ArrowBackIcon />} onClick={() => { setShowCourse(false); }}>
                            Back
                        </Button>
                        {
                            currcourse.mode =='elearning'?<Course courseinfo={currcourse} />:<Coursevirtual courseinfo={currcourse} />
                        }
                    </div>
                    : <div className="bg-white">
                        <div>
                            <Button startIcon={<ArrowBackIcon />} onClick={() => { setShowbatchdetails(false); }}>
                                Back
                            </Button>
                        </div>
                        {
                            batchinfo?.map((e, i) => {
                                return <Container fixed >
                                    <Typography align="center" variant="h3" display="block" gutterBottom component="h3" className="mb-3">
                                        {e.batchinfo.batch_name}
                                    </Typography>

                                    <Grid container justifyContent="center" spacing={{ xs: 2, md: 8 }} columns={{ xs: 1, sm: 1, md: 12 }} >

                                        <Grid item xs={2} sm={4} md={4}  >
                                            <Card sx={{ boxShadow: 3, }} style={{ height: "250px" }} className=" shadow p-3 mb-5  bg-light rounded">
                                                <CardContent>
                                                    <Typography variant="h5" >
                                                        <p>Trainer</p>
                                                        <Typography variant="h6"  >
                                                            <p>{e.trainerinfo.first_name} {e.trainerinfo.last_name}</p>
                                                            <p>Email: {e.trainerinfo.email}</p>
                                                        </Typography>
                                                    </Typography>


                                                </CardContent>
                                            </Card>

                                        </Grid>
                                        <Grid item xs={2} sm={4} md={4} >
                                            <Card sx={{ boxShadow: 3, }} style={{ height: "250px" }} className=" shadow p-3 mb-5  bg-light rounded">
                                                <CardContent>
                                                    <Typography variant="h5" >
                                                        <p>Course</p>
                                                        <Typography variant="h6"  >
                                                            <p>{e.courseinfo.course_name}</p>
                                                            <p>Mode: {e.courseinfo.mode == "elearning" ? <span>E-Learning</span> : <span>Virtual Classroom</span>}</p>
                                                        </Typography>
                                                    </Typography>
                                                    <CardActions style={{ justifyContent: 'center' }}>
                                                        <Button variant="outlined" href="#outlined-buttons" onClick={(e) => { setShowCourse(true) }}>
                                                            Go To Course
                                                        </Button>
                                                    </CardActions>

                                                </CardContent>
                                            </Card>

                                        </Grid>
                                    </Grid>
                                </Container >
                            })
                        }

                    </div>
            }
        </div>
    )
}
