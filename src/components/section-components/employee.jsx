import * as React from 'react';
import { useEffect, useState } from 'react'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios'
import BASE_URL from '../../constant/constants'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import Batchdetails from './batchdetails'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthState, useAuth } from '../../states/AuthState';
import Container from '@mui/material/Container';
import Upcomingsessions from './upcomingsessions'
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& [role="separator"]': {
        margin: theme.spacing(0, 2),
    },
}));
export default function Employee() {
    const [batchloader, setBatchloader] = useState(false);
    const [sessionloader, setSessionloader] = useState(false);
    const { user_id } = useAuthState()
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [batchesenrolled, setBatchesenrolled] = useState([])

    useEffect(() => {
        setBatchloader(true);
        setSessionloader(true);
        axios.get(BASE_URL + `/employee/allbatches/${user_id}`)
            .then(response => {
                setBatchesenrolled(response.data.result);
                setBatchloader(false);
                setSessionloader(false);

            })
            .catch(err => {
                setBatchloader(false);
                setSessionloader(false);
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


    // Batch Details
    const [showbatchdetails, setShowbatchdetails] = useState(false)
    const [currbatch, setCurrbatch] = useState();
    const handleopenclick = (e) => {
        setShowbatchdetails(true);
        setCurrbatch(e);
    }

    return (
        <div className="bg-light">
            {
                showbatchdetails
                    ? <Batchdetails setShowbatchdetails={setShowbatchdetails} batch_id={currbatch} />
                    : <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example" variant="fullWidth">
                                    <Tab label="Batches Enrolled" value="1" />
                                    <Tab label="Upcoming Sessions" value="2" />
                                    {/* <Tab label="Item Three" value="3" /> */}
                                </TabList>
                            </Box>
                            <TabPanel value="1" >

                                <Container maxWidth="lg">
                                    {
                                        batchloader ? <Box display="flex"
                                            justifyContent="center"
                                            alignItems="center">
                                            <CircularProgress />
                                        </Box> :
                                            batchesenrolled?.length == 0 ? <Grid container justify="center" className="mb-4">


                                                <Alert severity="warning">
                                                    <AlertTitle>Warning</AlertTitle>
                                                    You are not enrolled in any batch yet
                                                </Alert>
                                            </Grid> : null

                                    }
                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
                                        {
                                            batchesenrolled.map((e, i) => {
                                                return <Grid item xs={2} sm={4} md={4} key={i} >
                                                    <Card sx={{ boxShadow: 3, }} className=" shadow p-3 mb-5  rounded">
                                                        <CardContent>
                                                            <Typography align="center" variant="h5" gutterBottom>
                                                                {e.batch_name}
                                                            </Typography>


                                                        </CardContent>
                                                        <CardActions style={{ justifyContent: 'center' }}>
                                                            <Button onClick={() => { handleopenclick(e._id) }} variant="outlined">Open</Button>
                                                        </CardActions>
                                                    </Card>

                                                </Grid>
                                            })
                                        }
                                    </Grid>
                                </Container>
                            </TabPanel>
                            <TabPanel value="2">
                            <Container maxWidth="lg">
                                {
                                    sessionloader ? <Box display="flex"
                                        justifyContent="center"
                                        alignItems="center">
                                        <CircularProgress />
                                    </Box> :
                                        batchesenrolled?.length == 0 ? <Grid container justify="center" className="mb-4">


                                            <Alert severity="warning">
                                                <AlertTitle>Warning</AlertTitle>
                                                You are not enrolled in any course yet
                                            </Alert>
                                        </Grid> : null

                                }
                                </Container>
                                <Upcomingsessions batchesenrolled={batchesenrolled} /></TabPanel>
                            {/* <TabPanel value="3">Item Three</TabPanel> */}
                        </TabContext>
                    </Box>
            }

        </div>
    )
}
