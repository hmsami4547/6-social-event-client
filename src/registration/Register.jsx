import React, { use, useContext, useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import { auth, provider } from '../Firebase/firebase.init';
import { sendEmailVerification } from 'firebase/auth';
const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, serError]= useState("")
    const {createUser, setUser, user,signInWithGoogle} = useContext(AuthContext)
const navigate = useNavigate()
const handleSubmit = (e) =>{
    e.preventDefault()
    const name = e.target.name.value 
    const email = e.target.email.value 
    const password = e.target.password.value 
    console.log(name, email, password)
//const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\/;']{6,}$/
// const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
// if(!gmailRegex.test(email)){
//     Swal.fire({
//     title: "Invalid email address",
//     text: "Email must be @gmail.com type",
//     icon: "error",
//   });
//   return
// }
if(!strongPasswordRegex.test(password)){
  Swal.fire({
    title: "Invalid Password",
    text: "Password must have at least 6 characters, one uppercase and one lowercase letter.",
    icon: "error",
  });
  return;
}
  createUser(email, password).then(users =>{
    const user = users.user
    //alert("Registration Completed")
     console.log("The user is ",user)
    sendEmailVerification(user).then(()=>{
        Swal.fire({
                title: "verify your email!",
                text: "Please check mail bok or in spam box",
                icon: "info"
              });

              auth.signOut().then(()=>{
                navigate("/signin")
              })
      

    })
     
    
    
   
    
  }).catch(err => {console.log(err)
serError(err.message)
  })

   
}

const handleSubmitWithGoogle=(e)=>{
e.preventDefault()
    
    signInWithGoogle(auth,provider).then(users =>{
        const usered = users.user
        //alert("Login successfully")
        Swal.fire({
          title: "Congratulations!",
          text: "Login successfully!",
          icon: "success"
        });
        console.log("The user is",usered)
        setUser(usered)
      navigate("/")
    }).then(err =>{ console.log(err)
   
    })


}


console.log(user)
    return (<>
    <Navbar></Navbar>
        <div>
            <div className="hero bg-base-200 min-h-screen bg-[radial-gradient(ellipse_at_50%_45%,rgba(25,76,110,0.9)_0%,rgba(16,38,58,0.8)_30%,rgba(9,12,30,1)_75%)]
  text-white">
  <div className="hero-content flex-col lg:flex-row-reverse">
   
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
   <form onSubmit={handleSubmit}>
          <label className="label">Name</label>
          <input required name='name' type="text" className="input" placeholder="Your Name" />
          <label className="label">Email</label>
          <input required name='email' type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          
          <div className='relative'>
<input required name='password' type={showPassword?"password":"text"} className="input" placeholder="Password" />
<button type='button' onClick={()=>setShowPassword(!showPassword)} className='flex justify-end absolute pl-75 top-1/3'>    {showPassword?< FaEye />:<FaEyeSlash /> }        </button>

          </div>
          
          <div>Do you have account? <Link to="/signin" className='text-blue-600 underline'>Sign In</Link></div>
          <button className="btn btn-neutral mt-4">Sign Up</button>
       </form>
          <button onClick={handleSubmitWithGoogle} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Continue with Google
</button>
<p className='text-red-600 font-bold text-2xl'>

{error}
</p>

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
