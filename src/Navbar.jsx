import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from './Context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './Firebase/firebase.init';

const Navbar = () => {
  const {user, LogOut} = useContext(AuthContext)
const handleLogOut = () =>{
  LogOut(auth).then(()=>{
    alert("Sign out successfully")
  }).then(err => console.log(err))
}


    return (
        <div>
                      <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>Create Event</li>
        <li>Manage Event</li>
        <li>Join Event</li>
      </ul>
    
    </div>
    <div>{user?<div className='btn btn-primary' onClick={handleLogOut}>Log out</div>:<Link className='btn btn-primary' to="/signin">Log in</Link>}</div>
  </div>
    
  <div className="navbar-center">
    <a className="btn btn-ghost text-xl">Social Event</a>
    <Link>Upcoming Events</Link>
    <Link to="/" className='pl-2 hover:bg-blue-500'>  Home</Link>
    <Link to="/signin" className='pl-2 hover:bg-blue-500'>  Sign In</Link>
    <Link to='/signup' className='pl-2 hover:bg-blue-500'>  Sign Up</Link>
  </div>
  <div className="navbar-end">
    <button className="btn btn-ghost btn-circle mr-20">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
    </button>
  </div>
</div>
        </div>
    );
};

export default Navbar;