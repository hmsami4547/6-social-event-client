import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useNavigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user,loading} = useContext(AuthContext)
    const navigate = useNavigate()
    if(loading){
      return  <span className="loading loading-infinity loading-xl"></span>
    }
    if(!user){
    return <Navigate to="/signin" replace/>
       
    }
    if(user){
        return children;
    }
};

export default PrivateRoute;