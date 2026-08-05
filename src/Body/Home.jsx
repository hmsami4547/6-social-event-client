import React, { use, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link, useLoaderData, useNavigation } from 'react-router';
import { FaSearch } from "react-icons/fa";

const Home = () => {
    const [search, setSearch]= useState("");
  const navigation = useNavigation();
    const data = useLoaderData()
    console.log(data)
if(navigation.state === "loading"){
    return (<span className="loading loading-infinity loading-xl"></span>)
}
const filteredEvent = data.filter((data)=>{
return data.title.toLowerCase().includes(search.toLowerCase())
}) 



    return (
        <div className=' min-h-screen
  bg-[radial-gradient(ellipse_at_50%_45%,rgba(25,76,110,0.9)_0%,rgba(16,38,58,0.8)_30%,rgba(9,12,30,1)_75%)]
  text-white'>
            <div className="flex  justify-center items-center gap-3 p-3 ">
     <FaSearch />
<input 
value={search}
onChange={(e)=>setSearch(e.target.value)}
placeholder='search events'
className='input input-bordered w-full max-w-md'
type="text" />
    </div>
    {filteredEvent.length > 0 ?<div>
<div className='grid grid-cols-3 m-3 gap-3 '>
           { filteredEvent.map(datas=> <div className='border-amber-50 bg-gradient-to-r from-blue-500  to-violet-500 rounded-2xl border-2 h-85' key={datas._id}>
            <figure className='h-1/2 w-full'><img className='w-full h-full' src={datas.iconUrl} alt="" /></figure>
<div className='flex justify-between p-3'>
<div className='btn bg-blue-400 rounded-xl p-2'>{datas.category}</div>
<div>{datas.dateLabel}</div>

</div>
<div className='pl-2'>
    {datas.title}
</div>
<div className='pl-2'>
    {datas.location}
</div>

<div className='flex justify-between p-2 mb-0.5'>
<div>+{datas.joinedCount} Joined</div>
<Link to={datas._id}  className='btn bg-violet-400  rounded-2xl '>Join</Link>
</div>



           </div>)}
  
   
        </div>

    </div>:<div className='flex justify-center text-2xl font-bold text-red-700'>
        
        Search event isn't found
        
        
        </div>}


       
        </div>
    );
};

export default Home;