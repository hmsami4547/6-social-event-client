import React, { use, useContext } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const Register = () => {
    const {createUser, setUser} = useContext(AuthContext)
const navigate = useNavigate()
const handleSubmit = (e) =>{
    e.preventDefault()
    const name = e.target.name.value 
    const email = e.target.email.value 
    const password = e.target.password.value 
    console.log(name, email, password)

  createUser(email, password).then(users =>{
    const user = users.user
    alert("Registration Completed")
     console.log("The user is ",user)
     navigate("/")
   
    
  }).then(err => console.log(err))

   
}
    return (<>
    <Navbar></Navbar>
        <div>
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
   
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
   <form onSubmit={handleSubmit}>
          <label className="label">Name</label>
          <input name='name' type="text" className="input" placeholder="Your Name" />
          <label className="label">Email</label>
          <input name='email' type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input name='password' type="password" className="input" placeholder="Password" />
          <div>Do you have account? <Link to="/signin" className='text-blue-600 underline'>Sign In</Link></div>
          <button className="btn btn-neutral mt-4">Sign Up</button>
       </form>
      </div>
    </div>
  </div>
</div>
        </div>
        <Footer></Footer>
        </>
    );
};

export default Register;
