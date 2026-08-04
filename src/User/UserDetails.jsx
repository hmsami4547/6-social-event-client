import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const UserDetails = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            {user?.displayName}
        </div>
    );
};

export default UserDetails;