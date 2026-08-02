import React, { useContext } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Link } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const Login = () => {
    const {signInUser, setUser} = useContext(AuthContext)
const handleSubmit = (e)=>{
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    console.log(email, password)
    signInUser(email, password).then(users =>{
        const user = users.user
        alert("Login successfully")
        console.log("The user is",user)
        setUser(user)
      
    }).then(err =>{ console.log(err)
   
    })


    
}






    return (<>
    <Navbar></Navbar>
        <div>
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <label className="label">Email</label>
          <input name='email' type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input name='password' type="password" className="input" placeholder="Password" />
          <div>Don't you have account? <Link to="/signup" className='text-blue-500 underline'>Sign Up</Link></div>
          <button className="btn btn-neutral mt-4">Login</button>
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

export default Login;