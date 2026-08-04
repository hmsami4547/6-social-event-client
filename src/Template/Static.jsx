import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Static = () => {
    return (
        <div className='bg-[radial-gradient(ellipse_at_50%_45%,rgba(25,76,110,0.9)_0%,rgba(16,38,58,0.8)_30%,rgba(9,12,30,1)_75%)]
  text-white'>
  <Navbar></Navbar>


<Outlet></Outlet>


<Footer></Footer>
        </div>
    );
};

export default Static;