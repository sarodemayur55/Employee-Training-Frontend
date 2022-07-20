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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Course({ courseinfo }) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [currvideo, setCurrvideo] = useState(null)
  useEffect(() => {
    setCurrvideo(courseinfo.elearning.sessionsinfo[0].videoslinks[0]);
  }, [])

  const changevideo = (e) => {
    setCurrvideo(e);
    setPlay(true)
  }
  const [play, setPlay] = useState(true);
  const errorinvideo = () => {
    toast.error('Error Occured While Playing The Video. Please Try Again Later!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h3" gutterBottom component="div" align="center">
          {courseinfo.course_name}
        </Typography>
        <Grid container  spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={12} sm={12} md={8} >
            <Item>
              <div onClick={() => { setPlay(!play) }}>
                <ReactPlayer
                  // Disable download button
                  config={{ file: { attributes: { controlsList: 'nodownload  nofullscreen ', disablePictureInPicture: 'true' } } }}

                  // Disable right click
                  onContextMenu={e => e.preventDefault()}

                  // My props
                  url={currvideo}
                  controls={true}
                  playing={play}

                  onError={errorinvideo}
                  width="100%"
                  height="100%"
                />
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={4} >
            <Item>
              <Typography variant="button" display="block" gutterBottom>
                Course Content
              </Typography>
              <div>

                {
                  courseinfo?.elearning?.sessionsinfo?.map((e, i) => {
                    return <Accordion {...(i == 0 ? { defaultExpanded: true } : undefined)} >
                      <AccordionSummary aria-controls={`panel${i + 1}d-content`} id={`panel${i + 1}d-header`}>
                        <Typography>Session {i + 1}</Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ p: 0 }}>
                        <List>
                          {
                            e?.videoslinks?.map((link, i) => {
                              return <div onClick={() => { setCurrvideo(link); setPlay(true); }} style={{ backgroundColor: currvideo == link ? '	#E8E8E8' : '' }} className={`${currvideo == link ? '' : ''}`}>
                                <ListItem disablePadding>
                                  <ListItemButton>
                                    <ListItemIcon>
                                      <PlayCircleFilledWhiteSharpIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`Video ${i + 1}`} />
                                  </ListItemButton>
                                </ListItem>
                              </div>
                            })
                          }
                        </List>

                      </AccordionDetails>
                    </Accordion>
                  })
                }
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>

    </div>
  )
}
