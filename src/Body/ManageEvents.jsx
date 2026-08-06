import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
const ManageEvents = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const {user,LogOut} = useContext(AuthContext)
const emails = user.email
 const API_URL = import.meta.env.VITE_API_URL;
    useEffect(()=>{
const fetchData = async ()=>{
    setLoading(true)
try{
const response = await fetch(`${API_URL}/createEvent?email=${emails}`,
    {
        credentials:'include'
    }
)
if(response.status === 401 || response.status === 409){
            Swal.fire({ title: "Session expired", text: "Please log in again.", icon: "warning" });
LogOut()
return
}
const datas = await response.json()

setData(datas)

}catch(error){
    console.log(error)
}finally{
    setLoading(false)
}


}
fetchData();

    },[emails])

    const handleDelete =async (id)=>{
Swal.fire({
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
const response = await fetch(`${API_URL}/createEvent/${id}`,{
    method: "DELETE",
    credentials: "include"

})
if(response.status === 401 || response.status === 403){
                Swal.fire({ title: "Session expired", text: "Please log in again.", icon: "warning" });
LogOut() 
return
}
const result = await response.json()
//alert("Deleted successfully")
Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
const remainingData = data.filter(data => data._id !== id)
setData(remainingData)

        }catch(error) {console.log(error)}

  } 
});

    }
    console.log(user)
    console.log(data)
    return (
        <div>
            <Navbar></Navbar>


          
{loading? <span className="loading loading-infinity loading-xl"></span> :<div className='grid lg:grid-cols-3 md:grid-cols-3 m-3 gap-3 bg-[radial-gradient(ellipse_at_50%_45%,rgba(25,76,110,0.9)_0%,rgba(16,38,58,0.8)_30%,rgba(9,12,30,1)_75%)]
  text-white'>
           { data.map(data=> <div className='border-amber-50 bg-gradient-to-r from-blue-500  to-violet-500 rounded-2xl border-2 h-60' key={data?._id}>
          
<div className='flex justify-between items-center p-3'>
<div className=' rounded-xl p-3'>category:{data?.eventType}</div>
<div> {data?.email}</div>

</div>
<div className='font-bold p-3'>
  Name:   {data?.name}
</div>
<div className='pl-3'>
 Event Type:   {data?.eventName}
</div>
<div className='pl-3'>
  Location:  {data?.eventAddress}
</div>

<div className='flex justify-between p-3 mb-0.5'>
<Link to={`/update/${data._id}`} className='btn bg-violet-400  rounded-2xl '>Update</Link>
<div onClick={()=>handleDelete(data._id)} className='btn bg-violet-400  rounded-2xl '>Delete</div>
</div>



           </div>)}
  
   
        </div>}
  


           
    
            <Footer></Footer>
            
        </div>
    );
};

export default ManageEvents;