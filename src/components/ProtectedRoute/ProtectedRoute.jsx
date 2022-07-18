import React from "react";
import { Redirect , Route } from "react-router-dom";
import { useAuthState,useAuth } from '../../states/AuthState';
function ProtectedRoute({ component: Component, ...restOfProps }) {

  const {isAuthenticated,first_name,last_name,role} = useAuthState()
	const auth = useAuth()
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated && (restOfProps.role==role) ? <Component {...props} /> :
         <Redirect to="/sign-in" />
      }
    />
  );
}

export default ProtectedRoute;