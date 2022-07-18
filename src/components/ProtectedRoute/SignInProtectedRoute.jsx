import React from "react";
import { Redirect , Route } from "react-router-dom";

import Trainer from '../../components/trainer';
import Admin from '../../components/admin';
import { useAuthState,useAuth } from '../../states/AuthState';
function SignInProtectedRoute({ component: Component, ...restOfProps }) {

  const {isAuthenticated,first_name,last_name,role} = useAuthState()
	const auth = useAuth()
  // const navigateTo = useNavigate();
  return (
    <Route
      {...restOfProps}
      render={(props) =>{
          if(isAuthenticated && (role=="trainer"))
          {
              return <Redirect to="/trainer" />
          }
          else if(isAuthenticated && (role=="admin"))
          {
              return <Redirect to="/admin" />
          }
          else if(isAuthenticated && (role=="employee"))
          {
              return <Redirect to="/employee" />
          }
          else if(!isAuthenticated){
            return <Component {...props} />
          }
          else{
              return <Redirect to="/" />
          }
      }
      }
    />
  );
}

export default SignInProtectedRoute;