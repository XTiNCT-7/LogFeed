import React from 'react';
import {FaRegUserCircle} from 'react-icons/fa';
import './header.css';
const Header=()=>{
  return (
    <header className='shadow mb-2'>
      <div className='container'>
        <div className='row'>
        <div className='col-4'>
          <span className='fs-4 pe-2'><FaRegUserCircle/></span> User Name
          </div>
          <div className='col-4 text-center'>
            <span className='fw-bold fs-5'>Log  Management  System</span>
            <hr className='text-light m-1' />
          </div>
        <div className='col-4 text-end'>
          <button className='btn btn-sm btn-danger'>Logout</button>
        </div>
        </div>
        
        </div>
    </header>
  )
}

export default Header