import React from 'react';
import {FaRegUserCircle} from 'react-icons/fa';
import './header.css';
const Header=()=>{
  return (
    <div className="header">
        {/* <div>Name</div> */}
        <div><FaRegUserCircle/></div>
    </div>
  )
}

export default Header