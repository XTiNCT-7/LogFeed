import React, { useState } from 'react'
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Log from './LogItem/Log';

import './home.css';

const Home = () => {
    const [time, setTime] = useState({"time":0,"system":""});
    const handleFilter=(setTimeFilter)=>{
        setTime({"time": setTimeFilter,"system":setTimeFilter});
    }
    return (
        <>
            <Header />
            <div className='mt-4 container-fluid'>
                <div className='row'>
                    <div className='col-3'>
                        <Sidebar onFilter={handleFilter}/>
                    </div>
                    <div className='col-9'>
                        <Log time={time}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home