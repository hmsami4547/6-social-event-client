import React, { use, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link, useLoaderData } from 'react-router';


const Home = () => {
    const data = useLoaderData()
    console.log(data)

    return (
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
    );
};

export default Home;