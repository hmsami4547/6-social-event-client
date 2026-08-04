import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router';
import Navbar from '../Navbar';
import Footer from '../Footer';
const MyEvent = () => {
    const [data , setData] = useState([])
    const {user} = useContext(AuthContext)
const emails = user?.email
console.log(emails)
    useEffect(()=>{
const DeleteData = async (id) => {
try{
const responses = await fetch(`http://localhost:3000/myEvent/${id}`,{
    method: "DELETE",

})
const result = await responses.json()
alert("Deleted Succefully")
const remaningData = data.filter(data => data._id !== id)
setData(remaningData)
}catch(error){console.log(error)}
}
        const fetchData = async () =>{
            try{
const response = await fetch(`http://localhost:3000/myEvent?email=${emails}`)
const datas = await response.json()
setData(datas)

            }catch(error){
                console.log(error)
            }
        }
fetchData();
    },[emails])
    console.log(data)
    const DeleteData = async (id) => {
try{
const responses = await fetch(`http://localhost:3000/myEvent/${id}`,{
    method: "DELETE",

})
const result = await responses.json()
alert("Deleted Succefully")
const remaningData = data.filter(data => data._id !== id)
setData(remaningData)
}catch(error){console.log(error)}
}
    return (
        
    <div>
    <Navbar></Navbar>
 <div className='grid grid-cols-3 m-3 gap-3 '>
           { data.map(data=> <div className='border-amber-50 bg-gradient-to-r from-blue-500  to-violet-500 rounded-2xl border-2 h-85' key={data._id}>
            <figure className='h-1/2 w-full'><img className='w-full h-full' src={data.icon} alt="" /></figure>
<div className='flex justify-between p-3'>
<div className='btn bg-blue-400 rounded-xl p-2'>{data.eventType}</div>
<div>{data.eventDate}</div>

</div>
<div className='pl-2'>
    {data.eventName}
</div>
<div className='pl-2'>
    {data.eventAddress}
</div>

<div className='flex justify-center p-2 mb-0.5'>

<Link onClick={()=>DeleteData(data._id)}  className='btn w-full bg-red-600  rounded-2xl '>Cancel Booking</Link>
</div>



           </div>)}
  
   
        </div>
                <Footer></Footer>
            </div>
       
    );
};

export default MyEvent;