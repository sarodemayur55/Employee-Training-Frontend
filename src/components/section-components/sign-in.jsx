import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import axios from 'axios';
import BASE_URL from '../../constant/constants'
import { useAuth } from '../../states/AuthState'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import img from '../../assets/img/signin/output.png'
const useStyles = makeStyles((theme) => ({
	accounticon: {
		'& svg': {
			fontSize: 100
		}
	}
}));
export default function Signin() {
	const classes = useStyles();
	const auth = useAuth()
	const [signindata, setSignindata] = useState({
		email: "",
		password: ""
	})


	const changehandler = (e) => {

		setSignindata({ ...signindata, [e.target.name]: e.target.value });
	}
	// console.log(BASE_URL + "/user/login")
	const onSubmit = (e) => {
		e.preventDefault();
		axios(
			{
				url: BASE_URL + "/user/login",
				method: "POST",
				data: signindata,

			})
			.then(res => {
				auth.batch(s => {
					console.log(res);
					s.isAuthenticated.set(true)
					s.user_id.set(res.data.user._id)
					s.first_name.set(res.data.user?.first_name || res.data.user?.name)
					s.last_name.set(res.data.user.last_name || '')
					s.email.set(res.data.user.email)
					s.role.set(res.data.user.role)
				})
			})
			.catch(err => {
				toast.error(err.response.data.message, {
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
		<div id="signin">
			<div className="signin-page-area pd-top-120 pd-bottom-120" style={{backgroundImage: `url("${img}")`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
				<div className="container" >

					<div className="row justify-content-center">
						<div className="col-xl-6 col-lg-7">
							<form className="signin-inner" onSubmit={onSubmit} style={{backgroundColor:"transparent"}} >
								<div className=" row d-flex justify-content-center">
								

									
									<div className="col-12" style={{ opacity:"0.7"}}>
										<Box
											display="flex"
											justifyContent="center"
											alignItems="center"
											className=""
											style={{marginBottom:"50px", marginTop:"50px"}}
										>
											<IconButton className={classes.accounticon}> 
												<AccountCircleSharpIcon />
												<Typography variant="h4" gutterBottom component="div" className="text-center">
										Login
									</Typography>
											</IconButton>
										


										</Box>

									</div>
									<div className="col-8 ">
										<div className="single-input-inner style-bg-border ">
										<p style={{color: 'black'}}>Email</p>
											<input style={{ backgroundColor: "transparent" }} type="email" name="email" placeholder="" required value={signindata.email} onChange={(e) => { changehandler(e) }} />
										</div>
									</div>
									<div className="col-8">
										<div className="single-input-inner style-bg-border">
											<p style={{color: 'black'}}>Password</p>
											<input style={{ backgroundColor: "transparent", border: "none", outline: "none" }} type="password" name="password" placeholder="" required value={signindata.password} onChange={(e) => { changehandler(e) }} />
										</div>
									</div>
									<div className="col-8 mb-4">
										{/* <Button type="submit" fullWidth variant="outlined" size="large">Sign In</Button>
									<Button fullWidth variant="outlined">Outlined</Button> */}
										<button type="submit" className="btn btn-outline-primary btn-lg btn-block">Sign In</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			{/* <GoToTop /> */}
		</div>
	)
}