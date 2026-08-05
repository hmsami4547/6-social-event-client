import React, { useContext, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { AuthContext } from '../Context/AuthContext';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
const Update = () => {
const {user,setLoading} = useContext(AuthContext)
const {id} = useParams()
const previousData = useLoaderData()
const navigate = useNavigate()
console.log(id)
console.log(user.email)
const handleSubmit= async (e)=>{
e.preventDefault()


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
  text: "Check before update!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Update it!"
}).then(async (result) => {
  if (result.isConfirmed){
try{
const response = await fetch(`http://localhost:3000/createEvent/${id}`,{
    method: "PATCH",
    headers:{
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
const result = await response.json()
console.log("updated result", result)
//alert("Result is updated")
Swal.fire({
    title: "Updated!",
    text: "Event is updated.",
    icon: "success"
  });
navigate("/manageEvents")

}catch(error){console.log(error)}



  } 
});




console.log(data)
}
// useEffect(async ()=>{
// try{
// const response = await fetch(`http://localhost:3000/createEvent/${id}`)
// const result = await response.json()
// console.log("update form data is",result);
// }catch(error){console.log(error)}


// },[id])
console.log("update form data is",previousData)
    return (
        <div>
            <Navbar></Navbar>
            <div>
<div className="hero bg-base-200 min-h-screen bg-[radial-gradient(ellipse_at_50%_45%,rgba(25,76,110,0.9)_0%,rgba(16,38,58,0.8)_30%,rgba(9,12,30,1)_75%)]
  text-white">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
    
      
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
      <form onSubmit={handleSubmit}>
          <label className="label">Name</label>
          <input required name='name' type="text" className="input" placeholder="Your name" defaultValue={user.displayName}/>
          <label className="label">Event Name</label>
          <input required name='eventName' type="text" className="input" placeholder="Event Name" defaultValue={previousData.eventName}/>
          <label className="label">Event type</label>
          <input required name='eventType' type="text" className="input" placeholder="Event type" defaultValue={previousData.eventType} />
          <label className="label">Event date</label>
          <input required name='eventDate' type="text" className="input" placeholder="Event date" defaultValue={previousData.eventDate} />
          <label className="label">Event address</label>
          <input required name='eventAddress' type="text" className="input" placeholder="Event address" defaultValue={previousData.eventAddress} />
          
          
          <button className="btn btn-neutral mt-4">Update the  Event</button>
      </form>
      </div>
    </div>
  </div>

</div>



            </div>





<Footer></Footer>        </div>
    );
};

export default Update;