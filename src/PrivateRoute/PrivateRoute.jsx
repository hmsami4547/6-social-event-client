import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user} = useContext(AuthContext)
    const navigate = useNavigate()
    if(!user){
    return navigate("/")
       
    }
    if(user){
        return children;
    }
};

export default PrivateRoute;