import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Navbar from '../Navbar';
import Footer from '../Footer';

const UserDetails = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <Navbar></Navbar>
            <div
  className="hero min-h-screen"
  style={{
    backgroundImage:
     `url(${user?.photoURL})`,
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello Mr./Mrs. {user?.displayName}</h1>
      <p className="mb-5">
        Email address: {user?.email}
      </p>
      
    </div>
  </div>
</div>
<Footer></Footer>
        </div>
    );
};

export default UserDetails;