import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from './Context/AuthContext';
import { signOut } from 'firebase/auth';
import { RxAvatar } from "react-icons/rx";
import { auth } from './Firebase/firebase.init';
import Swal from 'sweetalert2';
const Navbar = () => {
  const {user, LogOut} = useContext(AuthContext)
  console.log(user)
const handleLogOut = () =>{
   Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Log out!"
}).then((result) => {
  if (result.isConfirmed){
    LogOut(auth).then(()=>{
      Swal.fire({
    title: "Log out!",
    text: "You log out.",
    icon: "success"
  });
   // alert("Sign out successfully")
  }).then(err => console.log(err))
  } 
});
  
  
}

console.log("photo url is ", user?.photoURL)
const navLinkClass = ({isActive})=>`
${isActive?"bg-green-700 p-2 rounded-2xl":"p-2 hover:bg-green-700 rounded-2xl"}
`
const navLinkClassFirst = ({isActive})=>`
${isActive?"bg-green-700 p-2 btn  rounded-2xl":"btn p-2 rounded-2xl hover:bg-green-500"}
`
    return (
        <div>
                      <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown lg:hidden md:hidden">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <Link to="/eventcreate">Create Event</Link>
        <Link to="/manageEvents">Manage Event</Link>
        
      </ul>
    
    </div>
    <div>
       <NavLink to="/eventcreate" className={navLinkClassFirst}>Create Event</NavLink>
        <NavLink to="/manageEvents" className={navLinkClassFirst}>Manage Event</NavLink>
    </div>
   
  </div>
    
  <div className="navbar-center">
    <a className="btn btn-ghost text-xl">Social Event</a>
    
    <NavLink to="/" className={navLinkClass}>  Home</NavLink>
    <NavLink to="/signin" className={navLinkClass}>  Sign In</NavLink>
    <NavLink to='/signup' className={navLinkClass}>  Sign Up</NavLink>
  </div>
  <div className="navbar-end">
     <div>{user?<div className='btn btn-primary' onClick={handleLogOut}>Log out</div>:<Link className='btn btn-primary' to="/signin">Log in</Link>}</div>
     <NavLink to="/userDetails">
    { user &&   <div className='flex items-center'> 
  <figure className=' '><img className='w-full h-10 ml-3 rounded-2xl' src={user.photoURL?user?.photoURL:<RxAvatar />} alt="" /></figure>
  <p className='bold pl-4'>{user?.displayName}</p>
  </div>}
  </NavLink>
  </div>
</div>
        </div>
    );
};

export default Navbar;