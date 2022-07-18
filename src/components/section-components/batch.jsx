import React, { useState, useEffect } from "react";
// import "./CSS/batch.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../../constant/constants'
import { useAuthState, useAuth } from '../../states/AuthState';


import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function Batch() {
  const { user_id, first_name, last_name, role } = useAuthState();
  const [testingrerender, setTestingrerender] = useState(1)
  const [checking, setChecking] = useState(0)
  const [AllBatches, setAllBatches] = useState([])
  const [AllEmployees, setAllEmployees] = useState([])
  const [AllCourses, setAllCourses] = useState([])
  const [AssignCourseID, setAssignCourseID] = useState("");
  const [batch_name, setBatch_name] = useState("")
 
  useEffect(() => {
    axios.get(BASE_URL + '/user/all_for_trainer_batch_create/employees')
      .then(response => {
        setAllEmployees(response.data);

        // this.setState({ classes: response.data.result });
      });

    axios.get(BASE_URL + `/batch/trainer/${user_id}`)
      .then(response => {
        setAllBatches(response.data);

        setTimeout(() => {
          setshow(false);
        }, 2000);
      });



    axios.get(BASE_URL + '/course/all')
      .then(response => {
        setAllCourses(response.data);

        // this.setState({ classes: response.data.result });
      });

    var temp = AllEmployees;
    for (let i = 0; i < temp.length; i++) {
      temp[i].isSelected = false;
    }
    // temp.map(obj=> ({ ...obj, isSelected: 'false' }))
    setAllEmployees(temp);
    // setRerender(!rerender);
  }, [testingrerender])

  const [selectedfornewbatch, setselectedfornewbatch] = useState([])
  const handleaddclickfornewbatch = (e) => {
    var temp = AllEmployees;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i]._id == e) {
        temp[i].isSelected = true;
        break;
      }

    }
    setChecking(checking + 1)
    setAllEmployees(temp);
  }
  const handleremoveclickfornewbatch = (e) => {
    var temp = AllEmployees;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i]._id == e) {
        temp[i].isSelected = false;
        break;
      }

    }
    setChecking(checking - 1)
    setAllEmployees(temp);
  }

  const handlesubmit = (e) => {

    e.preventDefault();
    var ele = document.getElementById("alertonsubmit");
    if (checking <= 0) {
      toast.error('Please Select The Employees', {
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
    var temp = [];
    AllEmployees.map((a) => {
      if (a.isSelected == true) {
        temp.push(a._id);
      }
    })
    const data = {
      batch_name: batch_name,
      course_id: AssignCourseID,
      trainer_id: user_id,
      employee_id: temp
    }
    axios(
      {
        url: BASE_URL + "/batch/create",
        method: "POST",
        data: data,
        // headers: { "Content-Type": "multipart/form-data" }
      })
      .then(res => {
        setBatch_name("");
        setTestingrerender(testingrerender + 1);
        temp = [...AllEmployees];
        for (let i = 0; i < temp.length; i++) {
          temp[i].isSelected = false;
        };
        setAllEmployees(temp);
        toast.success('New Batch Created Successfully', {
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
  const [show, setshow] = useState(true)


  const deletebatch = (e) => {

  }


  // Delete Batch
  // Dialog Box For Delete Batch
  const [batchtodelete, setBatchtodelete] = useState()
  const ondeleteBatch = (e, course) => {
    setBatchtodelete(course);
    handleClickOpen();
    return;

  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseWithDelete = () => {
    setOpen(false);
    axios.delete(BASE_URL + `/batch/deletebatch/${batchtodelete._id}`)
      .then((res) => {
        setTestingrerender(testingrerender + 1);
        toast.success('Batch Deleted Successfully', {
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

  return (
    <div className="container pd-top-60">
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Delete ${batchtodelete?.batch_name}`}
            
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
      {
        show == true ? <Box display="flex"
          justifyContent="center"
          alignItems="center">
          <CircularProgress />
        </Box>
          : <div>
            <div className=" text-center">
              <ul className="nav nav-pills nav-fill mb-5" id="myTab" role="tablist">
                {
                  AllBatches.map((data, i) => {
                    return <li className="nav-item">
                      <a

                        className={i == 0 ? "nav-link active" : "nav-link"}
                        id={`tab${i + 1}-tab`}
                        data-toggle="tab"
                        href={`#tab${i + 1}`}
                        role="tab"
                        aria-controls={`tab${i + 1}`}
                        aria-selected="true"
                      >
                        {data.batch_name}
                      </a>
                    </li>
                  })
                }



                <li className="nav-item">
                  <a
                    // className="nav-link"
                    className={AllBatches.length == 0 ? "nav-link active" : "nav-link"}
                    id={`tab${AllBatches.length + 1}-tab`}
                    data-toggle="tab"
                    href={`#tab${AllBatches.length + 1}`}
                    role="tab"
                    aria-controls={`tab${AllBatches.length + 1}`}
                    aria-selected="false"
                  >
                    Add Batch
                  </a>
                </li>

              </ul>
            </div>
            <div className="tab-content" id="myTabContent">
              {
                AllBatches.map((data, i) => {
                  return <div
                    // className="tab-pane fade show active"
                    className={i == 0 ? "tab-pane fade show active" : "tab-pane fade "}
                    id={`tab${i + 1}`}
                    role="tabpanel"
                    aria-labelledby={`tab${i + 1}-tab`}
                  >
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />}   onClick={(event) => { ondeleteBatch(event,data ) }}>
                      Delete This Batch
                    </Button>
                    <h5 style={{ textAlign: "center" }}>{data.batch_name} Employees</h5>

                    <div class="box" style={{ overflowX: "auto" }}>
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Employee Name</th>
                            <th scope="col">Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            data.employee_id.map((employees, index) => {
                              return <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{employees.first_name} {employees.last_name}</td>
                                <td>{employees.email}</td>
                              </tr>
                            })
                          }

                        </tbody>
                      </table>
                    </div>
                  </div>
                })
              }






              <div
                className={AllBatches.length == 0 ? "tab-pane fade show active" : "tab-pane fade "}
                // className="tab-pane fade"
                id={`tab${AllBatches.length + 1}`}
                role="tabpanel"
                aria-labelledby={`tab${AllBatches.length + 1}-tab`}>
                <form id="newbatchform" onSubmit={handlesubmit}>
                  <div class="d-grid gap-2">
                    <center>
                      <button class="btn btn-outline-primary" type="submit"  >Create Batch</button>
                    </center>

                  </div>

                  <input type="text" className="form-control mt-5" placeholder="Batch Name" id="exampleInputEmail1" value={batch_name} onChange={(e) => { setBatch_name(e.target.value) }} required />
                  <label for="sel1" className="mt-3">Assign Course:</label>
                  <select class="form-control" id="assigncourseselect" required value={AssignCourseID} onChange={(e) => { setAssignCourseID(e.target.value); }}>

                    <option style={{ display: "none" }}></option>

                    {
                      AllCourses.map((data, i) => {
                        return <option value={data._id}>
                          {data.course_name} ({data.mode})
                        </option>
                      })
                    }
                  </select>
                  <h6 className="mt-5">Select Employees</h6>
                  <div>

                  </div>

                  <div class="box" style={{ overflowX: "auto" }}>
                    <table class="table  table-striped  table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>

                        {

                          AllEmployees.sort((a, b) => a.isSelected == true ? -1 : 1).map((data, i) => {
                            return <tr>
                              <th scope="row">{i + 1}</th>
                              <td>{data.first_name} {data.last_name}</td>
                              <td>{data.email}</td>
                              <td>
                                {
                                  data.isSelected ? <button type="button" class="btn btn-outline-danger btn-lg" value={data._id} onClick={(e) => handleremoveclickfornewbatch(e.target.value)}>-</button> : <button type="button" class="btn btn-outline-success btn-lg" value={data._id} onClick={(e) => handleaddclickfornewbatch(e.target.value)}>+</button>
                                }
                              </td>
                            </tr>
                          })
                        }


                      </tbody>
                    </table>

                  </div>
                </form>
              </div>
            </div>
          </div>
      }

    </div>
  );
}

export default Batch;
