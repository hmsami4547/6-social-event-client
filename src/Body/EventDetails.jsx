import React, { useContext } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import { FaLocationDot } from "react-icons/fa6";
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
const EventDetails = () => {
    const data = useLoaderData()
    const {user} = useContext(AuthContext)
const navigate = useNavigate()
    const handleJoin=async()=>{
        const datas = {
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
    body: JSON.stringify(datas)
})
const result = await response.json()
console.log("The booked event is",result)
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
        
            <div className='h-100 border-2 text-xl font-bold border-amber-50 m-5 rounded-2xl p-4 bg-gradient-to-r from-blue-800 via-violet-700 to-purple-700'>   
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