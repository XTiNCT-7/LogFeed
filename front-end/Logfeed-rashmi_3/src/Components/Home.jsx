import React, { useState } from 'react'
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Log from './LogItem/Log';

import './home.css';

const Home = () => {
    const [time, setTime] = useState({"time":0,"system":"","date":""});
    const handleFilter=(setTimeFilter)=>{
        setTime({"time": setTimeFilter,"system":setTimeFilter,"date":setTimeFilter});
    }
    const handleTime=(setTimeFilter)=>{
        setTime({"time": setTimeFilter,"system":"","date":""});
    }
    const handleSystem=(setTimeFilter)=>{
        setTime({"time": 0,"system":setTimeFilter,"date":""});
    }
    const handleDate=(setTimeFilter)=>{
        setTime({"time": 0,"system":"","date":setTimeFilter});
    }
    return (
        <>
            <Header />
            <div className='mt-4 container-fluid'>
                <div className='row'>
                    <div className='col-3'>
                        <Sidebar  onFilterTime={handleTime} onFilterSystem={handleSystem}  onFilterDate={handleDate} />
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
