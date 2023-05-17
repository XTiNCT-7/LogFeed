import React from 'react';
import {FaRegUserCircle} from 'react-icons/fa';
import './header.css';
const Header=()=>{
  return (
    <header className='shadow mb-2'>
        <div>Name</div>
        <div><FaRegUserCircle/></div>
    </header>
  )
}

export default Header