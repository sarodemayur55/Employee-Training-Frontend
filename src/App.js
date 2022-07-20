import React, { Component,useEffect } from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router, HashRouter, Route, Switch,withRouter  } from "react-router-dom";
import HomeV3 from './components/home-v3';
import Trainer from './components/trainer';
import Admin from './components/admin';
import Employee from './components/employee';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import SignInProtectedRoute from './components/ProtectedRoute/SignInProtectedRoute'
import BASE_URL from './constant/constants'


import { useAuthState,useAuth } from './states/AuthState';

import "./assets/css/style.css"
// import AWS from 'aws-sdk';
export default function App() {
    axios.defaults.withCredentials=true;
    // console.log(BASE_URL +"/user/")
    const {isAuthenticated,first_name,last_name,role} = useAuthState()
	const auth = useAuth()
    useEffect(() => {
        axios.get(BASE_URL +"/user/")
      .then(res => {
        // console.log(res)
        
        auth.batch(s=>{
     
            s.isAuthenticated.set(true)
            s.user_id.set(res.data.user_id)
            s.first_name.set(res.data.first_name)
            s.last_name.set(res.data.last_name)
            s.email.set(res.data.email)
            s.role.set(res.data.role)
            auth.isLoading.set(false)
          })
      })
      .catch(err => {
        // console.log("Hello")
        auth.isLoading.set(false)
      });
    }, [])
    return (

        <Router >
                   
	                <div>
                    <ToastContainer />
	                <Switch>


                        {/* In Use */}

                     
                        <ProtectedRoute role="trainer" exact path="/trainer" component={Trainer} />
                        <ProtectedRoute role="admin" exact path="/admin" component={Admin} /> 
                        <ProtectedRoute role="employee" exact path="/employee" component={Employee} /> 
                        <SignInProtectedRoute exact path="/sign-in" component={SignIn} />
                        {/* <Route path="/sign-up" component={SignUp} /> */}
                        <Route exact path="/" component={HomeV3} /> 

                        {/* Not In Use */}

                        {/* <Route path="/course" component={Course} /> */}
                        {/* <Route path="/virtual" component={Virtual} /> */}
                        {/* <Route path="/course-details" component={CourseDetails} /> */}
                        {/* <Route path="/virtual-details" component={VirtualDetails} /> */}
                        {/* <Route path="/about" component={About} /> */}
                        {/* <Route path="/event" component={Event} /> */}
                        {/* <Route path="/event-details" component={EventDetails} /> */}
                        {/* <Route path="/pricing" component={Pricing} /> */}
                        {/* <Route path="/gallery" component={Gallery} /> */}
                        {/* <Route path="/vclassroom" component={Vclassroom}/> */}
                        {/* <Route path="/contact" component={Contact} /> */}
                        {/* <Route path="/blog" component={Blog} />
                        <Route path="/blog-details" component={BlogDetails} /> */}
                        
	                </Switch>
	                </div>
                </Router>
    )
}

// class Root extends Component {
    
//     render() {
//         return(
//                 <HashRouter basename="/">
//                     {
//                         axios.defaults.withCredentials=true
//                     }
// 	                <div>
//                     <ToastContainer />
// 	                <Switch>
//                         <Route exact path="/" component={HomeV3} />
//                         <Route path="/course" component={Course} />
//                         <Route path="/virtual" component={Virtual} />
//                         <Route path="/course-details" component={CourseDetails} />
//                         <Route path="/virtual-details" component={VirtualDetails} />
//                         <Route path="/about" component={About} />
//                         <Route path="/event" component={Event} />
//                         <Route path="/event-details" component={EventDetails} />
//                         <Route path="/trainer" component={Trainer} />
//                         <Route path="/admin" component={Admin} />
//                         <Route path="/pricing" component={Pricing} />
//                         <Route path="/gallery" component={Gallery} />
//                         <Route path="/sign-in" component={SignIn} />
//                         <Route path="/sign-up" component={SignUp} />
//                         <Route path="/vclassroom" component={Vclassroom}/>
//                         <Route path="/contact" component={Contact} />
//                         <Route path="/blog" component={Blog} />
//                         <Route path="/blog-details" component={BlogDetails} />
                        
// 	                </Switch>
// 	                </div>
//                 </HashRouter>
//         )
//     }
// }

// export default Root;

// ReactDOM.render(<Root />, document.getElementById('edumint'));
