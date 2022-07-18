import React, { Component, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuthState, useAuth } from '../../states/AuthState';
import BASE_URL from '../../constant/constants'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import React from 'react'
// import {  useLocation, withRouter } from 'react-router-dom';
export default function NavbarV3() {
  // // let publicUrl = process.env.PUBLIC_URL + "/";
  let imgattr = "logo";
  let anchor = "#";
  const { isAuthenticated, first_name, last_name, role } = useAuthState()
  const auth = useAuth()
  useEffect(() => {
    document.getElementsByTagName('body')[0].classList.add("home-3")
  }, [])


  const logout = () => {

    axios.get(BASE_URL + "/user/logout")
      .then(response => {
        auth.batch(s => {
          s.isAuthenticated.set(false)
          s.email.set('')
          s.first_name.set('')
          s.last_name.set('')
          s.role.set('')
          s.user_id.set('')
        })
        toast.success('Successfully Logged out', {
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
        toast.error('Server Error While Logging Out', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });


  }

  return (
    <div className="navbar-area">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        {/* <Link to="/" style={{display: 'inline'}}> */}
          <img src={"assets/img/newmayur.png"} alt="img" style={{ width: "150px", height: "75px" }} />
        {/* </Link> */}
        {/* <a class="navbar-brand" href="#">Navbar</a> */}
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-start" id="navbarSupportedContent">
        <div class="">
        <ul className="navbar-nav menu-open " style={{ color: 'black' }}>
              <li className="current-menu-item mr-auto p-sm-3" >
                <Link to="/" style={{ color: 'black' }}>Home</Link>

              </li>
              {
                !isAuthenticated ? <li className=" mr-auto p-sm-3">
                  <Link to="/sign-in" style={{ color: 'black' }}>Sign In</Link>
                </li> : <li style={{ color: 'black' }}  className=" mr-auto p-sm-3"><Link to="/sign-in" style={{ color: 'black' }}>Dashboard</Link></li>
              }
              {
                isAuthenticated ? <li  className=" mr-auto p-sm-3" onClick={logout} ><span style={{ color: "black", cursor: "pointer" }}>Logout</span></li> : null
              }

            </ul>
        </div>
          {/* <ul class="navbar-nav mr-auto">fdsdsf
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li>
          </ul> */}
        </div>
      </nav>
      {/* <nav className="navbar navbar-area-3 navbar-area navbar-expand-lg shadow-lg" >
        <div className="container nav-container">
          <div className="responsive-mobile-menu">
            <button
              className="menu toggle-btn d-block d-lg-none"
              data-target="#edumint_main_menu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-left" />
              <span className="icon-right" />
            </button>
          </div>
          <div className="logo">
            <Link to="/">
              <img src={"assets/img/newmayur.png"} alt="img" style={{ width: "50%", height: "70%" }} />
            </Link>
          </div>
          <div className="nav-right-part nav-right-part-mobile">
            fdsffd
          </div>
          <div
            className="collapse navbar-collapse go-top"
            id="edumint_main_menu"
          >
            <ul className="navbar-nav menu-open" style={{ color: 'black' }}>
              <li className="current-menu-item">
                <Link to="/" style={{ color: 'black' }}>Home</Link>

              </li>
              {
                !isAuthenticated ? <li>
                  <Link to="/sign-in" style={{ color: 'black' }}>Sign In</Link>
                </li> : <li style={{ color: 'black' }}><Link to="/sign-in" style={{ color: 'black' }}>Dashboard</Link></li>
              }
              {
                isAuthenticated ? <li onClick={logout} ><span style={{ color: "black", cursor: "pointer" }}>Logout</span></li> : null
              }

            </ul>
          </div>
        </div>
      </nav> */}
    </div>
  )
}



// class NavbarV3 extends Component {
//   componentDidMount() {
//     const $ = window.$;

//     $("body").addClass("home-3");
//   }
//   render() {
//     // let publicUrl = process.env.PUBLIC_URL + "/";
//     let imgattr = "logo";
//     let anchor = "#";
//     return (
//       <div className="navbar-area">
//         <nav className="navbar navbar-area-3 navbar-area navbar-expand-lg">
//           <div className="container nav-container">
//             <div className="responsive-mobile-menu">
//               <button
//                 className="menu toggle-btn d-block d-lg-none"
//                 data-target="#edumint_main_menu"
//                 aria-expanded="false"
//                 aria-label="Toggle navigation"
//               >
//                 <span className="icon-left" />
//                 <span className="icon-right" />
//               </button>
//             </div>
//             <div className="logo">
//               <Link to="/">
//                 <img src={  "assets/img/logo-2.png"} alt="img" />
//               </Link>
//             </div>
//             <div className="nav-right-part nav-right-part-mobile">
//               <Link className="btn btn-base" to="/sign-up">
//                 Sign Up
//               </Link>
//             </div>
//             <div
//               className="collapse navbar-collapse go-top"
//               id="edumint_main_menu"
//             >
//               <ul className="navbar-nav menu-open">
//                 <li className="current-menu-item">
//                   <Link to="/">Home</Link>
//                   {/* <ul className="sub-menu">
// 				            <li><Link to="/">Home 01</Link></li>
// 	                        <li><Link to="/home-v2">Home 02</Link></li>
// 	                        <li><Link to="/home-v3">Home 03</Link></li>
// 			            </ul> */}
//                 </li>
//                 <li className="menu-item-has-children">
//                   <Link to="/course">Course</Link>
//                   <ul className="sub-menu">
//                     <li><Link to="/course-details">E-Learning</Link></li>
//                     <li>
//                       <Link to="/virtual-details">Virtual Classroom</Link>
//                     </li>
//                   </ul>
//                 </li>

//                 {/* <li>
//                   <Link to="/contact">Contact Us</Link>
//                 </li> */}
//                 {/* <li>
//                   <Link to="/sign-up">Sign Up</Link>
//                 </li> */}
//                 <li>
//                   <Link to="/sign-in">Sign In</Link>
//                 </li>
//                 <li>
//                   <Link to="/trainer">Trainer</Link>
//                 </li>
//                 <li>
//                   <Link to="/admin">Admin</Link>
//                 </li>
//               </ul>
//             </div>
//             <div className="nav-right-part nav-right-part-desktop style-black">
//               <div className="emt-phone-wrap">
//                 <div className="emt-phone">
//                   <i className="fa fa-phone" />
//                   <div className="phone-number align-self-center">
//                     Call Us <br />
//                     <span>860 -272 -9738</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>
//     );
//   }
// }

// export default NavbarV3;
