import React, { useContext, useEffect } from 'react';
import { Link, useLoaderData, useNavigate, useNavigation } from 'react-router';
import { FaLocationDot } from "react-icons/fa6";
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
const EventDetails = () => {
    const data = useLoaderData()
    const {user,LogOut} = useContext(AuthContext)
const navigate = useNavigate()
const navigation = useNavigation()

if(navigation.state === "loading"){
    return(<span className="loading loading-infinity loading-xl flex justify-center"></span>)
}
    const handleJoin=async()=>{
        const datas = {
            eventId: data._id,
email : user.email,
name: data.organizer.name,
eventName: data.title,
eventAddress: data.location,
eventDate: data.dateLabel,
eventType: data.category,
icon: data.iconUrl,
organizerInitials : data.organizer.initials,

}


    try{
const response = await fetch("http://localhost:3000/myEvent",{
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(datas)
})
if(response.status === 401 || response.status === 403){
                Swal.fire({ title: "Session expired", text: "Please log in again.", icon: "warning" });
LogOut()
return;
}
if(response.status === 409){
                Swal.fire({ title: "ALready joined", text: "You have already joined in this.", icon: "info" });
return
}
const result = await response.json()
console.log("The booked event is",result)
console.log("The booked event is",response)
if(response.status === 409){
    Swal.fire({
  title: "Sorry!",
  text: "You booked the event before!",
  icon: "info"
});
return;
}
//alert("Event is booked")
Swal.fire({
  title: "Congratulations!",
  text: "You booked the event!",
  icon: "success"
});
navigate("/myEvent")
}catch(error){
    console.log(error)
}

            


    }
 
    return (
        
            <div className='h-100 border-2 text-xl font-bold border-amber-50 m-5 rounded-2xl p-4 bg-gradient-to-r from-blue-800 via-violet-700 to-purple-700 bg-[radial-gradient(ellipse_at_50%_45%,rgba(25,76,110,0.9)_0%,rgba(16,38,58,0.8)_30%,rgba(9,12,30,1)_75%)]
  text-white'>   
        <figure className='flex justify-center'><img className='h-40 ' src={data.iconUrl} alt="" />
        </figure>
        <div className='btn btn-primary bg-blue-400'>{data.category}</div>
        <div>{data.title}</div>
<div className='flex items-center'><FaLocationDot />{data.location}</div>
<div className='flex justify-between items-center mb-2'>
    <div className=' flex gap-1 items-center'>
<div className='bg-blue-700 rounded-full p-2'>
{data.organizer.initials}
</div>
<div>
   <div>{data.organizer.name}</div> 
   <p className=''>Organizer</p>
</div>
    </div>
    <Link className='border-2 p-2 rounded-2xl'>
Message
    </Link>
</div>
<div onClick={handleJoin} className='btn btn-primary rounded-2xl w-full text-center'> Join This event</div>
</div>
      
    );
};

export default EventDetails;