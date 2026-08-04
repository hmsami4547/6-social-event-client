import React, { use, useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link, useLoaderData } from 'react-router';
import { FaSearch } from "react-icons/fa";

const Home = () => {
    const [search, setSearch]= useState("");
    const data = useLoaderData()
    console.log(data)

const filteredEvent = data.filter((data)=>{
return data.title.toLowerCase().includes(search.toLowerCase())
}) 



    return (
        <div>
            <div className="flex justify-center items-center gap-3 p-3 ">
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
           { filteredEvent.map(data=> <div className='border-amber-50 bg-gradient-to-r from-blue-500  to-violet-500 rounded-2xl border-2 h-85' key={data._id}>
            <figure className='h-1/2 w-full'><img className='w-full h-full' src={data.iconUrl} alt="" /></figure>
<div className='flex justify-between p-3'>
<div className='btn bg-blue-400 rounded-xl p-2'>{data.category}</div>
<div>{data.dateLabel}</div>

</div>
<div className='pl-2'>
    {data.title}
</div>
<div className='pl-2'>
    {data.location}
</div>

<div className='flex justify-between p-2 mb-0.5'>
<div>+{data.joinedCount} Joined</div>
<Link to={data._id}  className='btn bg-violet-400  rounded-2xl '>Join</Link>
</div>



           </div>)}
  
   
        </div>

    </div>:<div className='flex justify-center text-2xl font-bold text-red-700'>
        
        Search event isn't found
        
        
        </div>}

 <div className='grid grid-cols-3 m-3 gap-3 '>
           { data.map(data=> <div className='border-amber-50 bg-gradient-to-r from-blue-500  to-violet-500 rounded-2xl border-2 h-85' key={data._id}>
            <figure className='h-1/2 w-full'><img className='w-full h-full' src={data.iconUrl} alt="" /></figure>
<div className='flex justify-between p-3'>
<div className='btn bg-blue-400 rounded-xl p-2'>{data.category}</div>
<div>{data.dateLabel}</div>

</div>
<div className='pl-2'>
    {data.title}
</div>
<div className='pl-2'>
    {data.location}
</div>

<div className='flex justify-between p-2 mb-0.5'>
<div>+{data.joinedCount} Joined</div>
<Link to={data._id}  className='btn bg-violet-400  rounded-2xl '>Join</Link>
</div>



           </div>)}
  
   
        </div>

       
        </div>
    );
};

export default Home;