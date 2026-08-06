import React, { useContext, useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
 const CreateEvent = () => {
  const [loading, setLoading]= useState(false)
const {user,LogOut} = useContext(AuthContext)
const navigate = useNavigate()
console.log(user.email)
const handleSubmit= async (e)=>{
e.preventDefault()

const API_URL = import.meta.env.VITE_API_URL;
const eventName = e.target.eventName.value 
const eventType = e.target.eventType.value 
const eventDate = e.target.eventDate.value 
const eventAddress = e.target.eventAddress.value 
const name = e.target.name.value
console.log(name,user.email, eventName, eventAddress, eventDate, eventType);

const data = {
email : user.email,
name: name,
eventName: eventName,
eventAddress: eventAddress,
eventDate: eventDate,
eventType: eventType
}

Swal.fire({
  title: "Are you sure?",
  text: "Check all data again!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Create event!"
}).then(async (result) => {
  if (result.isConfirmed){
   
    try{
      setLoading(true)
    const response = await fetch(`${API_URL}http://localhost:3000/createEvent`,{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
if(response.status === 401 || response.status === 403){
   Swal.fire({ title: "Session expired", text: "Please log in again.", icon: "warning" });
            LogOut();
            return
}
    const result = await response.json()
    console.log("Successful result is", result)
   // alert("Event created succefully")
   Swal.fire({
    title: "Done!",
    text: "Event created.",
    icon: "success"
  });
    navigate("/manageEvents")
}catch(error){
    console.log(error)
}finally{
setLoading(false)
}
  } 
});

}


    return (
        <div>
          <Navbar></Navbar>
          {loading?<span className="loading loading-infinity loading-xl"></span>:<div className="hero bg-base-200 min-h-screen bg-[radial-gradient(ellipse_at_50%_45%,rgba(25,76,110,0.9)_0%,rgba(16,38,58,0.8)_30%,rgba(9,12,30,1)_75%)]
  text-white">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
    
      
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
      <form onSubmit={handleSubmit}>
          <label className="label">Name</label>
          <input required name='name' type="text" className="input" placeholder="Your name" />
          <label className="label">Event Name</label>
          <input required name='eventName' type="text" className="input" placeholder="Event Name" />
          <label className="label">Event type</label>
          <input required name='eventType' type="text" className="input" placeholder="Event type" />
          <label className="label">Event date</label>
          <input required name='eventDate' type="text" className="input" placeholder="Event date" />
          <label className="label">Event address</label>
          <input required name='eventAddress' type="text" className="input" placeholder="Event address" />
          
          
          <button className="btn btn-neutral mt-4">Create Event</button>
      </form>
      </div>
    </div>
  </div>

</div>}


          <Footer></Footer>
        </div>
    );
};

export default CreateEvent;