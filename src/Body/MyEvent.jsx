import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router';
import Navbar from '../Navbar';
import Swal from 'sweetalert2';
import Footer from '../Footer';
const MyEvent = () => {
    const [data , setData] = useState([])
    const [loading, setLoading] = useState(true)
    const {user,LogOut} = useContext(AuthContext)
     const API_URL = import.meta.env.VITE_API_URL;

const emails = user?.email
console.log(emails)
    useEffect(()=>{
// const DeleteData = async (id) => {
// try{
// const responses = await fetch(`http://localhost:3000/myEvent/${id}`,{
//     method: "DELETE",

// })
// const result = await responses.json()
// alert("Deleted Succefully")
// const remaningData = data.filter(data => data._id !== id)
// setData(remaningData)
// }catch(error){console.log(error)}
// }
        const fetchData = async () =>{
            setLoading(true)
            try{
const response = await fetch(`${API_URL}/myEvent?email=${emails}`,{
    credentials:'include'
})
if(response.status === 401 || response.status === 403){
                Swal.fire({ title: "Session expired", text: "Please log in again.", icon: "warning" });
LogOut()
return
}
const datas = await response.json()
setData(datas)

            }catch(error){
                console.log(error)
            }finally{setLoading(false)}
        }
fetchData();
    },[emails])
    console.log(data)
    const DeleteData = async (id) => {

 Swal.fire ({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then(async (result) => {
  if (result.isConfirmed){
try{
const responses = await fetch(`${API_URL}/myEvent/${id}`,{
    method: "DELETE",
})
if(responses.status === 401 || responses.status === 403){
                Swal.fire({ title: "Session expired", text: "Please log in again.", icon: "warning" });
LogOut()
return
}
const result = await responses.json()
//alert("Deleted Succefully")
 Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
const remaningData = data.filter(data => data._id !== id)
setData(remaningData)
}catch(error){console.log(error)}finally{setLoading(false)}
    
  }
});


}
    return (
        
    <div>
    <Navbar></Navbar>
    {loading? <span className="loading loading-infinity loading-xl"></span> :<div className='grid lg:grid-cols-3 md:grid-cols-3 m-3 gap-3 bg-[radial-gradient(ellipse_at_50%_45%,rgba(25,76,110,0.9)_0%,rgba(16,38,58,0.8)_30%,rgba(9,12,30,1)_75%)]
  text-white'>
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
  
   
        </div>}
 
                <Footer></Footer>
            </div>
       
    );
};

export default MyEvent;