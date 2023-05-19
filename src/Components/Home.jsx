import React from 'react'
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Log from './LogItem/Log';

import './home.css';

const Home = () => {

    return (
        <>
            <Header />
            <div className='mt-4 container'>
                <div className='row'>
                    <div className='col-3'>
                        <Sidebar />
                    </div>
                    <div className='col-9'>
                        <Log/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home